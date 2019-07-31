const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class GuildMemberAddListener extends Listener {
  constructor() {
    super('guildMemberAdd', {
      emitter: 'client',
      event: 'guildMemberAdd'
    });
  }

  async exec(member) {
    try {
      const settings = member.guild.settings;

      if (settings.auto_assign_roles) {
        if (
          !member.user.bot &&
          settings.has('user_role') &&
          member.guild.me.permissions.has('MANAGE_ROLES')
        ) {
          member.roles.add(settings.user_role);
        } else if (
          member.user.bot &&
          settings.bot_role &&
          member.guild.me.permissions.has('MANAGE_ROLES')
        ) {
          member.roles.add(settings.bot_role);
        }
      }

      if (settings.member_logging && settings.member_logs_channel) {
        const embed = new MessageEmbed()
          .setColor(this.client.config.colors.primary)
          .setAuthor(member.user.tag, member.user.avatarURL())
          .setFooter('User joined')
          .setTimestamp(member.joinedAt);

        const channel = member.guild.channels.get(settings.member_logs_channel);

        return channel.send(embed);
      }
    } catch (e) {
      return console.error(e);
    }
  }
}

module.exports = GuildMemberAddListener;
