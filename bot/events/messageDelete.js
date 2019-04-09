const handler = (bot, message) => {
  if (message.author.bot || message.channel.type !== 'text') return;

  let name = message.channel.name.toUpperCase();
  if (name == 'NSFW' || name == 'HOT-GUYS' || NAME == 'HOT-GIRLS') return;

  let channelMessages = bot.deletedMessages.filter(m => m.channel.id === message.channel.id);

  if (channelMessages.size >= 10) {
    bot.deletedMessages.delete(channelMessages.firstKey());
  }

  bot.deletedMessages.set(message.id, message);
}

module.exports = handler;
