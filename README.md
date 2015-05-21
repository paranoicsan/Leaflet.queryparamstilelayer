Leaflet.queryparamstilelayer
===========================

Leaflet tile layer with functionality to pass query parameters.


## Usage

Use it like any other tile layer and provide additional parameters need to be passed
as query when retrieving a tile.

Properties of `params` object can be a function. Then they will be executed in the moment when tileUrl
will be generated. As an argument it accepts timestamp `Date.now()` at the moment function has been called.

```javascript
var params = {
    param1: 'value',
    param2: function(dateNow) {
        return dateNow;
    }
}
var layer = new L.TileLayer.QueryParams(params, 'http://{s}.tile.osm.org/{z}/{x}/{y}.png', options);
```

Also `params` can be a function which accepts `Date.now()` as input parameter and returns an object which
will be used to build up query string.

```javascript
var paramsFunc = function(timestamp) {
    return {
        t: timestamp,
        g: 1
    }
}
var layer = new L.TileLayer.QueryParams(paramsFunc, 'http://{s}.tile.osm.org/{z}/{x}/{y}.png', options);
```

## License

Leaflet.functionaltilelayer is free software, and may be redistributed under 
the MIT-LICENSE.