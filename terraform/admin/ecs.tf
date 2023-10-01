resource "aws_ecs_cluster" "admin" {
  name = "${var.prefix}-admin-cluster"
}

resource "aws_iam_policy" "task_execution_role_policy" {
  name        = "${var.prefix}-task-execution-role-policy"
  path        = "/"
  description = "Allows retrieval of images and adding to logs"
  policy      = file("../policies/task-exec-role.json")
}

resource "aws_iam_role" "task-execution_role" {
  name               = "${var.prefix}-task-exec-role"
  assume_role_policy = file("../policies/assume-role-policy.json")
}

resource "aws_iam_role_policy_attachment" "task_execution_role" {
  role       = aws_iam_role.task-execution_role.name
  policy_arn = aws_iam_policy.task_execution_role_policy.arn
}

resource "aws_iam_role" "admin_iam_role" {
  name               = "${var.prefix}-admin-iam-role"
  assume_role_policy = file("../policies/assume-role-policy.json")
}

resource "aws_cloudwatch_log_group" "ecs_task_logs" {
  name = "${var.prefix}-admin"
}

resource "aws_ecs_task_definition" "admin" {
  family                   = "${var.prefix}-admin"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = var.cpu
  memory                   = var.memory
  execution_role_arn       = aws_iam_role.admin_iam_role.arn
  task_role_arn            = aws_iam_role.admin_iam_role.arn
  container_definitions = templatefile("./container-definitions.json", {
    image_location       = var.image_location
    public_url           = var.public_url
    public_pulse_api_url = var.public_pulse_api_url
    aws_log_group        = aws_cloudwatch_log_group.ecs_task_logs.name
    aws_region           = var.aws_region
  })
}

resource "aws_security_group" "ecs_service" {
  description = "Access for the ecs service"
  name        = "${var.prefix}-ecs-service"
  vpc_id      = aws_vpc.admin.id
  egress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = [aws_subnet.private_a.cidr_block, aws_subnet.private_b.cidr_block]
  }

  ingress {
    from_port       = var.port
    to_port         = var.port
    protocol        = "tcp"
    security_groups = [aws_security_group.lb.id]
  }
}

resource "aws_ecs_service" "admin" {
  name            = "${var.prefix}-admin"
  cluster         = aws_ecs_cluster.admin.name
  task_definition = aws_ecs_task_definition.admin.arn
  #   container_definitions = <<DEFINITION
  #  {
  #       "name": "admin",
  #       "image": "${var.image_location}",
  #       "essential": true,
  #       "memoryReservation": 256,
  #       "environment": [
  #         {
  #           "name": "PUBLIC_URL",
  #           "value": "${var.public_url}"
  #         },
  #         {
  #           "name": "PUBLIC_PULSE_API_URL",
  #           "value": "${var.public_pulse_api_url}"
  #         }
  #       ],
  #       "logConfiguration": {
  #         "logDriver": "awslogs",
  #         "options": {
  #           "awslogs-group": "${aws_cloudwatch_log_group.ecs_task_logs.name}",
  #           "awslogs-region": "${var.aws_region}",
  #           "awslogs-stream-prefix": "admin"
  #         }
  #       },
  #       "porttomappings": [
  #         {
  #           "containerPort": 4000,
  #           "hostPort": 4000
  #         }
  #       ]
  #     }
  #   DEFINITION
  desired_count    = 1
  launch_type      = "FARGATE"
  platform_version = "LATEST"

  network_configuration {
    subnets = [
      aws_subnet.private_a.id,
      aws_subnet.private_b.id
    ]
    security_groups = [aws_security_group.ecs_service.id]
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.admin.arn
    container_name   = "admin"
    container_port   = var.port
  }
}
