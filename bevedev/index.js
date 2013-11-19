$(function() {
  $("fieldset legend").on("click", function() {
    $(this).siblings("h1, input, label, textarea").toggle("slow");
    if($(this).children("span").text() == "+") {
      $(this).children("span").text("-");
    }
    else {
      $(this).children("span").text("+");
    }
  });

  $("input, textarea").on("focusin", function() {
    $(this).addClass("focus");
  });

  $("input, textarea").on("focusout", function() {
    $(this).removeClass("focus");
  });
});
