var Clock = require('./models/Clock.js');
var SearchCitiesView = require('./views/SearchCitiesView.js');
var ClocksView = require('./views/ClocksView.js');

var citiesView = new SearchCitiesView($('.search-form'))
  .on('cityselected', onCitySelected);
var clocksView = new ClocksView($('.clocks'));


function onCitySelected(cityName) {
  var clock = new Clock(cityName);
  clock.getTimezone(function() {
    clocksView.addClock(clock);
  });
}











