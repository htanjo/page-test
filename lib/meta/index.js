'use strict';

var request = require('request');
var cheerio = require('cheerio');

module.exports = function (url, callback) {
  request(url, function (error, res, html) {
    var $ = cheerio.load(html);
    var title = $('title').text();
    var description = $('meta[name="description"]').attr('content');
    var keywords = $('meta[name="keywords"]').attr('content');
    keywords = typeof keywords === 'string' ? keywords.split(',') : keywords;
    var data = {
      url: url,
      title: title,
      description: description,
      keywords: keywords
    };
    if (typeof callback === 'function') {
      callback(error, data);
    }
  });
};
