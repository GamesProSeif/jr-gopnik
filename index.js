const path = require('path');
const { Client } = require('discord.js');
const bot = new Client();
(require(path.join(__dirname, 'bot', 'bot.js')))(bot);
(require(path.join(__dirname, 'server', 'server.js')))(bot);

exports.bot = bot;
