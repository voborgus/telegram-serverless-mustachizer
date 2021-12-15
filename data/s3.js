const AWS = require('aws-sdk');
AWS.config.update({region: process.env.region});
const storage = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    endpoint: new AWS.Endpoint("https://storage.yandexcloud.net")
})

function uploadFile(name, file) {
    const params = {
        Key: 'images/' + name + '.jpg',
        Body: file,
        Bucket: process.env.BUCKET_ID
    }
    return new Promise(resolve => {
        storage.upload(params, function(err, data) {
            if (err) {
                throw err
            }
            console.log(`File uploaded successfully. ${data.Location}`)
            return resolve(data.Location)
        })
    })
}

module.exports = {
    uploadFile
}