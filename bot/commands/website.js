const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const dns = require('dns');

const getIp = host => {
  return new Promise((resolve, reject) => {
    dns.lookup(host, (err, address, family) => {
      if (err) reject(err);
      else resolve({ address, family });
    });
  });
};

class WebsiteCommand extends Command {
  constructor() {
    super('website', {
      aliases: ['website', 'website-info', 'url-info', 'wi'],
      description: 'Gets information about a website',
      category: 'info',
      cooldown: 10000,
      args: [
        {
          id: 'url',
          type: 'url',
          prompt: {
            start: `What's the website you want info about?`,
            retry: `Invalid URL! Try again.`
          }
        }
      ]
    });

    this.usage = '<URL>';
  }

  async exec(message, { url }) {
    try {
      const res = await fetch(url.href);

      const embed = new MessageEmbed();

      if (res.ok) {
        const { address, family } = await getIp(url.host);
        embed
          .setColor(this.client.config.colors.info)
          .setDescription(`Info about URL ${url.href}`)
          .addField(
            '❯ Website Details',
            `• Online?: Yes\n• Status Code: ${
              res.status
            }\n• Content Type: ${res.headers.get('content-type')}`
          )
          .addField(
            '❯ URL Details',
            `• Href: ${url.href}\n• Host: ${url.host}\n• Protocol: ${
              url.protocol
            }\n• IPv${family}: ${address}`
          );
      } else {
        embed
          .setColor(this.client.config.colors.error)
          .setDescription(`Info about URL ${url.href}`)
          .addField(
            '❯ Website Details',
            `• Online?: No\n• Status Code: ${res.status}`
          )
          .addField(
            '❯ URL Details',
            `• Href: ${url.href}\n• Host: ${url.host}\n• Protocol: ${
              url.protocol
            }`
          );
      }

      return message.util.send(embed);
    } catch (error) {
      console.log(error);
      return message.util.send(
        'An error occurred while getting information about your website'
      );
    }
  }
}

module.exports = WebsiteCommand;
