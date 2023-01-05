locals {
  website_gateway_name = "receipt-frontend-gateway"
}

resource "yandex_api_gateway" "receipt_frontend_gateway" {
  name      = local.website_gateway_name
  folder_id = local.folder_id
  spec      = file("api_for_front.yaml")
}

output "receipt_frontend_gateway_domain" {
  value = "https://${yandex_api_gateway.receipt_frontend_gateway.domain}"
}