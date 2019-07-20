const { Listener } = require('discord-akairo');
const { join } = require('path');
const GuildModel = require(join(__dirname, '..', '..', 'models', 'guild.js'));

class GuildDeleteListener extends Listener {
  constructor() {
    super('guildDelete', {
      emitter: 'client',
      event: 'guildDelete'
    });
  }

  exec(guild) {
    GuildModel.deleteOne({guild_id: guild.id}, err => {
      if (err) return console.error(err);
      return console.log('Left guild');
    });
  }
}

module.exports = GuildDeleteListener;
