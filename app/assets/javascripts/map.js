$(document).ready(function(){

//$("span:contains('f1')").click() //this will toggle click where 'f1' is the span text so do this when a block is dropped into a timeslot div!

 var regLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          subdomains: ['a', 'b', 'c'],
          attribution: '© OpenStreetMap contributors',
          continuousWorld: true
      });


  var mainEvent = L.marker(gon.mainEventLL).bindPopup('Your Main Event: ' + gon.mainEvent.name);
  var mainEventLayer = L.layerGroup([mainEvent]);

  //Create each marker and push it into array as layerGroup (1:1 ratio):

  var food_layers= [];
  var night_layers = [];
  var sights_layers = [];

  for (var i = 0; i < 5; i++)
  {
    food_layers.push(L.layerGroup([L.marker([gon.food[i].lat, gon.food[i].long]).bindPopup("Food option: " + gon.food[i].name)]));

    if (i < 3)
    {
      night_layers.push(L.layerGroup([L.marker([gon.night[i].lat, gon.night[i].long]).bindPopup("Night option: " + gon.night[i].name)]));
    }

    sights_layers.push(L.layerGroup([L.marker([gon.sights[i].lat, gon.sights[i].long]).bindPopup("Sights option: " + gon.sights[i].name)]));
  }

 //Add every single layerGroup to overlayMaps

  // var f1,f2,f3,f4,f5,n1,n2,n3,s1,s2,s3,s4,s5;

  var overlayMaps = {
    "Main Event": mainEventLayer,
    "f1": food_layers[0],
    "f2": food_layers[1],
    "f3": food_layers[2],
    "f4": food_layers[3],
    "f5": food_layers[4],
    "n1": night_layers[0],
    "n2": night_layers[1],
    "n3": night_layers[2],
    "s1": sights_layers[0],
    "s2": sights_layers[1],
    "s3": sights_layers[2],
    "s4": sights_layers[3],
    "s5": sights_layers[4]
  };



  var map = L.map('map', {
    center: gon.mainEventLL,
    zoom: 15,
    layers: [regLayer]
    });

  L.control.layers(null, overlayMaps).addTo(map); //makes control box
  $("span:contains('Main Event')").click()

   // function compareOffset(id1, id2) {
   //    return (
   //      Math.abs($(id1).offset().top - $(id2).offset().top < 2) && Math.abs($(id1).offset().left - $(id2).offset().left < 2)
   //    );
   //  }

});


