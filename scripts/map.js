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

  $('form').on('click', '#modalClose', function(e) {
    e.preventDefault();
    //assign inputs
    warColor = $('#warColor').val();
    charMarkerCenter();
  });

  var map;
  var myPos;
  var marker;
  var infoWindow;
  var warColor = 'black';

  function initMap() {
    map = new google.maps.Map(document.getElementById('mapCont'), {
      center: {lat: 39.739236, lng: -104.990251},
      zoom: 16,
      disableDefaultUI: true,
      scrollwheel: false,
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
        infoWindow.setContent('Let\'s go ninja some shit!');
        map.setCenter(pos);
        createMarker(map, markerTavern);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  setInterval(function() {
    navigator.geolocation.getCurrentPosition(function(position) {
      var newPos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var googleMyPos = new google.maps.LatLng(myPos.lat, myPos.lng);
      var googleNewPos = new google.maps.LatLng(newPos.lat, newPos.lng);

      if (google.maps.geometry.spherical.computeDistanceBetween(googleMyPos, googleNewPos) > 15) {
        myPos = newPos;
        map.setCenter(myPos);

      }
    });
  }, 3000);

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
  }

  function charMarkerCenter() {
    var charMarker = new google.maps.Marker({
      map: map,
      position: myPos,
      icon: {
        url: './icons/ninja-portrait-' + warColor + '.svg',
        scaledSize: new google.maps.Size(45, 45),
        origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
      }
    });
    map.setCenter(myPos);
  }

  function createMarker(addMap, markerLoc) {
    var count = 0;

    marker = new google.maps.Marker({
      map: addMap,
      position: markerLoc.pos,
      icon: {
        url: './icons/' + markerLoc.type + '.svg',
        scaledSize: new google.maps.Size(45, 45),
        origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
      }
    });
    marker.addListener('mouseover', function() {
      // map.setCenter(marker.getPosition());
      infoWindow.setPosition(markerLoc.pos);
      infoWindow.setContent(markerLoc.type);
    });
    // map.addListener('center_changed', function() {
    //   var googleMyPos = new google.maps.LatLng(myPos.lat, myPos.lng);
    //   var googleMarkerPos = new google.maps.LatLng(markerLoc.pos.lat, markerLoc.pos.lng);
    //
    //   if (google.maps.geometry.spherical.computeDistanceBetween(googleMyPos, googleMarkerPos) < 20 && count < 1) {
    //     alert('You have arrived!');
    //     count++;
    //   }
    // });

    $('<li />')
      .html('<img src="./icons/' + markerLoc.type + '.svg" style="width:20px;height:20px;">')
      .click(function(e) {
        map.panTo(markerLoc.pos);
      })
      .appendTo('#mapList');
    $('<div />')
      .html(markerLoc.desc)
      .appendTo('#quest');
    // marker.addListener('mouseout', function() {
    //   // map.setCenter(marker.getPosition());
    //   infoWindow.setMap(null);
    // });

    // google.maps.event.addListener(marker, 'hover', function() {
    //   // infoWindow.setContent(place.name);
    // });
  }

  var markerTavern = {
    pos: { lat: 39.733603, lng: -104.992688 },
    desc: 'The Tavern:<br>A safe place to drown your sorrows, and find quests.. until a drunk terrorist drunkenly terrorizes it.',
    type: 'tavern'
  };

  var markerCreek = {
    pos: { lat: 39.733300, lng: -104.993383},
    desc: 'Halt, thieves!:<br>Thieves have robbed the tavern and are hiding out near the creek',
    type: 'quest'
  };

  var markerPark = {
    pos: { lat: 39.730562, lng: -104.992311},
    desc: 'Skynet:<br>Goblins are hacking into the PlaceCage website. This could mean the end of the world if they aren\'t stopped',
    type: 'quest'
  };

  // var charMarker = new google.maps.Marker({
  //   map: map,
  //   position: myPos,
  //   icon: {
  //     url: './icons/ninja-portrait-' + warColor + '.svg',
  //     scaledSize: new google.maps.Size(30, 30),
  //     origin: new google.maps.Point(0,0), // origin
  //     anchor: new google.maps.Point(0, 0) // anchor
  //   }
  // });

  $('#barQuest').on('click', function() {
    createMarker(map, markerCreek);
  });

  $('#wandQuest').on('click', function() {
    createMarker(map, markerPark);
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
      featureType: 'landscape.natural.terrain',
      elementType: 'geometry.fill',
      stylers: [
        { hue: '#ffee00' },
        { visibility: 'simplified' },
        { color: '#13611A' }
      ]
    },{
      featureType: 'road',
      elementType: 'geometry.fill',
      stylers: [
        { color: '#E0A869' },
        { visibility: 'on' }
      ]
    },{
      featureType: 'road',
      elementType: 'labels',
      stylers: [
        { visibility: 'off' }
      ]
    },{
      featureType: 'landscape.man_made',
      stylers: [
        { visibility: 'simplified' },
        { color: '#938a3b' },
        { lightness: -13 }
      ]
    },{
      featureType: 'poi',
      elementType: 'labels',
      stylers: [
        { visibility: 'off' }
      ]
    },{
      featureType: 'water',
      elementType: 'geometry.fill',
      stylers: [
        { visibility: 'on' },
        { color: '#4480c8' }
      ]
    }
  ];
