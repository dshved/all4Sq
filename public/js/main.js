$('#search_vehues').click(function(e) {
  e.preventDefault();
  $('#list').empty();
  $.ajax({
    url: '/api/venues/search',
    data: {ll: $('#ll').val()},
  })
  .done(function(data) {
    var venues = data['response']['venues'];

    for (var i = 0; i < venues.length; i++) {
      $('#list').append('<li>'+venues[i]['name']+'</li>');    
    };
  })
  .fail(function(data) {
    console.log(data);
  });
  
});
