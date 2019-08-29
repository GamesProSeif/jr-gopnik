import { stripIndents } from 'common-tags';
import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import { lookup } from 'dns';
import fetch from 'node-fetch';

const getIp = (host: string): Promise<{ address: string; family: number }> => {
  return new Promise((resolve, reject) => {
    lookup(host, (err, address, family) => {
      if (err) {
        reject(err);
      } else {
        resolve({ address, family });
      }
    });
  });
};

export default class WebsiteCommand extends Command {
  constructor() {
    super('website', {
      aliases: ['website', 'website-info', 'url-info', 'wi'],
      args: [
        {
          id: 'url',
          prompt: {
            retry: `Invalid URL! Try again.`,
            start: `What's the website you want info about?`
          },
          type: 'url'
        }
      ],
      category: 'info',
      cooldown: 10000,
      description: {
        content: 'Gets information about a website',
        usage: '<URL>'
      }
    });
  }

  public async exec(message: Message, { url }: any) {
    try {
      const res = await fetch(url.href);

      const embed = new MessageEmbed();

      if (res.ok) {
        const { address, family } = await getIp(url.host);
        embed
          .setColor(this.client.config.colors!.info)
          .setDescription(`Info about URL ${url.href}`)
          .addField(
            '❯ Website Details',
            stripIndents`
            • Online?: Yes
            • Status Code: ${res.status}
            • Content Type: ${res.headers.get('content-type')}
            `
          )
          .addField(
            '❯ URL Details',
            stripIndents`
            • Href: ${url.href}
            • Host: ${url.host}
            • Protocol: ${url.protocol}
            • IPv${family}: ${address}
            `
          );
      } else {
        embed
          .setColor(this.client.config.colors!.error)
          .setDescription(`Info about URL ${url.href}`)
          .addField(
            '❯ Website Details',
            stripIndents`
            • Online?: No
            • Status Code: ${res.status}
            `
          )
          .addField(
            '❯ URL Details',
            stripIndents`
            • Href: ${url.href}
            • Host: ${url.host}
            • Protocol: ${url.protocol}
            `
          );
      }

      return message.util!.send(embed);
    } catch (error) {
      console.log(error);
      return message.util!.send(
        'An error occurred while getting information about your website'
      );
    }
  }
}
