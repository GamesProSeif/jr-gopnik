module.exports = () => {
  // Setting up dependencies
  const fs = require('fs');
  const path = require('path');
  require('dotenv').config();
  const Discord = require('discord.js');
  const bot = new Discord.Client();
  const Enmap = require('enmap');
  const config = require(path.join(__dirname, 'config', 'config.json'));
  bot.config = config; // Making config accessible everywhere

  // Converting colors to integers
  Object.keys(bot.config.colors).map(function(key) {
    bot.config.colors[key] = parseInt(bot.config.colors[key]);
  });

  // Edits Enmap
  bot.editedMessages = new Enmap();
  // Snipe Enmap
  bot.deletedMessages = new Discord.Collection();

  // Public commands
  bot.functions = require(path.join(__dirname, 'config', 'functions.js'));

  // Event handler
  fs.readdir(path.join(__dirname, 'events/'), (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      // Looping across files
      if (!file.endsWith('.js')) return; // Don't read non js files
      const event = require(path.join(__dirname, 'events', file)); // Require event
      let eventName = file.split('.')[0]; // Get the name (dont include .js)

      // Handling each event
      bot.on(eventName, event.bind(null, bot));
      delete require.cache[require.resolve(path.join(__dirname, 'events', file))];
    });
  });

  // Command handler
  bot.commands = new Enmap(); // Generating Enmap
  // Looping across files
  fs.readdir(path.join(__dirname, 'commands'), (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith('.js')) return; // Don't read non js files
      let props = require(path.join(__dirname, 'commands', file)); // Require command
      let commandName = file.split('.')[0]; // Get the name (dont include .js in name)

      props.name = commandName;
      if (!props.desc) props.desc = 'No description defined';
      if (!props.group) props.group = 'user';
      if (!props.usage) props.usage = commandName.toLowerCase();
      else props.usage = `${commandName.toLowerCase()} ${props.usage}`;
      if (!props.aliases) props.aliases = [];
      props.guildOnly = props.guildOnly ? props.guildOnly : false;

      bot.commands.set(commandName.toLowerCase(), props);
    });
  });

  bot.login(process.env.token);
}
