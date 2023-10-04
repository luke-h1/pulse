resource "aws_ecs_cluster" "frontend" {
  name = "${var.prefix}-frontend-cluster"
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

resource "aws_iam_role" "frontend_iam_role" {
  name               = "${var.prefix}-frontend-iam-role"
  assume_role_policy = file("../policies/assume-role-policy.json")
}

resource "aws_cloudwatch_log_group" "ecs_task_logs" {
  name = "${var.prefix}-frontend"
}

data "template_file" "frontend_container_defs" {
  template = file("./container-defs.json.tpl")
  vars = {
    image_location               = var.image_location
    public_pulse_api_url         = var.public_pulse_api_url
    public_cloudinary_cloud_name = var.public_cloudinary_cloud_name
    public_cloudinary_key        = var.public_cloudinary_key
    public_url                   = var.public_url
    aws_log_group                = aws_cloudwatch_log_group.ecs_task_logs.name
    aws_region                   = var.aws_region
  }
}

resource "aws_ecs_task_definition" "frontend" {
  family                   = "${var.prefix}-frontend"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = var.cpu
  memory                   = var.memory
  execution_role_arn       = aws_iam_role.frontend_iam_role.arn
  task_role_arn            = aws_iam_role.frontend_iam_role.arn
}

resource "aws_security_group" "ecs_service" {
  description = "Access for the ecs service"
  name        = "${var.prefix}-ecs-service"
  vpc_id      = aws_vpc.frontend.id
  egress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port       = var.port
    to_port         = var.port
    protocol        = "tcp"
    security_groups = [aws_security_group.lb.id]
  }
}

resource "aws_ecs_service" "frontend" {
  name             = "${var.prefix}-frontend"
  cluster          = aws_ecs_cluster.frontend.name
  task_definition  = aws_ecs_task_definition.frontend.arn
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
    target_group_arn = aws_lb_target_group.frontend.arn
    container_name   = "frontend"
    container_port   = var.port
  }
}
