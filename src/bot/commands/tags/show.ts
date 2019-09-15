import { Command } from 'discord-akairo';
import { Message, Util } from 'discord.js';
import { TagModel } from '../../../models/tag';

export default class TagCommand extends Command {
	constructor() {
		super('tag-show', {
			description: {
				content:
					'Adds a tag to the server, used by anyeone. (Markdown is supported)',
				usage: '[--hoisted] <name> <content>',
				examples: ['abc def', '--hoisted "abc 2" def 2']
			},
			category: 'tags',
			channel: 'guild',
			args: [
				{
					id: 'name',
					type: 'lowercase',
					match: 'content',
					prompt: {
						start: 'Which tag do you want to see?'
					}
				}
			]
		});
	}

	public async exec(message: Message, { name }: { name: string }) {
		if (!name) return;
		name = Util.cleanContent(name, message);
		let tag;
		try {
			tag = await TagModel.findOne({
				$or: [
					{ name, guild: message.guild!.id },
					{ aliases: name, guild: message.guild!.id }
				]
			});
			// tslint:disable-next-line: no-empty
		} catch {}
		if (!tag) return;
		tag.uses++;
		await tag.save();

		return message.util!.send(tag.content);
	}
}
