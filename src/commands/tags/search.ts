import { Command } from 'discord-akairo';
import { Message, MessageEmbed, Util } from 'discord.js';
import { Like } from 'typeorm';
import { COLORS } from '../../util/constants';
import { Tag } from '../../models/tag';

export default class TagSearchCommand extends Command {
	constructor() {
		super('tag-search', {
			description: {
				content: 'Searches for a tag',
				usage: '<tag>',
				examples: ['abc']
			},
			category: 'tags',
			channel: 'guild',
			args: [
				{
					id: 'name',
					type: 'lowercase',
					match: 'content',
					prompt: {
						start: 'What do you want to search for?'
					}
				}
			]
		});
	}

	public async exec(message: Message, { name }: { name: string }) {
		const tagsRepo = this.client.db.getRepository(Tag);
		name = Util.cleanContent(name, message);
		const tags = await tagsRepo.find({ name: Like(`%${name}%`) });

		if (!tags.length) return message.util!.reply(`No results found with query ${name}.`);

		const search = tags
			.map((tag: Tag) => `\`${tag.name}\``)
			.sort()
			.join(', ');
		if (search.length >= 1950) {
			return message.util!.reply('output was too long! Be more specifc');
		}
		const embed = new MessageEmbed()
			.setColor(COLORS.INFO)
			.setAuthor(`${message.author!.tag} (ID: ${message.author!.id})`, message.author!.displayAvatarURL())
			.setDescription(search);

		return message.util!.send(embed);
	}
}
