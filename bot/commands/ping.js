const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

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
    const botPing = parseInt(sent.createdTimestamp - message.createdTimestamp);
    const botHeartbeat = parseInt(this.client.ws.ping);

    const start = Date.now();
    const { ok } = await fetch(`${this.client.config.serverHost}/util/ping`);
    const serverPing = Date.now() - start;

    const embed = new MessageEmbed()
      .setColor(this.client.config.colors.primary)
      .setTitle('Pong!')
      .setDescription(
        `⏰ ${botPing} ms\n💓 ${botHeartbeat} ms\n ☁ ${
          ok ? serverPing + ' ms' : 'offline'
        }`
      );

    return sent.edit({ content: null, embed });
  }
}

module.exports = PingCommand;
