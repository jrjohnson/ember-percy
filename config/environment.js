'use strict';

function clientInfo() {
  var version = require('../package.json').version;
  var name = require('../package.json').name;
  return `${name}/${version}`;
}

function environmentInfo() {
  return [
    `ember/${_emberSourceVersion()}`,
    `ember-cli/${_emberCliVersion()}`
  ].join('; ');
}

function _emberSourceVersion() {
  try {
    // eslint-disable-next-line node/no-unpublished-require
    return require('ember-source/package.json').version;
  } catch (e) {
    return 'unknown';
  }
}

function _emberCliVersion() {
  try {
    // eslint-disable-next-line node/no-unpublished-require
    return require('ember-cli/lib/utilities/version-utils').emberCLIVersion();
  } catch (e) {
    return 'unknown';
  }
}

module.exports = function(environment, appConfig) {
  appConfig.percy = process.env.percy || {};
  appConfig.percy.enable = process.env.PERCY_ENABLE || '1';
  appConfig.percy.clientInfo = clientInfo();
  appConfig.percy.environmentInfo = environmentInfo();

  return {};
};
