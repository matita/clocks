var tmpl = require('../utils/tmpl.js');
var Clock = require('../models/Clock.js');

var Tmpl = {
  clock: tmpl($('#clock-tmpl').html())
};


function ClocksView($view) {
  var me = this;
  var clocks = [];

  $view
    .on('click', '.clock-action-rename', onClockRenameClick)
    .on('click', '.clock-action-delete', onClockDeleteClick);


  me.addClock = function(clock) {
    clocks.push(clock);
    setClocks();
  };


  function setClocks() {
    $view.html(
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

    $view.find('.clock').each(function() {
      var $clock = $(this),
        clock = $clock.data('obj'),
        offset = clock.timezone;

      d = clock.getDate(utc);
      $clock.find('.clock-time').html(pad(d.getHours()) + ':' + pad(d.getMinutes())/* + ':' + pad(d.getSeconds())*/);
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


  function getLocalClock() {
    return new Clock({
      name: '---',
      city: 'Local',
      timezone: -(new Date().getTimezoneOffset() / 60),
      cls: 'clock-local'
    });
  }


  function compareClocks(clock1, clock2) {
    return clock1.timezone - clock2.timezone;
  }


  function saveClocks() {
    if (window.localStorage)
      localStorage.setItem('clocks', JSON.stringify(clocks));
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
        me.addClock(clock);
        processCity();
      //});
    }
  }


  function pad(text) {
    return ('0' + text).substr(-2);
  }


  loadClocks();
  setClocks();
  setInterval(updateClocks, 1000);
}

module.exports = ClocksView;