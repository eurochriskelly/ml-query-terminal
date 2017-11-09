'use strict';

const clc = require('cli-color');
const fs = require('fs');
const argv = require('yargs').argv;

class MarkLogicQueryClient {

    constructor (db) {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        this.db = db;
        this.processArgs();
        this.evalQuery(e => {
            if (e) throw e;
            if (argv.w) fs.watchFile(
                this.fname, (curr, prev) => {
                    if (curr !== prev) {
                        this.evalQuery(e => e);
                    }
                });
        });
    }

    showMlHeader() {
        console.log(clc.yellow(`MarkLogic cli console`));
    }

    evalQuery(done) {
        fs.readFile(`${this.fname}`, (e, data) => {
            if (e) throw e;

            const source = data.toString();
            if (this.verbose) this.printSource(source);
            
            var res;
            const isXquery = ['xq', 'xqy'].indexOf(this.ext.toLowerCase()) > -1;
            try {
                if (isXquery) {
                    res = this.db.xqueryEval(source, argv);
                } else {
                    var contents = `'use strict';
var args = ${JSON.stringify(argv)};
${source}`;
                    res = this.db.eval(contents);
                }
            }
            catch(err) {
                console.log(err);
            }

            console.log(clc.blue(`Results @ ${new Date()}`));
            if (res && res.result) {
                res.result()
                    .then(r => {
                        var remaining = r.length;
                        r.forEach((rdata, i) => {
                            console.log(rdata.value);
                            if (!--remaining) done();
                        });
                    })
                    .error(e => {
                        if (+(e.statusCode) === 500) {
                            console.log('Internal error: 500');
                            console.log(clc.red(e.body.errorResponse.message));
                            process.exit();
                        }
                        else {
                            console.log('Bad result');
                            console.log(e);
                        }
                        done (e);
                    });
            }
            else {
                console.log('NO RESULT');
                console.log(res);
            }
        });
    }
    
    processArgs() {
        if (!argv.q) {
            this.showHelp();
        } else {
            this.showMlHeader();
            this.fname = argv.q;
            this.ext = this.fname.substring(this.fname.lastIndexOf('.')+1);
            if (argv.v) this.verbose = true;
        }
    }

    printSource (src) {
        console.log(clc.yellow(`===========
EVALUATING:
${clc.cyan(src)}
===========
`));
    }

    showHelp () {
        console.log(`USAGE: mlcli [OPTIONS]
OPTIONS:
 -q <SCRIPT_NAME>      : Xquery or js script to run on server.
 -w                    : Watch script for changes.
 -v                    : Verbose mode. print extra info.
`);
        process.exit();
    }

}

module.exports = MarkLogicQueryClient;
