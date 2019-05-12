const { Collection } = require('discord.js');

const handler = (bot, message) => {
  const prefix = new RegExp(`^(?:${bot.config.prefix}|<@!?${bot.user.id}> ?)`, 'i');
  const msg = message.content;
  if (!msg.match(prefix)) return;
  const args = msg.slice(msg.match(prefix)[0].length).split(/\s+/);
  const command = args.shift().toLowerCase();
  let sender = message.author;
  let member = message.member;

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

  /* cooldown */
  if (!bot.cooldowns.has(cmd.name)) {
    bot.cooldowns.set(cmd.name, new Collection());
  }

  const now = Date.now();
  const timestamps = bot.cooldowns.get(cmd.name);
  const cooldownAmount = (cmd.cooldown) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
  		const timeLeft = (expirationTime - now) / 1000;
  		return message.reply(`please wait \`${timeLeft.toFixed(1)}\` more second(s) before reusing the \`${cmd.name}\` command.`);
  		return message.reply(`chill for ${timeLeft.toFixed(2)}`);
	  }
  }
  if ((message.channel.type !== 'dm' && !message.member.hasPermission('ADMINISTRATOR')) && message.author.id !== bot.config.dev) {
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
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
      if (role.position > member.roles.highest.position && member.id !== member.guild.owner.id && member.id !== bot.config.dev) {
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
      if (sender.id !== requiredId && sender.id !== bot.config.dev) {
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
