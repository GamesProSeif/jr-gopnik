import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
import { COLORS, MESSAGES, REGEX } from '../../util/constants';

export default class IpCommand extends Command {
	constructor() {
		super('ip', {
			aliases: ['ip', 'ip-info', 'get-ip'],
			description: {
				content: MESSAGES.COMMANDS.INFO.IP.DESCRIPTION.CONTENT,
				usage: MESSAGES.COMMANDS.INFO.IP.DESCRIPTION.USAGE,
				examples: MESSAGES.COMMANDS.INFO.IP.DESCRIPTION.EXAMPLES
			},
			category: 'info',
			cooldown: 30000,
			args: [
				{
					id: 'ip',
					prompt: {
						start: MESSAGES.COMMANDS.INFO.IP.ARGS.IP.PROMPT.START,
						retry: MESSAGES.COMMANDS.INFO.IP.ARGS.IP.PROMPT.RETRY
					},
					type: REGEX.IP
				}
			]
		});
	}

	public async exec(message: Message, args: any) {
		const sent = (await message.util!.send(MESSAGES.COMMANDS.INFO.IP.RESPONSE.GETTING_INFO)) as Message;
		const ip: string = args.ip.match[args.ip.match.index];
		const url = process.env.IPINFO_API_KEY! + ip;
		const response = await fetch(url);
		const json = await response.json();

		const embed = new MessageEmbed()
			.setColor(COLORS.INFO)
			.setTitle(MESSAGES.COMMANDS.INFO.IP.RESPONSE.TITLE(json))
			.setDescription(MESSAGES.COMMANDS.INFO.IP.RESPONSE.DESCRIPTION(json));

		return sent.edit({
			content: null,
			embed
		});
	}
}
