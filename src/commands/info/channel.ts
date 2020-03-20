import { Command } from 'discord-akairo';
import {
	GuildChannel,
	Message,
	MessageEmbed,
	TextChannel,
	VoiceChannel
} from 'discord.js';
import { COLORS, MESSAGES } from '../../util/constants';

export default class ChannelCommand extends Command {
	constructor() {
		super('channel', {
			aliases: ['channel', 'channel-info', 'ci'],
			description: {
				content: MESSAGES.COMMANDS.INFO.CHANNEL.DESCRIPTION.CONTENT,
				usage: MESSAGES.COMMANDS.INFO.CHANNEL.DESCRIPTION.USAGE
			},
			category: 'info',
			channel: 'guild',
			args: [
				{
					'default': (message: Message) => message.channel,
					'id': 'channel',
					'prompt': {
						start: MESSAGES.COMMANDS.INFO.CHANNEL.ARGS.CHANNEL.PROMPT.START,
						retry: MESSAGES.COMMANDS.INFO.CHANNEL.ARGS.CHANNEL.PROMPT.RETRY,
						optional: true
					},
					'type': 'channel'
				}
			]
		});
	}

	public exec(message: Message, args: any) {
		const channel = args.channel as GuildChannel;

		const embed = new MessageEmbed()
			.setColor(COLORS.INFO)
			.setDescription(MESSAGES.COMMANDS.INFO.CHANNEL.RESPONSE.GENERAL.DESCRIPTION(channel))
			.setThumbnail(message.guild!.iconURL()!)
			.addField(
				MESSAGES.COMMANDS.INFO.CHANNEL.RESPONSE.GENERAL.FIELD_NAME,
				MESSAGES.COMMANDS.INFO.CHANNEL.RESPONSE.GENERAL.FIELD_VALUE(channel)
			);

		if (channel.type === 'text') {
			embed.addField(
				MESSAGES.COMMANDS.INFO.CHANNEL.RESPONSE.TEXT.FIELD_NAME,
				MESSAGES.COMMANDS.INFO.CHANNEL.RESPONSE.TEXT.FIELD_VALUE(channel as TextChannel)
			);
		}

		if (channel.type === 'voice') {
			embed.addField(
				MESSAGES.COMMANDS.INFO.CHANNEL.RESPONSE.VOICE.FIELD_NAME,
				MESSAGES.COMMANDS.INFO.CHANNEL.RESPONSE.VOICE.FIELD_VALUE(channel as VoiceChannel)
			);
		}

		return message.util!.send(embed);
	}
}
