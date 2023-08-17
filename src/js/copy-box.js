var template = `
<style>
:host {
  display: block;
  position: relative;
  padding: 10px;
}

textarea {
  background: transparent;
  border: none;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  display: block;
  width: 100%;
  min-height: 100px;
  padding: 0;
  margin: 0;
}

textarea:focus {
  border: none;
  outline: none;
}

textarea::selection {
  background: black;
  color: white;
}

.toast {
  display: none;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px;
  background: var(--teal);
  color: white;
  font-family: var(--sans);
  font-size: 14px;
  text-align: center;
  background: black;
  border: 1px solid white;
  border-radius: 4px;
  box-shadow: 0 4px 16px -8px #0008;
}

.toast.shown {
  display: block;
}
</style>
<textarea as="textarea" spellcheck=false></textarea>
<div class="toast" as="toast"></div>
`;

class CopyBox extends HTMLElement {
  constructor() {
    super();
    this.addEventListener("click", this.onClick.bind(this));

    var root = this.attachShadow({ mode: "open" });
    root.innerHTML = template;
    console.log(root.innerHTML);

    this.elements = {};
    for (var e of root.querySelectorAll("[as]")) {
      this.elements[e.getAttribute("as")] = e;
    }

    var preload = this.querySelector("template");
    if (preload) {
      var html = [...preload.content.childNodes].map(c => c.outerHTML).join("").trim();
      this.value = html;
    }

    this.toastTimer = null;
  }

  onClick() {
    this.elements.textarea.selectionStart = 0;
    this.elements.textarea.selectionEnd = this.value.length;
    document.execCommand("copy");
    this.toast(`Copied!`);
  }

  get value() {
    return this.elements.textarea.value;
  }

  set value(v) {
    this.elements.textarea.value = v.trim();
  }

  toast(text, time = 2000) {
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
    var { toast } = this.elements;
    toast.innerHTML = text;
    toast.classList.add("shown");
    this.toastTimer = setTimeout(() => {
      toast.classList.remove("shown");
      this.toastTimer = null;
      this.elements.textarea.selectionStart = 0;
      this.elements.textarea.selectionEnd = 0;
    }, time);
  }

}

window.customElements.define("copy-box", CopyBox);