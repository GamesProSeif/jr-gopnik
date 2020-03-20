import { Argument, Command } from 'discord-akairo';
import { GuildMember, Message, TextChannel } from 'discord.js';
import { MESSAGES } from '../../util/constants';

interface PruneArgs {
	amount: number;
	hide?: boolean;
	author?: GuildMember;
	content?: string;
	channel: TextChannel;
}

export default class PruneCommand extends Command {
	constructor() {
		super('prune', {
			aliases: ['prune', 'purge', 'bulk-delete', 'pr'],
			description: {
				content: MESSAGES.COMMANDS.MOD.PRUNE.DESCRIPTION.CONTENT,
				usage: MESSAGES.COMMANDS.MOD.PRUNE.DESCRIPTION.USAGE,
				examples: MESSAGES.COMMANDS.MOD.PRUNE.DESCRIPTION.USAGE
			},
			category: 'mod',
			args: [
				{
					id: 'amount',
					type: Argument.range('integer', 1, 100, true),
					prompt: {
						start: MESSAGES.COMMANDS.MOD.PRUNE.ARGS.AMOUNT.PROMPT.START,
						retry: MESSAGES.COMMANDS.MOD.PRUNE.ARGS.AMOUNT.PROMPT.RETRY
					}
				},
				{
					id: 'hide',
					match: 'flag',
					flag: ['--hide', '-h']
				},
				{
					'id': 'author',
					'type': 'member',
					'match': 'option',
					'flag': ['author:', 'member:', 'user:', 'sender:'],
					'default': null
				},
				{
					'id': 'content',
					'match': 'option',
					'flag': ['content:', 'text:', 'string:', 'word:', 'words:'],
					'default': null
				},
				{
					'id': 'channel',
					'type': 'textChannel',
					'match': 'option',
					'flag': ['channel:'],
					'default': (message: Message) => message.channel
				}

				// Add before and after messages args
			],
			userPermissions: ['MANAGE_MESSAGES'],
			clientPermissions: ['MANAGE_MESSAGES']
		});
	}

	public async exec(message: Message, args: PruneArgs) {
		await message.delete();

		let messages = (await args.channel.messages.fetch({ limit: args.amount })).filter(() => true);
		// Check for valid fetch syntax or try using filter

		if (args.author) {
			messages = messages.filter(
				(m: Message) => m.author!.id === args.author!.id
			);
		}
		if (args.content) {
			messages = messages.filter((m: Message) =>
				m.content.includes(args.content!));
		}

		if (messages.size) {
			await args.channel.bulkDelete(messages.map(m => m.id));
		}

		if (!args.hide) {
			return message.util!.send(MESSAGES.COMMANDS.MOD.PRUNE.RESPONSE.DELETED(messages.size, args.channel));
		}
	}
}
