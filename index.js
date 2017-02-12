'use strict';

const marklogic = require('marklogic'); 
const db = marklogic.createDatabaseClient({
  host:     'localhost',
  port:     '8000',
  user:     'admin',
  password: 'admin',
  authType: 'DIGEST'
});

const MLQC = require('./ml-query-cli');
const mlquerycli = new MLQC(db);
