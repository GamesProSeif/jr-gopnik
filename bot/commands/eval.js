exports.run = async (bot, message, args) => {
  try {
    let regex = /(^```\w*|```$)/gm;
    let code = args.join(' ');
    if (code.startsWith('```') && code.endsWith('```')) {
      let matches = code.match(regex);
      matches.forEach(match => {
        code = code.replace(match, '');
      });
    }

    let evaled = eval(code);

    if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
    if (evaled.length >= 2000) {
      return message.channel.send('Evaluated value was too long');
    }
    message.channel.send(bot.functions.clean(evaled), {
      code: ''
    });
  } catch (err) {
    message.channel.send(`\`ERROR\` \`\`\`js\n${bot.functions.clean(err)}\n\`\`\``);
  }
}

exports.desc = 'Evaluates __JavaScript__ code';
exports.group = 'dev';
exports.guildOnly = true;