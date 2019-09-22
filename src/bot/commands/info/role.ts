import { stripIndents } from 'common-tags';
import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import * as moment from 'moment';

const PERMISSIONS: any = {
	ADD_REACTIONS: 'Add reactions',
	ADMINISTRATOR: 'Administrator',
	ATTACH_FILES: 'Attach files',
	BAN_MEMBERS: 'Ban members',
	CHANGE_NICKNAME: 'Change nickname',
	CONNECT: 'Connect',
	CREATE_INSTANT_INVITE: 'Create instant invite',
	DEAFEN_MEMBERS: 'Deafen members',
	EMBED_LINKS: 'Embed links',
	KICK_MEMBERS: 'Kick members',
	MANAGE_CHANNELS: 'Manage channels',
	MANAGE_EMOJIS: 'Manage emojis',
	MANAGE_GUILD: 'Manage server',
	MANAGE_MESSAGES: 'Manage messages',
	MANAGE_NICKNAMES: 'Manage nicknames',
	MANAGE_ROLES: 'Manage roles',
	MANAGE_WEBHOOKS: 'Manage webhooks',
	MENTION_EVERYONE: 'Mention everyone',
	MOVE_MEMBERS: 'Move members',
	MUTE_MEMBERS: 'Mute members',
	READ_MESSAGE_HISTORY: 'Read message history',
	SEND_MESSAGES: 'Send messages',
	SEND_TTS_MESSAGES: 'Send TTS messages',
	SPEAK: 'Speak',
	USE_EXTERNAL_EMOJIS: 'Use external emojis',
	USE_VAD: 'Use voice activity',
	VIEW_AUDIT_LOG: 'View audit log',
	VIEW_CHANNEL: 'Read text channels and see voice channels'
};

export default class RoleCommand extends Command {
	constructor() {
		super('role', {
			aliases: ['role', 'role-info', 'ri'],
			args: [
				{
					id: 'role',
					prompt: {
						retry: `That's not a valid role! Try again.`,
						start: `What's the role you want information about?`
					},
					type: 'role'
				}
			],
			category: 'info',
			channel: 'guild',
			description: {
				content: 'Displays information about a role',
				usage: '<role>'
			}
		});
	}

	public exec(message: Message, args: any) {
		const role = args.role;

		const permissions = Object.keys(PERMISSIONS).filter(
			permission => role.permissions.serialize()[permission]
		);
		const permsList = permissions.includes('ADMINISTRATOR')
			? ['ADMINISTRATOR']
			: permissions;
		const formatPerms =
			permsList.map(perm => `• ${PERMISSIONS[perm]}`).join('\n') || 'None';

		const embed = new MessageEmbed()
			.setColor(role.color)
			.setDescription(`Info about **${role.name}** (ID: ${role.id})`)
			.setThumbnail(message.guild!.iconURL()!)
			.addField(
				'❯ Info',
				stripIndents`
				• Color: ${role.hexColor.toUpperCase()}\n• Hoisted: ${role.hoist ? 'Yes' : 'No'}
				• Position: ${role.position}
				• Mentionable: ${role.mentionable ? 'Yes' : 'No'}
				• Creation Date: ${moment.utc(role.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss A [UTC]')}
				`
			)
			.addField('❯ Permissions', formatPerms);

		return message.util!.send(embed);
	}
}
