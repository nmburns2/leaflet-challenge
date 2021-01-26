
var earthquakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"

d3.json(earthquakeUrl, function (data) {
    console.log(data.features);
    createFeatures(data.features)
});

function createFeatures(earthquakeData) {
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place +
            "</h3><hr><p><b>Time:</b> " + new Date(feature.properties.time) + "</p>" +
            "<p><b>Magnitude:</b> " + feature.properties.mag + "</p>");
    }


    function pointToLayer(feature, latlng) {
        var geojsonMarkerOptions = {
            radius: feature.properties.mag * 4,
            fillColor: getColor(feature.properties.mag),
            color: "grey",
            weight: 0.5,
            opacity: 1,
            fillOpacity: 0.75
        }
        return L.circleMarker(latlng, geojsonMarkerOptions)
    }

    var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
        pointToLayer: pointToLayer,
    });

    createMap(earthquakes);
};


function createMap(earthquakes) {
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        id: "mapbox/light-v10",
        accessToken: API_KEY
    });

    var myMap = L.map("map", {
        center: [41.2284, 80.9098],
        zoom: 2,
        layers: [lightmap, earthquakes]
    });

    // function getColor(d) {
    //     return d > 5 ? "#B40404" :
    //         d > 4 ? "#DF0101" :
    //         d > 3 ? "#FF0000" :
    //         d > 2 ? "#FE2E2E" :
    //         d > 1 ? "##FA5858" :
    //                 "#F78181";
    // }

    // var legend = L.control({position: 'bottomright'});

    // legend.onAdd = function(myMap) {
    //   var div = L.DomUtil.create('div', 'legend'),
    //   magnitude = [4,5,5.4,6,6.5,7],
    //   labels = []
      
    //   for (var i = 0; i < magnituded.length; i++) {
    //       div.innerHTML +=
    //       '<i style="background:' + getColor(magnitude[i] + 1) + '"></i>' + magnitude[i] + (magnitude[i + 1] ? '&ndash;' + magnitude[i + 1] + '<br>' : '+');
    //     }

    //     return div;
    // };

    // legend.addTo(myMap);

};

function getColor(d) {
    return d > 7 ? "#B40404" :
        d > 6.5 ? "#DF0101" :
        d > 6 ? "#FF0000" :
        d > 5.4 ? "#FE2E2E" :
        d > 5 ? "##FA5858" :
                "#F78181";
};

