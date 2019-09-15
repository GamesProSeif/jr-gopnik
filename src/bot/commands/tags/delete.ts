import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { ITag } from '../../../typings';

export default class TagDeleteCommand extends Command {
	constructor() {
		super('tag-delete', {
			description: {
				content: 'Deletes a tag',
				usage: '<tag>',
				examples: ['abc def']
			},
			category: 'tags',
			channel: 'guild',
			args: [
				{
					id: 'tag',
					match: 'content',
					type: 'tag',
					prompt: {
						start: 'What tag do you want to delete?',
						retry: (_: Message, { failure }: { failure: { value: string } }) =>
							`a tag with the name **${failure.value}** does not exist.`
					}
				}
			]
		});
	}

	public async exec(message: Message, { tag }: { tag: ITag }) {
		const admin = message.member!.permissions.has('ADMINISTRATOR');
		if (tag.user !== message.author!.id && !admin) {
			return message.util!.send('You can only delete your own tags');
		}
		await tag.remove();
		return message.util!.send(
			`Successfully deleted **${tag.name.substring(0, 1900)}**`
		);
	}
}
