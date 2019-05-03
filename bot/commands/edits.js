const { MessageEmbed } = require('discord.js');
const getEdits = (bot, message, param) => {
  let editedMessage = bot.editedMessages.get(param) || bot.editedMessages.find(m => m.edits[m.edits.length - 1].includes(param))
  if (!editedMessage) {
    return message.channel.send({
      embed: {
        title: 'Error',
        description: `Couldn't find a message with id/content \`${param}\``,
        color: bot.config.colors.error
      }
    });
  } else {
    const embed = new MessageEmbed()
      .setColor(bot.config.colors.info)
      .setAuthor(editedMessage.authorTag, editedMessage.authorAvatarURL)
      .setTimestamp(editedMessage.timestamp);
    editedMessage.edits.forEach((content, index) => {
      embed.addField(index == 0 ? 'Original' : index, content);
    });

    return message.channel.send(embed);
  }
}

exports.run = (bot, message, args) => {
  if (!args[0]) {
    message.reply(`what's the id/content of the message you want the edits of?\n\nType \`cancel\` to cancel the command`);
    const filter = m => m.author.id === message.author.id;
    const collector = message.channel.createMessageCollector(filter, {max: 1, time: 10000, errors: ['time']});

    collector.on('end', (collected, reason) => {
      if (reason === 'limit') {
        if (collected.first().content.toUpperCase() === 'CANCEL') {
          return message.channel.send('Cancelled');
        } else {
           return getEdits(bot, message, collected.first().content);
        }
      } else {
        return message.channel.send({embed:{
          title: 'Error',
          description: `Didn't get any response after 10 seconds\nEnded command`,
          color: bot.config.colors.error
        }});
      }
    });
  } else {
    return getEdits(bot, message, args.join(' '));
  }
}

exports.desc = 'Gets all edits of a message';
exports.aliases = ['edit'];
exports.guildOnly = true;
exports.examples = [
  '565063676458041348',
  'lmao'
];
