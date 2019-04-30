const { MessageEmbed } = require('discord.js');

exports.run = (bot, message, args) => {
  let member;
  if (!args[0]) {
    member = message.guild.member(message.author);
  }
  else {
    member = message.mentions.members.first() || message.guild.members.get(args.join(' ')) || message.guild.members.find(m => m.displayName.toUpperCase() == args.join(' ').toUpperCase()) || message.guild.members.find(m => m.user.username.toUpperCase() == args.join(' ').toUpperCase());

    if (!member) return message.channel.send({embed:{
      title: 'Error',
      description: `Couldn't find user \`${args.join(' ')}\``,
      color: bot.config.colors.error
    }});
  }

  let jDate = member.joinedAt;
  let dDate = member.user.createdAt;
  let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Sep', 'Aug', 'Oct', 'Nov', 'Dec'];

  const embed = new MessageEmbed()
    .setColor(bot.config.colors.info)
    .setAuthor(member.user.tag, member.user.avatarURL())
    .setThumbnail(member.user.avatarURL())
    .addField('Username | Nickname', `${member.user.username} | ${member.displayName}`, true)
    .addField('ID', member.id, true)
    .addField('Highest Role', member.roles.highest, false)
    .addField('Joined Server At', `${jDate.getUTCDate()} ${days[jDate.getUTCDay()]} ${months[jDate.getUTCMonth()]} ${jDate.getFullYear()}`, true)
    .addField('Joined Discord At', `${dDate.getUTCDate()} ${days[dDate.getUTCDay()]} ${months[dDate.getUTCMonth()]} ${dDate.getFullYear()}`, true);

  message.channel.send(embed);
}

exports.desc = 'Get information about a user';

exports.usage = '[username|id|mention]';

exports.aliases = ['user-info', 'memberinfo', 'member-info', 'ui'];
exports.guildOnly = true;
exports.examples = [
  'GamesProSeif',
  '\@GamesProSeif',
  '252829167320694784'
];
