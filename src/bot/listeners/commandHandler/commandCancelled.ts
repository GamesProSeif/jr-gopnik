import { Command, Listener } from 'discord-akairo';
import { Message } from 'discord.js';
import { EVENTS, TOPICS } from '../../util/logger';

export default class CommandCancelledListener extends Listener {
	constructor() {
		super('commandCancelled', {
			emitter: 'commandHandler',
			event: 'commandCancelled',
			category: 'commandHandler'
		});
	}

	public exec(message: Message, command: Command, args: any = {}) {
		this.client.logger.info(
			`Cancelled ${command.id} on ${message.guild ? `${message.guild.name} (${message.guild.id})` : 'DM'}${
				Object.keys(args).length && !args.command ? ` with arguments ${JSON.stringify(args)}` : ''
			}`,
			{ topic: TOPICS.DISCORD_AKAIRO, event: EVENTS.COMMAND_CANCELLED }
		);
	}
}
