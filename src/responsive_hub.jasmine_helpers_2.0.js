/*!
 * ResponsiveHub - JavaScript goodies for Responsive Design
 * https://github.com/globocom/responsive-hub
 * JasmineHelpers for Jasmine 2.0 - version: 0.3.0
 */

if ($.responsiveHub && typeof(jasmine) === "object") {
  $.responsiveHub.jasmineHelpers = {

    getSpyForProperty: function(property) {
      var spy = $.responsiveHub("self")[property];
      if (spy && spy.calls && spy.calls.count() !== undefined) {
        return spy
      }
      return null;
    },

    setProperty: function(property, value) {
      var spy = this.getSpyForProperty(property);
      if (!spy) {
        spyOn($.responsiveHub("self"), property).and.returnValue(value);

      } else {
        spy.and.returnValue(value);
      }
    },

    setLayout: function(layout) {
      this.setProperty("layout", layout);
    },

    setTouch: function(touch) {
      this.setProperty("isTouch", touch);
    },

    hasFlash: function(flash) {
      this.setProperty("hasFlash", flash);
    },

    setWidth: function(width) {
      this.setProperty("width", width);
    },

    setWindow: function(windowObj) {
      this.setProperty("_getWindow", windowObj);
    },

    triggerLayoutEvent: function(event, layout) {
      if (event === "ready") {
        this.triggerLayoutReady(layout);
      } else if (event === "change") {
        this.triggerChangeToLayout(layout);
      }
    },

    triggerChangeToLayout: function(layout) {
      var instance = $.responsiveHub("self");

      instance.currentLayout = null;
      this.setLayout(layout);

      instance.windowObj = instance._getWindow();
      instance._updateLayout();
    },

    triggerLayoutReady: function(layout) {
      var instance = $.responsiveHub("self");

      instance.currentLayout = null;
      instance.windowObj = instance._getWindow();

      if (jasmine.isSpy(instance.layout)) {
        instance.layout.reset();
        instance.layout.and.returnValue(layout);
      } else {
        spyOn(instance, "layout").and.returnValue(layout);
      }

      instance._boot();
    },

    getLayoutWidth: function(layout) {
      var obj = $.responsiveHub("self").layouts;
      for (var key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] == layout) {
          return parseInt(key, 10);
        }
      }

      return null;
    },

    unbindAllEvents: function() {
      var instance = $.responsiveHub("self");
      instance._unbind();
    }
  }
}
