
   alert("This page will ask you for your location information, click 'Share Location' to proceed");
   
   var light = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id:'mapbox/light-v10',
    accessToken: 'pk.eyJ1IjoiYXl1c2hqb3NoaTEzODAiLCJhIjoiY2xhajN2bjV0MDhuYTNzbGZ4eXY3aWV0YyJ9.-t8ccvCJhwwHcOdi435HrQ',
    tileSize: 512,
    zoomOffset: -1,
});

    var dark = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id:'mapbox/dark-v10',
    accessToken: 'pk.eyJ1IjoiYXl1c2hqb3NoaTEzODAiLCJhIjoiY2xhajN2bjV0MDhuYTNzbGZ4eXY3aWV0YyJ9.-t8ccvCJhwwHcOdi435HrQ',
    tileSize: 512,
    zoomOffset: -1,
});

var map = L.map('map', {
    layers:[light, dark],
}).fitWorld();

var baseLayers = {
    'light': light,
    'dark': dark
};

var layerControl = L.control.layers(baseLayers).addTo(map);

function onLocationFound(e) {
    var radius = e.accuracy; 

    L.marker(e.latlng).addTo(map)  
        .bindPopup("You are within " + Math.round(radius * 3.28084) + " feet of this point").openPopup(); 

    if (radius <= 100) {
      L.circle(e.latlng, radius, {color:'green'}).addTo(map);
  }
  else{
      L.circle(e.latlng, radius, {color:'red'}).addTo(map);
  }
    var times = SunCalc.getTimes(new Date(), e.latitude, e.longitude);
    var sunrise = times.dawn.getHours();
    var sunset = times.dusk.getHours();
    var currentTime = new Date().getHours();
    console.log(sunset)
    if (sunrise < currentTime && currentTime < sunset){
      map.removeLayer(dark);
      map.addLayer(light);
    }
    else {
      map.removeLayer(light);
      map.addLayer(dark);
    }
}

map.on('locationfound', onLocationFound); //this is the event listener

function onLocationError(e) {
    alert(e.message);
  }
  
  map.on('locationerror', onLocationError);

function share() {
    map.locate({setView: true, maxZoom: 16});
}
