// //google json styling

  function initMap() {
    var mapDiv = document.getElementById('map');
    var map = new google.maps.Map(mapDiv, {
        center: {lat: 39.739236, lng: -104.990251},
        zoom: 15,
        // mapTypeControl: false,
        disableDefaultUI: true,
        styles: mapStyles
    });
  };

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
