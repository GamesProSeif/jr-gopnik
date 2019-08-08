const { Listener } = require('discord-akairo');
const moment = require('moment');

class CooldownListener extends Listener {
  constructor() {
    super('cooldown', {
      emitter: 'commandHandler',
      event: 'cooldown'
    });
  }

  async exec(message, command, cooldown) {
    const sent = await message.util.reply(
      `You have to wait \`${moment
        .duration(cooldown)
        .format('d[d ]h[h ]m[m ]s[s]')}\` before using command \`${
        command.id
      }\` again.`
    );
    sent.delete(5000);
  }
}

module.exports = CooldownListener;
