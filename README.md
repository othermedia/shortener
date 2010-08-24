Shortener
=========

A small wrapper around the [bit.ly](http://bit.ly/) JSONP API. The paradigmatic
use case for URI shorteners these days is creating short URIs for posting to
Twitter, so the Shortener wrapper focuses on shortening URIs rather than any of
the other functionality that the bit.ly API provides.

Add the following to your Helium setup for deployment:

    /**
     * Loads the bit.ly API. Requires `Helium.BITLY_API_LOGIN`
     * and `Helium.BITLY_API_KEY` to be set beforehand.
     **/
    loader(function(cb) {
        var url = 'http://bit.ly/javascript-api.js' +
                  '?version=latest' +
                  '&login='  + Helium.BITLY_API_LOGIN +
                  '&apiKey=' + Helium.BITLY_API_KEY;
        load(url, cb);
    })  .provides('BitlyApiClient', 'BitlyClient', 'BitlyCB');


Usage
-----

The bit.ly JavaScript API file must be included _before_ the Shortener library
file. Here's the URI, together with an example query string. More details can
be found in the [bit.ly JavaScript Client API][1].

    <script type="text/javascript" src="http://bit.ly/javascript-api.js?version=latest&login=bitlyapidemo&apiKey=R_0da49e0a9118ff35f52f629d2d71bf07"></script>

A full example implementation can be found in the test directory.

Hitting the bit.ly servers with a request on every page load is obviously not
ideal, so any implementation should defer that request until the user interacts
with whatever functionality is using the URI shortener.

If no URI is provided to the Shortener.shorten method, it will default to the
current page URI, i.e. `window.location.href`.

    Shortener.shorten(function(result) {
        // No URI, just a callback function
    });
    
    Shortener.shorten('http://twitter.com/home', function(result) {
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

However, an API call can also result in an error object being returned. This
may be due to, for example, too many API calls being made in a short period of
time. The error object will be of the following form:

    {
        "errorCode":    208,
        "errorMessage": "You have exceeded your hourly rate limit for this method.",
        "statusCode":   "ERROR"
    }

The result object is provided for convenience's sake, as it will tend to be of
the most direct interest. The full result object from the server is provided as
a second argument.

    Shortener.shorten(function(result, data) {
        // The `data` object is the full response from the bit.ly API
    });

[1]: http://code.google.com/p/bitly-api/wiki/JavascriptClientApiDocumentation
