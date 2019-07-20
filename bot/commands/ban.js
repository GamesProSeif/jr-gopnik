const { Command, Argument } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class BanCommand extends Command {
  constructor() {
    super('ban', {
      aliases: ['ban'],
      description: 'Bans a member',
      category: 'mod',
      clientPermissions: ['BAN_MEMBERS'],
      userPermissions: ['BAN_MEMBERS'],
      args: [
        {
          id: 'member',
          type: 'member',
          prompt: {
            start: `Who do you want to ban?`,
            retry: `Invalid member! Try again.`
          }
        },
        {
          id: 'days',
          type: 'integer',
          prompt: {
            start: `How many days do you want them banned? (Type 0 for infinite)`,
            retry: `Invalid number of days! Try again.`
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
    this.usage = '<member> <days> <reason>';
  }

  async exec(message, args) {
    if (args.member.roles.highest.position >= message.member.roles.highest.position) {
      return this.client.commandHandler.emit(
        'missingPermissions',
        message,
        this.client.commandHandler.modules.get('ban'),
        'user',
        ['Member same or higher in role hierarchy']
      );
    }
    if (args.member.roles.highest.position >= message.guild.me.roles.highest.position) {
      return this.client.commandHandler.emit(
        'missingPermissions',
        message,
        this.client.commandHandler.modules.get('ban'),
        'client',
        ['Member same or higher in role hierarchy']
      );
    }

    let reason = args.reason === 'none' ? null : args.reason;

    const embed = new MessageEmbed()
      .setColor(this.client.config.colors.warning)
      .setAuthor(args.member.user.tag, args.member.user.displayAvatarURL())
      .setDescription(`This member is going to be **banned**. Do you wish to continue? (yes/no)`)
      .addField('❯ Member', `• Mention: ${args.member}\n• Tag: ${args.member.user.tag}\n• ID: ${args.member.id}`)
      .addField(`❯ Days`, args.days || 'Infinite')
      .addField(`❯ Reason`, reason ? reason : 'Not supplied');

    const sent = await message.channel.send(embed);

    const confirm = await new Argument(this).collect(message);

    if (confirm.match(/y(es|up)?/)) {
      await args.member.ban({days: args.days, reason});
      return message.channel.send(`Member ${args.member.user.tag} banned`);
    } else {
      return message.channel.send('Command has been cancelled.');
    }
  }
}

module.exports = BanCommand;
