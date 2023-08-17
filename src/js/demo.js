var $ = require("./lib/qsa");
require("./copy-box.js");

var input = $.one("#embed-url");
var codeElement = $.one("copy-box");
var code = codeElement.value;

input.addEventListener("input", function() {
  codeElement.value = code.replace("EMBED_URL_HERE", input.value || "EMBED_URL_HERE");
});