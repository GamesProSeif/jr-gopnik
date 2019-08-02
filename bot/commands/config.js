const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

class ConfigCommand extends Command {
  constructor() {
    super('config', {
      aliases: ['config', 'cfg'],
      description: `View or change configuration of the server\nUse key:value to change keys\n**Available Keys:**\n• prefix\n• user-role\n• bot-role\n• auto-assign-roles\n• member-logs-channel\n• member-logging`,
      category: 'config',
      channel: 'guild',
      userPermissions: ['ADMINISTRATOR'],
      args: [
        {
          id: 'prefix',
          match: 'option',
          flag: ['prefix:', 'pre:']
        },
        {
          id: 'user_role',
          type: 'role',
          match: 'option',
          flag: ['user-role:', 'userrole:', 'ur:']
        },
        {
          id: 'bot_role',
          type: 'role',
          match: 'option',
          flag: ['bot-role:', 'botrole:', 'br:']
        },
        {
          id: 'auto_assign_roles',
          type: 'lowercase',
          match: 'option',
          flag: ['auto-assign-roles:', 'autoassignroles:', 'aar:']
        },
        {
          id: 'member_logs_channel',
          type: 'channel',
          match: 'option',
          flag: ['member-logs-channel:', 'memberlogschannel:', 'mlc:']
        },
        {
          id: 'member_logging',
          type: 'lowercase',
          match: 'option',
          flag: ['member-logging:', 'memberlogging:', 'ml:']
        }
      ]
    });

    this.examples = [
      '',
      'auto-assign-roles:yes member-logging:yes',
      'user-role:Users bot-role:Bots'
    ];

    this.usage = '[key:value] [...]';
  }

  async exec(message, args) {
    let settings = message.guild.settings;

    if (Object.values(args).every(e => e === null)) {
      let keys = [
        'prefix',
        'user_role',
        'bot_role',
        'auto_assign_roles',
        'member_logs_channel',
        'member_logging'
      ];

      let serverConfigs = [];

      keys.forEach(key => {
        let value = settings[key];

        if (key === 'auto_assign_roles' || key === 'member_logging') {
          if (value) value = 'on';
          else value = 'off';
        } else if (key === 'user_role' || key === 'bot_role') {
          if (value) {
            value = message.guild.roles.get(value) || 'not set';
          }
        } else if (key === 'member_logs_channel') {
          value = message.guild.channels.get(value) || 'not set';
        }

        serverConfigs.push(
          `${this.client.functions.capitalize(
            key.replace(/_/g, ' ')
          )}: ${value}`
        );
      });

      const embed = new MessageEmbed()
        .setColor(this.client.config.colors.info)
        .setDescription(
          `Viewing configuration for **${message.guild.name}** (ID: ${
            message.guild.id
          })`
        )
        .addField('❯ Configs', serverConfigs.map(c => `• ${c}`))
        .setAuthor(message.author.tag, message.author.avatarURL());

      message.util.send(embed);
    } else {
      let changes = [];
      const body = {};
      if (args.prefix) {
        settings.prefix = args.prefix.replace(/\s/g, '');
        body.prefix = args.prefix.replace(/\s/g, '');
        changes.push(`Changed prefix to \`${args.prefix}\``);
      }
      if (args.user_role) {
        settings.user_role = args.user_role.id;
        body.user_role = args.user_role.id;
        changes.push(`Changed user auto-assign role to ${args.user_role}`);
      }
      if (args.bot_role) {
        settings.bot_role = args.bot_role.id;
        body.bot_role = args.bot_role.id;
        changes.push(`Changed bot auto-assign role to ${args.bot_role}`);
      }
      if (args.auto_assign_roles) {
        if (
          ['y', 'yes', 'true', 'yup', 'on'].includes(args.auto_assign_roles)
        ) {
          settings.auto_assign_roles = true;
          body.auto_assign_roles = true;
          changes.push(`Toggled auto-assign role on`);
        } else if (
          ['n', 'no', 'false', 'nope', 'off'].includes(args.auto_assign_roles)
        ) {
          settings.auto_assign_roles = false;
          body.auto_assign_roles = false;
          changes.push(`Toggled auto-assign role off`);
        }
      }
      if (args.member_logs_channel) {
        settings.member_logs_channel = args.member_logs_channel.id;
        body.member_logs_channel = args.member_logs_channel.id;
        changes.push(
          `Changed member-log channel to ${args.member_logs_channel}`
        );
      }
      if (args.member_logging) {
        if (['y', 'yes', 'true', 'yup', 'on'].includes(args.member_logging)) {
          settings.member_logging = true;
          body.member_logging = true;
          changes.push(`Toggled member logging on`);
        } else if (
          ['n', 'no', 'false', 'nope', 'off'].includes(args.member_logging)
        ) {
          settings.member_logging = false;
          body.member_logging = false;
          changes.push(`Toggled member logging off`);
        }
      }

      const res = await fetch(
        `${this.client.config.serverHost}/api/guilds/${
          message.guild.id
        }/settings`,
        {
          method: 'PATCH',
          body: JSON.stringify(body),
          headers: {
            apikey: process.env.TEST_API_KEY,
            'content-type': 'application/json'
          }
        }
      );

      const embed = new MessageEmbed();

      if (res.ok) {
        embed
          .setColor(this.client.config.colors.primary)
          .setDescription(
            `Changing configuration for **${message.guild.name}** (ID: ${
              message.guild.id
            })`
          )
          .addField('❯ Changes', changes.map(c => `• ${c}`).join('\n'))
          .setAuthor(message.author.tag, message.author.avatarURL());

        return message.util.send(embed);
      } else {
        embed
          .setColor(this.client.config.colors.error)
          .setDescription(
            'An error occurred while trying to set configurations! Try again later.'
          );

        message.util.send(embed);

        const { error } = await res.json();
        console.error(error);

        const { settings } = await (await fetch(
          `${this.client.config.serverHost}/api/guild/${message.guild.id}`,
          {
            headers: {
              apikey: process.env.TEST_API_KEY
            }
          }
        )).json();

        // eslint-disable-next-line require-atomic-updates
        message.guild.settings = settings;
      }
    }
  }
}

module.exports = ConfigCommand;
