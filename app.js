(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var cities = require('./models/cities.js');
var Clock = require('./models/Clock.js');
var tmpl = require('./utils/tmpl.js');

var clocks = [
  /*{
    name: 'UTC',
    city: '',
    timezone: 0
  }, {
    name: 'Local',
    city: 'Local',
    timezone: 2
  }, {
    name: 'Someone',
    city: 'Miami',
    timezone: -4
  }*/
];

var Tmpl = {
  clock: tmpl($('#clock-tmpl').html())
};



$('.search-text').on('keyup', searchCities);
$('.search-results').on('click', '.search-result-city', onCityClick);
$('.clocks')
  .on('click', '.clock-action-rename', onClockRenameClick)
  .on('click', '.clock-action-delete', onClockDeleteClick);
loadClocks();
setClocks();
setInterval(updateClocks, 1000);


function searchCities() {
  var text = $('.search-text').val().replace(/^\s*(.*?)\s*$/, '$1');
  if (text) {
    cities.search(text, function(results) {
      $('.search-results').html(results.map(function(city) {
        return '<div class="search-result-city">' + city + '</div>';
      }));
    });
  } else {
    $('.search-results').empty();
  }
}


function onCityClick() {
  var cityName = $(this).text();

  $('.search-text').val('');
  $('.search-results').empty();

  var clock = new Clock(cityName);
  clock.getTimezone(function() {
    //clock.name = '---';
    clocks.push(clock);
    setClocks();
  });
}


function onClockRenameClick() {
  var clock = $(this).closest('.clock').data('obj');
  clock.name = prompt('Rename clock', clock.name);
  setClocks();
}


function onClockDeleteClick() {
  var clock = $(this).closest('.clock').data('obj');

  if (confirm('Are you sure you want to delete "' + clock.name + '"?')) {
    var i = clocks.indexOf(clock);
    if (i >= 0) {
      clocks.splice(i, 1);
      setClocks();
    }
  }
}


function setClocks() {
  $('.clocks').html(
    [getLocalClock()]
      .concat(clocks)
      .sort(compareClocks)
      .map(Tmpl.clock)
  );
  saveClocks();
  updateClocks();
}


function updateClocks() {
  var utc = new Date(),
    clock, d;

  utc.setMinutes(utc.getMinutes() + utc.getTimezoneOffset());
  utc = utc.getTime();

  $('.clock').each(function() {
    var $clock = $(this),
      clock = $clock.data('obj'),
      offset = clock.timezone;

    d = clock.getDate(utc);
    $clock.find('.clock-time').html(pad(d.getHours()) + ':' + pad(d.getMinutes())/* + ':' + pad(d.getSeconds())*/);
  });

}


function getLocalClock() {
  return new Clock({
    name: 'Local',
    city: '',
    timezone: -(new Date().getTimezoneOffset() / 60),
    cls: 'clock-local'
  });
}


function compareClocks(clock1, clock2) {
  return clock1.timezone - clock2.timezone;
}


function loadClocks() {
  if (!window.localStorage)
    return;

  var cities = JSON.parse(localStorage.getItem('clocks') || '[]');
  processCity();


  function processCity() {
    if (!cities.length)
      return;

    var opts = cities.shift();
    var clock = new Clock(opts);
    //clock.getTimezone(function() {
      clocks.push(clock);
      setClocks();
      processCity();
    //});
  }
}

function saveClocks() {
  if (window.localStorage)
    localStorage.setItem('clocks', JSON.stringify(clocks));
}

function pad(text) {
  return ('0' + text).substr(-2);
}


},{"./models/Clock.js":2,"./models/cities.js":3,"./utils/tmpl.js":4}],2:[function(require,module,exports){
module.exports = function(opts) {
  var me = this;
  var date = new Date();

  me.name = '---';
  me.city = null;

  if (typeof(opts) == 'string')
    opts = { city: opts };

  for (var p in opts)
    me[p] = opts[p];

  
  
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
};
},{}],3:[function(require,module,exports){
module.exports = {
  
  search: function(text, callback) {
    $.getJSON('http://gd.geobytes.com/AutoCompleteCity?callback=?', { q: text }, function(cities) {
      callback(cities);
    });
  }

};
},{}],4:[function(require,module,exports){
module.exports = function(tmplText) {
  return function(obj) {
    return $(tmplText.replace(/\{\{(\w+)\}\}/g, function(match, key) {
      return obj[key] || '';
    })).data('obj', obj);
  };
};
},{}]},{},[1]);
