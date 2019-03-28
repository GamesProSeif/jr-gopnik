const { join } = require('path');

exports.run = (bot, message, args) => {
  if(!args || args.size < 1) return message.reply("Must provide a command name to reload.");
  const commandName = args[0].toLowerCase();
  if(!bot.commands.has(commandName)) {
    return message.reply("That command does not exist");
  }

  delete require.cache[require.resolve(join(__dirname, `${commandName}.js`))];
  bot.commands.delete(commandName);
  const props = require(join(__dirname, `${commandName}.js`));
  bot.commands.set(commandName, props);
  message.reply(`The command \`${commandName}\` has been reloaded`);
};

exports.desc = 'Reloads a command';
exports.group = 'dev';
exports.usage = '<command>';
