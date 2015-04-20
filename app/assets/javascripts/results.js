$(function(){

  var eventDate = $('.event-date').text();
  var dayStart = (parseInt($('.event-utc').text().split(' ')[1])-2).toString()+':00:00';

  $('#calendar').fullCalendar({
    defaultView: 'agendaDay',
    defaultDate: $('.event-date').text(),
    header: {
      left:   '',
      center: 'title',
      right:  ''
    },
    height: 600,
    snapDuration: '01:00:00',
    scrollTime: dayStart,
    slotEventOverlap: false,
    droppable: true,
    drop: function(date, jsEvent, ui){
      // alert('Dropped on ' + date.format());
      // $(this).remove()
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
    editable: true,

    // // makes the entire event clickable to be removed
    // eventClick: function(event){
    //   // $('.closeon').click(function() {
    //   //   $('#calendar').fullCalendar('removeEvents',event._id);
    //   // });
    //   $('#calendar').fullCalendar('removeEvents',event._id);
    // },
    // eventRender: function(event, element) {
    //   element.append( "<span class='closeon'>X</span>" );
      
    //   element.find(".closeon").click(function() {
    //     $('#calendar').fullCalendar('removeEvents',event._id);
    //   });
    // }
  });

  $('.activity').data('duration', '01:00');

  $('.external-events .fc-event').each(function() {
      // store data so the calendar knows to render an event upon drop
      $(this).data('event', {
        title: $.trim($(this).text()), // use the element's text as the event title
        stick: true // maintain when user navigates (see docs on the renderEvent method)
      });

      // make the event draggable using jQuery UI
      $(this).draggable({
        zIndex: 999,
        revert: true,      // will cause the event to go back to its
        revertDuration: 0,  //  original position after the drag
         helper: function(event, ui) {
        var clone = $(this).clone();
        $(this).css({opacity:0}); //or $(this).hide()
        return clone;
        },
        stop: function(event, ui) {
            $(this).css({opacity:1}); //or $(this).show()
        },
        appendTo: 'body'
          });
    });

  $('.remove-events').on('click', function(){
    $("#calendar").fullCalendar('removeEvents');

    var ticketed_event = {
      title: $('.event-name').text(),
      start: $('.event-time').text(),
      eventStartEditable: false,
      color: '#FFD340',
      textColor: '#FFFFFF'
    };

    $('#calendar').fullCalendar('renderEvent', ticketed_event);
  });

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
