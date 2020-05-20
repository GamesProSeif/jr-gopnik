import { stripIndents } from 'common-tags';
import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import { COLORS, MESSAGES } from '../../util/constants';

export default class ServerCommand extends Command {
	constructor() {
		super('server', {
			aliases: ['server', 'server-info', 'si'],
			category: 'info',
			channel: 'guild',
			description: {
				content: MESSAGES.COMMANDS.INFO.SERVER.DESCRIPTION.CONTENT
			}
		});
	}

	public exec(message: Message) {
		const guild = message.guild!;

		const embed = new MessageEmbed()
			.setColor(COLORS.INFO)
			.setDescription(MESSAGES.COMMANDS.INFO.SERVER.RESPONSE.DESCRIPTION(guild))
			.setThumbnail(guild.iconURL()!)
			.addField(
				'❯ Channels',
				stripIndents`
				• ${guild.channels.cache.filter(c => c.type === 'text').size} Text, ${guild.channels.cache.filter(c => c.type === 'voice').size} Voice
				• AFK: ${guild.afkChannel ? guild.afkChannel : 'None'}
				`
			)
			.addField(
				'❯ Member',
				stripIndents`
				• ${guild.memberCount} members
				• Owner: ${guild.owner!.user.tag} (ID: ${guild.ownerID})
				`
			)
			.addField(
				'❯ Other',
				MESSAGES.COMMANDS.INFO.SERVER.RESPONSE.FIELD_VALUE(guild)
			);

		return message.util!.send(embed);
	}
}
