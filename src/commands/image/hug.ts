import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
import { COLORS, MESSAGES, SRA_LINK } from '../../util/constants';

export default class HugCommand extends Command {
	constructor() {
		super('hug', {
			aliases: ['hug'],
			args: [
				{
					id: 'member',
					type: 'member'
				}
			],
			category: 'image',
			description: {
				content: MESSAGES.COMMANDS.IMAGE.SRA.DESCRIPTION.CONTENT('hug')
			}
		});
	}

	public async exec(message: Message, { member }: any) {
		const { link } = await (await fetch(SRA_LINK('/animu/hug'))).json();

		const embed = new MessageEmbed()
			.setColor(COLORS.SECONDARY)
			.setImage(link)
			.setFooter(MESSAGES.COMMANDS.IMAGE.SRA.POWERED_BY);

		return message.util!.send({
			content: member ? `Hugs ${member}` : null,
			embed
		});
	}
}
