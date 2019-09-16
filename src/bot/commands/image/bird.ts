import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';

class BirdCommand extends Command {
	constructor() {
		super('bird', {
			aliases: ['bird', 'birds', 'birb'],
			category: 'image',
			description: {
				content: 'Sends a random bird image'
			}
		});
	}

	public async exec(message: Message) {
		const { link } = await (await fetch(
			'https://some-random-api.ml/img/birb'
		)).json();

		const embed = new MessageEmbed()
			.setColor(this.client.config.colors!.secondary)
			.setImage(link)
			.setFooter('Powered by Some Random API');

		return message.util!.send(embed);
	}
}

module.exports = BirdCommand;
