require('dotenv').config();
const fs = require('fs');
const fetch = require('node-fetch');
const { join } = require('path');
const config = require(join(__dirname, 'config', 'config.json'));
const { ShardingManager } = require('discord.js');

const runBot = async () => {
  const res = await fetch(`${config.serverHost}/util/ping`);
  if (!res.ok) {
    console.error('Server is offline! Exiting...');
    process.exit(1);
  }
  if (!config.sharding) return require(join(__dirname, 'bot', 'bot.js'));
  else {
    const manager = new ShardingManager(join(__dirname, 'bot', 'bot.js'));

    manager.spawn();
    manager.on('shardCreate', shard =>
      console.log(`Launched shard ${shard.id}`)
    );
  }
};

process.on('unhandledRejection', error => {
  console.error('Unhandled promise rejection:', error);
});

fs.writeFile(join(__dirname, 'db', 'database.sqlite'), '', err => {
  if (err) return console.error(err);

  console.log('Created SQLite file');
  runBot();
});
