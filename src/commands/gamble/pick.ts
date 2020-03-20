import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { MESSAGES } from '../../util/constants';

export default class PickCommand extends Command {
	constructor() {
		super('pick', {
			aliases: ['pick', 'choose'],
			description: {
				content: MESSAGES.COMMANDS.GAMBLE.PICK.DESCRIPTION.CONTENT,
				usage: MESSAGES.COMMANDS.GAMBLE.PICK.DESCRIPTION.USAGE,
				examples: MESSAGES.COMMANDS.GAMBLE.PICK.DESCRIPTION.EXAMPLES
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
		return message.util!.send(MESSAGES.COMMANDS.GAMBLE.PICK.RESPONSE(picked));
	}
}
