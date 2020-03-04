import { Command } from 'discord-akairo';
import { GuildMember, Message, MessageEmbed } from 'discord.js';
import { COLORS } from '../../util/constants';
import { Tag } from '../../models/tag';

export default class TagListCommand extends Command {
	constructor() {
		super('tag-list', {
			aliases: ['tags'],
			description: {
				content: 'Lists tags in a guild or for a member',
				usage: '[member]',
				examples: ['', 'GamesProSeif']
			},
			category: 'tags',
			channel: 'guild',
			args: [
				{
					id: 'member',
					type: 'member'
				}
			]
		});
	}

	public async exec(message: Message, { member }: { member: GuildMember }) {
		const tagsRepo = this.client.db.getRepository(Tag);
		const embed = new MessageEmbed().setColor(COLORS.INFO);
		let tags: Tag[];
		if (member) {
			tags = await tagsRepo.find({ user: member.id, guild: message.guild!.id });

			if (!tags.length) {
				if (member.id === message.author!.id) {
					return message.util!.reply('You do not have any tags');
				}
				return message.util!.reply(
					`**${member.user.tag} does not have any tags`
				);
			}

			embed
				.setAuthor(
					`${member.user.tag} (ID: ${member.id})`,
					member.user.displayAvatarURL()
				)
				.setDescription(
					tags
						.map(tag => `\`${tag.name}\``)
						.sort()
						.join(', ')
				);

			return message.util!.send(embed);
		}
		tags = await tagsRepo.find({ guild: message.guild!.id });
		if (!tags.length) {
			return message.util!.send(
				`**${message.guild!.name}** doesn't have any tags.`
			);
		}

		const hoistedTags = tags
			.filter(tag => tag.hoisted)
			.map(tag => `\`${tag.name}\``)
			.sort()
			.join(', ');
		const userTags = tags
			.filter(tag => !tag.hoisted)
			.filter(tag => tag.user === message.author!.id)
			.map(tag => `\`${tag.name}\``)
			.sort()
			.join(', ');

		embed.setAuthor(
			`${message.author!.tag} (ID: ${message.author!.id})`,
			message.author!.displayAvatarURL()
		);
		if (hoistedTags) embed.addField('❯ Tags', hoistedTags);
		if (userTags) {
			embed.addField(`❯ ${message.member!.displayName}'s tags`, userTags);
		}

		return message.util!.send(embed);
	}
}
