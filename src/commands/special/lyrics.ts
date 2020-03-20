import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
import { COLORS, MESSAGES, SRA_LINK } from '../../util/constants';

export default class LyricsCommand extends Command {
	constructor() {
		super('lyrics', {
			aliases: ['lyrics', 'l'],
			description: {
				content: MESSAGES.COMMANDS.SPECIAL.LYRICS.DESCRIPTION.CONTENT,
				usage: MESSAGES.COMMANDS.SPECIAL.LYRICS.DESCRIPTION.USAGE
			},
			category: 'special',
			args: [
				{
					id: 'title',
					match: 'content',
					prompt: {
						start: MESSAGES.COMMANDS.SPECIAL.LYRICS.ARGS.TITLE.PROMPT.START,
						retry: MESSAGES.COMMANDS.SPECIAL.LYRICS.ARGS.TITLE.PROMPT.RETRY
					}
				}
			],
			cooldown: 30000
		});
	}

	public async exec(message: Message, { title }: { title: string }) {
		const song = await (await fetch(SRA_LINK(`/lyrics?title=${title}`))).json();

		if (song.error) {
			return message.util!.send(
				MESSAGES.COMMANDS.SPECIAL.LYRICS.RESPONSE.ERROR(title)
			);
		}

		const lyricsArray = song.lyrics.match(/(?:.|[\r\n]){1,2000}(?=\n)/g);
		lyricsArray.forEach((lyrics: string, i: number) => {
			const embed = new MessageEmbed()
				.setColor(COLORS.SECONDARY)
				.setDescription(lyrics);
			if (i === 0) {
				embed
					.setTitle(song.title)
					.setAuthor(song.author, song.thumbnail.genius)
					.setURL(song.links.genius);
			}
			if (i === lyricsArray.length - 1) {
				embed.setFooter(
					`Requested by ${message.author!.tag}`,
					message.author!.displayAvatarURL()
				);
			}
			return message.util!.send(embed);
		});
	}
}
