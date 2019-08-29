import { Argument, Command } from 'discord-akairo';
import { Message, MessageEmbed, TextChannel } from 'discord.js';

export default class SnipeCommand extends Command {
  constructor() {
    super('snipe', {
      aliases: ['snipe'],
      description: {
        content: 'Snipes a deleted message',
        usage: '[position] [#channel]',
        examples: ['#general', '8 #selfies']
      },
      category: 'text',
      channel: 'guild',
      cooldown: 5000,
      args: [
        {
          id: 'position',
          type: Argument.range('integer', 0, 10),
          unordered: true,
          default: 0,
          prompt: {
            start: `What's the position of the message? (0 - 10)`,
            retry: `Invalid position number! Try again. (0 - 10)`,
            optional: true
          }
        },
        {
          id: 'channel',
          type: 'textChannel',
          unordered: true,
          default: (message: Message) => message.channel,
          prompt: {
            start: `What's the text channel you want to search in?`,
            retry: `Invalid text channel! Try again.`,
            optional: true
          }
        }
      ]
    });
  }

  public exec(
    message: Message,
    args: { position: number; channel: TextChannel }
  ) {
    const embed = new MessageEmbed();

    const snipeCollection = args.channel.snipe;
    if (!snipeCollection.first()) {
      embed
        .setColor(this.client.config.colors!.error)
        .setDescription(`No deleted messages found in channel ${args.channel}`);

      return message.util!.send(embed);
    }
    const snipes = snipeCollection
      .sort((a, b) => b.timestamp - a.timestamp)
      .array();

    const snipe = snipes[args.position];

    if (!snipe) {
      embed
        .setColor(this.client.config.colors!.error)
        .setDescription(
          `No deleted message found in channel ${args.channel} at position ${args.position}`
        );

      return message.util!.send(embed);
    }

    const author = this.client.users.get(snipe.author)!;

    embed
      .setColor(this.client.config.colors!.primary)
      .setAuthor(author.tag, author.avatarURL()!)
      .setTimestamp(snipe.timestamp);

    if (snipe.content) {
      embed.setDescription(snipe.content);
    }
    if (snipe.attachments) {
      embed.attachFiles(snipe.attachments);
    }

    return message.util!.send(embed);
  }
}
