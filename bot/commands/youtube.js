const { Command } = require('discord-akairo');
// const { MessageEmbed } = require('discord.js');
const search = require('youtube-search');

const opts = {
  maxResults: 10,
  key: process.env.YT_API_KEY
};

class YoutubeCommand extends Command {
  constructor() {
    super('youtube', {
      aliases: ['youtube', 'yt'],
      description: 'Searches a video on Youtube',
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

    this.usage = '<query>';
  }

  async exec(message, args) {
    let color = this.client.config.colors.primary
    search(args.query, opts, function(err, results) {
      if(err) return console.log(err);

      results = results.filter(v => v.kind === 'youtube#video');
      let video = results[0];

      // const embed = new MessageEmbed()
      //   .setColor(color)
      //   .setTitle(video.title)
      //   .setDescription(video.description)
      //   .setURL(video.link)
      //   .setTimestamp(new Date(video.publishedAt))
      //   .setAuthor(video.channelTitle)
      //   .setImage(video.thumbnails.high.url)

      return message.util.send(video.link);
    });
  }
}

module.exports = YoutubeCommand;
