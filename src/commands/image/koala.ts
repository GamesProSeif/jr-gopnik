import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
import { COLORS, MESSAGES, SRA_LINK } from '../../util/constants';

export default class KoalaCommand extends Command {
	constructor() {
		super('koala', {
			aliases: ['koala'],
			category: 'image',
			description: {
				content: MESSAGES.COMMANDS.IMAGE.SRA.DESCRIPTION.CONTENT('koala')
			}
		});
	}

	public async exec(message: Message) {
		const { link } = await (await fetch(SRA_LINK('/img/koala'))).json();

		const embed = new MessageEmbed()
			.setColor(COLORS.SECONDARY)
			.setImage(link)
			.setFooter(MESSAGES.COMMANDS.IMAGE.SRA.POWERED_BY);

		return message.util!.send(embed);
	}
}
