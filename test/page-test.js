'use strict';

var assert = require('assert');
var psi = require('psi');

var url = 'https://github.com/';

describe(url, function () {

  it('marks 90 or over in PageSpeed Insights', function (done) {
    this.timeout(10000);
    psi(url, {strategy: 'desktop'}, function (error, data) {
      assert(!error);
      assert(data.score >= 90);
      done();
    });
  });

});
