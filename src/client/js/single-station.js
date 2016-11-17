$(document).ready(function() {
  addGoogleMapsScript();
});

function addGoogleMapsScript () {
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.src  = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDzaOBIjmRJeiSfhiXhPC4Wo4syHsQG_hc&callback=initMap&libraries=geometry';
  $('head').append(s);
}

function newMap (lat, lng, map) {

  var myLatLng = new google.maps.LatLng(lat, lng);
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: myLatLng,
    mapTypeId: 'terrain',
    disableDefaultUI: true,
    zoomControl: true,
    scrollwheel: false
  });
  return map;
}

var stations = (JSON.parse($(".data-lat-lng").attr("data-lat-lng")));

var greenMarker = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';

var flyRodMarker = '../media/fishing_icon.png';

function initMap (lat, lng) {
  lat = $(".geo").attr("data-lat");
  lng = $(".geo").attr("data-lon");
  var myLatLng = new google.maps.LatLng(lat, lng);
  var map = newMap(lat,lng);
  var marker = newMarker(myLatLng, map,'Station');

  parseStations(map, stations);
}

function parseStations(map, reports) {

  reports.forEach(function(report) {
    var myLatLng = new google.maps.LatLng(report.lat, report.lon);
    newMarker(myLatLng, map, 'Report', flyRodMarker);
  });
}

// google.maps.event.addListener(map, 'click', function( event ){
//   alert( "Latitude: "+event.latLng.lat()+" "+", longitude: "+event.latLng.lng() );
// });

function newMarker(pos, map, title, icon) {
  var marker = new google.maps.Marker({
    position: pos,
    map: map,
    title: title,
    icon: icon
  });


  return marker;
}
