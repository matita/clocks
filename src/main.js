var Clock = require('./models/Clock.js');
var tmpl = require('./utils/tmpl.js');
var SearchCitiesView = require('./views/SearchCitiesView.js');

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


var citiesView = new SearchCitiesView($('.search-form'))
  .on('cityselected', onCitySelected);


$('.clocks')
  .on('click', '.clock-action-rename', onClockRenameClick)
  .on('click', '.clock-action-delete', onClockDeleteClick);
loadClocks();
setClocks();
setInterval(updateClocks, 1000);



function onCitySelected(cityName) {
  var clock = new Clock(cityName);
  clock.getTimezone(function() {
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

