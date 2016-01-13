var util = require('util');
var EventEmitter = require('events').EventEmitter;
var cities = require('../models/cities.js');
var populatePlaceholder = require('../utils/populate-placeholder.js');


util.inherits(SearchCitiesView, EventEmitter);

function SearchCitiesView($view) {
  var me = this;
  var $searchText = $view.find('.search-text');
  var autocomplete;

  $searchText
    .on('keyup', onKeyPress)
    .on('focus', function() { $(this).select(); });

  google.maps.event.addDomListener(window, 'load', function() {
    autocomplete = new google.maps.places.Autocomplete(
      $searchText[0],
      { types: ['geocode'] }
    );
  });


  populatePlaceholder($searchText[0], [
    'San Francisco',
    'Rome',
    'Singapore',
    'some city'
  ]);


  function onKeyPress(e) {
    if (e.which == 13) {
      var cityName = $searchText.val();
      setTimeout(function() {
        $searchText.val('');
      }, 100);
      me.emit('cityselected', cityName);
    }
  }
}


module.exports = SearchCitiesView;