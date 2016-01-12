var util = require('util');
var EventEmitter = require('events').EventEmitter;
var cities = require('../models/cities.js');


util.inherits(SearchCitiesView, EventEmitter);

function SearchCitiesView($view) {
  var me = this;
  var $searchText = $view.find('.search-text');
  var autocomplete;

  $searchText
    .on('focus', function() { $(this).select(); });

  google.maps.event.addDomListener(window, 'load', function() {
    autocomplete = new google.maps.places.Autocomplete(
      $searchText[0],
      { types: ['geocode'] }
    );
  });


  function onChange(e) {
    var cityName = $searchText.val();
    setTimeout(function() {
      $searchText.val('');
    }, 100);
    me.emit('cityselected', cityName);
  }
}


module.exports = SearchCitiesView;