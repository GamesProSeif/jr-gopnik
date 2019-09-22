import { Command } from 'discord-akairo';
import { Message, Util } from 'discord.js';
import { ITag } from 'typings';

export default class TagEditCommand extends Command {
	constructor() {
		super('tag-edit', {
			description: {
				content: 'Edits a tag',
				usage: '<tag> [--hoist/--unhoist] <content>',
				examples: ['abc xyz', 'abc --hoist']
			},
			category: 'tags',
			channel: 'guild',
			flags: ['--hoist', '--unhoist']
		});
	}

	public *args() {
		const tag = yield {
			type: 'tag',
			prompt: {
				start: 'What tag do you want to edit?',
				retry: (_: Message, { failure }: { failure: { value: string } }) =>
					`A tag with the name **${failure.value}** does not exist.`
			}
		};

		const hoist = yield {
			match: 'flag',
			flag: ['--hoist']
		};

		const unhoist = yield {
			match: 'flag',
			flag: ['--unhoist']
		};

		const content = yield hoist || unhoist
			? {
				match: 'rest',
				type: 'tagContent'
			}
			: {
				match: 'rest',
				type: 'tagContent',
				prompt: {
					start: 'What should the new content be?'
				}
			};

		return { tag, hoist, unhoist, content };
	}

	public async exec(
		message: Message,
		{
			tag,
			hoist,
			unhoist,
			content
		}: { tag: ITag; hoist: boolean; unhoist: boolean; content?: string }
	) {
		const admin = message.member!.permissions.has('ADMINISTRATOR');
		if (tag.user !== message.author!.id && !admin) {
			return message.util!.reply('You cannot edit this tag');
		}
		if (content && content.length >= 1950) {
			return message.util!.reply('Tag name is too long');
		}

		if (hoist) hoist = true;
		else if (unhoist) hoist = false;
		if ((hoist || unhoist) && admin) tag.hoisted = hoist;
		if (typeof content === 'string') {
			content = Util.cleanContent(content, message);
			tag.content = content;
		}

		tag.lastModified = message.author!.id;
		tag.updatedAt = Date.now();
		await tag.save();

		return message.util!.reply(`Successfully edited **${tag.name}**${hoist && admin ? ' to be hoisted.' : '.'}`);
	}
}
