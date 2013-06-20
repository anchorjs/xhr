define(function() {

  function XHRError(message, statusCode, statusText) {
    this.name = 'XHRError';
    this.message = message || 'XHR error';
    this.status =
    this.statusCode = statusCode;
    this.statusText = statusText;
  }
  XHRError.prototype = new Error();
  XHRError.prototype.constructor = XHRError;

  return XHRError;
});
