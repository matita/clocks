var url = require('url');
var Clock = require('./models/Clock.js');
var SearchCitiesView = require('./views/SearchCitiesView.js');
var ClocksView = require('./views/ClocksView.js');

var citiesView = new SearchCitiesView($('.search-form'))
  .on('cityselected', onCitySelected);
var clocksView = new ClocksView($('.clocks'))
  .on('clockadded', updateUrl)
  .on('clockrenamed', updateUrl)
  .on('clockremoved', updateUrl);


function onCitySelected(cityName) {
  var clock = new Clock(cityName);
  clock.getTimezone(function() {
    clocksView.addClock(clock);
  });
}


function updateUrl(clock) {
  var infos = clocksView.clocks.map(function(clock) {
    return clock.city + ';' + clock.name;
  });
  var u = url.format({
    query: { clocks: infos.join('|') }
  });
  history.replaceState({}, 'Clocks', u);
}


var parsed = url.parse(location.href, true);
var urlClocks = parsed.query.clocks ? parsed.query.clocks.split('|') : [];
urlClocks.forEach(function(info) {
  info = info.split(';');
  info = {
    city: info[0],
    name: info[1] || '---'
  };
  var clock = new Clock(info);
  clock.getTimezone(function() {
    clocksView.addClock(clock);
  });
});