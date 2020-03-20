import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { readdirSync } from 'fs';
import * as path from 'path';
import { COLORS, TOPICS, MESSAGES } from '../../util/constants';

export default class LaterCommand extends Command {
	constructor() {
		super('later', {
			aliases: ['later'],
			category: 'meme',
			description: {
				content: MESSAGES.COMMANDS.MEME.LATER.DESCRIPTION.CONTENT
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
						title: 'Error',
						description: MESSAGES.COMMANDS.MEME.LATER.RESPONSE.NO_STORAGE,
						color: COLORS.ERROR
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
		} catch (error) {
			return this.client.logger.error(error, {
				topic: TOPICS.DISCORD
			});
		}
	}
}
