// Mainly inspired by Crawl's bot "Yukikaze" https://github.com/Naval-Base/yukikaze/
import { Command, PrefixSupplier } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';

export default class HelpCommand extends Command {
  constructor() {
    super('help', {
      aliases: ['help', 'h'],
      args: [
        {
          default: null,
          id: 'command',
          type: 'commandAlias'
        }
      ],
      category: 'util',
      description: {
        content: 'Displays information about a command',
        usage: '[command]',
        examples: ['ping']
      }
    });
  }

  public async exec(message: Message, { command }: { command: Command }) {
    const prefix = (this.handler.prefix as PrefixSupplier)(message);
    const embed = new MessageEmbed().setColor(this.client.config.colors!.info);

    if (!command) {
      embed
        .setTitle('❯ Commands')
        .setDescription(
          `A list of available commands.\nFor additional info on a command, type \`${prefix}help <command>\``
        )
        .setFooter(
          `${this.handler.modules.size} Modules`,
          this.client.user!.displayAvatarURL()
        );

      for (const category of this.handler.categories.values()) {
        embed.addField(
          `❯ ${category.id.replace(/(\b\w)/gi, (lc): string =>
            lc.toUpperCase()
          )} - ${category.size}`,
          `${category
            .filter((cmd): boolean => cmd.aliases.length > 0)
            .map((cmd): string => `\`${cmd.aliases[0]}\``)
            .join(', ')}`
        );
      }
    } else {
      embed
        .setColor(3447003)
        .addField(
          '❯ Usage',
          `\`${command.aliases[0]} ${
            command.description.usage ? command.description.usage : ''
          }\``
        )
        .addField(
          '❯ Description',
          command.description.content || 'No Description provided'
        );

      if (command.aliases.length > 1)
        embed.addField('❯ Aliases', `\`${command.aliases.join('`, `')}\``);
      if (command.description.examples && command.description.examples.length)
        embed.addField(
          '❯ Examples',
          `\`${command.aliases[0]} ${command.description.examples.join(
            `\`\n\`${command.aliases[0]} `
          )}\``
        );
    }

    return message.util!.send(embed);
  }
}