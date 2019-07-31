const { Listener } = require('discord-akairo');
const fetch = require('node-fetch');

class GuildCreateListener extends Listener {
  constructor() {
    super('guildCreate', {
      emitter: 'client',
      event: 'guildCreate'
    });
  }

  async exec(guild) {
    try {
      const res = await fetch(`${serverHost}/api/guilds/?id=${guild.id}`, {
        method: 'POST',
        headers: {
          apikey: process.env.TEST_API_KEY
        }
      });

      if (res.ok) return console.log(`Added Guild ${guild.id}`);

      const { error } = await res.json();
      return console.error(error);
    } catch (error) {
      console.error(error.message);
    }
  }
}

module.exports = GuildCreateListener;
