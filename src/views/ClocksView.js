var util = require('util');
var EventEmitter = require('events').EventEmitter;
var tmpl = require('../utils/tmpl.js');
var stringToTime = require('../utils/string-to-time');
var Clock = require('../models/Clock.js');

var Tmpl = {
  clock: tmpl($('#clock-tmpl').html())
};


util.inherits(ClocksView, EventEmitter);

function ClocksView($view) {
  var me = this;
  var clocks = me.clocks = [];
  var localOffset = new Date().getTimezoneOffset();
  var currentOffset = localOffset;
  var referenceDate;

  $view
    .on('click', '.clock-action-rename', onClockRenameClick)
    .on('click', '.clock-action-delete', onClockDeleteClick)
    .on('click', '.clock-action-changeTime', onClockChangeTimeClick)
    .on('click', '.clock-time', onClockTimeClick)
    .on('click', '.back-to-current-time', onBackToCurrentTimeClick);


  me.addClock = function(clock) {
    if (clocks.some(function(c) { return c.city == clock.city; }))
      return;
    clocks.push(clock);
    setClocks();
    me.emit('clockadded', clock);
  };


  function setClocks() {
    $view.html(
      ['<p class="back-to-current-time">Back to current time</p>'].concat(
      [getLocalClock()]
        .concat(clocks.sort(compareClocks))
        .map(Tmpl.clock)
      )
    );
    //saveClocks();
    updateClocks();
  }


  function updateClocks() {
    var utc = new Date(referenceDate || Date.now()),
      clock, d;

    utc.setMinutes(utc.getMinutes() + currentOffset);
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
    var newName = prompt('Rename clock', clock.name);

    if (newName === null)
      return setClocks();

    clock.name = newName || '---';
    setClocks();
    me.emit('clockrenamed', clock);
  }


  function onClockDeleteClick() {
    var clock = $(this).closest('.clock').data('obj');

    if (confirm('Are you sure you want to delete "' + clock.name + '"?')) {
      var i = clocks.indexOf(clock);
      if (i >= 0) {
        clocks.splice(i, 1);
        setClocks();
        me.emit('clockremoved', clock);
      }
    }
  }


  function onClockChangeTimeClick() {
    var clock = $(this).closest('.clock').data('obj');
    askToChangeTime(clock);
    setClocks();
  }


  function onClockTimeClick(e) {
    e.preventDefault();
    var clock = $(this).closest('.clock').data('obj');
    askToChangeTime(clock);
  }

  function askToChangeTime(clock) {
    var timeText = prompt('Which time you want to view in ' + clock.city);
    var time = stringToTime(timeText);

    if (!time)
      return;

    var utc = clock.toUTC(time);
    var local = new Date(utc.setMinutes(utc.getMinutes() - currentOffset));
    setReferenceDate(local);
    updateClocks();
  }


  function onBackToCurrentTimeClick() {
    setReferenceDate(null);
    updateClocks();
  }


  function getLocalClock() {
    return new Clock({
      name: '---',
      city: 'Local time',
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


  function setReferenceDate(date) {
    referenceDate = date;
    if (date)
      $view.addClass('with-reference-date');
    else
      $view.removeClass('with-reference-date');
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


  //loadClocks();
  setClocks();
  setInterval(updateClocks, 1000);
}

module.exports = ClocksView;