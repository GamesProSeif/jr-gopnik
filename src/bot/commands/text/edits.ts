import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';

export default class EditsCommand extends Command {
  constructor() {
    super('edits', {
      aliases: ['edits'],
      args: [
        {
          id: 'editedMessage',
          prompt: {
            retry: `Couldn't get message! Try another ID`,
            start: `What's the ID of the message you want the edits of?`
          },
          type: 'message'
        }
      ],
      category: 'text',
      description: {
        content: 'Views edits of a message',
        usage: '<message-id>'
      }
    });
  }

  public exec(message: Message, args: any) {
    let edits = args.editedMessage.edits;
    const original = edits.splice(
      edits.findIndex((m: Message) => m.editedTimestamp === null),
      1
    )[0];
    edits = edits.sort(
      (a: Message, b: Message) => a.editedTimestamp! - b.editedTimestamp!
    );

    const embed = new MessageEmbed()
      .setColor(this.client.config.colors!.primary)
      .setAuthor(
        args.editedMessage.author.tag,
        args.editedMessage.author.displayAvatarURL()
      )
      .setDescription(
        `Viewing edits of **${args.editedMessage.author.tag}**'s message (ID: ${args.editedMessage.id})`
      )
      .addField('❯ Original', original.content);

    edits.forEach((m: Message, i: number) =>
      embed.addField(`❯ ${i + 1}`, m.content)
    );

    return message.util!.send(embed);
  }
}
