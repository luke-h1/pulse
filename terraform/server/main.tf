terraform {
  required_version = "1.6.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.19.0"
    }

  }
  backend "s3" {
    bucket  = "pulse-lukeh1-tf-state"
    key     = "server/terraform.tfstate"
    region  = "eu-west-2"
    encrypt = true
  }
}

provider "aws" {
  region = var.aws_region
}
