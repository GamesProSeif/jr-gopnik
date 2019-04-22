exports.run = (bot, message, args) => {
  message.channel.send(args.join(' '));
  if (message.channel.type == 'text') message.delete();
}

exports.desc = 'Makes the bot say a message';
exports.usage = '<message>';
