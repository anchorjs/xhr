# Anchor/Ajax

The ajax module implements support for making HTTP requests using XHR.

## Install

##### volo

    $ volo add anchorjs/ajax

For more information on using volo to manage JavaScript modules, visit [http://volojs.org/](http://volojs.org/).

## Usage

`ajax.request()` returns an instance of `Request`.  If one needs to upload data
with a POST request:

```javascript
var req = ajax.request('/upload', 'POST', function(res) {
  res.on('end', function() {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    console.log('BODY: ' + res.responseText);
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

req.send('data\n');
```

Since most requests are GET requests without bodies, Anchor provides `get()` as
a convenience method.  The only difference between this method and `ajax.request()`
is that it sets the method to GET and calls `req.send()` automatically.

```javascript
ajax.get("/user.json", function(res) {
  console.log("Got response: " + res.statusCode);
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});
```

## Implements

The API exposed by this module bears a superficial resemblance to the interface
exported by Node's [HTTP](http://nodejs.org/api/http.html) module.  However,
there are important distinctions that cause incompatibilities.  In particular,
the stream interface is not supported by this module because the underlying XHR
object hosted by the browser is not capable of streaming data.

Developers are advised to be aware of the differences between XHR requests and
regular HTTP requests and implement accordingly.

## Tests

##### Browser

To run tests in a browser, execute the Make target for the desired browser:

    $ make test-chrome
    $ make test-firefox
    $ make test-safari

##### PhantomJS

To run headless tests from a terminal using [PhantomJS](http://phantomjs.org/):

    $ make test-phantomjs

## Credits

  - [Jared Hanson](http://github.com/jaredhanson)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2012 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>
