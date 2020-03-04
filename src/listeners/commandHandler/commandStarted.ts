import { Command, Listener } from 'discord-akairo';
import { Message } from 'discord.js';
import { EVENTS, TOPICS } from '../../util/constants';

export default class CommandStartedListener extends Listener {
	constructor() {
		super('commandStarted', {
			emitter: 'commandHandler',
			event: 'commandStarted',
			category: 'commandHandler'
		});
	}

	public exec(message: Message, command: Command, args: any) {
		let argsStr = { ...args };
		try {
			argsStr = JSON.stringify(args);
		} catch {
			argsStr = args.toString();
		}
		this.client.logger.info(
			`Started ${command.id} on ${message.guild ? `${message.guild.name} (${message.guild.id})` : 'DM'}${
				Object.keys(args).length && !args.command ? ` with arguments ${argsStr}` : ''
			}`,
			{ topic: TOPICS.DISCORD_AKAIRO, event: EVENTS.COMMAND_STARTED }
		);
	}
}
