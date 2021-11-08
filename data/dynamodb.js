const DynamoDBSession = require("telegraf-session-dynamodb")

const endpoint = `https://docapi.serverless.yandexcloud.net/${process.env.region}/${process.env.cloud_id}/${process.env.db_id}`
const dynamoDBSession = new DynamoDBSession({
    dynamoDBConfig: {
        params: {
            TableName: process.env.dynamodb_table
        },
        region: process.env.region,
        endpoint: endpoint
    }
})

module.exports = {
    dynamoDBSession
}
