const Sequelize = require('sequelize');
const config = require('./loadConfig');
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // 请参考 Querying - 查询 操作符 章节
//   operatorsAliases: false
});
module.exports = sequelize;