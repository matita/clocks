module.exports = {
  
  search: function(text, callback) {
    $.getJSON('http://gd.geobytes.com/AutoCompleteCity?callback=?', { q: text }, function(cities) {
      callback(cities);
    });
  },

  
  getClock: function(cityName, callback) {
    $.get('http://maps.googleapis.com/maps/api/geocode/json', {
      address: cityName,
      sensor: false
    }, function(response) {
      var location = response.results[0].geometry.location;

      $.get('https://maps.googleapis.com/maps/api/timezone/json', {
        location: location.lat + ',' + location.lng,
        timestamp: Math.round(new Date().getTime() / 1000),
        sensor: false
      }, function(response) {
        
        callback({
          name: '---',
          city: cityName,
          lat: location.lat,
          lng: location.lng,
          timezone: (response.rawOffset / 3600) + (response.dstOffset / 3600)
        });

      });
    });
  }
};