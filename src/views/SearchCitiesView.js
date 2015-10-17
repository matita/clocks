var util = require('util');
var EventEmitter = require('events').EventEmitter;
var cities = require('../models/cities.js');


util.inherits(SearchCitiesView, EventEmitter);

function SearchCitiesView($view) {
  var me = this;
  var $searchText = $view.find('.search-text');
  var $results = $view.find('.search-results');

  $searchText.on('keyup', search);
  $results.on('click', '.search-result-city', onCityClick);


  function search() {
    var text = $searchText.val().replace(/^\s*(.*?)\s*$/, '$1');
    if (text) {
      cities.search(text, function(results) {
        $results.html(results.map(function(city) {
          return '<div class="search-result-city">' + city + '</div>';
        }));
      });
    } else {
      $results.empty();
    }
  }


  function onCityClick() {
    var cityName = $(this).text();

    $('.search-text').val('');
    $('.search-results').empty();

    me.emit('cityselected', cityName);
  }
}


module.exports = SearchCitiesView;