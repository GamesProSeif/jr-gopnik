const fetch = require('node-fetch');

exports.run = async (bot, message, args) => {
  try {
    let regex = /(?<silent>(?:-s|--silent) *)?```(?:(?<lang>\S+)\n)?\s?(?<code>[^]+?)\s?```/;
    // let code = message.content.replace(new RegExp(`(?:${bot.config.prefix}|<@!?${bot.user.id}>)eval`, 'i'), '');
    let code = args.join(' ');
    let silent;
    if (regex.test(code)) {
      let match = code.match(regex);
      code = match.groups.code;
      silent = match.groups.silent ? true : false;
    }
    let evaled = await eval(code);

    console.log({
      event: 'EVAL SESSION',
      user: message.author.username,
      userId: message.author.id,
      messageId: message.id,
      input: code,
      output: evaled
    });

    if (!silent) {
      if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
      if (evaled.length >= 2000) {
        let response = await fetch('https://hastebin.com/documents', {method: 'POST', body: evaled});
        let {key} = await response.json();
        return message.reply(`**Output was too long and was uploaded to https://hastebin.com/${key}.js**`);
      }
      message.channel.send(bot.functions.clean(evaled), {
        code: ''
      });
    }
  } catch (err) {
    message.channel.send(`\`ERROR\` \`\`\`js\n${bot.functions.clean(err)}\n\`\`\``);
  }
}

exports.desc = 'Evaluates __JavaScript__ code';
exports.group = 'dev';
exports.examples = [
  '1 + 1',
];
