const Discord = require('discord.js');
const covid = require('covid19-api');
const bot = new Discord.Client({
	partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
const config = require('./settings.json');
const { loadCommands } = require('./utils/loadCommands');
const DisTube = require('distube')

bot.distube = new DisTube(bot, { searchSongs: false, emitNewSongOnly: true });
bot.distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `Грає \`${song.name}\` - \`${song.formattedDuration}\`\nВід: ${song.user}`
	))
	.on("addSong", (message, queue, song) => message.channel.send(
        `Додано ${song.name} - \`${song.formattedDuration}\` в чергу ${song.user}`
    ))

bot.on('message', message => {
 if (message.content === '!bitcoin') {

 message.channel.send('https://coinmarketcap.com/currencies/bitcoin/');
  }
});




bot.on('message', message => {
 if (message.content === `!server`) {
 console.log(message.content, message.author);
 message.channel.send(`Сервер: ${message.guild.name}\nУчасників: ${message.guild.memberCount}`);
  }
});

require('./utils/loadEvents')(bot);

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

loadCommands(bot);

bot.login(config.token);
