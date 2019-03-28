exports.run = (bot, message, args) => {
  message.channel.send(args.join(' '));
  message.delete();
}

exports.desc = 'Makes the bot say a message';
exports.usage = '<message>';
