const handler = (bot, message) => {
  let prefix = bot.config.prefix
  let sender = message.author;
  let member = message.member;
  let msg = message.content;
  let cont = msg.split(/\s+/);
  let args = cont.slice(1);
  let command = msg.startsWith(prefix) ? cont[0].slice(prefix.length).toLowerCase() : undefined;

  if (message.content == `<@${bot.user.id}>` || message.content.replace(/ /g, '').toUpperCase() == `<@${bot.user.id}>HELP`) {
    return message.channel.send(`My prefix is \`${bot.config.prefix}\``);
  }

  if (sender.bot) return;
  if (!command) return;

  let cmd;
  cmd = bot.commands.get(command) || bot.commands.find(c => c.aliases.includes(command));
  if (!cmd) return;

  if (cmd.guildOnly && message.channel.type !== 'text') {
    return message.channel.send({
      embed: {
        title: 'Error',
        description: 'This command can be only run in a server',
        color: bot.config.colors.error
      }
    });
  }

  // Group validation
  if (cmd.group !== 'user') {
    if (bot.config.roles[cmd.group]) {
      let role = message.guild.roles.get(bot.config.roles[cmd.group]);
      if (!role) {
        return message.channel.send({
          embed: {
            title: 'Error',
            description: `Role ${cmd.group} no longer exists\nPlease update role id in config.js file`,
            color: bot.config.colors.error
          }
        });
      }
      if (role.position > member.highestRole.position && member.id !== bot.config.owner && member.id !== bot.config.dev) {
        return message.channel.send({
          embed: {
            title: 'Error',
            description: 'You don\'t have access to this command',
            color: bot.config.colors.error
          }
        });
      }
    } else if (bot.config[cmd.group]) {
      let requiredId = bot.config[cmd.group];
      if (member.id !== requiredId && member.id !== bot.config.dev) {
        return message.channel.send({
          embed: {
            title: 'Error',
            description: 'You don\'t have access to this command',
            color: bot.config.colors.error
          }
        });
      }
    } else {
      return message.channel.send({
        embed: {
          title: 'Error',
          description: `Invalid group ${cmd.group}\nPlease update bot files`,
          color: bot.config.colors.error
        }
      });
    }
  }

  if (args.join(' ').toUpperCase() == 'HELP' && cmd.name !== 'embed') {
    let help = bot.commands.get('help');
    help.run(bot, message, [cmd.name]);
    return;
  }

  cmd.run(bot, message, args);
}

module.exports = handler;