import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import search from 'youtube-search';

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
    search(args.query, opts, (err, results) => {
      if (err) {
        return console.log(err);
      }

      results = results!.filter(v => v.kind === 'youtube#video');
      const video = results[0];

      return message.util!.send(video.link);
    });
  }
}
