const Config_release = './config_release';
const Config_dev = './config_dev';
const fs = require('fs');

var config = null;

if (process.env.NODE_ENV === 'dev') {
    console.log(`Load dataBase config ${Config_dev}...`);
    config = require(Config_dev);
} else {
    console.log(`Load dataBase config ${Config_release}...`);
    config = require(Config_release);
}

module.exports = config;