$(function(){

  $('.random').hide();
  $('.google').on('click', function(){
    $('.random').show();
  });

  var eventDate = $('.event-date').text()
  var dayStart = (parseInt($('.event-utc').text().split(' ')[1])-1).toString()+':00:00'

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
    scrollTime: dayStart,
    slotEventOverlap: false,
    droppable: true,
    drop: function(date, jsEvent, ui){
      // alert('Dropped on ' + date.format());
      $(this).remove()
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
    eventClick: function(event){
      $('#calendar').fullCalendar('removeEvents',event._id);
    },
    // eventRender: function(event, element) {
    //     element.append( "<span class='closon'>X</span>" );
    //     element.find(".closon").click(function() {
    //       $('#calendar').fullCalendar('removeEvents',event._id);
    //     });
    //   }
  });


  $('.activity').draggable({
    revert: true,
    revertDuration: 0,
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
