L.TileLayer.QueryParams = L.TileLayer.extend({

    queryParams: null,

    queryFunc: null,

    initialize: function (queryParams, url, options) {
        if (typeof queryParams === 'function') {
            this.queryFunc = queryParams;
        } else {
            this.queryParams = queryParams;
        }
        L.TileLayer.prototype.initialize.call(this, url, options);
    },

    getTileUrl: function (coords) {
        var url = L.Util.template(this._url, L.extend({
            r: this.options.detectRetina && L.Browser.retina && this.options.maxZoom > 0 ? '@2x' : '',
            s: this._getSubdomain(coords),
            x: coords.x,
            y: this.options.tms ? this._globalTileRange.max.y - coords.y : coords.y,
            z: this._getZoomForUrl()
        }, this.options));

        url += '?' + this._buildParams();

        return url
    },

    _buildParams: function() {
        var paramsStr = '';

        if (this.queryFunc != null) {
            this.queryParams = this.queryFunc.call(this, Date.now());
        }

        for (var param in this.queryParams) {
            if (this.queryParams.hasOwnProperty(param)) {
                var val = null;
                if (typeof this.queryParams[param] === 'function') {
                    val = this.queryParams[param].call(this, Date.now());
                } else {
                    val = this.queryParams[param];
                }
                paramsStr += param + '=' + val + '&';
            }
        }

        return paramsStr;
    }



});

L.tileLayer.queryParams = function (queryParams, options) {
    return new L.TileLayer.QueryParams(queryParams, options);
};