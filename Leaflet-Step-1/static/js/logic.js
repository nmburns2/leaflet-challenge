
var earthquakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"

d3.json(earthquakeUrl, function (data) {
    console.log(data.features);
    createFeatures(data.features)
});

function createMap(earthquakes) {
    var lightmap = L.tilelayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        maxZoom: 20,
        id: 'mapbox/light-v10',
        accessToken: API_KEY

    });

    var myMap = L.map("map", {
        center: [31.51073, -96.4247],
        zoom: 2,
        layers: [lightmap, earthquakes]
    });

    function getColor(d) {
        return d > 5 ? "#B40404" :
            d > 4 ? "#DF0101" :
            d > 3 ? "#FF0000" :
            d > 2 ? "#FE2E2E" :
            d > 1 ? "##FA5858" :
                    "#F78181";
    }

    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function(myMap) {
      var div = L.DomUtil.create('div', 'legend'),
      var magnitude = [0,1,2,3,4,5],
      var labels = []
      
      for (var i = 0; i < magnitude.length; i++) {
          div.innerHTML +=
          '<i style="background:' + getColor(magnitudes[i] + 1) + '"></i>' + magnitudes[i] + (magnitudes[i + 1] ? '&ndash;' + magnitudes[i + 1] + '<br>' : '+');
        }

        return div;
    };

    legend.addTo(myMap);

};
