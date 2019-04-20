const handle = (bot) => {
  console.log(`Launched ${bot.user.username}...`);
  bot.user.setStatus('online');
  bot.user.setActivity(`${bot.config.prefix}help`);
}

module.exports = handle;
