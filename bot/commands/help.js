const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class HelpCommand extends Command {
  constructor() {
    super('help', {
      aliases: ['help', 'h'],
      description: 'Displays information about a command',
      category: 'util',
      args: [
        {
          id: 'command',
          type: 'commandAlias',
          default: null
        }
      ]
    });

    this.usage = '[command]';
  }

  exec(message, args) {
    const commandHandler = this.client.commandHandler;
    const embed = new MessageEmbed()
      .setColor(this.client.config.colors.info);

    if (!args.command) {
      embed
        .setTitle('❯ Commands')
        .setDescription(`A list of available commands.\nFor additional info on a command, type \`${this.client.commandHandler.prefix()}help <command>\``)
        .setFooter(`${commandHandler.modules.size} Commands`, this.client.user.displayAvatarURL());

      let categories = commandHandler.categories.array().map(c => c.id);

      if (categories.includes('default')) {
        categories.splice(categories.findIndex(c => c === 'default'), 1);
        categories.unshift('default');
      }

      categories = categories.sort();

      categories.forEach(category => {
        const commands = commandHandler.modules.filter(c => c.category.id === category);

        let categoryName = category === 'default' ? 'user' : category;
        categoryName = this.client.functions.capitalize(categoryName);

        embed.addField(`${categoryName} - ${commands.size}`, commands.map(c => `\`${c.id}\``).join(', '));
      });
    } else {
      let command = args.command;
      let usage = command.usage ? `\`${command.id} ${command.usage}\`` : `\`${command.id}\``;
      let desc = command.description || 'No description provided';
      let aliases = [...command.aliases];
      aliases.splice(aliases.findIndex(alias => command.id === alias), 1);
      aliases = aliases[0] ? aliases.map(alias => `\`${alias}\``).join(' ') : null;
      let examples = command.examples ? command.examples.map(e => `\`${command.id} ${e}\``).join('\n') : null;
      embed
        // .setDescription(usage)
        .addField(`❯ Usage`, usage)
        .addField(`❯ Description`, desc);
      aliases ? embed.addField('❯ Aliases', aliases) : null;
      examples ? embed.addField('❯ Examples', examples) : null;
    }

    return message.util.send(embed);
  }
}

module.exports = HelpCommand;
