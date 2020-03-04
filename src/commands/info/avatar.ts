import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import { COLORS } from '../../util/constants';

class AvatarCommand extends Command {
	constructor() {
		super('avatar', {
			aliases: ['avatar', 'av'],
			category: 'info',
			description: {
				content:
					'Displays the avatar of a member\n**Available arguments**\n• Format: `webp`, `jpg`, `png`, `gif`\n• Size: `16`, `32`, `64`, `128`, `256`, `512`, `1024`, `2048`',
				usage: '[member] [format:] [size:]',
				examples: ['format:jpg', 'xPLEBx size:64', 'Noob101 f:png s:512']
			},
			args: [
				{
					'default': (message: Message) => message.member,
					'id': 'member',
					'prompt': {
						optional: true,
						retry: `Invalid member! Try again.`,
						start: `Who do you want to view the avatar of?`
					},
					'type': 'member'
				},
				{
					'id': 'format',
					'match': 'option',
					'flag': ['format:', 'f:'],
					'default': 'auto',
					'prompt': {
						start: `What's the format of the avatar? (auto, webp, jpg, png, gif)`,
						retry: `Invalid format! Try again. (auto, webp, jpg, png, gif)`,
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
						start: `What's the size of the avatar? (16, 32, 64, 128, 256, 512, 1024, 2048)`,
						retry: `Invalid size! Try again. (16, 32, 64, 128, 256, 512, 1024, 2048)`,
						optional: true
					}
				}
			]
		});
	}

	public exec(message: Message, args: any) {
		const imageOptions: { size: number; format?: string } = {
			size: parseInt(args.size, 10)
		};

		if (args.format !== 'auto') {
			imageOptions.format = !args.member.user.avatar.startsWith('a_') && args.format === 'gif'
				? (imageOptions.format = 'webp')
				: args.format;
		}
		const link = args.member.user.displayAvatarURL(imageOptions);

		const embed = new MessageEmbed()
			.setColor(COLORS.PRIMARY)
			.setTitle('Avatar')
			.setDescription(
				`Viewing avatar of **${args.member.user.tag}** (ID: ${args.member.id})`
			)
			.setImage(link)
			.setURL(link);

		return message.util!.send(embed);
	}
}

module.exports = AvatarCommand;
