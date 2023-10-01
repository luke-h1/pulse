resource "aws_db_subnet_group" "db" {
  name = "${var.prefix}-db"
  subnet_ids = [
    aws_subnet.private_a.id,
    aws_subnet.private_b.id,
  ]
}

resource "aws_security_group" "rds" {
  description = "Allow inbound access to RDS"
  name        = "${var.prefix}-rds-inbound-access"
  vpc_id      = aws_vpc.server.id
  ingress {
    protocol  = "tcp"
    from_port = 5432
    to_port   = 5432
  }
}

resource "aws_db_instance" "db" {
  identifier                  = "${var.prefix}-db"
  allocated_storage           = 20
  storage_type                = "gp2"
  engine                      = "postgres"
  engine_version              = "15.4"
  instance_class              = "db.t3.micro"
  db_subnet_group_name        = aws_db_subnet_group.db.name
  username                    = var.db_username
  password                    = var.db_password
  backup_retention_period     = 7
  multi_az                    = false
  skip_final_snapshot         = true
  vpc_security_group_ids      = [aws_security_group.rds.id]
  allow_major_version_upgrade = false
  db_name                     = "pulse"
}
