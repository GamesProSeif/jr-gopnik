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

export default class InRoleCommand extends Command {
	constructor() {
		super('in-role', {
			aliases: ['in-role', 'role-members', 'ir'],
			description: {
				content: 'Displays all members that have a role'
			},
			category: 'info',
			channel: 'guild'
		});
	}

	public async *args() {
		const role: Role = yield {
			type: 'role',
			prompt: {
				start: 'What is the role?',
				retry: 'Invalid role! Try again.'
			}
		};

		let members = (await role.guild!.members.fetch()) as Collection<Snowflake, GuildMember>;
		members = members.filter(m => m.roles.has(role.id)) as Collection<Snowflake, GuildMember>;

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
				start: `What is the page? (1 - ${memberList.length})`,
				retry: `Invalid page number (1 - ${memberList.length})`,
				optional: true
			}
		};

		return { role, members, memberList, page };
	}

	public async exec(
		message: Message,
		args: {
			role: Role;
			members: Collection<Snowflake, GuildMember>;
			memberList: string;
			page: number;
		}
	) {
		const embed = new MessageEmbed()
			.setColor(this.client.config.colors!.info)
			.setTitle(`Members in ${args.role.name}`)
			.setDescription(args.memberList[args.page - 1])
			.setFooter(
				`Page ${args.page}/${args.memberList.length} • Total ${args.members.size} members`
			);

		return message.util!.send(embed);
	}
}
