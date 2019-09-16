import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import search from 'youtube-search';
import { promisify } from 'util';

const searchProm = promisify(search);

const opts = {
	maxResults: 10,
	key: process.env.YT_API_KEY
};

export default class YoutubeCommand extends Command {
	constructor() {
		super('youtube', {
			aliases: ['youtube', 'yt'],
			description: {
				content: 'Searches a video on Youtube',
				usage: '<query>'
			},
			category: 'special',
			args: [
				{
					id: 'query',
					match: 'content',
					prompt: {
						start: `What do you want me to search?`
					}
				}
			]
		});
	}

	public async exec(message: Message, args: any) {
		try {
			let results = await searchProm(args.query, opts);

			results = results!.filter(v => v.kind === 'youtube#video');
			const video = results[0];

			return message.util!.send(video.link);
		} catch (err) {
			return message.util!.send('Could not fetch results');
		}
	}
}
