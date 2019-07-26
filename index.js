require('dotenv').config();
const fs = require('fs');
const { join } = require('path');
const config = require(join(__dirname, 'config', 'config.json'));
const mongoose = require('mongoose');
const { ShardingManager } = require('discord.js');

const runBot = () => {
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
});

mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
let db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB');
  runBot();
  require(join(__dirname, 'server', 'server.js'));
});

db.on('error', console.error);
