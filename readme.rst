Patchbay
======================================================

Patchbay is a loader for Sidechain that duplicates the URL parameters typically added by Pym.js, as well as offering auto-upgrade option for paragraph tags that are marked with the correct data-attributes.

To use this to load Sidechain embeds on your page, include the following script tag on the page:

```html
<script src="https://apps.npr.org/sidechain/loader.js"></script>
```

You can include it multiple times, it will ignore elements that have already been upgraded.

All three of the elements below will be upgraded into Sidechain embeds when the script runs:

```html
Recommended:
<side-chain src="guest.html"></side-chain>

For older CMS systems:
<p data-sidechain="guest.html"></p>

For legacy systems that expect Pym embeds:
<p data-pym-loader data-child-src="guest.html"></p>
```

The loader will add four URL parameters to the embed:

* `parentUrl` - contains the URL for the host page
* `parentTitle` - title of the host page
* `initialWidth` - the width of the embed at the time that the loader ran
* `id` - the ID for the embed

You can use these for tracking or analytics purposes.

This repo is built on our `interactive template <https://github.com/nprapps/interactive-template>`_. Check the readme for that template for more details about the structure and mechanics of the app, as well as how to start your own project.