var map;
var markers = [];

function showVenues(lat, lng) {
  $('#list').empty();
  $.ajax({
      url: '/api/venues/search',
      data: { ll: lat + ',' + lng },
    })
    .done(function(data) {
      var venues = data['response']['venues'];

      for (var i = 0; i < venues.length; i++) {
        $('#list').append('<li>' + venues[i]['name'] + '</li>');
      };
    })
    .fail(function(data) {
      console.log(data);
    });
}

function initMap() {
  var haightAshbury = { lat: 59.937475, lng: 30.352243 };

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: haightAshbury,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    scaleControl: false,
    scrollwheel: true,
    panControl: false,
    streetViewControl: false,
    draggable: true,
    overviewMapControl: false,
    overviewMapControlOptions: {
      opened: false,
    },
    styles: [{
      "featureType": "poi",
      "elementType": "all",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "road",
      "elementType": "all",
      "stylers": [{
        "saturation": -100
      }, {
        "lightness": 45
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "all",
      "stylers": [{
        "visibility": "simplified"
      }]
    }, {
      "featureType": "road.arterial",
      "elementType": "labels.icon",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "transit",
      "elementType": "all",
      "stylers": [{
        "visibility": "off"
      }]
    }],
  });

  map.addListener('click', function(e) {
    addMarker(e.latLng);
    showVenues(e.latLng.lat(), e.latLng.lng());
  });
}

function addMarker(location) {
  deleteMarkers();
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  markers.push(marker);
}


function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function clearMarkers() {
  setMapOnAll(null);
}

function deleteMarkers() {
  clearMarkers();
  markers = [];
}

initMap();
