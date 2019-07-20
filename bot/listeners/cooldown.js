const { Listener } = require('discord-akairo');
const moment = require('moment');
const momentDurationFormatSetup = require("moment-duration-format");

class CooldownListener extends Listener {
  constructor() {
    super('cooldown', {
      emitter: 'commandHandler',
      event: 'cooldown'
    });
  }

  exec(message, command, cooldown) {
    return message.util.reply(`You have to wait \`${moment.duration(cooldown).format('d[d ]h[h ]m[m ]s[s]')}\` before using command \`${command.id}\` again.`);
  }
}

module.exports = CooldownListener;
