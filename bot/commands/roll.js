const { Command } = require('discord-akairo');

class RollCommand extends Command {
  constructor() {
    super('roll', {
      aliases: ['roll', 'random'],
      description: 'Rolls a number (default of 6)',
      category: 'gamble'
    });

    this.usage = '[max/min [max]]';
    this.examples = ['', '100', '95 100'];
  }

  *args() {
    const min = yield {
      type: 'integer'
    }

    const max = yield {
      type: 'integer'
    }

    if (!min && !max) return { value: 6 }
    else if (max) return {min, max}
    else return { value: min }
  }

  exec(message, args) {
    let num;
    if (args.value) {
      num = Math.floor(Math.random() * args.value + 1);
    }
    else {
      num = this.client.functions.getRandom(args.min, args.max);
    }
    return message.util.send(`I rolled \`${num}\``);
  }
}

module.exports = RollCommand;
