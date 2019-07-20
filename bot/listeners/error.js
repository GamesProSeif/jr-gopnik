const { Listener } = require('discord-akairo');

class ErrorListener extends Listener {
  constructor() {
    super('error', {
      emitter: 'client',
      event: 'error'
    });
  }

  exec(error) {
    return console.error(error);
  }
}

module.exports = ErrorListener;
