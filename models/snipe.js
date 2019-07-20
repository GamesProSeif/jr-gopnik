const Sequelize = require('sequelize');
const { join } = require('path');
const sequelize = require(join(__dirname, '..', 'db', 'sequelize.js'));

class Snipe extends Sequelize.Model {}

Snipe.init({
  id: {
    type: Sequelize.STRING,
    unique: true,
    primaryKey: true
  },
  guild: {
    type: Sequelize.STRING
  },
  channel: {
    type: Sequelize.STRING
  },
  author: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.STRING,
    defaultValue: null
  },
  attachments: {
    type: Sequelize.STRING,
    defaultValue: null
  }
}, {
  sequelize,
  modelName: 'snipe'
});

Snipe.sync();

module.exports = Snipe;
