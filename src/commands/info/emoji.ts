import { Command } from 'discord-akairo';
import { GuildEmoji, Message, MessageEmbed } from 'discord.js';
import { Emoji, find as findEmoji } from 'node-emoji';
import { COLORS, MESSAGES, REGEX } from '../../util/constants';

export default class EmojiCommand extends Command {
	constructor() {
		super('emoji', {
			aliases: ['emoji', 'emoji-info', 'ei'],
			description: {
				content: MESSAGES.COMMANDS.INFO.EMOJI.DESCRIPTION.CONTENT
			},
			category: 'info',
			args: [
				{
					id: 'emoji',
					match: 'content',
					prompt: {
						start: MESSAGES.COMMANDS.INFO.EMOJI.ARGS.EMOJI.PROMPT.START,
						retry: MESSAGES.COMMANDS.INFO.EMOJI.ARGS.EMOJI.PROMPT.RETRY
					},
					type: async (message, content) => {
						if (REGEX.EMOJI.test(content)) {
							const matched = content.match(REGEX.EMOJI);
							content = matched!.groups!.content;
						}
						if (!isNaN(parseInt(content, 10))) {
							return message.guild!.emojis.cache.get(content);
						}
						return (
							message.guild!.emojis.cache.find(e => e.name === content) ||
								findEmoji(content)
						);
					}
				}
			]
		});
	}

	public exec(message: Message, { emoji }: { emoji: Emoji | GuildEmoji }) {
		const embed = new MessageEmbed().setColor(COLORS.INFO);

		if (emoji instanceof GuildEmoji) {
			embed.setDescription(MESSAGES.COMMANDS.INFO.EMOJI.RESPONSE.EMBED1.DESCRIPTION(emoji));
			embed.setThumbnail(emoji.url!);
			embed.addField(
				MESSAGES.COMMANDS.INFO.EMOJI.RESPONSE.EMBED1.FIELD_NAME,
				MESSAGES.COMMANDS.INFO.EMOJI.RESPONSE.EMBED1.FIELD_VALUE(emoji)
			);
		} else {
			embed.setDescription(MESSAGES.COMMANDS.INFO.EMOJI.RESPONSE.EMBED2.DESCRIPTION(emoji));
			embed.addField(
				MESSAGES.COMMANDS.INFO.EMOJI.RESPONSE.EMBED2.FIELD_NAME,
				MESSAGES.COMMANDS.INFO.EMOJI.RESPONSE.EMBED2.FIELD_VALUE(emoji)
			);
		}

		return message.util!.send(embed);
	}
}
