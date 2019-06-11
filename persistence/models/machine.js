const Sequelize = require('sequelize');
const db = require('../db');
const machines = db.define('machine', {
    device_id:        {type: Sequelize.STRING,      allowNull: false,   primaryKey: true},
    device_name:      {type: Sequelize.STRING(64),  allowNull: false,   primaryKey: false},
    temperature:      {type: Sequelize.INTEGER,     allowNull: true,    primaryKey: false},
},{
  tableName: 'machine'
});

module.exports = machines;