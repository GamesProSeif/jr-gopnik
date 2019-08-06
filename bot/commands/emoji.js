const { Command } = require('discord-akairo');
const { MessageEmbed, GuildEmoji } = require('discord.js');
const moment = require('moment');
const emojis = require('node-emoji');
const punycode = require('punycode');

const EMOJI_REGEX = /<(?:a)?:(?:\w{2,32}):(\d{17,19})>?/;

class EmojiCommand extends Command {
  constructor() {
    super('emoji', {
      aliases: ['emoji', 'emoji-info', 'ei'],
      description: 'Displays information about an emoji',
      category: 'info',
      args: [
        {
          id: 'emoji',
          match: 'content',
          type: async (message, content) => {
            if (EMOJI_REGEX.test(content))
              [, content] = content.match(EMOJI_REGEX);
            if (!isNaN(content)) return message.guild.emojis.get(content);
            return (
              message.guild.emojis.find(e => e.name === content) ||
              emojis.find(content)
            );
          },
          prompt: {
            start: `What's the emoji you want informationa about?`,
            retry: `Please provide a valid emoji`
          }
        }
      ]
    });
  }

  exec(message, { emoji }) {
    const embed = new MessageEmbed().setColor(this.client.config.colors.info);

    if (emoji instanceof GuildEmoji) {
      embed.setDescription(`Info about ${emoji.name} (ID: ${emoji.id})`);
      embed.setThumbnail(emoji.url);
      embed.addField(
        '❯ Info',
        `• Identifier: \`<${emoji.identifier}>\`\n• Creation Date: ${moment
          .utc(emoji.createdAt)
          .format('YYYY/MM/DD hh:mm:ss')}\n• URL: ${emoji.url}`
      );
    } else {
      embed.setDescription(`Info about ${emoji.emoji}`);
      embed.addField(
        '❯ Info',
        `• Name: \`${emoji.key}\`\n• Raw: \`${
          emoji.emoji
        }\`\n• Unicode: \`${punycode.ucs2
          .decode(emoji.emoji)
          .map(
            e =>
              `\\u${e
                .toString(16)
                .toUpperCase()
                .padStart(4, '0')}`
          )
          .join('')}\``
      );
    }

    return message.util.send(embed);
  }
}

module.exports = EmojiCommand;
