import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { ITag } from '../../../typings';

export default class TagCommand extends Command {
  constructor() {
    super('tag-source', {
      description: {
        content: 'Shows tag source',
        usage: '[--file/-f] <tag>',
        examples: ['abc def', '--hoisted "abc 2" def 2']
      },
      category: 'tags',
      channel: 'guild',
      args: [
				{
					id: 'file',
					match: 'flag',
					flag: ['--file', '-f']
				},
        {
          id: 'tag',
          type: 'tag',
          match: 'rest',
          prompt: {
						start: 'Which tag do you want the source of?',
						retry: (_: Message, { failure }: { failure: { value: string } }) => `A tag with the name **${failure.value}** does not exist.`
          }
        }
      ]
    });
  }

  public async exec(message: Message, { tag, file }: { tag: ITag; file: boolean }) {
    return message.util!.send(this.client.functions.clean(tag.content), {
			code: 'md',
			files: file
				? [{
					attachment: Buffer.from(tag.content.replace(/\n/g, '\r\n'), 'utf8'),
					name: `${tag.name}_source.txt`
				}]
				: undefined
		});
  }
}
