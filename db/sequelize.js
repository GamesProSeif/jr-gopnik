const Sequelize = require('sequelize');
const { join } = require('path');

const sequelize = new Sequelize('database', 'user', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  // operatorsAliases: false,
  // SQLite only
  storage: join(__dirname, 'database.sqlite')
});

module.exports = sequelize;
