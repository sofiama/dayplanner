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
      var target = $(event.target);

      $(ui.draggable).appendTo(target);

      var calendarChild = $('.calendar').children();
      
      calendarChild.each(function(){
        console.log($(this).last().children().find('b').text());
      });



      var name = $('.calendar').children().last().children().find('b').text()

      $('<input id="act1_name" name="act1_name" type="hidden" value="' + name + '">').insertBefore($('.google:last-child'));
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
  