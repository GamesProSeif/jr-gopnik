const { Command } = require('discord-akairo');
const { join } = require('path');

class MockCommand extends Command {
  constructor() {
    super('mock', {
      aliases: ['mock'],
      description: 'Mocks text in SpongeBob\'s style',
      category: 'text',
      args: [
        {
          id: 'text',
          type: 'lowercase',
          match: 'content',
          prompt: {
            start: `What do you want me to mock?`
          }
        }
      ]
    });
  }

  async exec(message, args) {
    const mocked = [...args.text].map((t, i) => i % 2 ? t.toUpperCase() : t).join('');
    return message.util.send(mocked, {
      files: [join(__dirname, '..', 'assets', 'spongebob_mock.png')]
    });
  }
}

module.exports = MockCommand;
