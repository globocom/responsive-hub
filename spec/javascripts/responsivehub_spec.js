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
      $.responsiveHub({layouts: {960: "web"}, defaultLayout: "web"});
      expect(win.bind).toHaveBeenCalledWith("resize", $.responsiveHub("self")._updateLayout);
    });

    it("should disable resize bound", function() {
      expect($.responsiveHub("self").resizeBound).toEqual(false);
      $.responsiveHub({layouts: {960: "web"}, defaultLayout: "web"});
      expect($.responsiveHub("self").resizeBound).toEqual(true);
    });

    it("should detect media query support", function() {
      spyOn(Modernizr, "mq").andReturn(true);
      expect($.responsiveHub("self").hasMediaQuerySupport).toEqual(false);
      $.responsiveHub({layouts: {960: "web"}, defaultLayout: "web"});
      expect($.responsiveHub("self").hasMediaQuerySupport).toEqual(true);
    });

    it("should calculate current layout", function() {
      spyOn($.responsiveHub("self"), "layout").andReturn("phone");
      expect($.responsiveHub("self").currentLayout).toEqual(null);
      $.responsiveHub({layouts: {960: "web"}, defaultLayout: "web"});
      expect($.responsiveHub("self").currentLayout).toEqual("phone");
    });

    it("should trigger the ready event with the current layout", function() {
      spyOn(win, "trigger");
      spyOn($.responsiveHub("self"), "layout").andReturn("phone");
      spyOn($.responsiveHub("self"), "isTouch").andReturn(true);
      $.responsiveHub({layouts: {960: "web", 320: "phone"}, defaultLayout: "web"});
      expect(win.trigger).toHaveBeenCalledWith($.responsiveHub("self").NAMESPACE_READY + "phone", [{
        layout: "phone",
        touch: true
      }]);
    });

    it("should unbind the ready event", function() {
      spyOn(win, "unbind");
      $.responsiveHub({layouts: {960: "web"}, defaultLayout: "web"});
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
        defaultLayout: "web"
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

    describe("if the resolution is smaller than the smallest layout available", function() {
      it("should return the smallest layout", function() {
        spyOn($.responsiveHub("self"), "width").andReturn(100);
        expect($.responsiveHub("layout")).toEqual("phone");
      });
    });
  });

  describe("Ready event", function() {
    var readyCallback;

    var _initResponsiveHub = function() {
      $.responsiveHub({
        layouts: {
          320: "phone",
          960: "web",
          768: "tablet"
        },
        defaultLayout: "web"
      });
   };

    beforeEach(function() {
      readyCallback = jasmine.createSpy("onReady");
      $.responsiveHub("ready", ["phone", "tablet"], readyCallback);
      spyOn($.responsiveHub("self"), "isTouch").andReturn(false);
    });

    describe("If the resolution is present on the binding list", function() {
      beforeEach(function() {
        spyOn($.responsiveHub("self"), "width").andReturn(800);
        _initResponsiveHub();
      });

      it("should invoke the callback for the current resolution", function() {
        expect(readyCallback).toHaveBeenCalledWith({layout: "tablet", touch: false});
      });
    });

    describe("If the resolution is not present on the binding list", function() {
      beforeEach(function() {
        spyOn($.responsiveHub("self"), "width").andReturn(1024);
        _initResponsiveHub();
      });

      it("should not invoke any callbacks", function() {
        expect(readyCallback).not.toHaveBeenCalled();
      });
    });
  });

  describe("Change event", function() {
    var changeCallback;

    beforeEach(function() {
      changeCallback = jasmine.createSpy("onChange");
      $.responsiveHub("change", ["phone", "tablet"], changeCallback);
      spyOn($.responsiveHub("self"), "isTouch").andReturn(false);

      $.responsiveHub({
        layouts: {
          320: "phone",
          960: "web",
          768: "tablet"
        },
        defaultLayout: "web"
      });
    });

    describe("If the browser doesn't support media query", function() {
      beforeEach(function() {
      });

      it("should not invoke any callbacks", function() {
      });
    });

    describe("If the resolution is present on the binding list", function() {
      beforeEach(function() {
        spyOn($.responsiveHub("self"), "width").andReturn(800);

        for (var i = 0; i < 3; i++) {
          $.responsiveHub("self")._updateLayout();
        }
      });

      it("should update the current layout", function() {
        expect($.responsiveHub("self").currentLayout).toEqual("tablet");
      });

      it("should invoke the callback for the current resolution just once", function() {
        expect(changeCallback).toHaveBeenCalledWith({layout: "tablet", touch: false});
        expect(changeCallback.callCount).toEqual(1);
      });
    });

    describe("If the resolution is not present on the binding list", function() {
      beforeEach(function() {
        $.responsiveHub("self").currentLayout = "tablet";

        spyOn($.responsiveHub("self"), "width").andReturn(1024);
        $.responsiveHub("self")._updateLayout();
      });

      it("should change the current layout", function() {
        expect($.responsiveHub("self").currentLayout).toEqual("web");
      });

      it("should not invoke any callbacks", function() {
        expect(changeCallback).not.toHaveBeenCalled();
      });
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
