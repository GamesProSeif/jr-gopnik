import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { Url } from 'url';
import { TOPICS, MESSAGES } from '../../util/constants';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const shortURL = require('shorturl');

class ShortenCommand extends Command {
	constructor() {
		super('shorten-url', {
			aliases: ['shorten-url', 'shorten', 'short', 'su'],
			description: {
				content: MESSAGES.COMMANDS.SPECIAL.SHORTEN_URL.DESCRIPTION.CONTENT,
				usage: MESSAGES.COMMANDS.SPECIAL.SHORTEN_URL.DESCRIPTION.USAGE
			},
			category: 'special',
			cooldown: 10000,
			args: [
				{
					id: 'url',
					type: 'url',
					prompt: {
						start: MESSAGES.COMMANDS.SPECIAL.SHORTEN_URL.ARGS.URL.PROMPT.START,
						retry: MESSAGES.COMMANDS.SPECIAL.SHORTEN_URL.ARGS.URL.PROMPT.RETRY
					}
				}
			]
		});
	}

	public async exec(message: Message, { url }: { url: Url }) {
		try {
			shortURL(
				url.href,
				'bit.ly',
				{
					login: 'gamesproseif',
					apiKey: process.env.BITLY_API_KEY
				},
				(shortenedURL: string) => message.util!.send(`<${shortenedURL}>`)
			);
		} catch (error) {
			this.client.logger.error(error, {
				topic: TOPICS.DISCORD
			});
			return message.util!.send(
				MESSAGES.COMMANDS.SPECIAL.SHORTEN_URL.RESPONSE.ERROR
			);
		}
	}
}

module.exports = ShortenCommand;
