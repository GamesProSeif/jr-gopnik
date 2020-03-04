import { stripIndents } from 'common-tags';
import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import { COLORS } from '../../util/constants';

export default class InviteCommand extends Command {
	constructor() {
		super('invite', {
			aliases: ['invite', 'invite-bot'],
			description: {
				content: 'Generates an invite link for adding bot to servers and the official server invite'
			},
			category: 'util'
		});
	}

	public async exec(message: Message) {
		const link = await this.client.generateInvite(['SEND_MESSAGES']);

		const embed = new MessageEmbed()
			.setColor(COLORS.PRIMARY)
			.setTitle('❯ Invites')
			.setDescription(stripIndents`
			• Bot Invite: <${link}>
			• Official Server <https://discord.gg/Jj5xmuK>
			`)
			.setFooter(this.client.user?.tag, this.client.user?.avatarURL()!);

		return message.util!.send(embed);
	}
}
