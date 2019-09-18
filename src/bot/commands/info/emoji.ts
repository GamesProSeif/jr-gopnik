import { stripIndents } from 'common-tags';
import { Command } from 'discord-akairo';
import { GuildEmoji, Message, MessageEmbed } from 'discord.js';
import * as moment from 'moment';
import emojis from 'node-emoji';
import punycode from 'punycode';

const EMOJI_REGEX = /<(?:a)?:(?:\w{2,32}):(?<content>\d{17,19})>?/;

export default class EmojiCommand extends Command {
	constructor() {
		super('emoji', {
			aliases: ['emoji', 'emoji-info', 'ei'],
			args: [
				{
					id: 'emoji',
					match: 'content',
					prompt: {
						retry: `Please provide a valid emoji`,
						start: `What's the emoji you want informationa about?`
					},
					type: async (message, content) => {
						if (EMOJI_REGEX.test(content)) {
							const matched = content.match(EMOJI_REGEX);
							content = matched!.groups!.content;
						}
						if (!isNaN(parseInt(content, 10))) {
							return message.guild!.emojis.get(content);
						}
						return (
							message.guild!.emojis.find(e => e.name === content) ||
              emojis.find(content)
						);
					}
				}
			],
			category: 'info',
			description: {
				content: 'Displays information about an emoji'
			}
		});
	}

	public exec(message: Message, { emoji }: any) {
		const embed = new MessageEmbed().setColor(this.client.config.colors!.info);

		if (emoji instanceof GuildEmoji) {
			embed.setDescription(`Info about ${emoji.name} (ID: ${emoji.id})`);
			embed.setThumbnail(emoji.url);
			embed.addField(
				'❯ Info',
				stripIndents`
        • Identifier: \`<${emoji.identifier}>\`
        • Creation Date: ${moment
		.utc(emoji.createdAt)
		.format('YYYY/MM/DD hh:mm:ss [UTC]')}
        • URL: ${emoji.url}
        `
			);
		} else {
			embed.setDescription(`Info about ${emoji.emoji}`);
			embed.addField(
				'❯ Info',
				stripIndents`
        • Name: \`${emoji.key}\`
        • Raw: \`${emoji.emoji}\`
        • Unicode: \`${punycode.ucs2
		.decode(emoji.emoji)
		.map(
			e =>
				`\\u${e
					.toString(16)
					.toUpperCase()
					.padStart(4, '0')}`
		)
		.join('')}\`
          `
			);
		}

		return message.util!.send(embed);
	}
}
