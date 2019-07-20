const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

class ChannelCommand extends Command {
  constructor() {
    super('channel', {
      aliases: ['channel', 'channelinfo', 'channel-info', 'ci'],
      description: 'Displays information about a channel',
      channel: 'guild',
      category: 'info',
      args: [
        {
          id: 'channel',
          type: 'channel',
          default: message => message.channel,
          prompt: {
            start: `What's the channel you want information about?`,
            retry: `That's not a valid channel! Try again.`,
            optional: true
          }
        }
      ]
    });

    this.usage = '<#channel>';
  }

  exec(message, args) {
    const channel = args.channel;

    const embed = new MessageEmbed()
      .setColor(this.client.config.colors.info)
      .setDescription(`Info about **${channel.name}** (ID: ${channel.id})`)
      .setThumbnail(message.guild.iconURL())
      .addField('❯ General Info', `• Type: ${channel.type}\n• Topic: ${channel.topic ? channel.topic : 'None'}\n• NSFW: ${new Boolean(channel.nsfw)}\n• Creation Date: ${moment(channel.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss A')}`);

    if (channel.type === 'voice') {
      embed.addField('❯ Voice Info', `• Bitrate: ${channel.bitrate}\n• Limit: ${channel.userLimit ? channel.userLimit : 'unlimited'}\n• Member Count: ${channel.members.size}`);
    }

    return message.util.send(embed);
  }
}

module.exports = ChannelCommand;
