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
  
});