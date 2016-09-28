(function () {
  console.log('boom');

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
          $('#site-dropdown').append($('<option value='+siteID+'></option>')
          .text(JSON.stringify(site)));
        });
      },
      error: function(data) {
        return error;
      }
    });
  });

//select river site, redirect to single river page for associated ID

$('[name="river-site"]').on('change', function() {
  let siteID = $('[value]').val();
  console.log(siteID);
  window.location.href = '/single-station/'+siteID;
})

})();
