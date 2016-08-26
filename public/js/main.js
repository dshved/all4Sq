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
        var name = venues[i]['name'];
        var icon_prefix = venues[i]['categories'][0]['icon']['prefix'];
        var icon_suffix = venues[i]['categories'][0]['icon']['suffix'];
        var icon_src = icon_prefix + 'bg_32' + icon_suffix;

        var location_address = venues[i]['location']['address'] || '';
        var location_city = venues[i]['location']['city'] || '';
        var location = location_city +' '+ location_address;

        $('#list').append('<li class="venues__items">' +
        '<a class="venues__link" href="#">'+
          '<div class="venues__img">' +
            '<img src="' + icon_src + '">' + 
          '</div>'+
          '<div class="venues__info">'+
            '<div class="venues__name">' + name + '</div>'+
            '<div class="venues__location">' + location + '</div>'+
          '</div>'+
        '</a>'+
        '</li>');
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
