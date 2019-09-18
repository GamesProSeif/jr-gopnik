import { stripIndents } from 'common-tags';
import { Command } from 'discord-akairo';
import {
	GuildChannel,
	Message,
	MessageEmbed,
	TextChannel,
	VoiceChannel
} from 'discord.js';
import * as moment from 'moment';

export default class ChannelCommand extends Command {
	constructor() {
		super('channel', {
			aliases: ['channel', 'channel-info', 'ci'],
			args: [
				{
					'default': (message: Message) => message.channel,
					'id': 'channel',
					'prompt': {
						optional: true,
						retry: `That's not a valid channel! Try again.`,
						start: `What's the channel you want information about?`
					},
					'type': 'channel'
				}
			],
			category: 'info',
			channel: 'guild',
			description: {
				content: 'Displays information about a channel',
				usage: '<#channel>'
			}
		});
	}

	public exec(message: Message, args: any) {
		const channel = args.channel as GuildChannel;

		const embed = new MessageEmbed()
			.setColor(this.client.config.colors!.info)
			.setDescription(`Info about **${channel.name}** (ID: ${channel.id})`)
			.setThumbnail(message.guild!.iconURL()!)
			.addField(
				'❯ General Info',
				stripIndents`
        • Type: ${channel.type}
        • Position: ${channel.position}
        • Creation Date: ${moment.utc(channel.createdAt).format(
		'dddd, MMMM Do YYYY, h:mm:ss A [UTC]'
	)}
        `
			);

		if (channel.type === 'text') {
			const textChannel = channel as TextChannel;
			embed.addField(
				'❯ Text Info',
				stripIndents`
        • Topic: ${textChannel.topic ? textChannel.topic : 'None'}
        • NSFW: ${Boolean(textChannel.nsfw)}
        • Viewable by: ${textChannel.members.size} members
        • Last message by: ${textChannel.lastMessage!.author}
        `
			);
		}

		if (channel.type === 'voice') {
			const voiceChanenl = channel as VoiceChannel;
			embed.addField(
				'❯ Voice Info',
				stripIndents`
        • Bitrate: ${voiceChanenl.bitrate}
        • Limit: ${
	voiceChanenl.userLimit ? voiceChanenl.userLimit : 'unlimited'
}
        • Member Count: ${voiceChanenl.members.size}
        `
			);
		}

		return message.util!.send(embed);
	}
}
