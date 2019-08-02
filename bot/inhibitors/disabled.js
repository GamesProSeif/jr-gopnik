const { Inhibitor } = require('discord-akairo');

class DisabledInhibitor extends Inhibitor {
  constructor() {
    super('disabled', {
      reason: 'disabled',
      type: 'post'
    });
  }

  exec(message, command) {
    if (
      !command ||
      message.channel.type !== 'guild' ||
      !message.guild.settings ||
      !message.guild.settings.disabled ||
      !message.guild.settings.disabled[0]
    )
      return;

    const disabled = message.guild.settings.disabled.find(
      d => d.channels.includes(message.channel.id) && d.command === command.id
    );

    if (disabled) return true;
  }
}

module.exports = DisabledInhibitor;
