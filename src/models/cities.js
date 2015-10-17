module.exports = {
  
  search: function(text, callback) {
    $.getJSON('http://gd.geobytes.com/AutoCompleteCity?callback=?', { q: text }, function(cities) {
      callback(cities);
    });
  }

};