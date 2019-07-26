const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { create, all } = require('mathjs');

const math = create(all);
const limitedEval = math.evaluate;

math.import(
  {
    import: () => {
      throw new Error('Function import is disabled');
    },
    createUnit: () => {
      throw new Error('Function createUnit is disabled');
    },
    evaluate: () => {
      throw new Error('Function evaluate is disabled');
    }
    // parse: () => {
    //   throw new Error('Function parse is disabled');
    // }
  },
  { override: true }
);

class MathCommand extends Command {
  constructor() {
    super('math', {
      aliases: ['math', 'm'],
      description: 'Evaluates a mathematical expression',
      category: 'special',
      args: [
        {
          id: 'expression',
          match: 'content'
        }
      ]
    });

    this.usage = '<expression>';
  }

  exec(message, { expression }) {
    try {
      const evaled = limitedEval(expression);

      const embed = new MessageEmbed()
        .setColor(this.client.config.colors.primary)
        .addField('❯ Input', `\`\`\`\n${expression}\n\`\`\``)
        .addField('❯ Output', `\`\`\`\n${evaled}\n\`\`\``);

      return message.util.send(embed);
    } catch (error) {
      const embed = new MessageEmbed()
        .setColor(this.client.config.colors.error)
        .addField('❯ Input', `\`\`\`\n${expression}\n\`\`\``)
        .addField('❯ Error', `\`\`\`\n${error.message}\n\`\`\``);

      return message.util.send(embed);
    }
  }
}

module.exports = MathCommand;
