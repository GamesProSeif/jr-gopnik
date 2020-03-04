import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
import { COLORS } from '../../util/constants';

export default class DogCommand extends Command {
	constructor() {
		super('dog', {
			aliases: ['dog', 'dogs', 'doggo', 'woof'],
			category: 'image',
			description: {
				content: 'Sends a random dog image'
			}
		});
	}

	public async exec(message: Message) {
		const { link } = await (await fetch(
			'https://some-random-api.ml/img/dog'
		)).json();

		const embed = new MessageEmbed()
			.setColor(COLORS.SECONDARY)
			.setImage(link)
			.setFooter('Powered by Some Random API');

		return message.util!.send(embed);
	}
}
