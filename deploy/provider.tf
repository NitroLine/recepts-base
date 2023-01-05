terraform {
  required_providers {
    yandex = {
      source = "yandex-cloud/yandex"
    }
  }
}

provider "yandex" {
  token  =  "AQAAAAAO56deAATuwbqwtrVapEMKgXCCm8JedqA"
  cloud_id  = local.cloud_id
  folder_id = local.folder_id
  zone      = local.zone
}


locals {
  cloud_id  = "b1g2s4sv2rqkol4efgqc"
  folder_id = "b1gfdphr5fkt337ltrbn"
  zone      = "ru-central1-a"
}