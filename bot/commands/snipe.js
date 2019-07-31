const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { join } = require('path');
const Snipe = require(join(__dirname, '..', '..', 'models', 'snipe.js'));

class SnipeCommand extends Command {
  constructor() {
    super('snipe', {
      aliases: ['snipe'],
      description: 'Snipes a deleted message',
      category: 'text',
      cooldown: 5000,
      args: [
        {
          id: 'position',
          type: 'integer',
          unordered: true,
          default: 0,
          prompt: {
            start: `What's the position of the message?`,
            retry: `Invalid position number! Try again.`,
            optional: true
          }
        },
        {
          id: 'channel',
          type: 'textChannel',
          unordered: true,
          default: message => message.channel,
          prompt: {
            start: `What's the text channel you want to search in?`,
            retry: `Invalid text channel! Try again.`,
            optional: true
          }
        }
      ]
    });

    this.usage = '[position] [#channel]';
  }

  async exec(message, args) {
    const embed = new MessageEmbed();

    const deletedMessages = await Snipe.findAll({
      where: {
        guild: message.guild.id,
        channel: args.channel.id
      },
      limit: 10,
      order: [['createdAt', 'DESC']]
    });

    if (!deletedMessages[0]) {
      embed
        .setColor(this.client.config.colors.error)
        .setDescription(`No deleted messages found in channel ${args.channel}`);

      return message.util.send(embed);
    }

    const deletedMessage = deletedMessages[args.position];

    if (deletedMessage) {
      const author = await this.client.users.get(deletedMessage.author);

      embed
        .setColor(this.client.config.colors.primary)
        .setAuthor(author.tag, author.avatarURL())
        .setTimestamp(deletedMessage.createdAt);

      if (deletedMessage.content) {
        embed.setDescription(deletedMessage.content);
      }
      if (deletedMessage.attachments) {
        embed.attachFiles(deletedMessage.attachments);
      }
    } else {
      embed
        .setColor(this.client.config.colors.error)
        .setDescription(
          `No deleted message found in channel ${args.channel} at position ${
            args.position
          }`
        );
    }

    return message.util.send(embed);
  }
}

module.exports = SnipeCommand;
