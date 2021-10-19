// const http = require('http'); // fs, os, stream, ...
// const handler = require('handler');

import http from 'http';
import handler from './handler.js';

const server = new http.Server();

server.on('request', handler);

server.listen(3000);

/**
 * 
 * 1. core modules
 * 2. ./node_modules
 *    ../node_modules
 *    ../../node_modules
 *    /node_modules
 * 
 * 3. NODE_PATH=. node index.js
 *    set NODE_PATH=.
 * 
 */