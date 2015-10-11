var cities = require('./models/cities.js');
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

  cities.getClock(cityName, function(clock) {
    clock.name = '---';
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

    d = new Date(utc);
    d.setHours(d.getHours() + (offset || 0));
    $clock.find('.clock-time').html(pad(d.getHours()) + ':' + pad(d.getMinutes())/* + ':' + pad(d.getSeconds())*/);
  });

}


function getLocalClock() {
  return {
    name: 'Local',
    city: '',
    timezone: -(new Date().getTimezoneOffset() / 60),
    cls: 'clock-local'
  };
}


function compareClocks(clock1, clock2) {
  return clock1.timezone - clock2.timezone;
}


function loadClocks() {
  if (window.localStorage)
    clocks = JSON.parse(localStorage.getItem('clocks') || '[]');
}

function saveClocks() {
  if (window.localStorage)
    localStorage.setItem('clocks', JSON.stringify(clocks));
}

function pad(text) {
  return ('0' + text).substr(-2);
}

