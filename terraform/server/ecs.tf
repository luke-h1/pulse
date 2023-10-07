resource "aws_ecs_cluster" "server" {
  name = "${var.prefix}-server"
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

resource "aws_iam_role" "server_iam_role" {
  name               = "${var.prefix}-server-iam-role"
  assume_role_policy = file("../policies/assume-role-policy.json")
}

resource "aws_cloudwatch_log_group" "ecs_task_logs" {
  name = "${var.prefix}-server"
}

resource "aws_ecs_task_definition" "server" {
  family                   = "${var.prefix}-server"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = aws_iam_role.task-execution_role.arn
  task_role_arn            = aws_iam_role.server_iam_role.arn
  volume {
    name = "pulse"
  }
  container_definitions = jsonencode([
    {
      name              = "server"
      image             = var.image_location
      essential         = true
      memoryReservation = 512
      environment = [
        {
          name  = "PORT"
          value = "8000"
        },
        {
          name  = "DATABASE_URL",
          value = "${var.db_url}"
        },
        {
          name  = "SESSION_SECRET"
          value = "${var.session_secret}"
        },
        {
          name  = "REDIS_URL"
          value = "${var.redis_url}"
        },
        {
          name  = "CLOUDINARY_SECRET"
          value = "${var.cloudinary_secret}"
        }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = aws_cloudwatch_log_group.ecs_task_logs.name
          awslogs-region        = "eu-west-2"
          awslogs-stream-prefix = "server"
        }
      }
      portMappings = [
        {
          containerPort = 8000
          hostPort      = 8000
          protocol      = "tcp"
        }
      ]
    }
  ])
}

resource "aws_security_group" "ecs_service" {
  description = "Access for the ecs service"
  name        = "${var.prefix}-ecs-service"
  vpc_id      = aws_vpc.server.id
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
    cidr_blocks = ["0.0.0.0/0"]
  }
  #######################################
  # allow server to access DB and redis
  #######################################
  egress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 6739
    to_port     = 6739
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  #######################################

  ingress {
    from_port       = 8000
    to_port         = 8000
    protocol        = "tcp"
    security_groups = [aws_security_group.lb.id]
  }
}

resource "aws_ecs_service" "server" {
  name             = "${var.prefix}-server"
  cluster          = aws_ecs_cluster.server.name
  task_definition  = aws_ecs_task_definition.server.family
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
    target_group_arn = aws_lb_target_group.server.arn
    container_name   = "server"
    container_port   = 8000
  }
}
