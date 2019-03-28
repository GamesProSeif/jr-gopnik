const { RichEmbed } = require('discord.js');

exports.run = (bot, message, args) => {
  let editedMessage = bot.editedMessages.get(args.join(' ')) || bot.editedMessages.find(m => m.edits[m.edits.length - 1].includes(args.join(' ')))
  if (!editedMessage) {
    return message.channel.send({embed:{
      title: 'Error',
      description: `Couldn't find a message with id/content \`${args.join(' ')}\``,
      color: bot.config.colors.error
    }});
  }
  else {
    const embed = new RichEmbed()
      .setColor(bot.config.colors.info)
      .setAuthor(editedMessage.authorTag, editedMessage.authorAvatarURL)
      .setTimestamp(editedMessage.timestamp);
      editedMessage.edits.forEach((content, index) => {
        embed.addField(index == 0 ? 'Original' : index, content);
      });

    return message.channel.send({embed});
  }
}

exports.desc = 'Gets all edits of a message';
exports.aliases = ['edit'];
