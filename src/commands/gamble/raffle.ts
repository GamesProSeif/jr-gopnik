import { Command } from 'discord-akairo';
import {
	GuildMember,
	Message,
	MessageEmbed,
	Role
} from 'discord.js';
import { COLORS, MESSAGES } from '../../util/constants';

interface RaffleArgs {
	type: 'all' | 'user' | 'bot';
	status: 'all' | 'online' | 'idle' | 'dnd' | 'offline';
	role?: Role;
}

export default class RaffleCommand extends Command {
	constructor() {
		super('raffle', {
			aliases: ['raffle'],
			description: {
				content: MESSAGES.COMMANDS.GAMBLE.RAFFLE.DESCRIPTION.CONTENT,
				usage: MESSAGES.COMMANDS.GAMBLE.RAFFLE.DESCRIPTION.USAGE,
				examples: MESSAGES.COMMANDS.GAMBLE.RAFFLE.DESCRIPTION.EXAMPLES
			},
			category: 'gamble',
			channel: 'guild',
			args: [
				{
					'id': 'type',
					'type': [
						['all', 'everyone'],
						['user', 'users', 'member', 'members'],
						['bot', 'bots', 'robot', 'robots']
					],
					'match': 'option',
					'flag': ['type:'],
					'default': 'all',
					'prompt': {
						start: MESSAGES.COMMANDS.GAMBLE.RAFFLE.ARGS.ROLE.PROMPT.START,
						retry: MESSAGES.COMMANDS.GAMBLE.RAFFLE.ARGS.ROLE.PROMPT.RETRY,
						optional: true
					}
				},
				{
					'id': 'status',
					'type': [
						['all', 'everyone'],
						['online', 'on', 'active'],
						['idle', 'afk'],
						['dnd'],
						['offline', 'off', 'invisible']
					],
					'match': 'option',
					'flag': ['status:'],
					'default': 'all',
					'prompt': {
						start: MESSAGES.COMMANDS.GAMBLE.RAFFLE.ARGS.STATUS.PROMPT.START,
						retry: MESSAGES.COMMANDS.GAMBLE.RAFFLE.ARGS.STATUS.PROMPT.RETRY,
						optional: true
					}
				},
				{
					'id': 'role',
					'type': 'role',
					'match': 'option',
					'flag': ['role:'],
					'default': null,
					'prompt': {
						start: MESSAGES.COMMANDS.GAMBLE.RAFFLE.ARGS.ROLE.PROMPT.START,
						retry: MESSAGES.COMMANDS.GAMBLE.RAFFLE.ARGS.ROLE.PROMPT.RETRY,
						optional: true
					}
				}
			]
		});
	}

	public async exec(message: Message, args: RaffleArgs) {
		let members = message.guild!.members.cache.filter(() => true);

		if (args.type === 'all') {
			// Do nothing
		} else if (args.type === 'user') {
			members = members.filter(m => !m.user.bot);
		} else if (args.type === 'bot') {
			members = members.filter(m => m.user.bot);
		}

		if (args.status === 'all') {
			// Do nothing
		} else if (args.status === 'online') {
			members = members.filter(m => m.user.presence.status === 'online');
		} else if (args.status === 'idle') {
			members = members.filter(m => m.user.presence.status === 'idle');
		} else if (args.status === 'offline') {
			members = members.filter(m => m.user.presence.status === 'offline');
		}

		if (args.role) {
			// tslint:disable-next-line: no-shadowed-variable
			members = members.filter((member: GuildMember) =>
				member.roles.cache.has(args.role!.id));
		}

		if (!members.size) {
			return message.util!.send({
				embed: {
					title: 'Error',
					description: MESSAGES.COMMANDS.GAMBLE.RAFFLE.ERROR_EMBED.DESCRIPTION,
					color: COLORS.ERROR
				}
			});
		}

		const member = members.random();

		const embed = new MessageEmbed()
			.setColor(COLORS.PRIMARY)
			.setTitle(MESSAGES.COMMANDS.GAMBLE.RAFFLE.SUCCESS_EMBED.TITLE)
			.setDescription(`${member}\nID: ${member!.id}`)
			.setFooter(member!.user.tag, member!.user.displayAvatarURL());

		return message.util!.send(embed);
	}
}
