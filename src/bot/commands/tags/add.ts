import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { TagModel } from '../../../models/tag';

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
		if (args.name && args.name.length >= 1900) {
			return message.util!.reply('Tag name is too long');
		}
		if (args.content && args.content.length >= 1950) {
			return message.util!.reply('Tag content is too long');
		}

		const admin = message.member!.permissions.has('ADMINISTRATOR');

		const tag = new TagModel({
			name: args.name,
			content: args.content,
			user: message.author!.id,
			guild: message.guild!.id,
			hoisted: args.hoisted && admin ? true : false
		});

		await tag.save();

		return message.util!.reply(
			`A tag with the name **${args.name.substring(0, 1900)}** has been added.`
		);
	}
}
