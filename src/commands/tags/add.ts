import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { Tag } from '../../models/tag';

export default class TagAddCommand extends Command {
	constructor() {
		super('tag-add', {
			description: {
				content:
					'Adds a tag to the server, used by anyone. (Markdown is supported)',
				usage: '[--hoisted] <name> <content>',
				examples: ['abc def', '--hoisted "abc 2" def 2']
			},
			category: 'tags',
			channel: 'guild',
			flags: ['--hoist', '--hoisted'],
			args: [
				{
					id: 'hoisted',
					match: 'flag',
					flag: ['--hoist', '--hoisted']
				},
				{
					id: 'name',
					type: 'existingTag',
					prompt: {
						start: 'What is the name of the tag?',
						retry: (_: Message, { failure }: { failure: { value: string } }) =>
							`a tag with the name **${failure.value}** already exists`
					}
				},
				{
					id: 'content',
					type: 'tagContent',
					match: 'rest',
					prompt: {
						start: 'What is the content of the tag?'
					}
				}
			]
		});
	}

	public async exec(
		message: Message,
		args: { hoisted: boolean; name: string; content: string }
	) {
		const tagsRepo = this.client.db.getRepository(Tag);
		if (args.name && args.name.length >= 1900) {
			return message.util!.reply('Tag name is too long');
		}
		if (args.content && args.content.length >= 1950) {
			return message.util!.reply('Tag content is too long');
		}

		const admin = message.member!.permissions.has('ADMINISTRATOR');

		const tag = new Tag();
		tag.name = args.name;
		tag.content = args.content;
		tag.user = message.author!.id;
		tag.guild = message.guild!.id;
		tag.hoisted = args.hoisted && admin ? true : false;
		tag.aliases = [];

		await tagsRepo.save(tag);

		return message.util!.reply(
			`A tag with the name **${args.name.substring(0, 1900)}** has been added.`
		);
	}
}
