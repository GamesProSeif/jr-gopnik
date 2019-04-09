const { RichEmbed } = require('discord.js');

exports.run = (bot, message, args) => {
  if (!args[0]) {
    let name = message.channel.name.toUpperCase();
    if (name == 'NSFW' || name == 'HOT-GUYS' || NAME == 'HOT-GIRLS') {
      return message.channel.send('I dont\'t work for dirty people smh');
    }

    let channelMessages = bot.deletedMessages.filter(m => m.channel.id === message.channel.id);
    if (channelMessages.size == 0) {
      return message.channel.send({embed:{
        title: 'Error',
        description: `No message found in ${message.channel.toString()}`,
        color: bot.config.colors.error
      }});
    }
    let deletedMessage = channelMessages.last();
    let embed = new RichEmbed()
      .setColor(bot.config.colors.info)
      .setAuthor(deletedMessage.author.tag, deletedMessage.author.avatarURL)
      .setTimestamp(deletedMessage.createdTimestamp);

    if (deletedMessage.content) {
      embed.setDescription(deletedMessage.content)
    }
    if (deletedMessage.attachments.first()) {
      let files = deletedMessage.attachments.map(att => att.proxyURL)
      embed.attachFiles(files);
    }
    message.channel.send(embed);
  }
  else if (message.mentions.channels.first() && args.length == 1) {
    let name = message.mentions.channels.first().name.toUpperCase();
    if (name == 'NSFW' || name == 'HOT-GUYS' || NAME == 'HOT-GIRLS') {
      return message.channel.send('I dont\'t work for dirty people smh');
    }
    let channelId = message.mentions.channels.first().id;
    let channelMessages = bot.deletedMessages.filter(m => m.channel.id === channelId);
    if (channelMessages.size == 0) {
      return message.channel.send({embed:{
        title: 'Error',
        description: `No message found in ${message.mentions.channels.first().toString()}`,
        color: bot.config.colors.error
      }});
    }
    let deletedMessage = channelMessages.last();

    let embed = new RichEmbed()
      .setColor(bot.config.colors.info)
      .setAuthor(deletedMessage.author.tag, deletedMessage.author.avatarURL)
      .setTimestamp(deletedMessage.createdTimestamp);

    if (deletedMessage.content) {
      embed.setDescription(deletedMessage.content)
    }
    if (deletedMessage.attachments.first()) {
      let files = deletedMessage.attachments.map(att => att.proxyURL)
      embed.attachFiles(files);
    }
    message.channel.send(embed);
  }
  else if (!isNaN(args.join(' '))) {
    let name = message.channel.name.toUpperCase();
    if (name == 'NSFW' || name == 'HOT-GUYS' || NAME == 'HOT-GIRLS') {
      return message.channel.send('I dont\'t work for dirty people smh');
    }
    let num = args.join(' ');
    if (!Number.isInteger(parseFloat(num)) || parseInt(num) < 1) {
      return message.channel.send({embed:{
        title: 'Error',
        description: `Invalid argument: ${args.join(' ')}`,
        color: bot.config.colors.error
      }});
    }
    num = parseInt(num);
    if (num > 10) {
      return message.channel.send({embed:{
        title: 'Error',
        description: 'Maximum message position is 10',
        color: bot.config.colors.error
      }});
    }
    let channelMessages = bot.deletedMessages.filter(m => m.channel.id === message.channel.id);
    if (channelMessages.size == 0) {
      return message.channel.send({embed:{
        title: 'Error',
        description: `No message found in ${message.channel.toString()}`,
        color: bot.config.colors.error
      }});
    }
    if (num > channelMessages.size) {
      return message.channel.send({embed:{
        title: 'Error',
        description: `Current number of cached deleted messages is ${channelMessages.size}`,
        color: bot.config.colors.error
      }});
    }
    let arr = channelMessages.array();
    let deletedMessage = arr[channelMessages.size - num];
    let embed = new RichEmbed()
      .setColor(bot.config.colors.info)
      .setAuthor(deletedMessage.author.tag, deletedMessage.author.avatarURL)
      .setTimestamp(deletedMessage.createdTimestamp);

    if (deletedMessage.content) {
      embed.setDescription(deletedMessage.content)
    }
    if (deletedMessage.attachments.first()) {
      let files = deletedMessage.attachments.map(att => att.proxyURL)
      embed.attachFiles(files);
    }
    message.channel.send(embed);
  }
  else {
    message.channel.send({embed:{
      title: 'Error',
      description: `Invalid argument: ${args.join(' ')}`,
      color: bot.config.colors.error
    }});
  }
}

exports.desc = 'Gets deleted message (message-position only works in the current channel)';
exports.usage = '[ChannelMention | MessagePosition]'
exports.guildOnly = true;
