terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
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
# AI Gateway (no native TF resource — use API directly)
# -----------------------------------------------------
resource "terraform_data" "ai_gateway" {
  depends_on = [cloudflare_d1_database.token_db]

  provisioner "local-exec" {
    command = <<-EOT
      curl -s -X POST \
        "https://api.cloudflare.com/client/v4/accounts/${var.cloudflare_account_id}/ai-gateway/gateways" \
        -H "Authorization: Bearer ${var.cloudflare_api_token}" \
        -H "Content-Type: application/json" \
        -d '{"id":"token-for-granted-gateway","name":"token-for-granted-gateway"}' \
        | python3 -c "import sys,json; r=json.load(sys.stdin); print('AI Gateway created' if r.get('success') else f'Note: {r}')"
    EOT
  }
}

# -----------------------------------------------------
# D1 Migrations (run after database creation)
# -----------------------------------------------------
resource "terraform_data" "d1_migrations" {
  depends_on = [cloudflare_d1_database.token_db]

  provisioner "local-exec" {
    working_dir = "${path.module}/.."
    command     = "npx wrangler d1 migrations apply token-for-granted-db --remote"
    environment = {
      CLOUDFLARE_API_TOKEN  = var.cloudflare_api_token
      CLOUDFLARE_ACCOUNT_ID = var.cloudflare_account_id
    }
  }
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

output "wrangler_update_instructions" {
  description = "Copy-paste instructions for wrangler.jsonc"
  value       = <<-EOT
    Update wrangler.jsonc with these values:
    - d1_databases[0].database_id = "${cloudflare_d1_database.token_db.id}"
    - kv_namespaces[0].id = "${cloudflare_workers_kv_namespace.token_kv.id}"
  EOT
}
