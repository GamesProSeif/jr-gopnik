exports.run = async (bot, message, args) => {
  try {
    let regex = /```(?:(?<lang>\S+)\n)?\s?(?<code>[^]+?)\s?```/;
    let code = message.content.replace(new RegExp(`${bot.config.prefix}eval`, 'i'), '');
    if (regex.test(code)) {
      let match = code.match(regex);
      code = match.groups.code;
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
exports.examples = [
  '1 + 1',
];
