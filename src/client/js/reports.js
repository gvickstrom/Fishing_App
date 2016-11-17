$('.report_edit_submit').on('click', function(e) {
  e.preventDefault();
  console.log('edit button clicked');
  const $start_time = $('.start_time').val();
  const $end_time = $('.end_time').val();
  const $report_text = $('.report_text').val();
  const $report_lat = $('.report_lat').val();
  const $report_lon = $('.report_lon').val();
  const $report_id = $('.report_id').val();
  const updatedReport = {
    start_time: $start_time,
    end_time: $end_time,
    report: $report_text,
    lat: $report_lat,
    lon: $report_lon,
    id: $report_id
  };

  $.ajax({
    type: 'PUT',
    url: `/reports/report-edit/${$report_id}`,
    data: updatedReport
  })
  .done((data) => {
    console.log('new report submitted');
    console.log(data);
    window.location="/homepage";
  })
  .fail((err) => {
    console.log(err);
  });
});
