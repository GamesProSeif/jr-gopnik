import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import { MESSAGES, PERMISSIONS_MAP } from '../../util/constants';

export default class RoleCommand extends Command {
	constructor() {
		super('role', {
			aliases: ['role', 'role-info', 'ri'],
			description: {
				content: MESSAGES.COMMANDS.INFO.ROLE.DESCRIPTION.CONTENT,
				usage: MESSAGES.COMMANDS.INFO.ROLE.DESCRIPTION.USAGE
			},
			category: 'info',
			channel: 'guild',
			args: [
				{
					id: 'role',
					prompt: {
						start: MESSAGES.COMMANDS.INFO.ROLE.ARGS.ROLE.PROMPT.START,
						retry: MESSAGES.COMMANDS.INFO.ROLE.ARGS.ROLE.PROMPT.RETRY
					},
					type: 'role'
				}
			]
		});
	}

	public exec(message: Message, args: any) {
		const role = args.role;

		const permissions = Object.keys(PERMISSIONS_MAP).filter(
			permission => role.permissions.serialize()[permission]
		);
		const permsList = permissions.includes('ADMINISTRATOR')
			? ['ADMINISTRATOR']
			: permissions;
		const formatPerms =
			permsList.map(perm => `• ${(PERMISSIONS_MAP as any)[perm]}`).join('\n') || 'None';

		const embed = new MessageEmbed()
			.setColor(role.color)
			.setDescription(MESSAGES.COMMANDS.INFO.ROLE.RESPONSE.DESCRIPTION(role))
			.setThumbnail(message.guild!.iconURL()!)
			.addField(
				MESSAGES.COMMANDS.INFO.ROLE.RESPONSE.FIELD_NAME,
				MESSAGES.COMMANDS.INFO.ROLE.RESPONSE.FIELD_VALUE(role)
			)
			.addField(MESSAGES.COMMANDS.INFO.ROLE.RESPONSE.FIELD2_NAME, formatPerms);

		return message.util!.send(embed);
	}
}
