(function () {

  console.log('boom');

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
    })
  });

//select river site, redirect to single river page for associated ID

$('#site-dropdown').on('change', function() {
  let siteID = $('#site-dropdown').val();
  window.location.href = '/single-station/' + siteID;
});



})();
