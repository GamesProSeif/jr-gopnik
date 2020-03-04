import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { Tag } from '../../models/tag';

export default class TagAliasCommand extends Command {
	constructor() {
		super('tag-alias', {
			description: {
				content: 'Adds/removes aliases in a tag',
				usage: '<tag> <add/del> <alias>',
				examples: ['abc --add xyz', 'abc --del xyz']
			},
			category: 'tags',
			channel: 'guild',
			flags: ['--add', '--del']
		});
	}

	public *args() {
		const first = yield {
			type: 'tag',
			prompt: {
				start: 'What is the tag you to alias?',
				retry: (_: Message, { failure }: { failure: { value: string } }) =>
					`A tag with the name **${failure.value}** does not exist.`
			}
		};

		const add = yield {
			match: 'flag',
			flag: '--add'
		};

		const del = yield {
			match: 'flag',
			flag: 'del'
		};

		const second = yield add
			? {
				match: 'rest',
				type: 'existingTag',
				prompt: {
					start: 'What is the alias you want to apply to this tag?',
					retry: (_: Message, { failure }: { failure: { value: string } }) =>
						`A tag with the name **${failure.value}** already exists.`
				}
			}
			: {
				match: 'rest',
				type: 'string',
				prompt: {
					start: 'What is the alias you want to remove from this tag'
				}
			};

		return { first, add, del, second };
	}

	public async exec(
		message: Message,
		{
			first,
			add,
			del,
			second
		}: { first: Tag; add: boolean; del: boolean; second: string }
	) {
		const tagsRepo = this.client.db.getRepository(Tag);
		if (add) {
			if (second && second.length >= 1900) {
				return message.util!.reply('Tag name is too long');
			}
			first.aliases.push(second);
		} else if (del) {
			const index = first.aliases.indexOf(second);
			first.aliases.splice(index, 1);
		} else {
			return message.util!.reply(
				'You have to either choose `--add` or `--del`.'
			);
		}
		first.lastModified = message.author!.id;
		await tagsRepo.save(first);

		return message.util!.reply(
			`alias **${second.substring(0, 1900)}** ${
				add ? 'added to' : 'deleted from'
			} tag **${first.name}**.`
		);
	}
}
