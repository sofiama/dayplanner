$(document).ready(function(){

  //var map = L.map('map').setView([51.505, -0.09], 13);

  // L.tileLayer('http://{s}.tiles.mapbox.com/v3/MapID/{z}/{x}/{y}.png', {
  //   attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  //   maxZoom: 18
  //   }
  // ).addTo(map);

  // var bwLayer = L.tileLayer('http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png', {
  //     attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
  //     subdomains: 'abcd',
  //     minZoom: 0,
  //     maxZoom: 20
  //   });


   var regLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            subdomains: ['a', 'b', 'c'],
            attribution: '© OpenStreetMap contributors',
            continuousWorld: true
        });


   var mainEvent = L.marker(gon.mainEventLL).bindPopup('Your Main Event: ' + gon.mainEvent.name),
   littleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.'),
    denver    = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.'),
    aurora    = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.'),
    golden    = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');


  var points = L.layerGroup([mainEvent, denver, aurora, golden]);

  var map = L.map('map', {
    center: gon.mainEventLL,
    zoom: 15,
    layers: [regLayer, points]
    });


   // function compareOffset(id1, id2) {
   //    return (
   //      Math.abs($(id1).offset().top - $(id2).offset().top < 2) && Math.abs($(id1).offset().left - $(id2).offset().left < 2)
   //    );
   //  }

  // var compareOffset = function(id1, id2) {
  //   Math.abs($("#ts-2").offset().top - $("#f-1").offset().top < 2)
  // }


  // 4 timeslots. Each timeslot has id="ts-#".

  // for (var i = 0; i < 4; i++)
  // {
  //   if $("#id-" + i)
  // }











});