const { Command } = require('discord-akairo');

class PickCommand extends Command {
  constructor() {
    super('pick', {
      aliases: ['pick', 'choose'],
      description: 'Chooses a value from a list (separate values by \`|\`)',
      category: 'gamble',
      separator: '|',
      args: [
        {
          id: 'list',
          match: 'separate'
        }
      ]
    });
    this.usage = '<value 1> | <value 2> | <...>';
    this.examples = ['Pizza | Burger | Stay on diet'];
  }

  exec(message, args) {
    const picked = args.list[Math.floor(Math.random() * args.list.length)];
    return message.util.send(`I chose \`${picked}\``);
  }
}

module.exports = PickCommand;
