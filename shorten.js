/**
 * bit.ly access library code.
 */
Shortener = new JS.Singleton('Shortener', {
    shorten: function() {
        var uri, callback;
      
        if (typeof arguments[0] == 'string') {
            uri      = arguments[0];
            callback = arguments[1];
        } else {
            uri      = window.location.href;
            callback = arguments[0];
        }
        
        var name = this._registerCallback(callback);
        
        if (!(name && this.CLIENT)) return;
        
        this.CLIENT.call('shorten', {'longUrl': uri}, 'BitlyCB.' + name);
    },
    
    _dispatcher: function(callback, data) {
        var result;
        
        // Results are keyed by longUrl, so we need to grab the first one.
        for (var r in data.results) {
            result = data.results[r];
            break;
        }
        
        callback(result, data);
    },
    
    _registerCallback: function(callback) {
        if (!this.NAMESPACE) return false;
        
        var name = 'abbr' + this.callbackCount;
        this.callbackCount += 1;
        
        this.NAMESPACE[name] = function(data) {
            this._dispatcher(callback, data);
        }.bind(this);
        
        return name;
    },
    
    callbackCount: 0,
    
    CLIENT:        BitlyClient || null,
    NAMESPACE:     BitlyCB     || null
});
