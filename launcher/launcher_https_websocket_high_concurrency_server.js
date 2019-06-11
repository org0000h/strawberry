#!/usr/bin/env node

/**
 * Module dependencies.
 */
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
 
cluster.setupMaster({
  exec: './launcher/https_websocket_server_launcher.js',
  // args: ['--use', 'https'],
  // silent: true
});

for (var i = 0; i < numCPUs; i++) {
  console.log(`start worker${i}`)
    cluster.fork();
}
  // Listen for dying processes
cluster.on('exit', function(worker, code, signal) {
  console.log(`A process(pid=${worker.process.pid}) died (${signal || code}). Restarting...`);
  cluster.fork();
});

cluster.on('disconnect', function () {
  clsuter.fork();
});

