'use strict';

module.exports = function(environment, appConfig) {
  appConfig.percy = process.env.percy;

  return {};
};
