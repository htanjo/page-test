'use strict';

var assert = require('assert');
var psi = require('psi');
var meta = require('../lib/meta');

var url = 'https://github.com/';

describe('Page: ' + url, function () {

  this.timeout(10000);

  describe('PageSpeed Insights', function () {

    it('says 80 or over', function (done) {
      psi(url, {strategy: 'desktop'}, function (error, data) {
        assert(data.score >= 80);
        done();
      });
    });

  });

  describe('Meta data', function () {

    var results;

    before(function (done) {
      meta(url, function (error, data) {
        results = data;
        done();
      });
    });

    it('contains proper title', function () {
      assert.equal(results.title, 'GitHub · Build software better, together.');
    });

    it('contains proper description', function () {
      assert.equal(results.description, 'Build software better, together.');
    });

    it('contains some keywords', function () {
      assert(results.keywords && results.keywords.length > 0);
    });

  });

});
