import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
import { COLORS } from '../../util/constants';

export default class LyricsCommand extends Command {
	constructor() {
		super('lyrics', {
			aliases: ['lyrics', 'l'],
			description: {
				content: 'Gets lyrics of a song',
				usage: '<song-title>'
			},
			category: 'special',
			args: [
				{
					id: 'title',
					match: 'content',
					prompt: {
						start: `What's the song title you want?`,
						retry: `Invalid song title! Try again.`
					}
				}
			],
			cooldown: 30000
		});
	}

	public async exec(message: Message, args: any) {
		const song = await (await fetch(
			`https://some-random-api.ml/lyrics?title=${args.title}`
		)).json();

		if (song.error) {
			return message.util!.send(
				`Couldn't find results for song title \`${args.title}\``
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
