import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class InviteCommand extends Command {
	constructor() {
		super('invite', {
			aliases: ['invite', 'invite-bot'],
			description: {
				content: 'Generates an invite link for adding bot to servers'
			},
			category: 'util'
		});
	}

	public async exec(message: Message) {
		const link = await this.client.generateInvite(['SEND_MESSAGES']);

		return message.util!.send(`<${link}>`);
	}
}
