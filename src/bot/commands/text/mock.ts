import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { join } from 'path';

export default class MockCommand extends Command {
  constructor() {
    super('mock', {
      aliases: ['mock'],
      args: [
        {
          id: 'text',
          match: 'content',
          prompt: {
            start: `What do you want me to mock?`
          },
          type: 'lowercase'
        }
      ],
      category: 'text',
      description: {
        content: "Mocks text in SpongeBob's style"
      }
    });
  }

  public async exec(message: Message, args: any) {
    const mocked = [...args.text]
      .map((t, i) => (i % 2 ? t.toUpperCase() : t))
      .join('');

    return message.util!.send(mocked, {
      files: [
        join(__dirname, '..', '..', '..', '..', 'assets', 'spongebob_mock.png')
      ]
    });
  }
}
