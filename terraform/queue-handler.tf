resource "yandex_function_trigger" "queue_trigger" {
  name        = "queuetrigger"
  description = "triggers when receives messages"
  message_queue {
    queue_id = "yrn:yc:ymq:${var.s3_config.region}:${var.yc_folder_id}:${var.queue_name}"
    batch_cutoff = "3"
    batch_size = "1"
    service_account_id = var.service_account_id
  }
  function {
    id = yandex_function.queue_handler.id
  }
}

resource "yandex_function" "queue_handler" {
  name = "queue-handler"
  runtime = "nodejs12"
  entrypoint = "api/queue.eventHandler"
  memory = "256"
  description = "Handle incoming messages from queue"
  execution_timeout = "15"
  environment = {
    "AWS_ACCESS_KEY_ID": var.s3_config.access_key,
    "AWS_SECRET_ACCESS_KEY": var.s3_config.secret_key,
    "BUCKET_ID": var.s3_config.bucket,
    "bot_token": var.bot_token,
    "dynamodb_table": var.dynamodb_table,
    "region": var.s3_config.region,
    "db_id": yandex_ydb_database_serverless.database1.id,
    "cloud_id": var.yc_cloud_id,
    "queue_id": var.queue_id,
    "queue_name": var.queue_name,
    "folder_id": var.yc_folder_id,
    "api_key" : var.api_key
  }
  user_hash = filesha256(data.archive_file.code_archive.output_path)
  content {
    zip_filename = data.archive_file.code_archive.output_path
  }
}

output "yandex_function_queue_handler_id" {
  value = yandex_function.queue_handler.id
}