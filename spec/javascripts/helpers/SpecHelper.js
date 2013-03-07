beforeEach(function() {
  window.helpers = (function() {
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
      },

      responsiveHub: $.responsiveHub.jasmineHelpers
    };
  })();
});

