'use strict';

var assert = require('chai').assert;
var psi = require('psi');
var meta = require('../lib/meta');

var urls = require('./fixtures/urls.json');
var expected = require('./fixtures/expected.json');

urls.forEach(function (url) {
  describe(url, function () {

    this.timeout(10000);

    describe('PageSpeed Insights', function () {

      this.timeout(20000);

      it('scores 85 or over', function (done) {
        psi(url, {strategy: 'desktop'}, function (error, data) {
          assert.operator(data.score, '>=', 85);
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
          assert.isString(results.title);
        }
        if (typeof results.title === 'string') {
          assert.notEqual(results.title, '');
          assert.isBelow(results.title.length, 50);
        }
      });

      it('contains proper description', function () {
        var expectation = expected[url] && expected[url].description ? expected[url].description : null;
        if (expectation !== null) {
          assert.equal(results.description, expectation);
        }
        else {
          assert.isString(results.description);
        }
        if (typeof results.description === 'string') {
          assert.notEqual(results.description, '');
          assert.isBelow(results.description.length, 200);
        }
      });

      it('contains proper keywords', function () {
        var expectation = expected[url] && expected[url].keywords ? expected[url].keywords : null;
        if (expectation !== null) {
          assert.equal(results.keywords, expectation);
        }
        else {
          assert.isString(results.keywords);
        }
        if (typeof results.keywords === 'string') {
          assert.notEqual(results.keywords, '');
        }
      });

    });

  });
});
