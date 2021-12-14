resource "yandex_function" "telegram_handler" {
  name = "telegram-handler"
  runtime = "nodejs12"
  entrypoint = "api/telegram.eventHandler"
  memory = "128"
  description = "Handle incoming messages from telegram"
  execution_timeout = "15"
  environment = {
    "bot_token": var.bot_token
  }
  user_hash = filesha256(data.archive_file.code_archive.output_path)
  content {
    zip_filename = data.archive_file.code_archive.output_path
  }
}

output "yandex_function_webhook_setter_id" {
  value = yandex_function.telegram_handler.id
}