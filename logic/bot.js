const {Telegraf} = require('telegraf')
const Stage = require('telegraf/stage')
const dynamoDB = require('../data/dynamodb')
const storage = require('../data/s3')
const Scene = require('telegraf/scenes/base')
const axios = require("axios")

const receivePhoto = new Scene('receivePhoto')
const stage = new Stage()
stage.register(receivePhoto)

const bot = new Telegraf(process.env.bot_token)
bot.use(dynamoDB.dynamoDBSession.middleware())
bot.use(stage.middleware())

bot.start(async (ctx) => {
    await ctx.scene.enter('receivePhoto')

    return ctx.reply("Привет " + ctx.from.first_name + "! Жду фото.")
});

receivePhoto.on('text', async (ctx) => {
    return ctx.reply("Пришли фото.")
});

receivePhoto.on('photo', async (ctx) => {
    const photos = ctx.update.message.photo;
    const url = await ctx.telegram.getFileLink(photos[photos.length - 1].file_id)
    const response = await axios.get(url, {responseType: 'arraybuffer'})
    await storage.uploadFile(ctx.update.update_id, Buffer.from(response.data, 'binary'))
    await ctx.replyWithSticker("CAACAgIAAxkBAAFaqzhhiFToTV4gjF8r7LJ_AbSlGUb9CQACdQ0AAtqtcUhc9I4lcIxheiIE")
})

module.exports = {
    bot
}


