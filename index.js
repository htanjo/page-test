'use strict';

var fs = require('fs');
var Mocha = require('mocha');

var mocha = new Mocha({
  reporter: 'spec'
});

mocha.addFile(__dirname + '/test/page-test.js');

mocha.run(function (failures) {
  process.on('exit', function () {
    process.exit(failures);
  });
});
