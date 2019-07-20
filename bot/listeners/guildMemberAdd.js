const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { join } = require('path');
const GuildModel = require(join(__dirname, '..', '..', 'models', 'guild.js'));


class GuildMemberAddListener extends Listener {
  constructor() {
    super('guildMemberAdd', {
      emitter: 'client',
      event: 'guildMemberAdd',
      // clientPermissions: ['MANAGE_ROLES']
    });
  }

  async exec(member) {
    try {
      const { settings } = await GuildModel.findOne({guild_id: member.guild.id}).exec();

      if (settings.get('auto_assign_roles') === 'true') {
        if (!member.user.bot && settings.has('user_role') && member.guild.me.permissions.has('MANAGE_ROLES')) {
          member.roles.add(settings.get('user_role'));
        } else if (member.user.bot && settings.has('bot_role') && member.guild.me.permissions.has('MANAGE_ROLES')) {
          member.roles.add(settings.get('bot_role'));
        }
      }

      if (settings.get('member_logging') === 'true' && settings.has('member_logs_channel')) {
        const embed = new MessageEmbed()
          .setColor(this.client.config.colors.primary)
          .setAuthor(member.user.tag, member.user.avatarURL())
          .setFooter('User joined')
          .setTimestamp()

        const channel = member.guild.channels.get(settings.get('member_logs_channel'));

        return channel.send(embed);
      }
    } catch (e) {
      return console.error(e);
    }
  }
}

module.exports = GuildMemberAddListener;
