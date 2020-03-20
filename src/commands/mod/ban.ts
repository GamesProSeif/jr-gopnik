import { Argument, Command } from 'discord-akairo';
import { GuildMember, Message, MessageEmbed } from 'discord.js';
import { COLORS, MESSAGES } from '../../util/constants';

export default class BanCommand extends Command {
	constructor() {
		super('ban', {
			aliases: ['ban'],
			description: {
				content: MESSAGES.COMMANDS.MOD.BAN.DESCRIPTION.CONTENT,
				usage: MESSAGES.COMMANDS.MOD.BAN.DESCRIPTION.USAGE
			},
			category: 'mod',
			channel: 'guild',
			clientPermissions: ['BAN_MEMBERS'],
			userPermissions: ['BAN_MEMBERS'],
			args: [
				{
					id: 'member',
					type: 'member',
					prompt: {
						start: MESSAGES.COMMANDS.MOD.BAN.ARGS.MEMBER.PROMPT.START,
						retry: MESSAGES.COMMANDS.MOD.BAN.ARGS.MEMBER.PROMPT.RETRY
					}
				},
				{
					id: 'reason',
					type: 'string',
					match: 'rest',
					prompt: {
						start: MESSAGES.COMMANDS.MOD.BAN.ARGS.REASON.PROMPT.START
					}
				}
			]
		});
	}

	public async exec(
		message: Message,
		{ member, reason }: { member: GuildMember; reason?: string }
	) {
		if (
			member.roles.highest.position >=
				message.member!.roles.highest.position
		) {
			return this.client.commandHandler.emit(
				'missingPermissions',
				message,
				this.client.commandHandler.modules.get('ban'),
				'user',
				['Member same or higher in role hierarchy']
			);
		}
		if (
			member.roles.highest.position >=
				message.guild!.me!.roles.highest.position
		) {
			return this.client.commandHandler.emit(
				'missingPermissions',
				message,
				this.client.commandHandler.modules.get('ban'),
				'client',
				['Member same or higher in role hierarchy']
			);
		}

		reason = reason === 'none' ? undefined : reason;

		const embed = new MessageEmbed()
			.setColor(COLORS.WARNING)
			.setAuthor(member.user.tag, member.user.displayAvatarURL())
			.setDescription(MESSAGES.COMMANDS.MOD.BAN.RESPONSE.CONFIRM.DESCRIPTION)
			.addField(
				'❯ Member',
				MESSAGES.COMMANDS.MOD.BAN.RESPONSE.CONFIRM.FIELD(member)
			)
			.addField(`❯ Reason`, reason ? reason : 'Not supplied');

		await message.channel.send(embed);

		const confirmArg = new Argument(this, {
			'id': 'confirm',
			'type': [['yes', 'yup', 'y'], ['no', 'nope', 'n']],
			'default': 'no'
		});

		const confirm = await confirmArg.collect(message);

		if (confirm.match(/y(es|up)?/)) {
			await member.ban({ days: 1, reason });
			return message.channel.send(MESSAGES.COMMANDS.MOD.BAN.RESPONSE.DONE(member));
		}
		return message.channel.send(MESSAGES.CLIENT.COMMAND_HANDLER.PROMPT_CANCEL);
	}
}
