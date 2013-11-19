$(function() {
  $("fieldset legend").on("click", function() {
    if($(this).children("span").text() == "+") {
      $(this).children("span").text("-");
      $(this).siblings("h1, input, label, textarea").fadeIn();
      $("h1 input").fadeIn();
    }
    else {
      $(this).children("span").text("+");
      $(this).siblings("h1, input, label, textarea").fadeOut();
      $("h1 input").fadeOut();

    }
  });

  $("input, textarea").on("focusin", function() {
    $(this).addClass("focus");
  });

  $("input, textarea").on("focusout", function() {
    $(this).removeClass("focus");
  });
});
