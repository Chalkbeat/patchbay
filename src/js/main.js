var $ = require("./lib/qsa");
import("@nprapps/sidechain/src/index.js");

var init = function() {
  // replace marked paragraphs with side-chain elements
  // this helps support old CMS systems that don't like custom elements
  var paragraphs = $("[data-sidechain],[data-pym-loader]");
  paragraphs.forEach(function(p) {
    var sc = document.createElement("side-chain");
    var id = p.id;
    p.removeAttribute("id");
    sc.id = id;
    sc.setAttribute("src", p.dataset.sidechain || p.dataset.childSrc);
    p.parentElement.replaceChild(sc, p);
  });

  // set URL params for each embed
  // this technically cancels loads that started when we imported the element
  // however, since we don't yield the thread, it's fine
  var sidechains = $("side-chain");
  sidechains.forEach(function(embed) {
    var src = embed.getAttribute("src");
    if (!src) return;
    var url = new URL(src, window.location);
    
    // skip already handled elements
    if (url.searchParams.has("loader")) return;

    var params = {
      loader: true,
      initialWidth: embed.offsetWidth,
      windowHeight: window.innerHeight,
      id: embed.id,
      parentTitle: encodeURIComponent(document.title),
      parentUrl: encodeURIComponent(window.location.href)
    };
    for (var p in params) {
      var v = params[p];
      if (v) url.searchParams.set(p, v);
    }
    var updated = url.toString();
    embed.setAttribute("src", updated);
  });
};

window.addEventListener("DOMContentLoaded", init);
init();
