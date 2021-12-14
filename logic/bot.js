const {Telegraf} = require('telegraf')
const Stage = require('telegraf/stage')
const dynamoDB = require('../data/dynamodb')
const Scene = require('telegraf/scenes/base')
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
    await ctx.replyWithSticker("CAACAgIAAxkBAAFaqzhhiFToTV4gjF8r7LJ_AbSlGUb9CQACdQ0AAtqtcUhc9I4lcIxheiIE")
})

module.exports = {
    bot
}


