const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { join } = require('path');
const Snipe = require(join(__dirname, '..', '..', 'models', 'snipe.js'));

class DeleteSnipeCommand extends Command {
  constructor() {
    super('delete-snipe', {
      aliases: ['delete-snipe', 'd-snipe'],
      description: 'Deletes snipes in a channel',
      category: 'text',
      channel: 'guild',
      userPermissions: ['MANAGE_MESSAGES'],
      args: [
        {
          id: 'channel',
          type: 'textChannel',
          default: message => message.channel,
          prompt: {
            start: `What's the text channel you want to delete snipes in?`,
            retry: `Invalid text channel! Try again.`,
            optional: true
          }
        }
      ]
    });

    this.usage = '[#channel]';
  }

  async exec(message, args) {
    let deleted = await Snipe.destroy({
      where: {
        guild: message.guild.id,
        channel: args.channel.id
      }
    });

    return message.util.send(
      `✅ Deleted \`${deleted}\` snipe(s) in ${args.channel}`
    );
  }
}

module.exports = DeleteSnipeCommand;
