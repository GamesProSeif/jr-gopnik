import { Command } from 'discord-akairo';
import { GuildMember, Message, MessageEmbed, ImageURLOptions } from 'discord.js';
import { COLORS, MESSAGES } from '../../util/constants';

class AvatarCommand extends Command {
	constructor() {
		super('avatar', {
			aliases: ['avatar', 'av'],
			category: 'info',
			description: {
				content: MESSAGES.COMMANDS.INFO.AVATAR.DESCRIPTION.CONTENT,
				usage: MESSAGES.COMMANDS.INFO.AVATAR.DESCRIPTION.USAGE,
				examples: MESSAGES.COMMANDS.INFO.AVATAR.DESCRIPTION.EXAMPLES
			},
			args: [
				{
					'id': 'member',
					'default': (message: Message) => message.member,
					'prompt': {
						optional: true,
						start: MESSAGES.COMMANDS.INFO.AVATAR.ARGS.MEMBER.PROMPT.START,
						retry: MESSAGES.COMMANDS.INFO.AVATAR.ARGS.MEMBER.PROMPT.RETRY
					},
					'type': 'member'
				},
				{
					'id': 'format',
					'match': 'option',
					'flag': ['format:', 'f:'],
					'default': 'auto',
					'prompt': {
						start: MESSAGES.COMMANDS.INFO.AVATAR.ARGS.FORMAT.PROMPT.START,
						retry: MESSAGES.COMMANDS.INFO.AVATAR.ARGS.FORMAT.PROMPT.RETRY,
						optional: true
					},
					'type': [['auto'], ['webp', 'web'], ['jpg', 'jpeg'], ['png'], ['gif']]
				},
				{
					'id': 'size',
					'type': ['16', '32', '64', '128', '256', '512', '1024', '2048'],
					'match': 'option',
					'flag': ['size:', 's:'],
					'default': '2048',
					'prompt': {
						start: MESSAGES.COMMANDS.INFO.AVATAR.ARGS.SIZE.PROMPT.START,
						retry: MESSAGES.COMMANDS.INFO.AVATAR.ARGS.SIZE.PROMPT.RETRY,
						optional: true
					}
				}
			]
		});
	}

	public exec(message: Message, { member, size, format }: { member: GuildMember; size: string; format: string }) {
		const imageOptions: { size: number; format?: string } = {
			size: parseInt(size, 10)
		};

		if (format !== 'auto') {
			imageOptions.format = !member.user!.avatar!.startsWith('a_') && format === 'gif'
				? (imageOptions.format = 'webp')
				: format;
		}
		const link = member.user.displayAvatarURL(imageOptions as ImageURLOptions);

		const embed = new MessageEmbed()
			.setColor(COLORS.PRIMARY)
			.setTitle('Avatar')
			.setDescription(MESSAGES.COMMANDS.INFO.AVATAR.RESPONSE(member))
			.setImage(link)
			.setURL(link);

		return message.util!.send(embed);
	}
}

module.exports = AvatarCommand;
