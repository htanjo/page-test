'use strict';

var fs = require('fs');
var mkdirp = require('mkdirp');
var Handlebars = require('handlebars');
var opn = require('opn');
var chalk = require('chalk');
var figures = require('figures');

module.exports = function (runner) {

  var data = {
    suites: []
  };

  var passes = 0;
  var failures = 0;
  var nest = 0;

  function indent() {
    return Array(nest).join('  ')
  }

  function generate(data) {
    var dirPath = process.cwd() + '/tmp';
    var filePath = dirPath + '/results.html';
    var source = fs.readFileSync(__dirname + '/results.hbs', 'utf-8');
    var template = Handlebars.compile(source);
    var html = template(data);

    mkdirp.sync(dirPath);
    fs.writeFileSync(filePath, html);
    console.log(indent() + 'saved: %s', filePath);
    console.log();
    opn(filePath);
  }

  runner.on('start', function (a) {
    console.log();
  });

  runner.on('suite', function (suite) {
    if (nest === 0) {
      data.suites.push(suite);
    }
    console.log(indent() + suite.title);
    nest++;
  });

  runner.on('suite end', function (suite) {
    nest--;
    if (nest === 1) {
      console.log();
    }
  });

  runner.on('pass', function (test) {
    passes++;
    console.log(indent() + chalk.green('%s %s'), figures.tick, test.title);
  });

  runner.on('fail', function (test, error) {
    failures++;
    console.log(indent() + chalk.red('%s %s'), figures.cross, test.title);
    nest++;
    console.log(indent() + chalk.gray('error: %s'), error.message);
    nest--;
  });

  runner.on('end', function () {
    console.log(indent() + 'end: %d/%d passed', passes, passes + failures);
    console.log();
    generate(data);
    process.exit(failures);
  });

};
