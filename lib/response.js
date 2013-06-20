define(['events',
        'class'],
function(Emitter, clazz) {
  
  function Response() {
    Emitter.call(this);
    this.headers = {};
    this._offset = 0;
  }
  clazz.inherits(Response, Emitter);
  
  Response.prototype._init = function(xhr) {
    var headers = xhr.getAllResponseHeaders()
      , header, name, value;
    
    headers = headers.split('\r\n');
    for (var i = 0, len = headers.length; i < len; i++) {
      header = headers[i].split(':');
      name = header[0].toLowerCase();
      value = header.slice(1).join(':').trim();
      
      if (name.length && value.length) {
        if (!this.headers[name]) {
          this.headers[name] = value;
        } else if (this.headers[name] instanceof Array) {
          this.headers[name].push(value);
        } else {
          this.headers[name] = [this.headers[name], value];
        }
      }
    }
  };
  
  Response.prototype._data = function(xhr) {
    if (xhr.responseText.length > this._offset) {
      this.emit('data', xhr.responseText.slice(this._offset));
      this._offset = xhr.responseText.length;
    }
  };
  
  Response.prototype._progress = function(e) {
    if (e.lengthComputable) {
      this.emit('progress', e.loaded, e.total);
    }
  };
  
  Response.prototype._end = function(xhr) {
    this.status =
    this.statusCode = xhr.status;
    
    // Workaround bug in IE which incorrectly returns a status code of 1223 when
    // the response status code is 204.
    //
    // Details:
    //   http://blogs.msdn.com/b/ieinternals/archive/2009/07/23/the-ie8-native-xmlhttprequest-object.aspx
    //   http://bugs.jquery.com/ticket/1450
    if (xhr.status == 1223) this.statusCode = 204;
    
    this.response = xhr.response;
    this.responseText = xhr.responseText;
    this.responseXML = xhr.responseXML;
    this.emit('end');
  };
  
  return Response;
});
