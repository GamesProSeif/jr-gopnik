import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { MESSAGES } from '../../util/constants';

export default class RollCommand extends Command {
	constructor() {
		super('roll', {
			aliases: ['roll', 'random'],
			description: {
				content: MESSAGES.COMMANDS.GAMBLE.ROLL.DESCRIPTION.CONTENT,
				usage: MESSAGES.COMMANDS.GAMBLE.ROLL.DESCRIPTION.USAGE,
				examples: MESSAGES.COMMANDS.GAMBLE.ROLL.DESCRIPTION.EXAMPLES
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
		return message.util!.send(MESSAGES.COMMANDS.GAMBLE.ROLL.RESPONSE(num));
	}
}
