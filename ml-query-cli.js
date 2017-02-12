'use strict';

const clc = require('cli-color');
const fs = require('fs');
const argv = require('yargs').argv;

class MarkLogicQueryClient {

    constructor (db) {
	this.db = db;
	this.processArgs();
	this.evalQuery();

	
	if (!argv.w) fs.watchFile(
	    this.fname, (curr, prev) => {
		if (curr !== prev) {
		    this.evalQuery();
		}
	    });
    }

    showMlHeader() {
	console.log(clc.red(`MarkLogic cli console`));
    }

    evalQuery() {
	fs.readFile(`${this.fname}`, (e, data) => {
	    if (e) throw e;
	    const source = data.toString();
	    if (this.verbose) this.printSource(source);
	    
	    var res;
	    const isXquery = ['xq', 'xqy'].indexOf(this.ext.toLowerCase()) > -1;
	    try {
		if (isXquery) 
		    res = this.db.xqueryEval(source);
		else 
		    res = this.db.eval(source);
	    }
	    catch(err) {
		console.log('Error, I\'m afraid');
		console.log(err);
	    }

	    console.log(clc.blue(`Results @ ${new Date()}`));
	    if (res && res.result) {
		res.result().then(r => {
		    r.forEach((rdata, i) => {
			// console.log(clc.blue(`Result #${i}`));
			console.log(rdata.value);
		    });
		});
	    }
	    else {
		console.log('NO RESULT');
		console.log(res);
	    }
	    
	});
    }
    
    processArgs() {
	if (!argv.q) throw new Error('Must provide a query (-q)');

	this.showMlHeader();
	this.fname = argv.q;
	this.ext = this.fname.substring(this.fname.lastIndexOf('.')+1);
	if (argv.v) this.verbose = true;
    }

    printSource (src) {
	console.log(clc.yellow(`===========
EVALUATING:
${clc.cyan(src)}
===========
 `));
    }

}

module.exports = MarkLogicQueryClient;
