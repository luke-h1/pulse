variable "aws_region" {
  description = "AWS region to deploy to"
  type        = string
  default     = "eu-west-2" // London
}

variable "port" {
  description = "Port for frontend to listen on"
  type        = number
  default     = 8000
}

variable "environment" {
  description = "Environment to deploy to"
  default     = "staging"
}

variable "public_url" {
  type        = string
  description = "public url of frontend"
}

variable "public_pulse_api_url" {
  type        = string
  description = "url for pulse api"
}

variable "public_cloudinary_name" {
  type        = string
  description = "cloudinary name"
}

variable "public_cloudinary_key" {
  type        = string
  description = "cloudinary key"
}

variable "public_cloudinary_cloud_name" {
  type        = string
  description = "cloudinary cloud name"
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
  type    = string
}


locals {
  tags = {
    "Terraform" = "true",
    "ManagedBy" = "Terraform"
  }
}
