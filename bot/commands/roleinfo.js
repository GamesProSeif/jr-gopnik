const { RichEmbed, Permissions } = require('discord.js');

exports.run = (bot, message, args) => {
  let role;

  if (!args[0]) {
    return message.channel.send({embed:{
      title: 'Error',
      description: 'No role specified',
      color: bot.config.colors.error
    }});
  }
  else {
    role = message.mentions.roles.first() || message.guild.roles.get(args.join(' ')) || message.guild.roles.find(r => r.name.toUpperCase() == args.join(' ').toUpperCase());

    if (!role) {
      return message.channel.send({embed:{
        title: 'Error',
        description: `Couldn't find role \`${args.join(' ')}\``,
        color: bot.config.colors.error
      }});
    }

    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Sep', 'Aug', 'Oct', 'Nov', 'Dec'];

    let dDate = role.createdAt;
    let perms = new Permissions(role.permissions).toArray();
    perms = perms.map(p => p.split('_').map(w => bot.functions.capitalize(w)).join(' ')).join(', ');

    const embed = new RichEmbed()
      .setColor(bot.config.colors.info)
      .addField('Name', role.name, true)
      .addField('ID', role.id, true)
      .addField('Position (from bottom)', role.position, true)
      .addField('Color', role.hexColor.toUpperCase(), true)
      .addField('Created At', `${dDate.getUTCDate()} ${days[dDate.getUTCDay()]} ${months[dDate.getUTCMonth()]} ${dDate.getFullYear()}`, true)
      .addField('Hoist? (separated)', role.hoist ? 'Yes' : 'No', true)
      .addField('Mentionable?', role.mentionable ? 'Yes' : 'No', true)
      .addField('Members', role.members.map(m => m.displayName).join(', '), true)
      .addField('Permissions', perms, false);

      message.channel.send({embed});
  }
}

exports.desc = 'Gets information about a role';

exports.usage = '<rolename|id|mention>';

exports.aliases = ['role-info', 'ri'];
exports.guildOnly = true;
