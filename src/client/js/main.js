(function () {

  // console.log('sanity check!');

  $('[name="river-basin"]').on('change', function() {
    console.log('changed!');
    var riverName = $('[name="river-basin"]').val();
    console.log(riverName)

    $.ajax({
      type: 'GET',
      url: '/sites?river='+riverName,
      success: function(data) {
        $.each(data.sites, function(k,v) {
          var site = v["site_name"]
          $('#site-dropdown').append($('<li></li>')
          .text(JSON.stringify(site)));
        });
      },
      error: function(data) {
        console.log('error');
      }
    });
  });

})();
