const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const HUMAN_LEVELS = {
  0: 'None',
  1: 'Low',
  2: 'Medium',
  3: '(╯°□°）╯︵ ┻━┻',
  4: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};

class ServerCommand extends Command {
  constructor() {
    super('server', {
      aliases: ['server', 'server-info', 'si'],
      description: 'Displays information about a server',
      channel: 'guild',
      category: 'info'
    });
  }

  exec(message) {
    const guild = message.guild;

    const embed = new MessageEmbed()
      .setColor(this.client.config.colors.info)
      .setDescription(`Info about **${guild.name}** (ID: ${guild.id})`)
      .setThumbnail(guild.iconURL())
      .addField(
        '❯ Channels',
        `• ${guild.channels.filter(c => c.type === 'text').size} Text, ${
          guild.channels.filter(c => c.type === 'voice').size
        } Voice\n• AFK: ${guild.afkChannel ? guild.afkChannel : 'None'}`
      )
      .addField(
        '❯ Member',
        `• ${guild.memberCount} members\n• Owner: ${
          guild.owner.user.tag
        } (ID: ${guild.ownerID})`
      )
      .addField(
        '❯ Other',
        `• Roles: ${guild.roles.size}\n• Region: ${
          guild.region
        }\n• Creation Date: ${moment(guild.createdAt).format(
          'dddd, MMMM Do YYYY, h:mm:ss A'
        )}\n• Verification Level: ${HUMAN_LEVELS[guild.verificationLevel]}`
      );

    return message.util.send(embed);
  }
}

module.exports = ServerCommand;
