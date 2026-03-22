terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5.0"
    }
  }
  required_version = ">= 1.0"
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

variable "cloudflare_api_token" {
  description = "Cloudflare API token with Workers/D1/KV/R2 permissions"
  type        = string
  sensitive   = true
}

variable "cloudflare_account_id" {
  description = "Cloudflare account ID"
  type        = string
}

# -----------------------------------------------------
# D1 Database
# -----------------------------------------------------
resource "cloudflare_d1_database" "token_db" {
  account_id = var.cloudflare_account_id
  name       = "token-for-granted-db"
}

# -----------------------------------------------------
# KV Namespace
# -----------------------------------------------------
resource "cloudflare_workers_kv_namespace" "token_kv" {
  account_id = var.cloudflare_account_id
  title      = "token-for-granted-KV"
}

# -----------------------------------------------------
# R2 Bucket
# -----------------------------------------------------
resource "cloudflare_r2_bucket" "token_assets" {
  account_id = var.cloudflare_account_id
  name       = "token-for-granted-assets"
}

# -----------------------------------------------------
# Outputs — use these to update wrangler.jsonc
# -----------------------------------------------------
output "d1_database_id" {
  description = "D1 database ID for wrangler.jsonc"
  value       = cloudflare_d1_database.token_db.id
}

output "kv_namespace_id" {
  description = "KV namespace ID for wrangler.jsonc"
  value       = cloudflare_workers_kv_namespace.token_kv.id
}

output "r2_bucket_name" {
  description = "R2 bucket name"
  value       = cloudflare_r2_bucket.token_assets.name
}

output "wrangler_update_instructions" {
  description = "Copy-paste instructions for wrangler.jsonc"
  value       = <<-EOT
    Update wrangler.jsonc with these values:
    - d1_databases[0].database_id = "${cloudflare_d1_database.token_db.id}"
    - kv_namespaces[0].id = "${cloudflare_workers_kv_namespace.token_kv.id}"
  EOT
}
