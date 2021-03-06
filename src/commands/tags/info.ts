import { Command } from 'discord-akairo';
import { Message, MessageEmbed, User } from 'discord.js';
import * as moment from 'moment';
import { COLORS } from '../../util/constants';
import { Tag } from '../../models/tag';

export default class TagInfoCommand extends Command {
	constructor() {
		super('tag-info', {
			description: {
				content: 'Displays information about a tag',
				usage: '<tag>',
				examples: ['abc']
			},
			category: 'tags',
			channel: 'guild',
			args: [
				{
					id: 'tag',
					match: 'content',
					type: 'tag',
					prompt: {
						start: 'What tag do you want information about?',
						retry: (_: Message, { failure }: { failure: { value: string } }) =>
							`a tag with the name **${failure.value}** does not exist.`
					}
				}
			]
		});
	}

	public async exec(message: Message, { tag }: { tag: Tag }) {
		const user = await this.client.users.fetch(tag.user);
		let lastModified: User | null;
		try {
			lastModified = await this.client.users.fetch(tag.lastModified!);
		} catch (error) {
			lastModified = null;
		}
		const guild = this.client.guilds.cache.get(tag.guild);

		const embed = new MessageEmbed()
			.setColor(COLORS.INFO)
			.addField('❯ Name', tag.name)
			.addField('❯ User', user ? `${user.tag} (ID: ${user.id})` : "Couldn't fetch user.")
			.addField('❯ Guild', guild ? `${guild.name}` : "Couldn't fetch guild.")
			.addField('❯ Aliases', tag.aliases.length ? tag.aliases.map(t => `\`${t}\``).sort().join(', ') : 'No aliases.')
			.addField('❯ Uses', tag.uses)
			.addField('❯ Created at', moment.utc(tag.createdAt).format('DD/MM/YYYY hh:mm:ss [UTC]'))
			.addField('❯ Modified at', moment.utc(tag.updatedAt).format('DD/MM/YYYY hh:mm:ss [UTC]'));
		if (lastModified) {
			embed.addField('❯ Last modified by', lastModified ? `${lastModified.tag} (ID: ${lastModified.id})` : "Couldn't fetch user.");
		}

		return message.util!.send(embed);
	}
}
