exports.run = (bot, message, args) => {
  if (!args[0]) {
    message.channel.send({embed:{
      title: 'Error',
      description: 'Please add context to be added as the argument',
      color: bot.config.colors.error
    }});
    return;
  }
  args = args.map(str => str.trim());
  if (!args[0]) {
    message.channel.send({embed:{
      title: 'Error',
      description: 'Please add context to be added as the argument',
      color: bot.config.colors.error
    }});
    return;
  }
  let context = args.join('+');
  let link = `http://lmgtfy.com/?q=${context}`;
  message.channel.send({embed:{
    title: 'Lmgtfy',
    description: `[cLiCk hEre plS!](${link})`,
    url: link,
    color: bot.config.colors.true
  }});
}

exports.desc = 'Generates a link to [lmgtfy](http://lmgtfy.com "Lmgtfy website") with specified context';
exports.usage = '<context>';
exports.aliases = ['imgtfy', 'img', 'google'];
