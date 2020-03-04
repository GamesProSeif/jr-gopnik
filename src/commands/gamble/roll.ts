import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class RollCommand extends Command {
	constructor() {
		super('roll', {
			aliases: ['roll', 'random'],
			description: {
				content: 'Rolls a number (default of 6)',
				usage: '[max/min [max]]',
				examples: ['', '100', '95 100']
			},
			category: 'gamble'
		});
	}

	public *args() {
		const min = yield {
			type: 'integer'
		};

		const max = yield {
			type: 'integer'
		};

		if (!min && !max) return { value: 6 };
		else if (max) return { min, max };
		return { value: min };
	}

	public exec(message: Message, args: any) {
		const num = args.value
			? Math.floor((Math.random() * args.value) + 1)
			: this.client.functions.getRandom(args.min, args.max);
		return message.util!.send(`I rolled \`${num}\``);
	}
}
