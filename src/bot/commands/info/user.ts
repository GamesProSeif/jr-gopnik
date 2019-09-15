import { stripIndents } from 'common-tags';
import { Command } from 'discord-akairo';
import { Message, MessageEmbed, Role } from 'discord.js';
import moment from 'moment';

export default class UserCommand extends Command {
  constructor() {
    super('user', {
      aliases: ['user', 'user-info', 'ui'],
      args: [
        {
          default: (msg: Message) => msg.member,
          id: 'member',
          type: 'member'
        }
      ],
      category: 'info',
      channel: 'guild',
      description: {
        content: 'Displays information about a user',
        usage: '[user]'
      }
    });
  }

  public exec(message: Message, args: any) {
    const member = args.member;
    const user = member.user;

    const embed = new MessageEmbed()
      .setColor(this.client.config.colors!.info)
      .setDescription(`Info about **${user.tag}** (ID: ${user.id})`)
      .addField(
        '❯ Member Details',
        stripIndents`
        • Nickname: ${member.nickname ? member.nickname : 'None'}
        • Roles: ${member.roles.map((r: Role) => '`' + r.name + '`').join(' ')}
        • Joined At: ${moment.utc(member.joinedAt).format(
          'dddd, MMMM Do YYYY, h:mm:ss A [UTC]'
        )}`,
        true
      )
      .addField(
        '❯ User Details',
        stripIndents`
        • ID: ${user.id}
        • Username: ${user.tag}
        • Creation Date: ${moment.utc(user.createdAt).format(
          'dddd, MMMM Do YYYY, h:mm:ss A [UTC]'
        )}
        • Status: ${user.presence.status.toUpperCase()}
        • Activity: ${
          user.presence.activity ? user.presence.activity : 'None'
        }`,
        true
      );

    return message.util!.send(embed);
  }
}
