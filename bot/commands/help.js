const { RichEmbed } = require('discord.js');

exports.run = (bot, message, args) => {
  if (!args[0]) {
    const embed = new RichEmbed()
      .setColor(bot.config.colors.info)
      .setTitle('List of Commands')
      .setDescription('<> means *required*, [] means *optional*')
    let groups = ['user'];
    bot.commands.forEach(c => {
      if (!groups.includes(c.group)) {
        groups.push(c.group);
      }
    });
    groups.forEach(group => {
      let commands = bot.commands.filter(c => c.group === group);
      embed.addField(`❯ ${bot.functions.capitalize(group)} - ${commands.size}`, commands.map(c => `\`${c.name}\``).join(' '));
    });
    message.channel.send(embed);
  }
  else {
    if (bot.commands.has(args[0].toLowerCase())) {
      let command = bot.commands.get(args[0].toLowerCase());
      const embed = new RichEmbed()
        .setColor(bot.config.colors.info)
        .setTitle(bot.functions.capitalize(command.name))
        .addField('❯ Description', command.desc)
        .addField('❯ Group', bot.functions.capitalize(command.group))
        .addField('❯ Usage', `\`${bot.config.prefix}${command.usage}\``);
      if (command.aliases[0]) embed.addField('❯ Aliases', command.aliases.map(a => `\`${a}\``).join(' '));
      if (command.examples[0]) embed.addField('❯ Examples', command.examples.map(e => `\`${e}\``).join('\n'));
      message.channel.send(embed);
    }
    else if (bot.commands.find(c => c.aliases.includes(args[0].toLowerCase()))) {
      let command = bot.commands.find(c => c.aliases.includes(args[0].toLowerCase()));
      const embed = new RichEmbed()
        .setColor(bot.config.colors.info)
        .setTitle(bot.functions.capitalize(command.name))
        .addField('❯ Description', command.desc)
        .addField('❯ Group', bot.functions.capitalize(command.group))
        .addField('❯ Usage', `\`${bot.config.prefix}${command.usage}\``);
      if (command.aliases[0]) embed.addField('❯ Aliases', command.aliases.map(a => `\`${a}\``).join(' '));
      if (command.examples[0]) embed.addField('❯ Examples', commands.examples.join('\n'));
      message.channel.send(embed);
    }
    else if (bot.commands.find(c => c.group === args[0].toLowerCase())) {
      let commands = bot.commands.filter(c => c.group === args[0].toLowerCase());
      const embed = new RichEmbed()
        .setColor(bot.config.colors.info)
        .setTitle('List of Commands')
        .setDescription('<> means *required*, [] means *optional*')
        .addField(`❯ ${bot.functions.capitalize(args[0])} - ${commands.size}`, commands.map(c => `\`${c.name}\``).join(' '));
      message.channel.send(embed);
    }
    else {
      return message.channel.send({embed:{
        title: 'Error',
        description: `\`${args[0]}\` is not a valid group or command`,
        color: bot.config.colors.error
      }});
    }
  }
}

exports.desc = 'Displays list of commands';
exports.usage = '[command/group]';
exports.aliases = ['h'];
exports.examples = [
  '',
  'admin',
  'ping'
]
