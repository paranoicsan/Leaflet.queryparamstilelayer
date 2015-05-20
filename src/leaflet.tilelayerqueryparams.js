L.TileLayer.QueryParams = L.TileLayer.extend({

    queryParams: null,

    initialize: function (queryParams, url, options) {
        this.queryParams = queryParams;
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

        url += '?';

        for (var param in this.queryParams) {
            if (this.queryParams.hasOwnProperty(param)) {
                var val = null;
                if (typeof this.queryParams[param] === 'function') {
                    val = this.queryParams[param].call(this, Date.now());
                } else {
                    val = this.queryParams[param];
                }
                url += param + '=' + val + '&';
            }
        }

        return url;
    }
});

L.tileLayer.queryParams = function (queryParams, options) {
    return new L.TileLayer.QueryParams(queryParams, options);
};