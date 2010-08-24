/**
 * bit.ly access library code.
 */
Shortener = {
    displayName: 'Shortener',
    
    shorten: function() {
        var uri, callback, name;
      
        if (typeof arguments[0] == 'string') {
            uri      = arguments[0];
            callback = arguments[1];
        } else {
            uri      = window.location.href;
            callback = arguments[0];
        }
        
        name = this._registerCallback(callback);
        
        if (name && this.CLIENT) {
            this.CLIENT.call('shorten', {'longUrl': uri}, 'BitlyCB.' + name);
        }
    },
    
    _dispatcher: function(callback, data) {
        var result, p;
        
        // Results are keyed by longUrl, so we need to grab the first one.
        for (p in data.results) {
            result = data.results[p];
            if (typeof result == 'object') break;
        }
        
        callback.call(null, result, data);
    },
    
    _registerCallback: function(callback) {
        if (!this.NAMESPACE) return false;
        
        var name = 'abbr' + this.callbackCount,
            self = this;
        
        this.callbackCount += 1;
        
        this.NAMESPACE[name] = function(data) {
            self._dispatcher(callback, data);
        };
        
        return name;
    },
    
    callbackCount: 0,
    
    CLIENT:        BitlyClient,
    NAMESPACE:     BitlyCB
};
