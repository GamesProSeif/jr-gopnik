import { stripIndents } from 'common-tags';
import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import { COLORS } from '../../util/constants';

export default class PingCommand extends Command {
	constructor() {
		super('ping', {
			aliases: ['ping'],
			category: 'util',
			description: {
				content: 'Displays response time'
			}
		});
	}

	public async exec(message: Message) {
		const sent = (await message.util!.send('Pinging...')) as Message;
		const botPing = Math.round(
			sent.createdTimestamp - message.createdTimestamp
		);
		const botHeartbeat = Math.round(this.client.ws.ping);

		const embed = new MessageEmbed()
			.setColor(COLORS.PRIMARY)
			.setTitle('Pong!')
			.setDescription(
				stripIndents`
				⏰ ${botPing} ms
				💓 ${botHeartbeat} ms
				`
			);

		return sent.edit({ content: null, embed });
	}
}
