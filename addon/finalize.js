import Ember from 'ember';
import { getNativeXhr } from './native-xhr';
import { maybeDisableMockjax, maybeResetMockjax } from './mockjax-wrapper';

// Percy finalizer to be called at the very end of the test suite.
// Note: it is important that this is called always, no matter if percySnapshot was used or not,
// to support parallelized test runners with Percy's aggregation of parallel finalize calls.
function finalizeBuildOnce() {
  maybeDisableMockjax();
  let options = {
    xhr: getNativeXhr,
    method: 'POST',
    // Use "async: false" to block the browser from shutting down until the finalize_build call
    // has fully returned. This prevents testem from shutting down the express server until
    // our middleware has finished uploading resources and resolving promises.
    async: false,
    timeout: 30000,
  };
  Ember.$.ajax('/_percy/finalize_build', options);
  maybeResetMockjax();
}

// When imported into test-body-footer, register Testem hook to know when all tests are finished.
export default function() {
  if (window.Testem.afterTests) {
    // Testem >= v1.6.0. (We should just use afterTests, but it does not work as expected).
    window.Testem.on('after-tests-complete', finalizeBuildOnce);
  } else {
    // Testem < v1.6.0.
    window.Testem.on('all-test-results', finalizeBuildOnce);
  }
}
