const {handleNewPhoto} = require('../logic/mustachenizer');


module.exports.eventHandler = async event => {
    try {
        const message = JSON.parse(event.messages[0].details.message.body);
        console.log("Got new message from queue: %s", event.messages[0].details.message.body)
        await handleNewPhoto(message.chatId, message.fileUrl)
    } catch (err ) {
        console.log("Error: ", err)
    }
}