const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { join } = require('path');
const GuildModel = require(join(__dirname, '..', '..', 'models', 'guild.js'));


class GuildMemberRemoveListener extends Listener {
  constructor() {
    super('guildMemberRemove', {
      emitter: 'client',
      event: 'guildMemberRemove',
    });
  }

  async exec(member) {
    try {
      const { settings } = await GuildModel.findOne({guild_id: member.guild.id}).exec();

      if (settings.get('member_logging') === 'true' && settings.has('member_logs_channel')) {
        const embed = new MessageEmbed()
          .setColor(this.client.config.colors.warning)
          .setAuthor(member.user.tag, member.user.avatarURL())
          .setFooter('User left')
          .setTimestamp()

        const channel = member.guild.channels.get(settings.get('member_logs_channel'));

        return channel.send(embed);
      }
    } catch (e) {
      return console.error(e);
    }
  }
}

module.exports = GuildMemberRemoveListener;
