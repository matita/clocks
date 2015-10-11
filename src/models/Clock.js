module.exports = function(cityName) {
  var me = this;

  me.city = cityName;

  
  me.getLocation = function(callback) {
    $.get('http://maps.googleapis.com/maps/api/geocode/json', {
      address: cityName,
      sensor: false
    }, function(response) {
      var location = response.results[0].geometry.location;
      me.lat = location.lat;
      me.lng = location.lng;

      if (callback)
        callback();
    });
  };


  me.getTimezone = function(callback) {

    if (!me.lat || !me.lng)
      return me.getLocation(me.getTimezone);

    $.get('https://maps.googleapis.com/maps/api/timezone/json', {
        location: me.lat + ',' + me.lng,
        timestamp: Math.round(new Date().getTime() / 1000),
        sensor: false
      }, function(response) {
        me.timezone = (response.rawOffset / 3600) + (response.dstOffset / 3600);

        if (callback)
          callback();
      });
  };
};