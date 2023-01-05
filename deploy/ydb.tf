locals {
  database_name = "receipts-database"
}

resource "yandex_ydb_database_serverless" "receipts-database" {
  name      = local.database_name
  folder_id = local.folder_id
}

output "receipts-database_document_api_endpoint" {
  value = yandex_ydb_database_serverless.receipts-database.document_api_endpoint
}

output "receipts-database_path" {
  value = yandex_ydb_database_serverless.receipts-database.database_path
}