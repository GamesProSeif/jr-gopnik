import { Argument, Command } from 'discord-akairo';
import { GuildMember, Message, MessageEmbed } from 'discord.js';
import { COLORS, MESSAGES } from '../../util/constants';

export default class KickCommand extends Command {
	constructor() {
		super('kick', {
			aliases: ['kick'],
			description: {
				content: MESSAGES.COMMANDS.MOD.KICK.DESCRIPTION.CONTENT,
				usage: MESSAGES.COMMANDS.MOD.KICK.DESCRIPTION.USAGE
			},
			category: 'mod',
			channel: 'guild',
			clientPermissions: ['KICK_MEMBERS'],
			userPermissions: ['KICK_MEMBERS'],
			args: [
				{
					id: 'member',
					type: 'member',
					prompt: {
						start: `Who do you want to kick?`,
						retry: `Invalid member! Try again.`
					}
				},
				{
					id: 'reason',
					type: 'string',
					match: 'rest',
					prompt: {
						start: `What's the reason? (Type \`none\` to leave empty)`
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
				this.client.commandHandler.modules.get('kick'),
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
				this.client.commandHandler.modules.get('kick'),
				'client',
				['Member same or higher in role hierarchy']
			);
		}

		reason = reason === 'none' ? undefined : reason;

		const embed = new MessageEmbed()
			.setColor(COLORS.WARNING)
			.setAuthor(member.user.tag, member.user.displayAvatarURL())
			.setDescription(MESSAGES.COMMANDS.MOD.KICK.RESPONSE.CONFIRM.DESCRIPTION)
			.addField(
				'❯ Member',
				MESSAGES.COMMANDS.MOD.KICK.RESPONSE.CONFIRM.FIELD(member)
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
			await member.kick(reason!);
			return message.channel.send(MESSAGES.COMMANDS.MOD.KICK.RESPONSE.DONE(member));
		}
		return message.channel.send(MESSAGES.CLIENT.COMMAND_HANDLER.PROMPT_CANCEL);
	}
}
