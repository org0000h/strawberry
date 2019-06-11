const Sequelize = require('sequelize');
const db = require('../db');
const User = db.define('user', {
  user_id:        {type: Sequelize.STRING,      allowNull: false, primaryKey: true},
  user_name:      {type: Sequelize.STRING(64),  allowNull: false, primaryKey: false},
  password:       {type: Sequelize.STRING(64),  allowNull: false, primaryKey: false},
  token_version:  {type: Sequelize.STRING,      allowNull: false, primaryKey: false},
},{
  tableName: 'user_table'
});



module.exports = User;