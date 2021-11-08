resource "yandex_ydb_database_serverless" "database1" {
  name      = var.dynamodb_table
  folder_id = var.yc_folder_id
}

output "yandex_ydb_database_serverless_id" {
  value = yandex_ydb_database_serverless.database1.id
}