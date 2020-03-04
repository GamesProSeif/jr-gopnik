import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { Url } from 'url';
import { TOPICS } from '../../util/constants';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const shortURL = require('shorturl');

class ShortenCommand extends Command {
	constructor() {
		super('shorten-url', {
			aliases: ['shorten-url', 'shorten', 'short', 'su'],
			description: {
				content: 'Shortens a URL',
				usage: '<URL>'
			},
			category: 'special',
			cooldown: 10000,
			args: [
				{
					id: 'url',
					type: 'url',
					prompt: {
						start: `What's the URL you want to shorten?`,
						retry: `Invalid URL! Try again.`
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
				'An error occurred while trying to shorten your URL'
			);
		}
	}
}

module.exports = ShortenCommand;
