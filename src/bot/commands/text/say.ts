import { Command } from 'discord-akairo';
import { Message, TextChannel } from 'discord.js';

export default class SayCommand extends Command {
  constructor() {
    super('say', {
      aliases: ['say', 'speak'],
      description: {
        content: 'Says a message',
        usage: '[channel:] <message>'
      },
      args: [
        {
          id: 'channel',
          type: 'textChannel',
          default: (message: Message) => message.channel,
          match: 'option',
          flag: ['channel:', 'c:']
        },
        {
          id: 'text',
          match: 'rest',
          prompt: {
            start: 'What is the message you want me to say?'
          }
        }
      ],
      category: 'text'
    });
  }

  public exec(_: Message, { channel, text }: { channel: TextChannel; text: string }) {
    return channel.send(text);
  }
}
