module.exports = function(tmplText) {
  return function(obj) {
    return $(tmplText.replace(/\{\{(\w+)\}\}/g, function(match, key) {
      return obj[key] || '';
    })).data('obj', obj);
  };
};