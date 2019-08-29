import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class SayCommand extends Command {
  constructor() {
    super('say', {
      aliases: ['say', 'speak'],
      description: {
        content: 'Says a message',
        usage: '<message>'
      },
      args: [
        {
          id: 'text',
          match: 'content',
          prompt: {
            start: 'What is the message you want me to say?'
          }
        }
      ],
      category: 'text'
    });
  }

  public exec(message: Message, { text }: any) {
    return message.channel.send(text);
  }
}
