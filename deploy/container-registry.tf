resource "yandex_container_registry" "default" {
  name      = "default"
  folder_id = local.folder_id
}

resource "yandex_container_repository" "receipt-api_repository" {
  name = "${yandex_container_registry.default.id}/receipt-api"
}

output "receipt-api_repository_name" {
  value = "cr.yandex/${yandex_container_repository.receipt-api_repository.name}"
}