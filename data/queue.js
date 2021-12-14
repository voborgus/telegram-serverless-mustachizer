const AWS = require('aws-sdk')
AWS.config.update({region: process.env.region});

const sqs = new AWS.SQS({apiVersion: '2012-11-05'})

let queueUrl = `https://message-queue.api.cloud.yandex.net/${process.env.cloud_id}/${process.env.queue_id}/${process.env.queue_name}`
if (process.env.IS_OFFLINE) {
    queueUrl = 'http://localhost:9324/queue/default'
}
function sendMessage(message) {
    return new Promise(resolve => {
        sqs.sendMessage(generateParams(message), function (err, data) {
            if (err) {
                console.log("Error", err)
                resolve(null)
            } else {
                console.log("Success", data.MessageId)
                resolve(data)
            }
        });
    });
}

function generateParams(message) {
    return {
        DelaySeconds: 10,
        MessageBody: message,
        QueueUrl: queueUrl
    }
}

module.exports = {
    sendMessage
}