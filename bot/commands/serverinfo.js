const { RichEmbed } = require('discord.js');

exports.run = (bot, message, args) => {
  let guild = message.guild;

  let cChannel = guild.channels.filter(c => c.type == 'category').size;
  let tChannel = guild.channels.filter(c => c.type == 'text').size;
  let vChannel = guild.channels.filter(c => c.type == 'voice').size;
  let totalChannels = cChannel + tChannel + vChannel;

  let users = guild.members.filter(m => !m.user.bot).size;
  let bots = guild.members.filter(m => m.user.bot).size;
  let totalMembers = users + bots;

  let dDate = guild.createdAt;
  let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Sep', 'Aug', 'Oct', 'Nov', 'Dec'];

  const embed = new RichEmbed()
    .setColor(bot.config.colors.info)
    .setThumbnail(guild.iconURL)
    .addField('Name', guild.name, true)
    .addField('Owner', guild.owner, true)
    .addField('Created At', `${dDate.getUTCDate()} ${days[dDate.getUTCDay()]} ${months[dDate.getUTCMonth()]} ${dDate.getFullYear()}`, false)
    .addField('Channels', `Category: ${cChannel}\nText: ${tChannel}\nVoice: ${vChannel}\nTotal: ${totalChannels}`, true)
    .addField('Members', `Users: ${users}\nBots: ${bots}\nTotal: ${totalMembers}`, true)
    .addField('Roles', guild.roles.array().join(' '), true);

  message.channel.send({embed});
}

exports.desc = 'Gets information about the server';
exports.aliases = ['si'];
