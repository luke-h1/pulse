output "db_url" {
  value       = aws_db_instance.db.address
  description = "Address of Postgres DB"
}
