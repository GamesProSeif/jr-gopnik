const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class AvatarCommand extends Command {
  constructor() {
    super('avatar', {
      aliases: ['avatar', 'av'],
      description: 'Displays the avatar of a user',
      category: 'info',
      args: [
        {
          id: 'user',
          type: 'user',
          default: message => message.author,
          prompt: {
            start: `Who do you want to view the avatar of?`,
            retry: `Invalid user! Try again.`,
            optional: true
          }
        }
      ]
    });

    this.usage = '[user]';
  }

  exec(message, args) {
    // displayAvatarURL()
    const embed = new MessageEmbed()
      .setColor(this.client.config.colors.primary)
      .setTitle('Avatar')
      .setDescription(`Viewing avatar of **${args.user.tag}** (ID: ${args.user.id})`)
      .setImage(args.user.displayAvatarURL({size: 2048}))
      .setURL(args.user.displayAvatarURL({size: 2048}));

    return message.util.send(embed);
  }
}

module.exports = AvatarCommand;
