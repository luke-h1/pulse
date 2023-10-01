variable "aws_region" {
  description = "AWS region to deploy to"
  type        = string
  default     = "eu-west-2" // London
}

variable "port" {
  description = "Port for admin to listen on"
  type        = number
  default     = 8000
}

variable "environment" {
  description = "Environment to deploy to"
  default     = "staging"
}

variable "image_location" {
  type        = string
  description = "location of docker image"
  default     = "" # TODO: set this
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

variable "public_url" {
  type        = string
  description = "public url of admin"
}

variable "public_pulse_api_url" {
  type        = string
  description = "url for pulse api"
}


locals {
  tags = {
    "Terraform" = "true",
    "ManagedBy" = "Terraform"
  }
}
