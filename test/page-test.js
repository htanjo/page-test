'use strict';

var assert = require('assert');
var psi = require('psi');
var meta = require('../lib/meta');

var urls = require('./fixtures/urls.json');
var expected = require('./fixtures/expected.json');

urls.forEach(function (url) {
  describe('URL: ' + url, function () {

    this.timeout(10000);

    describe('PageSpeed Insights', function () {

      this.timeout(20000);

      it('says 85 or over', function (done) {
        psi(url, {strategy: 'desktop'}, function (error, data) {
          assert(data.score >= 85);
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
        var expectation = expected[url] && expected[url].title ? expected[url].title : null;
        if (expectation !== null) {
          assert.equal(results.title, expectation);
        }
        else {
          assert(!!results.title);
        }
      });

      it('contains proper description', function () {
        var expectation = expected[url] && expected[url].description ? expected[url].description : null;
        if (expectation !== null) {
          assert.equal(results.description, expectation);
        }
        else {
          assert(!!results.description);
        }
      });

      it('contains proper keywords', function () {
        var expectation = expected[url] && expected[url].keywords ? expected[url].keywords : null;
        if (expectation !== null) {
          assert.equal(results.keywords, expectation);
        }
        else {
          assert(!!results.keywords);
        }
      });

    });

  });
});
