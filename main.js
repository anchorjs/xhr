/**
 * ajax
 *
 * This module support for making HTTP requests using XHR.
 *
 * References:
 *  - [XMLHttpRequest](http://www.w3.org/TR/XMLHttpRequest/)
 *  - [XMLHttpRequest (WHATWG)](http://xhr.spec.whatwg.org/)
 *  - [MDN > DOM](https://developer.mozilla.org/en-US/docs/DOM/XMLHttpRequest)
 */
define(['exports',
        './lib/request'],
function(exports, Request) {

  function request(url, method, cb) {
    if (typeof method == 'function') {
      cb = method;
      method = 'GET';
    }
    
    var req = new Request(url, method);
    if (cb) req.on('response', cb);
    return req;
  }

  function get(url, cb) {
    var req = request(url, cb);
    req.send();
    return req;
  }

  exports.request = request;
  exports.get = get;
});
