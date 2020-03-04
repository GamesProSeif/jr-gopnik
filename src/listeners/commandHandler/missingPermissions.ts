import { Command, Listener } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import { COLORS } from '../../util/constants';

const PERMISSIONS: any = {
	ADMINISTRATOR: 'Administrator',
	VIEW_AUDIT_LOG: 'View audit log',
	MANAGE_GUILD: 'Manage server',
	MANAGE_ROLES: 'Manage roles',
	MANAGE_CHANNELS: 'Manage channels',
	KICK_MEMBERS: 'Kick members',
	BAN_MEMBERS: 'Ban members',
	CREATE_INSTANT_INVITE: 'Create instant invite',
	CHANGE_NICKNAME: 'Change nickname',
	MANAGE_NICKNAMES: 'Manage nicknames',
	MANAGE_EMOJIS: 'Manage emojis',
	MANAGE_WEBHOOKS: 'Manage webhooks',
	VIEW_CHANNEL: 'Read text channels and see voice channels',
	SEND_MESSAGES: 'Send messages',
	SEND_TTS_MESSAGES: 'Send TTS messages',
	MANAGE_MESSAGES: 'Manage messages',
	EMBED_LINKS: 'Embed links',
	ATTACH_FILES: 'Attach files',
	READ_MESSAGE_HISTORY: 'Read message history',
	MENTION_EVERYONE: 'Mention everyone',
	USE_EXTERNAL_EMOJIS: 'Use external emojis',
	ADD_REACTIONS: 'Add reactions',
	CONNECT: 'Connect',
	SPEAK: 'Speak',
	MUTE_MEMBERS: 'Mute members',
	DEAFEN_MEMBERS: 'Deafen members',
	MOVE_MEMBERS: 'Move members',
	USE_VAD: 'Use voice activity'
};

export default class MissingPermissionsListener extends Listener {
	constructor() {
		super('missingPermissions', {
			emitter: 'commandHandler',
			event: 'missingPermissions',
			category: 'commandHandler'
		});
	}

	public exec(
		message: Message,
		_: Command,
		type: 'client' | 'user',
		missingPerms: string[]
	) {
		const mappedPerms = missingPerms.map(p => `• ${PERMISSIONS[p] || p}`);

		if (type === 'client') {
			const embed = new MessageEmbed()
				.setColor(COLORS.ERROR)
				.setTitle('Missing Permission(s)')
				.setDescription(
					`I'm missing the following permission(s):\n\n${mappedPerms.join(
						'\n'
					)}`
				);

			return message.util!.send(embed);
		} else if (type === 'user') {
			const embed = new MessageEmbed()
				.setColor(COLORS.ERROR)
				.setTitle('Missing Permission(s)')
				.setDescription(
					`You are missing the following permission(s):\n\n${mappedPerms.join(
						'\n'
					)}`
				);

			return message.util!.send(embed);
		}
		return undefined;
	}
}
