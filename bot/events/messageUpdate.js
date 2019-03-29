const handler = (bot, oldMessage, newMessage) => {
  if (oldMessage.author.bot || oldMessage.channel.type !== 'text') return;
  if (bot.editedMessages.size >= 100) {
    let firstMessage = bot.editedMessages.keys[0];
    bot.editedMessages.delete(firstMessage);
  }
  if (bot.editedMessages.has(oldMessage.id)) {
    bot.editedMessages.push(oldMessage.id, newMessage.content, 'edits');
  }
  else {
    bot.editedMessages.set(oldMessage.id, {
      id: oldMessage.id,
      originalMessage: oldMessage.content,
      edits: [oldMessage.content, newMessage.content],
      authorTag: oldMessage.author.tag,
      authorAvatarURL: oldMessage.author.avatarURL,
      timestamp: newMessage.createdTimestamp
    });
  }
}

module.exports = handler;
