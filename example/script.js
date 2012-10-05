$(function() {
  $.responsiveHub("ready", ["web", "tablet", "phone"], function(event) {
    $(".layout").html(event.layout.toUpperCase());
  });

  $.responsiveHub("change", ["web", "tablet", "phone"], function(event) {
    $(".layout").html(event.layout.toUpperCase());

    if (event.layout === "tablet") {
      $(".element").removeClass("square orange").addClass("circle");

    } else if (event.layout === "phone") {
      $(".element").addClass("orange");

    } else {
      $(".element").removeClass("circle orange").addClass("square");
    }
  });

  $.responsiveHub({

    layouts: {
      960: "web",
      710: "tablet",
      320: "phone"
    },

    defaultLayout: "web"

  });
});
