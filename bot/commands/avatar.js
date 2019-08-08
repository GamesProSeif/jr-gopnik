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
        },
        {
          id: 'format',
          type: [['auto'], ['webp', 'web'], ['jpg', 'jpeg'], ['png'], ['gif']],
          match: 'option',
          flag: ['format:', 'f:'],
          default: 'auto',
          prompt: {
            start: `What's the format of the avatar? (auto, webp, jpg, png, gif)`,
            retry: `Invalid format! Try again. (auto, webp, jpg, png, gif)`,
            optional: true
          }
        },
        {
          id: 'size',
          type: ['16', '32', '64', '128', '256', '512', '1024', '2048'],
          match: 'option',
          flag: ['size:', 's:'],
          default: '2048',
          prompt: {
            start: `What's the size of the avatar? (16, 32, 64, 128, 256, 512, 1024, 2048)`,
            retry: `Invalid size! Try again. (16, 32, 64, 128, 256, 512, 1024, 2048)`,
            optional: true
          }
        }
      ]
    });

    this.usage = '[user] [format:] [size:]';
  }

  exec(message, args) {
    const imageOptions = { size: parseInt(args.size) };

    if (args.format !== 'auto') {
      if (!args.user.avatar.startsWith('a_') && args.format === 'gif')
        imageOptions.format = 'webp';
      else imageOptions.format = args.format;
    }
    const link = args.user.displayAvatarURL(imageOptions);

    const embed = new MessageEmbed()
      .setColor(this.client.config.colors.primary)
      .setTitle('Avatar')
      .setDescription(
        `Viewing avatar of **${args.user.tag}** (ID: ${args.user.id})`
      )
      .setImage(link)
      .setURL(link);

    return message.util.send(embed);
  }
}

module.exports = AvatarCommand;
