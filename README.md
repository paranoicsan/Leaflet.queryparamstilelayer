Leaflet.queryparamstilelayer
===========================

Leaflet tile layer with functionality to pass query parameters.


## Usage

Use it like any other tile layer and provide additional parameters need to be passed
as query when retrieving a tile.

Parameter can be a function. Then it will be executed in the moment when tileUrl will
be generated. As an argument it accepts timestamp `Date.now()` at the moment function has been called

```javascript
var layer = new L.TileLayer.QueryParams(
  'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
  {
    param1: 'value',
    param2: function(dateNow) {
        return dateNow;
    }
  },
  options
);
```

## License

Leaflet.functionaltilelayer is free software, and may be redistributed under 
the MIT-LICENSE.