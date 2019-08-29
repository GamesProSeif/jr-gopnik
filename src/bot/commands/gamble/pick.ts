import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class PickCommand extends Command {
  constructor() {
    super('pick', {
      aliases: ['pick', 'choose'],
      description: {
        content: 'Chooses a value from a list (separate values by `|`)',
        usage: '<value 1> | <value 2> | <...>',
        examples: ['Pizza | Burger | Stay on diet']
      },
      category: 'gamble',
      separator: '|',
      args: [
        {
          id: 'list',
          match: 'separate'
        }
      ]
    });
  }

  public exec(message: Message, args: { list: string[] }) {
    const picked = args.list[Math.floor(Math.random() * args.list.length)];
    return message.util!.send(`I chose \`${picked}\``);
  }
}
