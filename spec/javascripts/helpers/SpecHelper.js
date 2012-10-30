beforeEach(function() {
});

var helpers = (function() {
  return {
    initResponsiveHub: function() {
      $.responsiveHub({
        layouts: {
          320: "phone",
          960: "web",
          768: "tablet"
        },
        defaultLayout: "web"
      });
    }
  };
})();
