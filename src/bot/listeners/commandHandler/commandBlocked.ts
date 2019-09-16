import { Command, Listener } from 'discord-akairo';
import { Message } from 'discord.js';

export default class CommandBlockedListener extends Listener {
	constructor() {
		super('commandBlocked', {
			emitter: 'commandHandler',
			event: 'commandBlocked',
			category: 'commandHandler'
		});
	}

	public exec(message: Message, command: Command, reason: string) {
		if (reason === 'guild') {
			return message.util!.reply(
				`Command \`${command.id}\` is only accessable in servers`
			);
		} else if (reason === 'dm') {
			return message.util!.reply(
				`Command \`${command.id}\` is only accessable in DMs`
			);
		} else if (reason === 'owner') {
			return message.util!.reply(
				`Command \`${command.id}\` is only accessable by the bot owner(s)`
			);
		} else if (reason === 'blacklist') {
			return message.util!.reply(`You are blacklisted...`);
		}
		return console.log(
			`${message.author!.username} was blocked from using ${
				command.id
			} because of ${reason}!`
		);
	}
}
