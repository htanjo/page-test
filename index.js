'use strict';

var fs = require('fs');
var Mocha = require('mocha');
var htmlReporter = require('./reporters/html');

var mocha = new Mocha({
  reporter: htmlReporter
});

mocha.addFile(__dirname + '/test/page-test.js');

mocha.run(function (failures) {
  process.on('exit', function () {
    process.exit(failures);
  });
});
