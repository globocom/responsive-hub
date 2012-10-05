/*!
 * ResponsiveHub - JavaScript goodies for Responsive Design
 * https://github.com/globocom/responsive-hub
 * version: 0.1.0
 */

;(function ($, window, document) {

  $.responsiveHub = function(settings) {
    if (typeof settings === "object") {
      ResponsiveHub.init(settings);

    } else if (typeof settings === "string") {
      var args = [].splice.call(arguments,0);
      var methodName = args.splice(0, 1)[0];
      if (ResponsiveHub[methodName]) {
        return ResponsiveHub[methodName].apply(ResponsiveHub, args);
      } else {
        throw "[ResponsiveHub] Undefined method '" + methodName + "'";
      }
    }
  }

  var ResponsiveHub = {
    NAMESPACE: "ResponsiveHub_",
    NAMESPACE_READY: "ResponsiveHubReady_",

    currentLayout: null,
    resizeBound: false,
    hasMediaQuerySupport: false,
    windowObj: null,

    init: function(settings) {
      this.windowObj = this._getWindow();
      this.layouts = settings.layouts;
      this.default = settings.default;
      this._boot();
    },

    self: function() {
      return this;
    },

    width: function() {
      return this.windowObj.width();
    },

    layout: function() {
      if (!this.hasMediaQuerySupport) {
        return this.default;
      }

      var widths = this._keys(this.layouts);
      widths.sort();
      widths.reverse();

      var width = this.width();
      for (var i in widths) {
        var w = widths[i];
        if (width > w) return this.layouts[w];
      }
    },

    isTouch: function() {
      return !!(('ontouchstart' in this.windowObj) || (this.windowObj.DocumentTouch && this.windowObj.document instanceof DocumentTouch));
    },

    hasFlash: function() {
      try { return !! new ActiveXObject('ShockwaveFlash.ShockwaveFlash'); } catch(e1) {}
      var mimeType = this._mimeTypeFlash();
      return !! (mimeType && mimeType.enabledPlugin);
    },

    _updateLayout: function() {
    },

    _boot: function() {
      if (!this.resizeBound) {
        this.windowObj.bind("resize", this._updateLayout);
        this.resizeBound = true;
        this.hasMediaQuerySupport = Modernizr.mq("only all");
      }

      if (!this.currentLayout) {
        this.currentLayout = this.layout();
      }

      var readyEvent = this.NAMESPACE_READY + this.currentLayout;
      this.windowObj.trigger(readyEvent, [{
        layout: this.currentLayout,
        touch: this.isTouch()
      }]);

      this.windowObj.unbind(readyEvent);
    },

    _getWindow: function() {
      return $(window);
    },

    _mimeTypeFlash: function() {
      return navigator.mimeTypes["application/x-shockwave-flash"];
    },

    // https://github.com/jiujitsumind/underscorejs/blob/master/underscore.js#L644
    _keys: Object.keys || function(obj) {
      if (obj !== Object(obj)) throw new TypeError('Invalid object');
      var keys = [];
      for (var key in obj) if (obj.hasOwnProperty(key)) keys[keys.length] = key;
      return keys;
    },

    _isArray: Array.isArray || function(obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    }

  };

 })(jQuery, window, document);
