
var earthquakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"

d3.json(earthquakeUrl, function(data) {
    console.log(data.features)
});


