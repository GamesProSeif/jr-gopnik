import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import { lookup } from 'dns';
import fetch from 'node-fetch';
import { promisify } from 'util';
import { COLORS, TOPICS, MESSAGES } from '../../util/constants';
import { URL } from 'url';

const getIp = promisify(lookup);

export default class WebsiteCommand extends Command {
	constructor() {
		super('website', {
			aliases: ['website', 'website-info', 'url-info', 'wi'],
			description: {
				content: MESSAGES.COMMANDS.INFO.WEBSITE.DESCRIPTION.CONTENT,
				usage: MESSAGES.COMMANDS.INFO.WEBSITE.DESCRIPTION.USAGE
			},
			category: 'info',
			cooldown: 10000,
			args: [
				{
					id: 'url',
					prompt: {
						start: MESSAGES.COMMANDS.INFO.WEBSITE.ARGS.URL.PROMPT.START,
						retry: MESSAGES.COMMANDS.INFO.WEBSITE.ARGS.URL.PROMPT.RETRY
					},
					type: 'url'
				}
			]
		});
	}

	public async exec(message: Message, { url }: { url: URL }) {
		try {
			const res = await fetch(url.href);

			const embed = new MessageEmbed();

			if (res.ok) {
				const { address, family } = await getIp(url.host);
				embed
					.setColor(COLORS.INFO)
					.setDescription(MESSAGES.COMMANDS.INFO.WEBSITE.RESPONSE.SUCCESS.DESCRIPTION(url))
					.addField(
						MESSAGES.COMMANDS.INFO.WEBSITE.RESPONSE.SUCCESS.WEBSITE_NAME,
						MESSAGES.COMMANDS.INFO.WEBSITE.RESPONSE.SUCCESS.WEBSITE_VALUE(res)
					)
					.addField(
						MESSAGES.COMMANDS.INFO.WEBSITE.RESPONSE.SUCCESS.URL_NAME,
						MESSAGES.COMMANDS.INFO.WEBSITE.RESPONSE.SUCCESS.URL_VALUE(url, family, address)
					);
			} else {
				embed
					.setColor(COLORS.ERROR)
					.setDescription(MESSAGES.COMMANDS.INFO.WEBSITE.RESPONSE.FAIL.DESCRIPTION)
					.addField(
						MESSAGES.COMMANDS.INFO.WEBSITE.RESPONSE.FAIL.WEBSITE_NAME,
						MESSAGES.COMMANDS.INFO.WEBSITE.RESPONSE.FAIL.WEBSITE_VALUE(res)
					)
					.addField(
						MESSAGES.COMMANDS.INFO.WEBSITE.RESPONSE.FAIL.URL_NAME,
						MESSAGES.COMMANDS.INFO.WEBSITE.RESPONSE.FAIL.URL_VALUE(url)
					);
			}

			return message.util!.send(embed);
		} catch (error) {
			this.client.logger.error(error, {
				topic: TOPICS.DISCORD
			});
			return message.util!.send(MESSAGES.COMMANDS.INFO.WEBSITE.RESPONSE.ERROR);
		}
	}
}
