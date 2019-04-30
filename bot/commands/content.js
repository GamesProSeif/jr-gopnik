let getContent = async (bot, message, id) => {
  try {
    if (!/\d{16,20}/.test(id)) {
      return message.channel.send({embed:{
        title: 'Error',
        description: `Invalid message id \`${id}\``,
        color: bot.config.colors.error
      }});
    }
    else {
      let fetched = await message.channel.messages.fetch(id);
      let content = bot.functions.clean(fetched.content);
      return message.channel.send(content, {code: 'md'});
    }
  } catch (e) {
    console.log(e);
    return message.channel.send({embed:{
      title: 'Error',
      description: `Couldn't fetch message of id \`${id}\``,
      color: bot.config.colors.error
    }});
  }
}

exports.run = async (bot, message, args) => {
  if (!args[0]) {
    message.reply(`what's the id of the message you want the content of?\n\nType \`cancel\` to cancel the command`);
    const filter = m => m.author.id === message.author.id;
    const collector = message.channel.createMessageCollector(filter, {max: 1, time: 10000, errors: ['time']});

    collector.on('end', (collected, reason) => {
      if (reason === 'limit') {
        if (collected.first().content.toUpperCase() === 'CANCEL') {
          return message.channel.send('Cancelled');
        } else {
          getContent(bot, message, collected.first().content);
        }
      } else {
        return message.channel.send({embed:{
          title: 'Error',
          description: `Didn't get any response after 10\nEnded command`,
          color: bot.config.colors.error
        }});
      }
    });
  } else {
    getContent(bot, message, args.join(' '));
  }
}

exports.desc = 'Gets the pure content of a message in the current channel';
exports.usage = '<message-id>';
