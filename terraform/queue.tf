resource "yandex_message_queue" "faceMaskQueue" {
  name                        = "face-mask-queue"
  visibility_timeout_seconds  = 600
  receive_wait_time_seconds   = 20
  message_retention_seconds   = 1209600
  access_key = var.s3_config.access_key
  secret_key = var.s3_config.secret_key
}


output "yandex_queue_serverless_id" {
  value = yandex_message_queue.faceMaskQueue.id
}
