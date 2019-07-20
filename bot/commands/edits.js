const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class EditsCommand extends Command {
  constructor() {
    super('edits', {
      aliases: ['edits'],
      description: 'Views edits of a message',
      category: 'text',
      args: [
        {
          id: 'editedMessage',
          type: 'message',
          prompt: {
            start: `What's the ID of the message you want the edits of?`,
            retry: `Couldn't get message! Try another ID`
          }
        }
      ]
    });

    this.usage = '<message-id>';
  }

  exec(message, args) {
    let edits = args.editedMessage.edits;
    let original = edits.splice(edits.findIndex(m => m.editedTimestamp === null), 1)[0];
    edits = edits.sort((a, b) => a.editedTimestamp - b.editedTimestamp);

    const embed = new MessageEmbed()
      .setColor(this.client.config.colors.primary)
      .setAuthor(args.editedMessage.author.tag, args.editedMessage.author.displayAvatarURL())
      .setDescription(`Viewing edits of **${args.editedMessage.author.tag}**'s message (ID: ${args.editedMessage.id})`)
      .addField('❯ Original', original.content);

    edits.forEach((m, i) => embed.addField(`❯ ${i + 1}`, m.content));

    return message.util.send(embed);
  }
}

module.exports = EditsCommand;
