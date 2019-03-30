const { RichEmbed } = require('discord.js');

exports.run = (bot, message, args) => {
  if (!args[0]) {
    let commands = bot.commands.filter(c => c.group.toLowerCase() === 'user');
    const embed = new RichEmbed()
      .setColor(bot.config.colors.info);
    let commandsFound = 0;
    commands.forEach((value, key) => {
      commandsFound++;
      embed.addField(bot.functions.capitalize(key), `**Description**: ${value.desc}\n**Usage**: \`${bot.config.prefix + value.usage}\``);
    });
    embed
      .setDescription(`**${commandsFound} commands found** - <> means *required*, [] means *optional*`)
      .setFooter('Currently showing USER commands');
    message.author.send({embed});
    message.channel.send('Sent you in DMs cause I don\'t have a page system 😔');
  }
  else {
    if (bot.commands.get(args[0].toLowerCase())) {
      let key = args[0].toLowerCase();
      let value = bot.commands.get(args[0].toLowerCase());
      let aliases = value.aliases[0] ? '\n**Aliases**: ' + value.aliases.map(str => '`' + str + '`').join(' - ') : '';
      const embed = new RichEmbed()
        .setColor(bot.config.colors.info)
        .setDescription(`**Command found** - <> means *required*, [] means *optional*`)
        .setFooter(`Currently showing ${key.toUpperCase()} command`)
        .addField(bot.functions.capitalize(key), `**Description**: ${value.desc}\n**Usage**: \`${bot.config.prefix + value.usage}\`\n**Group**: ${value.group}` + aliases);

        message.channel.send({embed});
    }
    else if (bot.commands.find(c => c.aliases.includes(args[0].toLowerCase()))) {
      let value = bot.commands.find(c => c.aliases.includes(args[0].toLowerCase()));
      let key = value.name;
      let aliases = value.aliases[0] ? '\n**Aliases**: ' + value.aliases.map(str => '`' + str + '`').join(' - ') : '';
      const embed = new RichEmbed()
        .setColor(bot.config.colors.info)
        .setDescription(`**Command found** - <> means *required*, [] means *optional*`)
        .setFooter(`Currently showing ${key.toUpperCase()} command`)
        .addField(bot.functions.capitalize(key), `**Description**: ${value.desc}\n**Usage**: \`${bot.config.prefix + value.usage}\`\n**Group**: ${value.group}` + aliases);

        message.channel.send({embed});
    }
    else if (bot.commands.find(c => c.group.toLowerCase() === args[0].toLowerCase())) {
      let commands = bot.commands.filter(c => c.group.toLowerCase() === args[0].toLowerCase());
      const embed = new RichEmbed()
        .setColor(bot.config.colors.info);
      let commandsFound = 0;
      commands.forEach((value, key) => {
        commandsFound++;
        embed.addField(bot.functions.capitalize(key), `**Description**: ${value.desc}\n**Usage**: \`${bot.config.prefix + value.usage}\``);
      });
      embed
        .setDescription(`**${commandsFound} commands found** - <> means *required*, [] means *optional*`)
        .setFooter(`Currently showing ${args[0].toUpperCase()} commands`);
      message.author.send({embed});
      message.channel.send('Sent you in DMs cause I don\'t have a page system 😔');
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
