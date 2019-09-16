import { stripIndents } from 'common-tags';
import { Command, Flag, PrefixSupplier } from 'discord-akairo';
import { Message } from 'discord.js';

export default class TagCommand extends Command {
	constructor() {
		super('tag', {
			aliases: ['tag'],
			description: {
				content: stripIndents`
        Available methods:
         • show \`<tag>\`
         • add \`[--hoist] <tag> <content>\`
         • alias \`<--add/--del> <tag> <tagalias>\`
         • del \`<tag>\`
         • edit \`[--hoist/--unhoist] <tag> <content>\`
         • source \`[--file] <tag>\`
         • info \`<tag>\`
         • search \`<tag>\`
         • list \`[member]\`
         • download \`[member]\`
        `,
				usage: '<method> <...arguments>',
				examples: [
					'show abc',
					'add abc def',
					'add --hoist "abc 2" defghi',
					'alias --add abc abc1',
					'alias --del "abc 2" abc2',
					'del abc',
					'edit "abc 2" xyz',
					'edit abc --hoist',
					'source abc',
					'source --file "abc 2"',
					'info abc',
					'search abc',
					'list @GamesProSeif',
					'download @GamesProSeif'
				]
			},
			category: 'tags',
			channel: 'guild'
		});
	}

	public *args() {
		const method = yield {
			type: [
				['tag-show', 'show'],
				['tag-add', 'add'],
				['tag-alias', 'alias'],
				['tag-delete', 'del', 'delete', 'remove', 'rm'],
				['tag-edit', 'edit'],
				['tag-source', 'source'],
				['tag-info', 'info'],
				['tag-search', 'search'],
				['tag-list', 'list'],
				['tag-download', 'download', 'dl']
			],
			otherwise: (msg: Message) => {
				const prefix = (this.handler.prefix as PrefixSupplier)(msg);
				return `Invalid syntax! Please check \`${prefix}help tag\` for more information`;
			}
		};

		return Flag.continue(method);
	}
}
