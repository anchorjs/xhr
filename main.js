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
        './lib/request',
        'url'],
function(exports, Request, uri) {

  function request(url, method, cb) {
    var headers;
    
    if (typeof url == 'object') {
      var opts = url;
      cb = method;
      method = opts.method || 'GET';
      url = uri.format(opts);
      headers = opts.headers;
    } else if (typeof method == 'function') {
      cb = method;
      method = 'GET';
    }
    
    var req = new Request(url, method);
    if (headers) {
      for (var name in headers) {
        req.setHeader(name, headers[name]);
      }
    }
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
