variable "aws_region" {
  description = "AWS region to deploy to"
  type        = string
  default     = "eu-west-2" // London
}

variable "port" {
  description = "Port for server to listen on"
  type        = number
  default     = 8000
}

variable "environment" {
  description = "Environment to deploy to"
  default     = "staging"
}

variable "environment_variables" {
  description = "Environment variables to set on the server"
  type        = map(string)
  default     = {}
}

variable "db_username" {
  sensitive = false
  type      = string
}

variable "db_url" {
  type = string
}
variable "db_password" {
  sensitive = false
  type      = string
}

variable "image_location" {
  type        = string
  description = "location of docker image"
}

variable "memory" {
  description = "memory for ecs task"
  type        = number
  default     = 512
}

variable "cpu" {
  description = "value for cpu for ecs task"
  type        = number
  default     = 512
}

variable "prefix" {
  default = "pulse"
}

variable "session_secret" {
  type        = string
  description = "session secret for server"
}

variable "redis_url" {
  type        = string
  description = "redis url for server"
}

variable "cloudinary_secret" {
  type        = string
  description = "cloudinary secret for server"
}

locals {
  tags = {
    "Terraform" = "true",
    "ManagedBy" = "Terraform"
  }
}
