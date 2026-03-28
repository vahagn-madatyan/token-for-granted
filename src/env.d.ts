// Extend the generated Cloudflare env types with runtime secrets
// (secrets are set via `wrangler secret put` and don't appear in wrangler.jsonc)
declare namespace Cloudflare {
  interface Env {
    AI_GATEWAY_TOKEN: string
    CLOUDFLARE_ACCOUNT_ID: string
  }
}
