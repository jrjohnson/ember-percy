'use strict';

module.exports = function(environment, appConfig) {
  appConfig.percy = process.env.percy || {};
  appConfig.percy.enable = process.env.PERCY_ENABLE || '1';

  return {};
};
