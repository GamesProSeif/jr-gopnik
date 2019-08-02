const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const PERMISSIONS = {
  ADMINISTRATOR: 'Administrator',
  VIEW_AUDIT_LOG: 'View audit log',
  MANAGE_GUILD: 'Manage server',
  MANAGE_ROLES: 'Manage roles',
  MANAGE_CHANNELS: 'Manage channels',
  KICK_MEMBERS: 'Kick members',
  BAN_MEMBERS: 'Ban members',
  CREATE_INSTANT_INVITE: 'Create instant invite',
  CHANGE_NICKNAME: 'Change nickname',
  MANAGE_NICKNAMES: 'Manage nicknames',
  MANAGE_EMOJIS: 'Manage emojis',
  MANAGE_WEBHOOKS: 'Manage webhooks',
  VIEW_CHANNEL: 'Read text channels and see voice channels',
  SEND_MESSAGES: 'Send messages',
  SEND_TTS_MESSAGES: 'Send TTS messages',
  MANAGE_MESSAGES: 'Manage messages',
  EMBED_LINKS: 'Embed links',
  ATTACH_FILES: 'Attach files',
  READ_MESSAGE_HISTORY: 'Read message history',
  MENTION_EVERYONE: 'Mention everyone',
  USE_EXTERNAL_EMOJIS: 'Use external emojis',
  ADD_REACTIONS: 'Add reactions',
  CONNECT: 'Connect',
  SPEAK: 'Speak',
  MUTE_MEMBERS: 'Mute members',
  DEAFEN_MEMBERS: 'Deafen members',
  MOVE_MEMBERS: 'Move members',
  USE_VAD: 'Use voice activity'
};

class RoleCommand extends Command {
  constructor() {
    super('role', {
      aliases: ['role', 'role-info', 'ri'],
      description: 'Displays information about a role',
      channel: 'guild',
      category: 'info',
      args: [
        {
          id: 'role',
          type: 'role',
          prompt: {
            start: `What's the role you want information about?`,
            retry: `That's not a valid role! Try again.`
          }
        }
      ]
    });

    this.usage = '<role>';
  }

  exec(message, args) {
    const role = args.role;

    const permissions = Object.keys(PERMISSIONS).filter(
      permission => role.permissions.serialize()[permission]
    );

    const permsList = permissions.includes('ADMINISTRATOR')
      ? ['ADMINISTRATOR']
      : permissions;

    const embed = new MessageEmbed()
      .setColor(role.color)
      .setDescription(`Info about **${role.name}** (ID: ${role.id})`)
      .setThumbnail(message.guild.iconURL())
      .addField(
        '❯ Info',
        `• Color: ${role.hexColor.toUpperCase()}\n• Hoisted: ${
          role.hoist ? 'Yes' : 'No'
        }\n• Position: ${role.position}\n• Mentionable: ${
          role.mentionable ? 'Yes' : 'No'
        }\n• Creation Date: ${moment(role.createdAt).format(
          'dddd, MMMM Do YYYY, h:mm:ss A'
        )}`
      )
      .addField(
        '❯ Permissions',
        `${permsList
          .map(permission => `• ${PERMISSIONS[permission]}`)
          .join('\n') || 'None'}`
      );

    return message.util.send(embed);
  }
}

module.exports = RoleCommand;
