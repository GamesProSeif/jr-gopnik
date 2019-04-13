const { RichEmbed } = require('discord.js');

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

  let perms = member.permissions.toArray();

  perms = perms.map(p => p.split('_').map(w => bot.functions.capitalize(w)).join(' ')).join(', ');

  const embed = new RichEmbed()
    .setColor(bot.config.colors.info)
    .setTitle('Permissions')
    .setAuthor(member.user.tag, member.user.avatarURL)
    .setDescription(perms);

  message.channel.send(embed)
}

exports.desc = 'Get all permissions of a user';
exports.usage = '[username|id|mention]';
exports.aliases = ['permission', 'perms', 'perm'];
exports.guildOnly = true;
exports.examples = [
  'GamesProSeif'
  '@GamesProSeif',
  '252829167320694784'
];
