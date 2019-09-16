import { Listener } from 'discord-akairo';
import { Message, TextChannel } from 'discord.js';

export default class MessageDeleteListener extends Listener {
	constructor() {
		super('messageDelete', {
			emitter: 'client',
			event: 'messageDelete',
			category: 'client'
		});
	}

	public exec(message: Message) {
		if (!(message.channel instanceof TextChannel)) {
			return;
		}
		const snipe = message.channel.snipe;

		if (snipe.size >= 10) {
			snipe.delete(snipe.sort((a, b) => a.timestamp - b.timestamp).first()!.id);
		}

		snipe.set(message.id, {
			id: message.id,
			author: message.author!.id,
			content: message.content ? message.content : undefined,
			attachments: message.attachments.first()
				? message.attachments.map(a => a.proxyURL)
				: undefined,
			timestamp: message.createdTimestamp
		});
	}
}
