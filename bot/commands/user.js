const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

class UserCommand extends Command {
  constructor() {
    super('user', {
      aliases: ['user', 'userinfo', 'user-info', 'ui'],
      description: 'Displays information about a user',
      channel: 'guild',
      category: 'info',
      args: [
        {
          id: 'member',
          type: 'member',
          default: msg => msg.member
        }
      ]
    });

    this.usage = '[user]';
  }

  exec(message, args) {
    const member = args.member;
    const user = member.user;

    const embed = new MessageEmbed()
      .setColor(this.client.config.colors.info)
      .setDescription(`Info about **${user.tag}** (ID: ${user.id})`)
      .addField('❯ Member Details', `• Nickname: ${member.nickname ? member.nickname : 'None'}\n• Roles: ${member.roles.map(r => '`' + r.name + '`').join(' ')}\n• Joined At: ${moment(member.joinedAt).format('dddd, MMMM Do YYYY, h:mm:ss A')}`)
      .addField('❯ User Details', `• ID: ${user.id}\n• Username: ${user.tag}\n• Creation Date: ${moment(user.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss A')}\n• Status: ${user.presence.status.toUpperCase()}\n•Activity: ${user.presence.activity ? user.presence.activity : 'None'}`);

    return message.util.send(embed);
  }
}

module.exports = UserCommand;
