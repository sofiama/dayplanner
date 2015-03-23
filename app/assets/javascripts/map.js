$(document).ready(function(){

  var foodMarker = L.AwesomeMarkers.icon({
    icon: 'coffee',
    markerColor: 'red'
  });

  ticketlat = $('.ticket-info').data('temp').lat 
  ticketlong = $('.ticket-info').data('temp').long;

  ticketName = $('.ticket-info').data('temp').title;

  L.marker([ticketlat, ticketlong]).addTo(map)
      .bindPopup(ticketName).openPopup();


  ($('.food-info').data('temp')).forEach(function(food){
    L.marker([food.lat,food.long]).addTo(map)
      .bindPopup(food.name);
  });

  ($('.night-info').data('temp')).forEach(function(night){
    L.marker([night.lat,night.long]).addTo(map)
      .bindPopup(night.name)
  });

  ($('.sight-info').data('temp')).forEach(function(sight){
    L.marker([sight.lat,sight.long]).addTo(map)
      .bindPopup(sight.name)
  });

});