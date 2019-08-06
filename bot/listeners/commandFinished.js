const { Listener } = require('discord-akairo');

// eslint-disable-next-line no-unused-vars
class CommandFinishedListener extends Listener {
  constructor() {
    super('command-finished', {
      emitter: 'commandHandler',
      event: 'commandFinished'
    });
  }

  exec(message) {
    if (this.client.commandHandler.commandUtils.has(message.id)) {
      const commandUtil = this.client.commandHandler.commandUtils.get(
        message.id
      );
      if (!commandUtil.messages) return;
      const botMessages = commandUtil.messages.filter(
        m => m.author.id === this.client.id
      );
      if (!botMessages.size) return;

      return message.channel.bulkDelete(botMessages);
    }
  }
}

// module.exports = CommandFinishedListener;
