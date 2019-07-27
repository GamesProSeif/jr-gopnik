const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const util = require('util');
const execFile = util.promisify(require('child_process').execFile);

const mathEval = async (...expression) => {
  expression.unshift('./config/math.js');
  const { stdout, stderr } = await execFile('node', expression);

  if (stderr) throw new Error(stderr);

  const { evaled } = JSON.parse(stdout.replace('\n', '').trim());
  return evaled;
};

class MathCommand extends Command {
  constructor() {
    super('math', {
      aliases: ['math', 'maths', 'maffs', 'calculate', 'm'],
      description: 'Evaluates a mathematical expression',
      category: 'special',
      args: [
        {
          id: 'expression',
          match: 'content',
          prompt: {
            start: `What's the expression you want to evaluate?`
          }
        }
      ]
    });

    this.usage = '<expression>';
    this.examples = [
      'simplify("4x/2")',
      'derivative("2x^2 + x", "x")',
      '12.7 cm to inch',
      'cos(90 deg)',
      'sqrt(-4)'
    ];
  }

  async exec(message, { expression }) {
    const sent = await message.util.send('Evaluating...');
    try {
      const evaled = await mathEval(expression);

      const embed = new MessageEmbed()
        .setColor(this.client.config.colors.primary)
        .addField('❯ Input', `\`\`\`\n${expression}\n\`\`\``)
        .addField('❯ Output', `\`\`\`\n${evaled}\n\`\`\``);

      return sent.edit({ content: null, embed });
    } catch (error) {
      const embed = new MessageEmbed()
        .setColor(this.client.config.colors.error)
        .addField('❯ Input', `\`\`\`\n${expression}\n\`\`\``)
        .addField('❯ Error', `\`\`\`\n${error.message}\n\`\`\``);

      return sent.edit({ content: null, embed });
    }
  }
}

module.exports = MathCommand;
