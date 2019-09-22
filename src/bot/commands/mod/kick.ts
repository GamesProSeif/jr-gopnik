import { Argument, Command } from 'discord-akairo';
import { GuildMember, Message, MessageEmbed } from 'discord.js';

export default class KickCommand extends Command {
	constructor() {
		super('kick', {
			aliases: ['kick'],
			description: {
				content: 'Kicks a member',
				usage: '<member> <reason>'
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
		args: { member: GuildMember; reason: string }
	) {
		if (
			args.member.roles.highest.position >=
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
			args.member.roles.highest.position >=
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

		const reason = args.reason === 'none' ? null : args.reason;

		const embed = new MessageEmbed()
			.setColor(this.client.config.colors!.warning)
			.setAuthor(args.member.user.tag, args.member.user.displayAvatarURL())
			.setDescription(
				`This member is going to be **kicked**. Do you wish to continue? (yes/no)`
			)
			.addField(
				'❯ Member',
				`• Mention: ${args.member}\n• Tag: ${args.member.user.tag}\n• ID: ${args.member.id}`
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
			await args.member.kick(reason!);
			return message.channel.send(`Member ${args.member.user.tag} kicked`);
		}
		return message.channel.send('Command has been cancelled.');
	}
}
