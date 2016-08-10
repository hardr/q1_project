// //google json styling

// function initMap() {
//   var mapDiv = document.getElementById('map');
//   var map = new google.maps.Map(mapDiv, {
//     center: {lat: 39.739236, lng: -104.990251},
//     zoom: 15,
//     // mapTypeControl: false,
//     disableDefaultUI: true,
//     styles: mapStyles
//   });
// }
var map;
var myPos;
var marker;
var infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById('mapCont'), {
    center: {lat: 39.739236, lng: -104.990251},
    zoom: 15,
    disableDefaultUI: true,
    styles: mapStyles
  });
  infoWindow = new google.maps.InfoWindow({map: map});

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      myPos = pos;

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
      createMarker(map, markerTavern(), 'tavern');
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}

function createMarker(addMap, markerLoc, type) {
  marker = new google.maps.Marker({
    map: addMap,
    position: markerLoc,
    icon: {
      url: '../icons/' + type + '.svg',
      scaledSize: new google.maps.Size(40, 40),
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    }
  });
  marker.addListener('mouseover', function() {
    // map.setCenter(marker.getPosition());
    infoWindow.setPosition(markerLoc);
    infoWindow.setContent(type);
  });
  $('<li />')
    .html('../icons/' + type + '.svg')
    .click(function(e) {
      map.panTo(markerLoc);
    })
    .appendTo('#mapList');
  // marker.addListener('mouseout', function() {
  //   // map.setCenter(marker.getPosition());
  //   infoWindow.setMap(null);
  // });

  // google.maps.event.addListener(marker, 'hover', function() {
  //   // infoWindow.setContent(place.name);
  // });
}

function markerTavern() {
  return { lat: 39.733603, lng: -104.992688 };
}

function markerCreek() {
  return { lat: 39.733300, lng: -104.993383};
}

function markerPark() {
  return { lat: 39.730562, lng: -104.992311};
}

$('#barQuest').on('click', function() {
  createMarker(map, markerCreek(), 'quest');
});

$('#wandQuest').on('click', function() {
  createMarker(map, markerPark(), 'quest');
});


// function updateMap() {
//   $.ajax({
//     url: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBS9_ROvhlLNfjdlSd5oVXMorVPkcTujts&callback=initMap',
//   }).done(function(productInfo) {
//
//   }).fail(function(error) {
//     console.log(error);
//   });
// }

var mapStyles = [
  {
    "featureType": "landscape.natural.terrain",
    "elementType": "geometry.fill",
    "stylers": [
      { "hue": "#ffee00" },
      { "visibility": "simplified" },
      { "color": "#13611A" }
    ]
  },{
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      { "color": "#E0A869" },
      { "visibility": "on" }
    ]
  },{
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "landscape.man_made",
    "stylers": [
      { "visibility": "simplified" },
      { "color": "#938a3b" },
      { "lightness": -13 }
    ]
  },{
    "featureType": "poi",
    "elementType": "labels",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      { "visibility": "on" },
      { "color": "#4480c8" }
    ]
  },{
  }
];
