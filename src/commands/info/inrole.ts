import { Argument, Command } from 'discord-akairo';
import {
	Collection,
	GuildMember,
	Message,
	MessageEmbed,
	Role,
	Snowflake,
	Util
} from 'discord.js';
import { COLORS, MESSAGES } from '../../util/constants';

export default class InRoleCommand extends Command {
	constructor() {
		super('in-role', {
			aliases: ['in-role', 'role-members', 'ir'],
			description: {
				content: MESSAGES.COMMANDS.INFO.INROLE.DESCRIPTION.CONTENT
			},
			category: 'info',
			channel: 'guild'
		});
	}

	public async *args() {
		const role: Role = yield {
			type: 'role',
			prompt: {
				start: MESSAGES.COMMANDS.INFO.INROLE.ARGS.ROLE.PROMPT.START,
				retry: MESSAGES.COMMANDS.INFO.INROLE.ARGS.ROLE.PROMPT.RETRY
			}
		};

		let members = (await role.guild!.members.fetch()) as Collection<Snowflake, GuildMember>;
		members = members.filter(m => m.roles.cache.has(role.id)) as Collection<Snowflake, GuildMember>;

		const memberList = Util.splitMessage(
			members
				.map(m => m.user.tag)
				.sort()
				.join('\n')
		) || [
			members
				.map(m => m.user.tag)
				.sort()
				.join('\n')
		];

		const page: number = yield {
			'type': Argument.range('integer', 1, memberList.length),
			'default': 1,
			'prompt': {
				start: MESSAGES.COMMANDS.INFO.INROLE.ARGS.PAGE.PROMPT.START(memberList.length),
				retry: MESSAGES.COMMANDS.INFO.INROLE.ARGS.PAGE.PROMPT.RETRY(memberList.length),
				optional: true
			}
		};

		return { role, members, memberList, page };
	}

	public async exec(
		message: Message,
		{ role, members, memberList, page}: {
			role: Role;
			members: Collection<Snowflake, GuildMember>;
			memberList: string;
			page: number;
		}
	) {
		const embed = new MessageEmbed()
			.setColor(COLORS.INFO)
			.setTitle(MESSAGES.COMMANDS.INFO.INROLE.RESPONSE.TITLE(role))
			.setDescription(memberList[page - 1])
			.setFooter(MESSAGES.COMMANDS.INFO.INROLE.RESPONSE.FOOTER(page, memberList.length, members.size));

		return message.util!.send(embed);
	}
}
