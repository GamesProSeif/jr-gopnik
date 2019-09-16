import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class ReverseCommand extends Command {
	constructor() {
		super('reverse', {
			aliases: ['reverse'],
			description: {
				content: 'Reverses text'
			},
			category: 'text',
			args: [
				{
					id: 'text',
					match: 'content',
					prompt: {
						start: `What do you want me to reverse?`
					}
				}
			]
		});
	}

	public async exec(message: Message, { text }: { text: string }) {
		return message.util!.send([...text].reverse().join(''));
	}
}
