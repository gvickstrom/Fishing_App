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
  console.log('newMap');
  myLatLng = new google.maps.LatLng(lat, lng);
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: myLatLng,
    mapTypeId: 'terrain'
  });
  return map;
}


var reports = (JSON.parse($(".data-lat-lng").attr("data-lat-lng")));
console.log(reports[0].lat);

var greenMarker = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';

var flyRodMarker = 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwid7MDxprbPAhXMzIMKHS8qCSkQjRwIBw&url=https%3A%2F%2Fthenounproject.com%2Fterm%2Ffishing-rod%2F154753%2F&bvm=bv.134495766,d.amc&psig=AFQjCNEGCw-Q9Ahykg6W7qKfMZVODmpMhg&ust=1475297178141541';

function initMap (lat, lng) {
  console.log('initMap hit');
  var lat = $(".geo").attr("data-lat")
  var lng = $(".geo").attr("data-lon")
  var myLatLng = new google.maps.LatLng(lat, lng);
  var map = newMap(lat,lng);
  var marker = newMarker(myLatLng, map,'Station');

  parseStations(map, reports)
}

function parseStations(map, reports) {

  reports.forEach(function(report) {
    var myLatLng = new google.maps.LatLng(report.lat, report.lon);
    newMarker(myLatLng, map, 'Report', greenMarker);
  })
}

function newMarker(pos, map, title, icon) {
  console.log('newMarker');
  var marker = new google.maps.Marker({
    position: pos,
    map: map,
    title: title,
    icon: icon
  });


  return marker;
}
