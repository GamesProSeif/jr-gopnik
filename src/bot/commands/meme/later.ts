import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { readdirSync } from 'fs';
import * as path from 'path';

export default class LaterCommand extends Command {
	constructor() {
		super('later', {
			aliases: ['later'],
			category: 'meme',
			description: {
				content: 'Sends a random spongebob later photo'
			}
		});
	}

	public async exec(message: Message) {
		try {
			const files = await readdirSync(
				path.join(__dirname, '..', '..', '..', '..', 'assets', 'later/')
			);
			if (!files[0]) {
				return message.util!.send({
					embed: {
						color: this.client.config.colors!.error,
						description: 'I have no later photos in my storage 😐',
						title: 'Error'
					}
				});
			}
			const file = path.join(
				__dirname,
				'..',
				'..',
				'..',
				'..',
				'assets',
				'later',
				files[this.client.functions.getRandom(0, files.length)]
			);
			return message.util!.send({
				files: [file]
			});
		} catch (e) {
			return console.log(e);
		}
	}
}
