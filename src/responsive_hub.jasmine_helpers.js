/*!
 * ResponsiveHub - JavaScript goodies for Responsive Design
 * https://github.com/globocom/responsive-hub
 * JasmineHelpers - version: 0.1.0
 */

if ($.responsiveHub && typeof(jasmine) === "object") {
  $.responsiveHub.jasmineHelpers = {

    getSpyForProperty: function(property) {
      var spy = $.responsiveHub("self")[property];
      if (spy && spy.callCount !== undefined) {
        return spy
      }
      return null;
    },

    setProperty: function(property, value) {
      var spy = this.getSpyForProperty(property);
      if (!spy) {
        spyOn($.responsiveHub("self"), property).andReturn(value);

      } else {
        spy.andReturn(value);
      }
    },

    setLayout: function(layout) {
      this.setProperty("layout", layout);
    },

    setTouch: function(touch) {
      this.setProperty("isTouch", touch);
    },

    setWidth: function(width) {
      this.setProperty("width", width);
    },

    setWindow: function(windowObj) {
      this.setProperty("_getWindow", windowObj);
    },

    triggerChangeToLayout: function(layout) {
      $.responsiveHub("self").currentLayout = null;
      this.setLayout(layout);
      $.responsiveHub("self").windowObj = $.responsiveHub("self")._getWindow();
      $.responsiveHub("self")._updateLayout();
    },

    getLayoutWidth: function(layout) {
      var obj = $.responsiveHub("self").layouts;
      for (var key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] == layout) {
          return parseInt(key, 10);
        }
      }

      return null;
    }

  }
}
