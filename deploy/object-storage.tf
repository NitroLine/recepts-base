locals {
  website_bucket_name_prefix = "receipt-website"
}

resource "yandex_storage_bucket" "receipt_frontend_bucket" {
  bucket     = "${local.website_bucket_name_prefix}-${local.folder_id}"
  access_key = yandex_iam_service_account_static_access_key.receipt_api_sa_static_key.access_key
  secret_key = yandex_iam_service_account_static_access_key.receipt_api_sa_static_key.secret_key
}

output "receipt_frontend_website_bucket" {
  value = yandex_storage_bucket.receipt_frontend_bucket.bucket
}