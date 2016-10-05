/**
 * Module dependencies.
 */

const models = require('../../database');

/**
 * Export the tweet API with its own routes.
 */

exports.register = function (server, options, next) {

  next();
};

exports.register.attributes = {
  name: 'tweets'
};
