$(function(){

  $('.random').hide();
  $('.google').on('click', function(){
    $('.random').show();
  });


  $('.activity').draggable({
    snap: '.time-slot',
    // revert: 'invalid'
  });

  $('.time-slot').droppable({
    drop: function(event, ui){
      // console.log($('.calendar .activity'));
    }
  });

  $('.google').on('click', function(){
    var calendarId = $('#calendarId');
    // $.ajax({
    //   type: 'POST'
    //   url: 'https://www.googleapis.com/calendar/v3/calendars/'+ calendarId + '/events'
    // }).success(function(result){
    //   console.log(result);
    // });

  });

});
  