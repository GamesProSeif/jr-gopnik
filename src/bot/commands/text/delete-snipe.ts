import { Command } from 'discord-akairo';
import { Message, TextChannel } from 'discord.js';

export default class DeleteSnipeCommand extends Command {
  constructor() {
    super('delete-snipe', {
      aliases: ['delete-snipe', 'd-snipe'],
      description: {
        content: 'Deletes snipes in a channel',
        usage: '[#channel]'
      },
      category: 'text',
      channel: 'guild',
      userPermissions: ['MANAGE_MESSAGES'],
      args: [
        {
          id: 'channel',
          type: 'textChannel',
          default: (message: Message) => message.channel,
          prompt: {
            start: `What's the text channel you want to delete snipes in?`,
            retry: `Invalid text channel! Try again.`,
            optional: true
          }
        }
      ]
    });
  }

  public async exec(message: Message, { channel }: { channel: TextChannel }) {
    const size = channel.snipe.size;
    channel.snipe.clear();

    return message.util!.send(`✅ Deleted \`${size}\` snipe(s) in ${channel}`);
  }
}
