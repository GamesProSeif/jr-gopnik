const { Listener } = require('discord-akairo');

class CommandBlockedListener extends Listener {
  constructor() {
    super('commandBlocked', {
      emitter: 'commandHandler',
      event: 'commandBlocked'
    });
  }

  exec(message, command, reason) {
    if (reason === 'guild') {
      return message.util.reply(`Command \`${command.id}\` is only accessable in servers`);
    } else if (reason === 'dm') {
      return message.util.reply(`Command \`${command.id}\` is only accessable in DMs`);
    } else if (reason === 'owner') {
      return message.util.reply(`Command \`${command.id}\` is only accessable by the bot owner(s)`);
    } else if (reason === 'blacklist') {
      return message.util.reply(`You are blacklisted...`);
    }
    console.log(`${message.author.username} was blocked from using ${command.id} because of ${reason}!`);
  }
}

module.exports = CommandBlockedListener;
