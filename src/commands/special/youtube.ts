import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import * as search from 'youtube-search';
import { MESSAGES } from '../../util/constants';

const opts = {
	maxResults: 10,
	key: process.env.YT_API_KEY
};

export default class YoutubeCommand extends Command {
	constructor() {
		super('youtube', {
			aliases: ['youtube', 'yt'],
			description: {
				content: MESSAGES.COMMANDS.SPECIAL.YOUTUBE.DESCRIPTION.CONTENT,
				usage: MESSAGES.COMMANDS.SPECIAL.YOUTUBE.DESCRIPTION.USAGE
			},
			category: 'special',
			args: [
				{
					id: 'query',
					match: 'content',
					prompt: {
						start: MESSAGES.COMMANDS.SPECIAL.YOUTUBE.ARGS.QUERY.PROMPT.START
					}
				}
			]
		});
	}

	public async exec(message: Message, args: any) {
		// eslint-disable-next-line promise/prefer-await-to-callbacks
		search(args.query, opts, (err, results) => {
			if (err) {
				return message.util!.send(MESSAGES.COMMANDS.SPECIAL.YOUTUBE.RESPONSE.ERROR);
			}
			results = results!.filter(v => v.kind === 'youtube#video');
			const video = results[0];

			return message.util!.send(video.link);
		});
	}
}
