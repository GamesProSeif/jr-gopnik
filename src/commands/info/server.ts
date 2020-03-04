import { stripIndents } from 'common-tags';
import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import * as moment from 'moment';
import { COLORS } from '../../util/constants';

const HUMAN_LEVELS = {
	NONE: 'None',
	LOW: 'Low',
	MEDIUM: 'Medium',
	HIGH: '(╯°□°）╯︵ ┻━┻',
	VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};

export default class ServerCommand extends Command {
	constructor() {
		super('server', {
			aliases: ['server', 'server-info', 'si'],
			category: 'info',
			channel: 'guild',
			description: {
				content: 'Displays information about a server'
			}
		});
	}

	public exec(message: Message) {
		const guild = message.guild!;

		const embed = new MessageEmbed()
			.setColor(COLORS.INFO)
			.setDescription(`Info about **${guild.name}** (ID: ${guild.id})`)
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
				stripIndents`
				• Roles: ${guild.roles.cache.size}
				• Region: ${guild.region}
				• Creation Date: ${moment.utc(guild.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss A [UTC]')}
				• Verification Level: ${HUMAN_LEVELS[guild.verificationLevel]}
				• Nitro Server Boosts: ${guild.premiumSubscriptionCount || 0}
				`
			);

		return message.util!.send(embed);
	}
}
