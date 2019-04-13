exports.run = (bot, message, args) => {
  if (!args[0]) {
    return message.channel.send({
      embed: {
        title: 'Error',
        description: 'No role was specified',
        color: bot.config.colors.error
      }
    });
  }

  let role = message.guild.roles.find(r => r.name === args.join(' '));
  if (!role) {
    return message.channel.send({
      embed: {
        title: 'Error',
        description: `Couldn't find a role named ${args.join(' ')}`,
        color: bot.config.colors.error
      }
    });
  }
  message.channel.send({
    embed: {
      title: 'Found Role',
      description: `**Name**: ${role.name}\n**ID**: \`${role.id}\``,
      color: bot.config.colors.true
    }
  });
}

exports.desc = 'Gets the id of a role';
exports.group = 'dev';
exports.usage = '<rolename>';
exports.guildOnly = true;