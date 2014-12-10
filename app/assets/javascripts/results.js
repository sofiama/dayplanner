$(function(){

  $('.random').hide();
  $('.google').on('click', function(){
    $('.random').show();
  });

  var eventDate = $('.event-date').text()

  $('#calendar').fullCalendar({
    defaultView: 'agendaDay',
    defaultDate: $('.event-date').text(),
    header: {
      left:   '',
      center: 'title',
      right:  ''
    },
    height: 400,
    snapDuration: '01:00:00',
    scrollTime: '08:00:00',
    slotEventOverlap: false,
    droppable: true,
    drop: function(date, jsEvent, ui){
      // alert('Dropped on ' + date.format());

    },
    eventSources: [{
      events: [{
          title: $('.event-name').text(),
          start: $('.event-time').text(),
          eventStartEditable: false
          // durationEditable: true
      }],
      color: '#FFD340',
      textColor: '#FFFFFF',
      // editable: true
    }],
    editable: true
  });


  $('.activity').draggable({
    revert: true,
    revertDuration: 0
  });

  $('.activity').data('duration', '01:00');

  $('.google').on('click', function(){
    ($('#calendar').find('.fc-content')).each(function(){
    var title = $(this).find('.fc-title').text();
    var time = $(this).find('.fc-time').attr('data-full');

    var shortTitle = title.replace(" ", '').substr(0,5).toLowerCase();

    var titleAndTime = title + '/' + time;

    $('<input id="' + shortTitle + '" name="' + shortTitle + '" type="hidden" value="' + titleAndTime + '">').insertBefore($('.google'));
    });
  });

});
