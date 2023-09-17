variable "aws_region" {
  description = "AWS region to deploy to"
  type        = string
  default     = "eu-west-2" // London
}

variable "port" {
  description = "Port for server to listen on"
  type        = number
  default     = 8080
}

variable "environment" {
  description = "Environment to deploy to"
  enum        = ["staging", "production"]
  default     = "staging"
}

variable "environment_variables" {
  description = "Environment variables to set on the server"
  type        = map(string)
  default     = {}
}
