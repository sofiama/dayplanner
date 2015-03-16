$(function(){
  $('#contact').hide();

  $('.nav').find('a[href$="portfolio"]').hide();
  $('.nav').find('a[href$="pricing"]').hide();

  var activities = $('.activities');

  $('#filter-works li a').click(function(){
    var customType = $( this ).data('filter');

    activities
        .hide()
        .filter(function () {
            // debugger;
            return $(this).data('cat') === customType;
        })
        .show();
  });

  $('#filter-works li a:first').on('click', function(){
    $('.activities').show();
  });

  // var currentDate = new Date();
  // var twoDigitMonth = currentDate.getMonth()+1+"";if(twoDigitMonth.length==1)  twoDigitMonth="0" +twoDigitMonth;

  // $('.datepicker').data('date', currentDate);

  $('.datepicker').datepicker({
    format: 'dd-mm-yyyy',
    startDate: 'now',
    orientation: "right bottom",
  });

  // $('.datepicker').on('changeDate show', function (e){
  //   $('#contact').bootstrapValidator('revalidateField', 'date');
  // })  

  // $('#datetimepicker').datetimepicker({
  //   format: 'DD-MM-YYYY'
  // });

  // $('#contact').bootstrapValidator({
  //       // framework: 'bootstrap',
  //       feedbackIcons: {
  //           valid: 'glyphicon glyphicon-ok',
  //           invalid: 'glyphicon glyphicon-remove',
  //           validating: 'glyphicon glyphicon-refresh'
  //       },
  //       fields: {
  //           datetimepicker: {
  //               validators: {
  //                   notEmpty: {
  //                       message: 'The date is required and cannot be empty'
  //                   },
  //                   date: {
  //                       format: 'MM/DD/YYYY h:m A'
  //                       message: 'The value is not a valid date'
  //                   }
  //               }
  //           }
  //       }
  //   });

  // $('#datetimepicker')
  //       .on('dp.change dp.show', function (e) {
  //           // Revalidate the date when user change it
  //           $('#contact').formValidation('revalidateField', 'datetimepicker');
  //       });
});