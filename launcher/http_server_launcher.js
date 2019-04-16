#!/usr/bin/env node
const app = require('../app');
const http = require('http');
const {
  normalizePort,
  onError,
} = require('./for_launcher');

http.globalAgent.maxSockets = 40000;

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

let server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening',()=>{
    console.log('listening on port:' + port);
});

