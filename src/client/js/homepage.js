(function () {

  //button clears the stations table in db

  $('#clear-btn').on('click', function() {
    window.location.href = '/sites/clear';
  });

//button updates the data for the specificed river

  $('#update-db-btn').on('click', function() {
    let riverName = $('[name="river-basin"]').val();
    window.location.href = '/sites/' + riverName;
  });


//select river basin, then auto populates the sites dropdown menu

  $('[name="river-basin"]').on('change', function() {
    var riverName = $('[name="river-basin"]').val();
    $.ajax({
      type: 'GET',
      url: '/sites?river='+riverName,
      success: function(data) {
        let dropdown = $('#site-dropdown');
        dropdown.empty();
        $.each(data.sites, function(k,v) {
          let site = v["site_name"];
          let siteID = v["id"];
          $('#site-dropdown').append($('<option value=' + siteID + '></option>')
          .text(JSON.stringify(site)));
        });
      },
      error: function(error) {
        return error;
      }
    });
  });

//select river site, redirect to single river page for associated ID

$('#site-dropdown').on('change', function() {
  let siteID = $('#site-dropdown').val();
  window.location.href = '/single-station/' + siteID;
});

})();

$(document).ready(function() {
  addGoogleMapsScript();
});

function addGoogleMapsScript () {
  'addGoogleMapsScript hit';
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.src  = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDzaOBIjmRJeiSfhiXhPC4Wo4syHsQG_hc&callback=initMap&libraries=geometry';
  $('head').append(s);
}

function newMap (lat, lng, map) {
  var myLatLng = new google.maps.LatLng(lat, lng);
  map = new google.maps.Map(document.getElementById('map-index'), {
    zoom: 7,
    center: myLatLng,
    mapTypeId: 'terrain',
    disableDefaultUI: true,
    zoomControl: true,
    scrollwheel: false
  });
  return map;
}


var stations = (JSON.parse($(".data-stations").attr("data-stations")));


var greenMarker = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';

var flyRodMarker = '../media/fishing_icon.png';

function initMap (lat, lng) {
  lat = 39.138440;
  lng = -105.761457;
  var myLatLng = new google.maps.LatLng(lat, lng);
  var map = newMap(lat,lng);

  parseStations(map, stations);
}

function parseStations(map, stations) {

  stations.forEach(function(station) {
    var myLatLng = new google.maps.LatLng(station.lat, station.lon);
    var stationData =
    "<h4> Station Name: "  + station.site_name + "</h4>" +
    "<ul>" +
      "<li> Flow Rate (CFM): " + station.flow_rate + "</li>" +
      "<li><a href=/single-station/" + station.id + ">Site Link</a></li>" +
    "</ul>";


    newMarker(myLatLng, map, flyRodMarker, stationData);
  });
}

// google.maps.event.addListener(map, 'click', function( event ){
//   alert( "Latitude: "+event.latLng.lat()+" "+", longitude: "+event.latLng.lng() );
// });

function newMarker(pos, map, icon, stationData) {
  var marker = new google.maps.Marker({
    position: pos,
    map: map,
    // title: title,
    icon: icon
  });

  var infowindow = new google.maps.InfoWindow({
    content: stationData
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });

  return marker;
}
