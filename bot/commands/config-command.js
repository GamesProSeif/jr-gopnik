const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

// eslint-disable-next-line no-unused-vars
class ConfigCommandsCommand extends Command {
  constructor() {
    super('config-command', {
      aliases: ['config-command', 'cfg-c'],
      description: 'Enables/Disables command',
      category: 'config',
      args: [
        {
          id: 'type',
          type: [['enable', 'e', 'on'], ['disable', 'd', 'off']],
          prompt: {
            start: `Do you want to enable or disable? [enable/disable]`,
            retry: `Invalid type! Try again.`
          }
        },
        {
          id: 'command',
          type: 'commandAlias',
          prompt: {
            start: `What's the command you want to disable?`,
            retry: `Invalid command! Try again.`
          }
        },
        {
          id: 'channel',
          type: 'textChannel',
          prompt: {
            start: `What's the channel you want to enable/disable the command in?`,
            retry: 'Invalid text channel! Try again.'
          }
        }
      ]
    });
  }

  async exec(message, args) {
    try {
      const embed = new MessageEmbed().setColor(
        this.client.config.colors.primary
      );
      const disabledList = message.guild.settings.disabled;
      const index = disabledList.findIndex(d => d.command === args.command.id);
      const disabledObject = disabledList[index];

      if (args.type === 'enable') {
        if (disabledObject) {
          if (disabledObject.channels.includes(args.channel.id)) {
            disabledObject.channels.splice(
              disabledObject.channels.indexOf(args.channel.id),
              1
            );
          }
        }
        embed.setDescription(
          `Enabled command \`${args.command.id}\` in channel ${args.channel}`
        );
      } else {
        if (disabledObject) {
          disabledObject.channels.push(args.channel.id);
        } else {
          disabledList.push({
            command: args.command.id,
            channels: [args.channel.id]
          });
        }
        embed.setDescription(
          `Disabled command \`${args.command.id}\` in channel ${args.channel}`
        );
      }

      const { error } = await fetch(
        `${this.client.config.serverHost}/api/guilds/${
          message.guild.id
        }/settings`,
        {
          method: 'PATCH',
          headers: {
            apikey: process.env.TEST_API_KEY,
            'content-type': 'application/json'
          },
          body: JSON.stringify({ disabled: message.guild.settings.disabled })
        }
      );

      if (error) throw new Error(error);

      return message.util.send(embed);
    } catch (error) {
      message.util.send(
        'An error occurred while trying to process your request'
      );
      return console.error(error.message);
    }
  }
}

// module.exports = ConfigCommandsCommand;
