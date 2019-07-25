const { Command } = require('discord-akairo');
const shortURL = require('shorturl');

class ShortenCommand extends Command {
  constructor() {
    super('shorten-url', {
      aliases: ['shorten-url', 'shorten', 'su'],
      description: 'Shortens a URL',
      category: 'special',
      cooldown: 10000,
      args: [
        {
          id: 'url',
          type: 'url',
          prompt: {
            start: `What's the URL you want to shorten?`,
            retry: `Invalid URL! Try again.`
          }
        }
      ]
    });
  }

  async exec(message, args) {
    try {
      shortURL(
        args.url.href,
        'bit.ly',
        {
          login: 'gamesproseif',
          apiKey: process.env.BITLY_API_KEY
        },
        shortenedURL => {
          return message.util.send(`<${shortenedURL}>`);
        }
      );
    } catch (error) {
      console.error(error);
      return message.util.send(
        'An error occurred while trying to shorten your URL'
      );
    }
  }
}

module.exports = ShortenCommand;
