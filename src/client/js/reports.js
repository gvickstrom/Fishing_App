console.log('reports-new.js sanity check');


// $(document).on('click', '.report_submit_button', function(e) {
//   e.preventDefault();
//   console.log('button clicked');
//   const $start_time = $('.start_time').val();
//   const $end_time = $('.end_time').val();
//   const $report_text = $('.report_text').val();
//   const $report_lat = $('.report_lat').val();
//   const $report_lon = $('.report_lon').val();
//   const newReport = {
//     start_time: $start_time,
//     end_time: $end_time,
//     report: $report_text,
//     lat: $report_lat,
//     lon: $report_lon
//   };
//   $.ajax({
//     type: 'POST',
//     url: 'reports/report-new/submit',
//     data: newReport
//   })
//   .done((data) => {
//     console.log('new report submitted');
//     console.log(data);
//   })
//   .fail((err) => {
//     console.log(err);
//   });
// });
