const Sequelize = require('sequelize');
const config = require('./loadConfig');
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  pool: {
    max: 100,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: config.logging
});
module.exports = sequelize;