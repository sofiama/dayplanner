$(function(){
  $('#contact').hide();
  // $('.nav').find('a[href$="contact"]').hide();
  $('.nav').find('a[href$="portfolio"]').hide();
  $('.nav').find('a[href$="pricing"]').hide();

  // $('#calendar').on('click', '.closon', function(){
  //   alert('clicked');
  // });

  // $('#calendar .fc-content').click(function(){
  //   console.log($(this).empty());
  // });

  var activity = $('.activity');

  $('#filter-works li a').click(function(){
    var customType = $( this ).data('filter');

    activity
        .hide()
        .filter(function () {
            // debugger;
            return $(this).data('cat') === customType;
        })
        .show();
  });

  $('#filter-works li a:first').on('click', function(){
    $('.activity').show();
  });
  
});