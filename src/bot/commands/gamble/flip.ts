import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class FlipCommand extends Command {
  constructor() {
    super('flip', {
      aliases: ['flip'],
      description: {
        content: 'Flips a coin'
      },
      category: 'gamble'
    });
  }

  public exec(message: Message) {
    const num = Math.floor(Math.random() * 2);
    const final = num ? 'heads' : 'tails';
    return message.util!.send(`Coin fell and hit \`${final}\``);
  }
}
