const fcLatLon = [40.7307216, -73.9998367]

var map = L.map('places-map').setView(fcLatLon, 16);

L.tileLayer('https://b.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

getPlaces((places) => {

  places.forEach((place) => {

    const latLon = [place.lat, place.lon];

    const typePalette = {
      lunch: 'gold',
      pizza: 'red',
      bar: 'navy'
    };

    const placeColor = typePalette[place.type];

    const circleOptions = {
      stroke: false,
      radius: 7,
      fillOpacity: 0.8,
      fillColor: placeColor,
      width: 0
    }

    L.circleMarker(latLon, circleOptions).addTo(map)
        .bindPopup('<b>' + place.name + '</b><br>' + place.description);
  });
});

function getPlaces(callback) {
  $.ajax({
    url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTtDhxGKMcnLTHkSHCURW5HACFOSPSOOGSTpEY3C7PH8Rk1Nq8ZFVvhihfVEQmGB25iyQ3e9B3ADLgY/pub?gid=0&single=true&output=csv",
    type: "GET"
  }).done((csv) => {
    const places = Papa.parse(csv, {header: true}).data;
    callback(places);
  });
}
