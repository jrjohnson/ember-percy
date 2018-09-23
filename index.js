/* eslint no-console: off */

'use strict';

var bodyParser = require('body-parser');
var Environment = require('percy-client/dist/environment');

module.exports = {
  name: 'ember-percy',



  included: function(app) {
    this._super.included(app);
    app.import('vendor/percy-jquery.js', {type: 'test'});
  },

  // Only allow the addon to be incorporated in non-production envs.
  isEnabled: function() {
    // This cannot be just 'test', because people often run tests from development servers, and the
    // helper imports will fail since ember-cli excludes addon files entirely if not enabled.
    return (process.env.EMBER_ENV !== 'production');
  },

  // Inject percy finalization into the footer of tests/index.html.
  contentFor: function(type) {
    // Disable finalize injection if Percy is explicitly disabled or if not in an 'ember test' run.
    // This must be handled separately than the outputReady disabling below.
    if (process.env.PERCY_ENABLE == '0' || process.env.EMBER_ENV !== 'test') {
      return;
    }

    if (type === 'test-body-footer') {
      return "\
        <script> \
          require('ember-percy/native-xhr')['default'](); \
        </script> \
        <script src='http://localhost:5338/percy-agent.js'></script> \
      ";
    }
  },
};
