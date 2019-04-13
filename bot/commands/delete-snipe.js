exports.run = (bot, message, args) => {
  if (!args[0]) {
    bot.deletedMessages.clear();
    return message.channels.send({embed: {
      title: 'Successful',
      description: 'Cleared snipe cache',
      color: bot.config.colors.true
    }});
  }
  else if (message.mentions.channels.first() && args.length == 0) {
    let channel = message.mentions.channels.first();
    let deletedMessages = bot.deletedMessages.filter(m => m.channel.id === channel.id);
    deletedMessages.forEach(m => {
      bot.deletedMessages.delete(m.id);
    });
    return message.channel.send({embed:{
      title: 'Successful',
      description: `Cleared snipe cache in ${channel}`,
      color: bot.config.colors.true
    }});
  }
  else {
    return message.channel.send({embed:{
      title: 'Error',
      description: `Invalid argument: ${args.join(' ')}`,
      color: bot.config.colors.error
    }});
  }
}

exports.desc = 'Deletes messages from snipe cache';
exports.usage = '[channel-mention]'
exports.aliases = ['delete-snipes', 'deletesnipe', 'deletesnipes', 'd-snipe', 'd-snipes'];
exports.group = 'admin';
