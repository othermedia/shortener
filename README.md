Shortener
=========

A small wrapper around the bit.ly JavaScript API. The paradigmatic use case for
URI shorteners these days is creating short URIs for posting to Twitter, so
the Shortener wrapper focuses on shortening URIs rather than any of the other
functionality that the bit.ly API provides.


Usage
-----

The bit.ly JavaScript API file must be included _before_ the Shortener library
file. Here's the URI, together with an example query string. More details can
be found in the [bit.ly JavaScript Client API][1].

    <script type="text/javascript" src="http://bit.ly/javascript-api.js?version=latest&login=bitlyapidemo&apiKey=R_0da49e0a9118ff35f52f629d2d71bf07"></script>

A full example implementation can be found in `example.html`. The most salient
points are these:

Hitting the bit.ly servers with a request on every page load is obviously not
ideal, so any implementation should defer that request until the user interacts
with whatever functionality is using the URI shortener.

If no URI is provided to the Shortener.shorten method, it will default to the
current page URI.

    Shortener.shorten(function(data) {
      // No URI, just a callback function
    });
    
    Shortener.shorten('http://twitter.com/home', function(data) {
      // Using the URI provided as an argument
    });

The first argument to the provided callback function will be a result object
with the following form:

    {
      "hash":            "GqA2Q",
      "shortKeywordUrl": "",
      "shortUrl":        "http://bit.ly/3RGYGa",
      "userHash":        "3RGYGa"
    }

This is provided for convenience's sake, as it will tend to be of the most
direct interest. The full result object from the server is provided as a second
argument.

[1]: http://code.google.com/p/bitly-api/wiki/JavascriptClientApiDocumentation
