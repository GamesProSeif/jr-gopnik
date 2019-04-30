exports.run = (bot, message, args) => {
  let oldtime = message.createdTimestamp;
  message.channel.send('Pinging...')
    .then(sent => {
      newtime = sent.createdTimestamp;
      sent.edit({
        content: '',
        embed: {
          title: 'Ping',
          description: `⏰ ${parseInt(newtime - oldtime)} ms\n💓 ${parseInt(bot.ws.ping)} ms`,
          color: bot.config.colors.info
        }
      });
    });
}

exports.desc = 'Pings the bot';
exports.aliases = ['pong', 'p'];
