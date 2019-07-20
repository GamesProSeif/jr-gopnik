const { Command } = require('discord-akairo');

class PingCommand extends Command {
  constructor() {
    super('ping', {
      aliases: ['ping'],
      description: 'Displays response time',
      category: 'util'
    });
  }

  async exec(message) {
    const sent = await message.util.send('Pinging...');
    const ping = parseInt(sent.createdTimestamp - message.createdTimestamp);
    const heartbeat = parseInt(this.client.ws.ping);

    return sent.edit({
      content: '',
      embed: {
        title: 'Pong!',
        description: `⏰ ${ping} ms\n💓 ${heartbeat} ms`,
        color: this.client.config.colors.primary
      }
    });
  }
}

module.exports = PingCommand;
