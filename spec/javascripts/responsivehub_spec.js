describe("ResponsiveHub", function() {

  beforeEach(function() {
    var hub = $.responsiveHub("self");
    hub.currentLayout = null;
    hub.resizeBound = false;
    hub.hasMediaQuerySupport = false;
    hub.windowObj = null;
  });

  describe("init", function() {
    var win;

    beforeEach(function() {
      win = $(window);
      spyOn($.responsiveHub("self"), "_getWindow").andReturn(win);
    });

    it("should bind 'resize' to '_updateLayout'", function() {
      spyOn(win, "bind");
      $.responsiveHub({layouts: {960: "web"}, default: "web"});
      expect(win.bind).toHaveBeenCalledWith("resize", $.responsiveHub("self")._updateLayout);
    });

    it("should disable resize bound", function() {
      expect($.responsiveHub("self").resizeBound).toEqual(false);
      $.responsiveHub({layouts: {960: "web"}, default: "web"});
      expect($.responsiveHub("self").resizeBound).toEqual(true);
    });

    it("should detect media query support", function() {
      spyOn(Modernizr, "mq").andReturn(true);
      expect($.responsiveHub("self").hasMediaQuerySupport).toEqual(false);
      $.responsiveHub({layouts: {960: "web"}, default: "web"});
      expect($.responsiveHub("self").hasMediaQuerySupport).toEqual(true);
    });

    it("should calculate current layout", function() {
      spyOn($.responsiveHub("self"), "layout").andReturn("phone");
      expect($.responsiveHub("self").currentLayout).toEqual(null);
      $.responsiveHub({layouts: {960: "web"}, default: "web"});
      expect($.responsiveHub("self").currentLayout).toEqual("phone");
    });

    it("should trigger the ready event with the current layout", function() {
      spyOn(win, "trigger");
      spyOn($.responsiveHub("self"), "layout").andReturn("phone");
      spyOn($.responsiveHub("self"), "isTouch").andReturn(true);
      $.responsiveHub({layouts: {960: "web", 320: "phone"}, default: "web"});
      expect(win.trigger).toHaveBeenCalledWith($.responsiveHub("self").NAMESPACE_READY + "phone", [{
        layout: "phone",
        touch: true
      }]);
    });

    it("should unbind the ready event", function() {
      spyOn(win, "unbind");
      $.responsiveHub({layouts: {960: "web"}, default: "web"});
      expect(win.unbind).toHaveBeenCalledWith($.responsiveHub("self").NAMESPACE_READY + "web");
    });
  });

  describe("layout", function() {

    beforeEach(function() {
      $.responsiveHub({
        layouts: {
          320: "phone",
          960: "web",
          768: "tablet"
        },
        default: "web"
      });

    });

    it("should return matched layout", function() {
      spyOn($.responsiveHub("self"), "width").andReturn(800);
      expect($.responsiveHub("layout")).toEqual("tablet");
    });

    it("should return 'default' if does not support media queries", function() {
      spyOn($.responsiveHub("self"), "width").andReturn(100);
      $.responsiveHub("self").hasMediaQuerySupport = false;
      expect($.responsiveHub("layout")).toEqual("web");
    });

  });

  describe("width", function() {

    it("should retrieve the window width", function() {
      var win = jasmine.createSpyObj("win", ["width"]);
      $.responsiveHub("self").windowObj = win;

      $.responsiveHub("width");
      expect(win.width).toHaveBeenCalled();
    });

  });

  describe("isTouch", function() {

    it("should be true if ontouchstart exist", function() {
      var win = jasmine.createSpyObj("win", ["ontouchstart"]);
      $.responsiveHub("self").windowObj = win;
      expect($.responsiveHub("isTouch")).toEqual(true);
    });

    describe("when dealing with DocumentTouch", function() {
      var originalDocumentTouch;
      beforeEach(function() {
        originalDocumentTouch = window.DocumentTouch;
      });

      afterEach(function() {
        window.DocumentTouch = originalDocumentTouch;
      });

      it("should be true if document is an instance of DocumentTouch", function() {
        var DocumentTouch = function() {};
        window.DocumentTouch = DocumentTouch;
        var win = {
          DocumentTouch: DocumentTouch,
          document: new DocumentTouch()
        };
        $.responsiveHub("self").windowObj = win;
        expect($.responsiveHub("isTouch")).toEqual(true);
      });

    });

  });

  
});
