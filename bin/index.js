#!/usr/bin/env node

(function (){
    'use strict';

    const path = require('path');
    const marklogic = require('marklogic');
    var sslRootCAs = require('ssl-root-cas/latest')
    sslRootCAs.inject()

    var CONFIG;
    try {
        // load section of package.json
        var pkg = require(path.resolve(process.cwd(), 'package.json'));
        if (pkg.mlqt) {
            CONFIG = pkg.mlqt;
        }
        else {
            console.log('No config in package.json. Using defaults.');
            loadDefaults()
        }
    }
    catch (e) { loadDefaults() }

    const db = marklogic.createDatabaseClient(CONFIG);
    const MLQC = require('../lib/ml-query-cli');
    const mlquerycli = new MLQC(db);

    function loadDefaults ()
    {
        CONFIG = require('../config.json');
    }
})();
