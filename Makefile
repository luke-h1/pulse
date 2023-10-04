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
fmt: fmt-server fmt-admin fmt-frontend

.PHONY: fmt-server
fmt-server:
	@echo "Formatting server tf..."
	cd terraform && terraform fmt server

.PHONY: fmt-admin
fmt-admin:
	@echo "Formatting admin tf..."
	cd terraform && terraform fmt admin

.PHONY: fmt-frontend
fmt-frontend:
	@echo "Formatting frontend tf..."
	cd terraform && terraform fmt frontend

.PHONY: validate-admin
validate:
	@echo "Validating admin tf..."
	cd terraform/admin && terraform validate

.PHONY: validate-server
validate-server:
	@echo "Validating server tf..."
	cd terraform/server && terraform validate

.PHONY: validate-frontend
validate-frontend:
	@echo "Validating frontend tf..."
	cd terraform/frontend && terraform validate

.PHONY: plan-frontend
plan-frontend:
	@echo "Planning frontend tf..."
	cd terraform/frontend && terraform plan

.PHONY: plan-server
plan-server:
	@echo "Planning server tf..."
	cd terraform/server && terraform plan

.PHONY: plan-admin
plan-admin:
	@echo "Planning admin tf..."
	cd terraform/admin && terraform plan

.PHONY: apply-server
apply-server:
	@echo "Applying server tf..."
	cd terraform/server && terraform apply -auto-approve

.PHONY: apply-admin
apply-admin:
	@echo "Applying admin tf..."
	cd terraform/admin && terraform apply -auto-approve

.PHONY: apply-frontend
apply-frontend:
	@echo "Applying frontend tf..."
	cd terraform/frontend && terraform apply -auto-approve
