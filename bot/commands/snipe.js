const { MessageEmbed } = require('discord.js');

const genError = (bot, args) => {
  return {
    title: 'Error',
    description: `Invalid argument: ${args.join(' ')}`,
    color: bot.config.colors.error
  }
}

const getSniped = (bot, channel, position) => {
  position = position ? position : 1;
  let cname = channel.name.toUpperCase();
  if (cname == 'NSFW' || cname == 'HOT-GUYS' || cname == 'HOT-GIRLS') {
    return {
      title: 'Error',
      description: 'I don\'t work for dirty people smh',
      color: bot.config.colors.error
    }
  }
  if (!Number.isInteger(parseFloat(position)) || parseInt(position) < 1) {
    return {
      title: 'Error',
      description: `Invalid argument: ${args.join(' ')}`,
      color: bot.config.colors.error
    }
  }
  position = parseInt(position);
  if (position > 10) {
    return {
      title: 'Error',
      description: 'Maximum message position is 10',
      color: bot.config.colors.error
    }
  }
  let channelMessages = bot.deletedMessages.filter(m => m.channel.id === channel.id);
  if (channelMessages.size == 0) {
    return {
      title: 'Error',
      description: `No message found in ${channel}`,
      color: bot.config.colors.error
    }
  }
  if (position > channelMessages.size) {
    return {
      title: 'Error',
      description: `Current number of cached deleted messages in ${channel} is ${channelMessages.size}`,
      color: bot.config.colors.error
    }
  }
  let arr = channelMessages.array();
  let deletedMessage = arr[arr.length - position];

  let embed = new MessageEmbed()
    .setColor(bot.config.colors.info)
    .setAuthor(deletedMessage.author.tag, deletedMessage.author.avatarURL())
    .setTimestamp(deletedMessage.createdTimestamp);

  if (deletedMessage.content) {
    embed.setDescription(deletedMessage.content);
  }
  if (deletedMessage.attachments.first()) {
    let files = deletedMessage.attachments.map(att => att.proxyURL);
    embed.attachFiles(files);
  }

  return embed;
}

exports.run = (bot, message, args) => {
  if (!args[0]) {
    let embed = getSniped(bot, message.channel);
    return message.channel.send({embed});
  }
  else if (message.mentions.channels.first() && args.length == 1) {
    let channel = message.mentions.channels.first();
    let embed = getSniped(bot, channel);
    return message.channel.send({embed});
  }
  else if (message.mentions.channels.first() && !isNaN(args.slice(1).join(' '))) {
    let channel = message.mentions.channels.first();
    let position = parseFloat(args[1]);
    let embed = getSniped(bot, channel, position);
    return message.channel.send({embed});
  }
  else if (!isNaN(args.join(' '))) {
    let position = parseFloat(args[0]);
    let embed = getSniped(bot, message.channel, position);
    return message.channel.send({embed});
  }
  else {
    return message.channel.send({embed: genError(bot, args)});
  }
}

exports.desc = 'Gets deleted message';
exports.usage = '[ChannelMention [position] | position]';
exports.guildOnly = true;
exports.examples = [
  '',
  '3',
  '#General',
  '#General 3'
];
