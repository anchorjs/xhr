define(['./response',
        './errors/ajaxerror',
        'events',
        'class'],
function(Response, AjaxError, Emitter, clazz) {
  
  function Request(url, method) {
    Emitter.call(this);
    this.url = url;
    this.method = method || 'GET';
    this.responseType = null;
    this.withCredentials = false;
    
    this._xhr = null;
    this._headers = {};
    this._mime = null;
    this._aborting = false;
  }
  clazz.inherits(Request, Emitter);
  
  Request.prototype.send = function(data) {
    var self = this
      , xhr = new XMLHttpRequest()
      , res;
    
    this._xhr = xhr;
    xhr.onreadystatechange = function(e) {
      switch (xhr.readyState) {
        case 0:  // UNSENT
          break;
        case 1:  // OPEN
          self.emit('open');
          break;
        case 2:  // HEADERS_RECEIVED
          res = new Response();
          res._init(xhr);
          self.emit('response', res);
          break;
        case 3:  // LOADING
          res._data(xhr);
          break;
        case 4:  // DONE
          if (self._aborting) {
            self.emit('abort');
          } else if (res) {
            res._end(xhr);
          } else {
            self.emit('error', new AjaxError('Failed to load', xhr.status, xhr.statusText));
          }
          xhr.onreadystatechange = noop;
          break;
      }
    };
    xhr.onprogress = function(e) {
      res._progress(e);
    };
    
    if (xhr.upload) {
      xhr.upload.onprogress = function(e) {
        if (e.lengthComputable) {
          self.emit('progress', e.loaded, e.total);
        }
      };
    }
    
    if (this.responseType) { xhr.responseType = this.responseType; }
    if (this.withCredentials) { xhr.withCredentials = this.withCredentials; }
    
    xhr.open(this.method, this.url, true);
    for (var name in this._headers) {
      xhr.setRequestHeader(name, this._headers[name]);
    }
    if (this._mime) { xhr.overrideMimeType(this._mime); }
    xhr.send(data);
  };
  
  Request.prototype.getHeader = function(name) {
    return this._headers[name];
  };
  
  Request.prototype.setHeader = function(name, value) {
    this._headers[name] = value;
  };
  
  Request.prototype.removeHeader = function(name) {
    delete this._headers[name];
  };
  
  Request.prototype.overrideMimeType = function(mime) {
    this._mime = mime;
  };
  
  Request.prototype.abort = function() {
    this._aborting = true;
    this._xhr.abort();
  };
  
  function noop() {}
  
  return Request;
});
