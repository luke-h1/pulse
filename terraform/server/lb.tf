resource "aws_lb" "server" {
  name               = "${var.prefix}-server"
  load_balancer_type = "application"
  subnets = [
    aws_subnet.public_a.id,
    aws_subnet.public_b.id
  ]
  security_groups = [aws_security_group.lb.id]
}

resource "aws_lb_target_group" "server" {
  name        = "${var.prefix}-server"
  port        = var.port
  protocol    = "HTTP"
  vpc_id      = aws_vpc.server.id
  target_type = "ip"
  health_check {
    path = "/api/graphql"
  }
}

resource "aws_lb_listener" "server" {
  load_balancer_arn = aws_lb.server.arn
  port              = 80
  protocol          = "HTTP"
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.server.arn
  }
}

resource "aws_security_group" "lb" {
  description = "Allow access to ALB"
  name        = "${var.prefix}-lb"
  vpc_id      = aws_vpc.server.id
  ingress {
    protocol    = "tcp"
    from_port   = 80
    to_port     = 80
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    protocol    = "tcp"
    from_port   = 443
    to_port     = 443
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    protocol    = "tcp"
    from_port   = var.port
    to_port     = var.port
    cidr_blocks = ["0.0.0.0/0"]
  }
}
