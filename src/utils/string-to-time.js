module.exports = function (text) {
  if (!text)
    return null;

  var match = text.match(/^\s*([-+])?\s*(\d{1,2})\s*[-:.,]?\s*(\d{1,2})?\s*([ap]m?)?/i);
  if (!match)
    return null;

  var sign = match[1];
  var hh = +match[2];
  var mm = +match[3] || 0;
  var apm = (match[4] || '').toLowerCase();
  var isPm = apm.indexOf('p') === 0;

  var d = new Date();

  if (apm) {
    if (hh == 12) {
      if (!isPm)
        hh = 0;
    } else if (hh < 12 && isPm) {
      hh += 12;
    }
  }

  d.setHours(hh);
  d.setMinutes(mm);

  return d;
};