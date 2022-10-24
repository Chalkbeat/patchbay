var $ = require("./lib/qsa");

var input = $.one("#embed-url");
var codeElement = $.one(".interactive-embed code");
var code = codeElement.innerHTML;

input.addEventListener("input", function() {
  codeElement.innerHTML = code.replace("EMBED_URL_HERE", input.value || "EMBED_URL_HERE");
});

codeElement.addEventListener("click", function(e) {
  var text = codeElement.innerHTML.trim().replace(/&lt;/gi, "<").replace(/&gt;/gi, ">");
  console.log(text);
  navigator.clipboard.writeText(text);
})