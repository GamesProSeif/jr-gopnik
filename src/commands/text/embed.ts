import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { COLORS } from '../../util/constants';

export default class EmbedCommmand extends Command {
	constructor() {
		super('embed', {
			aliases: ['embed'],
			description: {
				content: 'Generates an Embed from raw JSON input',
				usage: '<JSON>',
				examples: ['{"title": "My title", "description": "My description"}']
			},
			category: 'text',
			args: [
				{
					id: 'json',
					match: 'content',
					prompt: {
						start: `What's the JSON you want me to convert?`
					}
				}
			]
		});
	}

	public async exec(message: Message, args: any) {
		try {
			const embed = await JSON.parse(args.json);
			if (embed.color) {
				embed.color = parseInt(embed.color.replace('#', '0x'), 16);
			}
			return message.util!.send({ embed });
		} catch (e) {
			return message.util!.send({
				embed: {
					title: 'Error',
					description: `**Error name:** ${e.name}\n**Type:** ${e.message}`,
					color: COLORS.ERROR
				}
			});
		}
	}
}

module.exports = EmbedCommmand;
