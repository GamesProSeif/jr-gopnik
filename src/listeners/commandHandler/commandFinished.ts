import { Command, Listener } from 'discord-akairo';
import { Message } from 'discord.js';
import { EVENTS, TOPICS } from '../../util/constants';

export default class CommandFinishedListener extends Listener {
	constructor() {
		super('commandFinished', {
			emitter: 'commandHandler',
			event: 'commandFinished',
			category: 'commandHandler'
		});
	}

	public exec(message: Message, command: Command, args: any) {
		this.client.logger.info(
			`Finished ${command.id} on ${message.guild ? `${message.guild.name} (${message.guild.id})` : 'DM'}${
				Object.keys(args).length && !args.command ? ` with arguments ${JSON.stringify(args)}` : ''
			}`,
			{ topic: TOPICS.DISCORD_AKAIRO, event: EVENTS.COMMAND_FINISHED }
		);
	}
}
