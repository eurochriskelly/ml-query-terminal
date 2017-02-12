'use strict';

const marklogic = require('marklogic');
const CONFIG = require('./config.json');
const db = marklogic.createDatabaseClient(CONFIG);

const MLQC = require('./lib/ml-query-cli');
const mlquerycli = new MLQC(db);
