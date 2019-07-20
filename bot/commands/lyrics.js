const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

class LyricsCommand extends Command {
  constructor() {
    super('lyrics', {
      aliases: ['lyrics'],
      description: 'Gets lyrics of a song',
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

    this.usage = '<song-title>';
  }

  async exec(message, args) {
    const song = await (await fetch(`https://some-random-api.ml/lyrics?title=${args.title}`)).json();

    if (song.error) {
      return message.util.send(`Couldn't find results for song title \`${args.title}\``);
    }

    const lyricsArray = song.lyrics.match(/(?:.|[\r\n]){1,2000}(?=\n)/g);
    lyricsArray.forEach((lyrics, i) => {
      const embed = new MessageEmbed()
        .setColor(this.client.config.colors.secondary)
        .setDescription(lyrics);
      if (i === 0) {
        embed
          .setTitle(song.title)
          .setAuthor(song.author, song.thumbnail.genius)
          .setURL(song.links.genius);
      }
      if (i === lyricsArray.length - 1) {
        embed.setFooter(`Requested by ${message.member.user.tag}`, message.member.user.displayAvatarURL());
      }
      message.util.send(embed);
    });
  }
}

module.exports = LyricsCommand;
