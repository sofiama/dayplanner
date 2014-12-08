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
      var name = $(this).find('b').text();
      $('<input id="act1_name" name="act1_name" type="hidden" value="' + name + '">').insertBefore($('.google:last-child'));


      // alert('Dropped on ' + date.format());
    },
    eventSources: [
      {
        events: [
          {
            title: $('.event-name').text(),
            start: $('.event-time').text()
          }
        ],
        color: '#0099FF',
        textColor: '#FFFFFF',
        durationEditable: true
      }
    ]
  });

  $('.activity').draggable({
    revert: false,
    revertDuration: 0,
    editable: true
  });

  $('.activity').data('duration', '01:00');


  // $('.time-slot').droppable({
  //   drop: function(event, ui){
  //     var target = $(event.target);
  //     console.log($(this).appendTo(target));
  //     // $(ui.draggable).appendTo(target);
  //     debugger;
  //     var calendarChild = $('.calendar').children();
      
  //     calendarChild.each(function(){
  //       console.log($(this).last().children().find('b').text());
  //     });


});
  