variable "yc_token" {
  type = string
  sensitive = true
  description = "Token for Yandex Cloud accessing"
}

variable "yc_cloud_id" {
  type = string
  sensitive = true
  description = "Cloud id for deploying"
}

variable "yc_folder_id" {
  type = string
  sensitive = true
  description = "Folder id for deploying"
}
variable "dynamodb_table" {
  type = string
  sensitive = true
  description = "Folder id for deploying"
}
variable "bot_token" {
  type = string
  sensitive = true
  description = "Folder id for deploying"
}
variable "queue_id" {
  type = string
  sensitive = true
  description = "Folder id for deploying"
}
variable "service_account_id" {
  type = string
  sensitive = true
  description = "Folder id for deploying"
}
variable "api_key" {
  type = string
  sensitive = true
  description = "Folder id for deploying"
}
variable "queue_name" {
  type = string
  sensitive = true
  description = "Folder id for deploying"
}


variable "telegram_handler_function" {
  type = object({
    name = string
  })

  description = "Properties for image handler cloud function"
}

variable "s3_config" {
  type = object({
    endpoint = string
    bucket = string
    region = string
    key = string
    access_key = string
    secret_key = string
  })
  description = "Props for accessing S3 bucket where code and images will be saved"
}