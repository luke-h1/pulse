SHELL := /bin/bash


.PHONY: help
help:
	@echo "Available targets:"
	@echo "  help:     Show this help"


.PHONY: init
init:
	@echo "Initializing..."
	cd terraform/server && terraform init
	cd terraform/admin && terraform init
	cd terraform/frontend && terraform init

.PHONY: fmt
fmt:
	@echo "Formatting code..."
	cd terraform && terraform fmt -recursive

.PHONY: validate
validate:
	@echo "Validating..."
	cd terraform/server && terraform validate
	cd terraform/admin && terraform validate
	cd terraform/frontend && terraform validate	

.PHONY: plan
plan:
	@echo "Planning..."
	cd terraform/server && terraform plan
	cd terraform/admin && terraform plan
	cd terraform/frontend && terraform plan

.PHONY: apply
apply:
	@echo "Applying..."
	cd terraform/server && terraform apply -auto-approve
	cd terraform/admin && terraform apply -auto-approve
	cd terraform/frontend && terraform apply -auto-approve
