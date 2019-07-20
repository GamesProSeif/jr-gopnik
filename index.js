require('dotenv').config();
const fs = require('fs');
const { join } = require('path');
const mongoose = require('mongoose');

process.on("unhandledRejection", error => {
  console.error("Unhandled promise rejection:", error);
});

fs.writeFile(join(__dirname, 'db', 'database.sqlite'), '', err => {
  if (err) return console.error(err);

  console.log('Created SQLite file');
});

mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.DB_URI, {useNewUrlParser: true});
let db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB');
  (require(join(__dirname, 'bot', 'bot.js')))();
  // (require(path.join(__dirname, 'server', 'server.js')))();
});

db.on('error', console.error);
