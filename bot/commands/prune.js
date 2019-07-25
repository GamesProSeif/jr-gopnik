const { Command } = require('discord-akairo');

class PruneCommand extends Command {
  constructor() {
    super('prune', {
      aliases: ['prune', 'purge', 'bulk-delete', 'pr'],
      description: 'Deletes multiple messages with given options',
      category: 'mod',
      args: [
        {
          id: 'amount',
          type: (message, phrase) => {
            if (!phrase || isNaN(phrase)) return null;
            const num = parseInt(phrase);
            if (num > 100) return null;
            return num;
          },
          prompt: {
            start: `How many messages do you want to delete? (max 100)`,
            retry: `Invalid number! Try again`
          }
        },
        {
          id: 'hide',
          match: 'flag',
          flag: ['--hide', '-h']
        },
        {
          id: 'author',
          type: 'member',
          match: 'option',
          flag: ['author:', 'member:', 'user:', 'sender:'],
          default: null
        },
        {
          id: 'content',
          match: 'option', // Test multiple words
          flag: ['content:', 'text:', 'string:', 'word:', 'words:'],
          default: null
        },
        {
          id: 'channel',
          type: 'textChannel',
          match: 'option',
          flag: ['channel:'],
          default: message => message.channel
        }

        // Add before and after messages args
      ],
      userPermissions: ['MANAGE_MESSAGES'],
      clientPermissions: ['MANAGE_MESSAGES']
    });

    this.usage = '<last-n-messages> [author:] [content:] [channel:]';

    this.examples = [
      '5',
      '10 author:GamesProSeif --hide',
      '15 content:potato',
      '50 content:"wee wee" channel:general'
    ];
  }

  async exec(message, args) {
    await message.delete();

    let messages = await args.channel.messages.fetch({ limit: args.amount });
    // Check for valid fetch syntax or try using filter

    if (args.author) {
      messages = messages.filter(m => m.author.id === args.author.id);
    }
    if (args.content) {
      messages = messages.filter(m => m.content.includes(args.content));
    }

    if (messages.size) {
      await args.channel.bulkDelete(messages);
    }

    if (!args.hide) {
      return message.util.send(
        `Deleted \`${messages.size}\` messages in ${args.channel}`
      );
    }
  }
}

module.exports = PruneCommand;
