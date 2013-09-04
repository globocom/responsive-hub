describe("JasmineHelpers for ResponsiveHub", function() {
  var layout = $.responsiveHub("self").layout;

  afterEach(function() {
    $.responsiveHub("self").layout = layout;
  });

  it("should define $.responsiveHub.jasmineHelpers", function() {
    expect($.responsiveHub.jasmineHelpers).not.toBe(undefined);
  });

  describe("getSpyForProperty", function() {
    it("should return 'null' if does not exist spy", function() {
      expect(helpers.responsiveHub.getSpyForProperty("layout")).toBe(null);
    });

    it("should return the spy", function() {
      helpers.responsiveHub.setLayout("phone");
      expect(helpers.responsiveHub.getSpyForProperty("layout")).toBe($.responsiveHub("self").layout);
    });
  });

  describe("setProperty", function() {
    it("should create a spy with the value informed", function() {
      helpers.responsiveHub.setProperty("layout", "test");
      expect($.responsiveHub("self").layout()).toBe("test");
    });

    it("should override the value if the spy was already created", function() {
      helpers.responsiveHub.setProperty("layout", "test1");
      helpers.responsiveHub.setProperty("layout", "test2");
      helpers.responsiveHub.setProperty("layout", "test3");
      expect($.responsiveHub("self").layout()).toBe("test3");
    });
  });

  describe("setLayout", function() {
    it("should be an alias to setProperty('layout', ...)", function() {
      spyOn(helpers.responsiveHub, "setProperty");
      helpers.responsiveHub.setLayout("test");
      expect(helpers.responsiveHub.setProperty).toHaveBeenCalledWith("layout", "test");
    });
  });

  describe("setTouch", function() {
    it("should be an alias to setProperty('isTouch', ...)", function() {
      spyOn(helpers.responsiveHub, "setProperty");
      helpers.responsiveHub.setTouch(true);
      expect(helpers.responsiveHub.setProperty).toHaveBeenCalledWith("isTouch", true);
    });
  });

  describe("hasFlash", function() {
    it("should be an alias to setProperty('hasFlash', ...)", function() {
      spyOn(helpers.responsiveHub, "setProperty");
      helpers.responsiveHub.hasFlash(false);
      expect(helpers.responsiveHub.setProperty).toHaveBeenCalledWith("hasFlash", false);
    });
  });

  describe("setWidth", function() {
    it("should be an alias to setProperty('width', ...)", function() {
      spyOn(helpers.responsiveHub, "setProperty");
      helpers.responsiveHub.setWidth(107);
      expect(helpers.responsiveHub.setProperty).toHaveBeenCalledWith("width", 107);
    });
  });

  describe("setWindow", function() {
    it("should be an alias to setProperty('_getWindow', ...)", function() {
      spyOn(helpers.responsiveHub, "setProperty");
      helpers.responsiveHub.setWindow(jasmine.any(Object));
      expect(helpers.responsiveHub.setProperty).toHaveBeenCalledWith("_getWindow", jasmine.any(Object));
    });
  });

  describe("triggerChangeToLayout", function() {
    it("should trigger the change event to the desired layout", function() {
      var callback = jasmine.createSpy("onChange");
      $.responsiveHub("change", ["phone", "tablet"], callback);

      helpers.responsiveHub.triggerChangeToLayout("phone");
      expect(callback).toHaveBeenCalledWith({layout: "phone", touch: false});

      helpers.responsiveHub.triggerChangeToLayout("tablet");
      expect(callback).toHaveBeenCalledWith({layout: "tablet", touch: false});
    });
  });

  describe("triggerLayoutReady", function() {
    it("should trigger the ready event to the desired layout", function() {
      var callback = jasmine.createSpy("onReady");
      $.responsiveHub("ready", ["phone", "tablet"], callback);

      helpers.responsiveHub.triggerLayoutReady("phone");
      expect(callback).toHaveBeenCalledWith({layout: "phone", touch: false});

      helpers.responsiveHub.triggerLayoutReady("tablet");
      expect(callback).toHaveBeenCalledWith({layout: "tablet", touch: false});

      helpers.responsiveHub.triggerLayoutReady("web");
      expect(callback).not.toHaveBeenCalledWith({layout: "web", touch: false});
    });
  });

  describe("getLayoutWidth", function() {
    it("should return the width of layout based on its alias", function() {
      helpers.initResponsiveHub();
      expect(helpers.responsiveHub.getLayoutWidth("web")).toBe(960);
      expect(helpers.responsiveHub.getLayoutWidth("tablet")).toBe(768);
      expect(helpers.responsiveHub.getLayoutWidth("phone")).toBe(320);
    });
  });
});
