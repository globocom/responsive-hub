# ResponsiveHub

JavaScript goodies for Responsive Design

## Browser Compatibility

* IE 7+
* Firefox 3.6+
* Chrome 4+
* Safari 5+
* Opera 10.10+

Note: Be aware that browsers that does not support media query will not
trigger events of layout change.

## Dependencies

* [jQuery](http://jquery.com) 1.4.4 + (..., 1.7.2, 1.8.2)
* [Modernizr MediaQueries](http://modernizr.com/) 2.6.2
  (We only need media queries verification, we have a [custom
build](https://github.com/globocom/responsive-hub/blob/master/lib/modernizr_mediaqueries.js) in
lib directory in case you do not have modernizr in your project)

## Usage

### Initialization

The first thing to do is define what resolutions your web app can
handle:

````javascript
// After the document loads
$(function() {

  $.responsiveHub({
    layouts: {
      320:  "phone",
      960:  "tablet",
      1024: "web"
    },
    defaultLayout: "web"
  });
});

````

**Important:** This code should be the last script to run.

Here, our web app supports three distinct resolutions, or layouts:
*phone*, *tablet*, and *web*. The key associated to each value is the
corresponding minimum screen width, in pixels, which ResponsiveHub uses
to determine how to call each screen range.

To make things easier to visualize, in this particular example, these
are the ranges:

1. Window width >= 1024 is called **web**
2. Window width >= 960 and < 1024 is called **tablet**
3. Window width >= 320 and < 960 is called **phone**

#### Initialization Callback

If you are interested to know when the ResponsiveHub is ready, you can
use the `ready` callback:

````javascript
$.responsiveHub("ready", ["phone", "tablet", "web"], function(event) {
  alert(event.layout); // Current layout
  alert(event.touch);  // Whether the browser supports touch events
});
````

As you can see, the `event` parameter exposes what is the current
layout and whether the device is touch-enabled.

This is useful when you want to further adjustment before the page is
fully ready, i.e. re-initialize a pagination plugin with a different
number of elements per page.

The second parameter indicates what layouts you are interested to be
notified about. For example, if you just need to change things for
relatively small screen sizes (like phones), this is what you need:

````javascript
$.responsiveHub("ready", "phone", function(event) {
  // This will not be called for bigger screen sizes
});
````

**Important:** Just remember that you should declare the callback
*before* the initialization shown before runs. Otherwise, it would
be too late.

### Listening To Resolution Changes

TODO.

## Authors

* [Daniel Martins](https://github.com/danielfm)
* [Túlio Ornelas](https://github.com/tulios)
* [Emerson Macedo](https://github.com/emerleite)
* [Alexandre Magno](https://github.com/alexanmtz)

## License

Copyright (c) 2012 Globo.com - Webmedia. See
[COPYING](http://github.com/globocom/responsive-hub/blob/master/COPYING)
for more details.
