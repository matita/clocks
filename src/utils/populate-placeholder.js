module.exports = function (el, values) {
  values = values.slice();
  var word;
  var charTimeout = 50;
  var wordTimeout = 1000;

  step();
  
  function step() {
    if (word && word.length) {
      
      el.placeholder += word.shift();
      setTimeout(step, charTimeout);

    } else if (values.length) {
      
      setTimeout(function() {
        el.placeholder = '';
        word = values.shift().split('');
        step();
      }, wordTimeout);
    }
  }
};