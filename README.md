# Telegram Serverless Mustachizer
Telegram Bot puts mustache on any face what he sees.

## How It Works

Perfectly.

## Under the hood

* Serverless flows on JS
* State storage with DynamoDB
* [Serverless Framework](https://www.serverless.com/framework/docs/getting-started/)
* [Telegraf Bot Framework](https://telegraf.js.org/)

## How to install

### Get all credentials needed

+ Create a [Telegram bot](https://core.telegram.org/bots#3-how-do-i-create-a-bot) using [@BotFather](https://telegram.me/BotFather).

## Yandex Cloud Installation

* Install Terraform and terraform yandex provider.
* Fill all variables needed for deploy and create `terraform.tfvars` file. (use `terraform.tfvars.template`)
* Apply terraform scripts with `terraform apply`
* Create table in YDB using scripts in `terraform/create-table` folder.
  Before run fill `ENDPOINT` env variable with YDB document API endpoint. (use UI for that)
* Make the function public in the Yandex Cloud UI
* Set webhook in the telegram pointing to the function URL.
```sh
curl -X POST https://api.telegram.org/bot<BOT SECRET>/setWebhook?url=https://functions.yandexcloud.net/<FUNCTION ID>
```
* Profit

## AWS Installation

+ Install the Serverless Framework
```
npm install -g serverless
```

+ Install the required plugins
```
npm install
```

+ Add the token received from telegram to `.env.yml` file
+ Deploy the application to dev environment (remove `stage` parameter for prod).
```
serverless deploy --stage dev
```

+ Using `setWebhook` URL the configuration, register the webhook on Telegram
```
curl -X POST https://<api_endpoint_url>/prod/setWebhook
```

## Usage
Now you can `/start` a conversation with the bot.

## Removal
+ To delete the project from AWS.
```
serverless remove
```

## Local testing

Fill `.env` file with credentials, install Serverless and Docker. After run `dynamodb-local` and install dependencies:

```bash
docker run -p 8000:8000 --name dynamodb amazon/dynamodb-local -jar DynamoDBLocal.jar -sharedDb
npm install
```

Run DynamoDB migrations:
```bash
sls dynamodb migrate
```

After all, run command:

```bash
sls offline
```

## Queue messages testing

```bash
serverless invoke local --function queueEventHandler --path test/queue/data.json
```