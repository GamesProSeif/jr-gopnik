const { Listener } = require('discord-akairo');

class ReadyListener extends Listener {
  constructor() {
    super('ready', {
      emitter: 'client',
      event: 'ready'
    });
  }

  exec() {
    this.client.user.setActivity(`${this.client.commandHandler.prefix()}help`);
      // .then(presence => console.log(`Activity set to ${presence.activity.name}`))
    return console.log(`${this.client.user.username} launched...`);
  }
}

module.exports = ReadyListener;
