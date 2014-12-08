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
    snapDuration: '01:00:00',
    scrollTime: '06:00:00',
    slotEventOverlap: false,
    droppable: true,
    drop: function(date, jsEvent, ui){
      // var name = $(this).find('.title').text();
      // var shortname = name.replace(" ", '').substr(0,5).toLowerCase();

      // var date = date.format();

      // var nameAndDate = name + '/' + date
      // // debugger;
      // $('<input id="' + shortname + '" name="' + shortname + '" type="hidden" value="' + nameAndDate + '">').insertBefore($('.google'));

      // alert('Dropped on ' + date.format());
    },
    eventSources: [
      {
        events: [
          {
            title: $('.event-name').text(),
            start: $('.event-time').text(),
            eventStartEditable: false
            // durationEditable: true
          }
        ],
        color: '#0099FF',
        textColor: '#FFFFFF',
        // editable: true
      }
    ],
    editable: true,
    eventClick: function(calEvent, jsEvent, view){
      alert('Event: ' + calEvent.title);
    }

  });

  $('.activity').draggable({
    revert: false,
    revertDuration: 0,
  });

  $('.activity').data('duration', '01:00');

  $('.google').on('click', function(){
    ($('#calendar').find('.fc-content')).each(function(){
    var title = $(this).find('.fc-title').text();
    var time = $(this).find('.fc-time').attr('data-full');

    var shortTitle = title.replace(" ", '').substr(0,5).toLowerCase();

    var titleAndTime = title + '/' + time
    $('<input id="' + shortTitle + '" name="' + shortTitle + '" type="hidden" value="' + titleAndTime + '">').insertBefore($('.google'));
    });
  });
  

});
  