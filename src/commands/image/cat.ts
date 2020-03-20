import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
import { COLORS, MESSAGES, SRA_LINK } from '../../util/constants';

export default class CatCommand extends Command {
	constructor() {
		super('cat', {
			aliases: ['cat', 'cats', 'meow'],
			category: 'image',
			description: {
				content: MESSAGES.COMMANDS.IMAGE.SRA.DESCRIPTION.CONTENT('cat')
			}
		});
	}

	public async exec(message: Message) {
		const { link } = await (await fetch(SRA_LINK('/img/cat'))).json();

		const embed = new MessageEmbed()
			.setColor(COLORS.SECONDARY)
			.setImage(link)
			.setFooter(MESSAGES.COMMANDS.IMAGE.SRA.POWERED_BY);

		return message.util!.send(embed);
	}
}
