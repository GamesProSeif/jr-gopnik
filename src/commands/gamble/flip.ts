import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { MESSAGES } from '../../util/constants';

export default class FlipCommand extends Command {
	constructor() {
		super('flip', {
			aliases: ['flip'],
			description: {
				content: MESSAGES.COMMANDS.GAMBLE.FLIP.DESCRIPTION.CONTENT
			},
			category: 'gamble'
		});
	}

	public exec(message: Message) {
		const num = Math.floor(Math.random() * 2);
		const final = num ? 'heads' : 'tails';
		return message.util!.send(MESSAGES.COMMANDS.GAMBLE.FLIP.RESPONSE(final));
	}
}
