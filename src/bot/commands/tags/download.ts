import { Command } from 'discord-akairo';
import { GuildMember, Message } from 'discord.js';
import { TagModel } from '../../../models/tag';

export default class TagDownloadCommand extends Command {
	constructor() {
		super('tag-download', {
			description: {
				content: 'Downloads tags of the guild in a txt file',
				usage: '[member]',
				examples: ['', 'GamesProSeif']
			},
			category: 'tags',
			channel: 'guild',
			args: [
				{
					id: 'member',
					type: 'member',
					match: 'content'
				}
			]
		});
	}

	public async exec(message: Message, { member }: { member: GuildMember }) {
		const query = member
			? { user: member.user.id, guild: message.guild!.id }
			: { guild: message.guild!.id };
		const tags = await TagModel.find(query);
		if (!tags.length) return;
		const output = tags.reduce((out, t) => {
			out += `Name: ${t.name}\r\nContent:\r\n${t.content.replace(
				/\n/g,
				'\r\n'
			)}\r\n\r\n========================================\r\n\r\n`;
			return out;
		}, '');

		return message.util!.send('There you go', {
			files: [
				{
					attachment: Buffer.from(output, 'utf8'),
					name: `${member ? `${member.displayName}s_tags` : 'all_tags'}.txt`
				}
			]
		});
	}
}
