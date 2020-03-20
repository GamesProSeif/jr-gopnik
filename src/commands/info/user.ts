import { Command } from 'discord-akairo';
import { GuildMember, Message, MessageEmbed } from 'discord.js';
import { COLORS, MESSAGES } from '../../util/constants';

export default class UserCommand extends Command {
	constructor() {
		super('user', {
			aliases: ['user', 'user-info', 'ui'],
			description: {
				content: MESSAGES.COMMANDS.INFO.USER.DESCRIPTION.CONTENT,
				usage: MESSAGES.COMMANDS.INFO.USER.DESCRIPTION.USAGE
			},
			category: 'info',
			channel: 'guild',
			args: [
				{
					'default': (msg: Message) => msg.member,
					'id': 'member',
					'type': 'member'
				}
			]
		});
	}

	public exec(message: Message, { member }: { member: GuildMember }) {
		const user = member.user;

		const embed = new MessageEmbed()
			.setColor(COLORS.INFO)
			.setDescription(MESSAGES.COMMANDS.INFO.USER.RESPONSE.DESCRIPTION(user))
			.addField(
				MESSAGES.COMMANDS.INFO.USER.RESPONSE.MEMBER.NAME,
				MESSAGES.COMMANDS.INFO.USER.RESPONSE.MEMBER.VALUE(member),
				true
			)
			.addField(
				MESSAGES.COMMANDS.INFO.USER.RESPONSE.USER.NAME,
				MESSAGES.COMMANDS.INFO.USER.RESPONSE.USER.VALUE(user),
				true
			);

		return message.util!.send(embed);
	}
}
