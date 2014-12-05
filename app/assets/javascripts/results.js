$(function(){

  $('.activity').draggable({
    snap: '.time-slot'
  });

  $('.time-slot').droppable({
    drop: function(event, ui){
      console.log($(this));
    }
  });
  
});
  