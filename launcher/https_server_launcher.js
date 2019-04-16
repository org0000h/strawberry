#!/usr/bin/env node
const app = require('../app');
const https = require('https');
const fs = require('fs');
const {
  normalizePort,
  onError,
} = require('./for_launcher');

https.globalAgent.maxSockets = 40000;

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//tls key and crt
let privateKey  = fs.readFileSync(__dirname + '/../ecc_cert/ecc.key', 'utf8');
let certificate = fs.readFileSync(__dirname + '/../ecc_cert/ecc.crt', 'utf8');
let credentials = {key: privateKey, cert: certificate};

var server = https.createServer(credentials,app);

server.listen(port);
server.on('error', onError);
server.on('listening',()=>{
  console.log('listening on port:' + port);
});
