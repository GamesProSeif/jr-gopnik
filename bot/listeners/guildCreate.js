const { Listener } = require('discord-akairo');
const { join } = require('path');
const GuildModel = require(join(__dirname, '..', '..', 'models', 'guild.js'));

class GuildCreateListener extends Listener {
  constructor() {
    super('guildCreate', {
      emitter: 'client',
      event: 'guildCreate'
    });
  }

  exec(guild) {
    const guildDB = new GuildModel({ guild_id: guild.id });

    guildDB.save(err => {
      if (err) return console.error(err);
      return console.log('Added Guild');
    });
  }
}

module.exports = GuildCreateListener;
