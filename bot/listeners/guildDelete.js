const { Listener } = require('discord-akairo');

class GuildDeleteListener extends Listener {
  constructor() {
    super('guildDelete', {
      emitter: 'client',
      event: 'guildDelete'
    });
  }

  async exec(guild) {
    try {
      const res = await fetch(`${serverHost}/api/guilds/${guild.id}`, {
        method: 'DELETE',
        headers: {
          apikey: process.env.TEST_API_KEY
        }
      });

      if (res.ok) return console.log(`Deleted Guild ${guild.id}`);

      const { error } = await res.json();
      return console.error(error);
    } catch (error) {
      console.error(error.message);
    }
  }
}

module.exports = GuildDeleteListener;
