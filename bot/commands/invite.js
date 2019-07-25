const { Command } = require('discord-akairo');

class InviteCommand extends Command {
  constructor() {
    super('invite', {
      aliases: ['invite', 'invite-bot'],
      description: 'Generates an invite link for adding bot to servers',
      category: 'util'
    });
  }

  async exec(message) {
    const link = await this.client.generateInvite(['SEND_MESSAGES']);

    return message.util.send(`<${link}>`);
  }
}

module.exports = InviteCommand;
