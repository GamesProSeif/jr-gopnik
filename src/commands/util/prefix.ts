import { Argument, Command, PrefixSupplier } from 'discord-akairo';
import { Message } from 'discord.js';

export default class PrefixCommand extends Command {
	constructor() {
		super('prefix', {
			aliases: ['prefix'],
			description: {
				content: 'Displays the prefix of the bot'
			},
			category: 'util',
			args: [
				{
					'id': 'prefix',
					'type': Argument.range('string', 1, 3, true),
					'default': null,
					'prompt': {
						start: 'What is the prefix you want to set?',
						retry: 'Invalid prefix! Try again (length: 1-3)',
						optional: true
					}
				}
			]
		});
	}

	public async exec(message: Message, args: { prefix: string }) {
		const prefix = (this.client.commandHandler.prefix as PrefixSupplier)(
			message
		);
		if (message.channel.type !== 'text' || !args.prefix) {
			return message.util!.reply(`My prefix is \`${prefix}\``);
		}
		try {
			await this.client.settings.set(message.guild!, 'prefix', args.prefix);
			return message.util!.send(`Set prefix to \`${args.prefix}\``);
		} catch (error) {
			return message.util!.send('Could not set prefix');
		}
	}
}
