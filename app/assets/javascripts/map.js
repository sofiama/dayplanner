$(document).ready(function(){

  ($('.food_info').data('temp')).forEach(function(food){
    L.marker([food.lat,food.long]).addTo(map)
      .bindPopup(food.name)
  });

  ($('.night_info').data('temp')).forEach(function(night){
    L.marker([night.lat,night.long]).addTo(map)
      .bindPopup(night.name)
  });

  ($('.sight_info').data('temp')).forEach(function(sight){
    L.marker([sight.lat,sight.long]).addTo(map)
      .bindPopup(sight.name)
  });

});