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
      // alert('Dropped on ' + date.format());
    },
    eventSources: [{
      events: [{
          title: $('.event-name').text(),
          start: $('.event-time').text(),
          eventStartEditable: false
          // durationEditable: true
      }],
      color: '#0099FF',
      textColor: '#FFFFFF',
      // editable: true
    }],
    eventRender: function(event, element) {
            element.append( "<span class='closon'>X</span>" );
              $(document).on('click', ".closon", function() {

               // $('#calendar').fullCalendar('removeEvents', "event._id");
               // var mapLayer;
               // $("span:contains('" + mapLayer +"')").click();
               $(this).parent().remove();
               //alert($(this)._id)

               //alert("clicked the X");
            });
        },
    editable: true
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

    var titleAndTime = title + '/' + time;

    $('<input id="' + shortTitle + '" name="' + shortTitle + '" type="hidden" value="' + titleAndTime + '">').insertBefore($('.google'));
    });
  });

//CLEAR SCHEDULE AND REMOVE ALL POINTS
   $('#clear').on('click', function(){
      $("#calendar").fullCalendar( 'removeEvents' );
      $("span:contains('f1')").click();
   });



});




