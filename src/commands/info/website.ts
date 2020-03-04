import { stripIndents } from 'common-tags';
import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import { lookup } from 'dns';
import fetch from 'node-fetch';
import { promisify } from 'util';
import { COLORS, TOPICS } from '../../util/constants';

const getIp = promisify(lookup);

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
					.setColor(COLORS.INFO)
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
					.setColor(COLORS.ERROR)
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
			this.client.logger.error(error, {
				topic: TOPICS.DISCORD
			});
			return message.util!.send(
				'An error occurred while getting information about your website'
			);
		}
	}
}
