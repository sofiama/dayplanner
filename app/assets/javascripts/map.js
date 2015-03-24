$(document).ready(function(){

  ticketlat = $('.ticket-info').data('temp').lat 
  ticketlong = $('.ticket-info').data('temp').long;

  ticketName = $('.ticket-info').data('temp').title;

  L.marker([ticketlat, ticketlong], {icon: L.AwesomeMarkers.icon({icon: 'star', markerColor: 'orange', prefix: 'fa'})}).addTo(map)
      .bindPopup(ticketName).openPopup();


  ($('.food-info').data('temp')).forEach(function(food){
    L.marker([food.lat,food.long], {icon: L.AwesomeMarkers.icon({icon: 'cutlery', markerColor: 'red', prefix: 'fa'})}).addTo(map)
      .bindPopup(food.name);
  });

  ($('.night-info').data('temp')).forEach(function(night){
    L.marker([night.lat,night.long], {icon: L.AwesomeMarkers.icon({icon: 'glass', markerColor: 'purple', prefix: 'fa'})}).addTo(map)
      .bindPopup(night.name)
  });

  ($('.sight-info').data('temp')).forEach(function(sight){
    L.marker([sight.lat,sight.long], {icon: L.AwesomeMarkers.icon({icon: 'building', markerColor: 'blue', prefix: 'fa'})}).addTo(map)
      .bindPopup(sight.name)
  });

});