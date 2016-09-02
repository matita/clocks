module.exports = function(opts) {
  var me = this;
  var date = new Date();

  me.name = '---';
  me.city = null;

  if (typeof(opts) == 'string')
    opts = { city: opts };

  for (var p in opts)
    me[p] = opts[p];

  me.id = me.city.toLowerCase().replace(/\W+/g, '-');

  
  
  me.getLocation = function(callback) {
    $.get('http://maps.googleapis.com/maps/api/geocode/json', {
      address: me.city,
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
      return me.getLocation(function() {
        me.getTimezone(callback);
      });

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


  me.getDate = function(utcMs) {
    date.setTime(utcMs);
    date.setHours(date.getHours() + (me.timezone || 0));
    return date;
  };


  me.toUTC = function(date) {
    var utc = new Date(date);
    utc.setHours(utc.getHours() - (me.timezone || 0));
    return utc;
  };
};