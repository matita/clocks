export default function copyToClipboard(str) {
  var el = document.createElement("div");
  el.contentEditable = true;
  el.innerHTML = str;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  var range;
  var selection;
  if (document.body.createTextRange) {
    range = document.body.createTextRange();
    range.moveToElement(el);
    range.select();
  } else if (window.getSelection) {
    selection = window.getSelection();
    range = document.createRange();
    range.selectNodeContents(el);
    selection.removeAllRanges();
    selection.addRange(range);
  }
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
  document.body.removeChild(el);
}
