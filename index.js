'use strict';

var fs = require('fs');
var path = require('path');
var Mocha = require('mocha');
var htmlReporter = require('./reporters/html');

var mocha = new Mocha({
  reporter: htmlReporter
});

mocha.addFile(path.join(__dirname, 'test/page-test.js'));

mocha.run(function (failures) {
  process.on('exit', function () {
    process.exit(failures);
  });
});
