module.exports.run = async (bot, message, args) => {
    if (!message.member.voice.channel) return message.channel.send('Ви повинні бути в голосовому каналі!');

    let queue = await bot.distube.getQueue(message);

    if(queue) {
        bot.distube.stop(message)

        message.channel.send('Окей!')
    } else if (!queue) {
        return
    };
}

module.exports.config = {
    name: "stop",
    aliases: []
}
