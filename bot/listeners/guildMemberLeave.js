const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class GuildMemberRemoveListener extends Listener {
  constructor() {
    super('guildMemberRemove', {
      emitter: 'client',
      event: 'guildMemberRemove'
    });
  }

  async exec(member) {
    try {
      const settings = member.guild.settings;

      if (settings.member_logging && settings.member_logs_channel) {
        const embed = new MessageEmbed()
          .setColor(this.client.config.colors.warning)
          .setAuthor(member.user.tag, member.user.avatarURL())
          .setFooter('User left')
          .setTimestamp(member.joinedAt);

        const channel = member.guild.channels.get(settings.member_logs_channel);

        return channel.send(embed);
      }
    } catch (e) {
      return console.error(e);
    }
  }
}

module.exports = GuildMemberRemoveListener;
