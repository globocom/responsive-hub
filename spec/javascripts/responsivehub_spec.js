describe("ResponsiveHub", function() {

  describe("init", function() {

     it("should bind 'resize' to '_updateLayout'", function() {
       var win = jasmine.createSpyObj("win", ["bind"]);
       spyOn(win, "bind");
       spyOn($.responsiveHub("self"), "_getWindow").andReturn(win);
       expect(win.bind).toHaveBeenCalledWith("resize", $.responsiveHub("self")._updateLayout);
       $.responsiveHub({layouts: {960: "web"}, default: "web"});
     });

     it("should disable resize bound", function() {
     });

     it("should detect media query support", function() {
     });

     it("should calculate current layout", function() {
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
