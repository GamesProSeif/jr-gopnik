import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class ContentCommand extends Command {
	constructor() {
		super('content', {
			aliases: ['content', 'cnt'],
			description: {
				content: 'Gets the pure content of a message in the current channel',
				usage: '<messageID>'
			},
			category: 'text',
			args: [
				{
					id: 'message',
					type: 'message',
					prompt: {
						start: `What's the id of the message you want the content of?`,
						retry: `That's not a valid id! Try again.`
					}
				}
			]
		});
	}

	public exec(message: Message, args: any) {
		const content = this.client.functions.clean(args.message.content);
		if (content === '') {
			return message.util!.send(
				`The message does have any content. Probably an embed or an attachment present.`
			);
		}
		return message.util!.send(content, { code: 'md' });
	}
}
