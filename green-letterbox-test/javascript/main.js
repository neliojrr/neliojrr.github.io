$(function() {

  // call the api from http://reqres.in/
  // list all users
  list_users(1);

  // To search someone
  $("#search_box").on("keyup", function() {
    if($(this).val() !== "") {
      find_user($(this).val());
    }
    else {
      list_users(1);
    }
  });

  // Select all list
  $("#check_all").on("click", function() {
    if($(this).is(":checked")) {
      $("[type=checkbox]").prop("checked", true);
      $("#counter").text("3");
    }
    else {
      $("[type=checkbox]").prop("checked", false);
      $("#counter").text("no");
    }
  });

  // Delete users
  $("#button_delete").on("click", function() {
    $(".checkbox_user").each(function() {
      if($(this).is(":checked")) {
        delete_user($(this).val());
      }
    });
  });

  $(document.body).on("click", ".checkbox_user", function() {
    var count = 0;
    $(".checkbox_user").each(function() {
      if($(this).is(":checked")) {
        count++;
      }
    });

    $("#counter").text(count);
  });

  // list users by page
  $(document.body).on("change", "#pages", function() {
    list_users($(this).val());
  });
});

function list_users(page) {
  $.ajax({
    url: "http://reqres.in/api/users?page=" + page,
    type: "GET",
    success: function(response) {
      console.log(response);

      var users = response.data;
      var pages = response.total_pages;
      var page = response.page;
      set_pages(pages, page);
      var table = $("#table_body");
      table.html("");
      for(var i = 0; i < users.length; i++) {
        var tr = document.createElement("tr");
        table.append(tr);

        $(tr).append("<td><input class='checkbox_user' type='checkbox' id='user_" + users[i].id + "' value='" + users[i].id + "' /></td>");
        $(tr).append("<td><img class='img_avatar' src='" + users[i].avatar + "' /></td>");
        $(tr).append("<td>" + users[i].id + "</td>");
        $(tr).append("<td>" + users[i].first_name + "</td>");
        $(tr).append("<td>" + users[i].last_name + "</td>");
      }
    },
    error: function(error) {
      alert("Unfortunelly it wasn't possible list the users");
      console.log("The error: " + error);
    }
  });
}

function find_user(id) {
  $.ajax({
    url: "http://reqres.in/api/users/" + id,
    type: "GET",
    success: function(response) {
      console.log(response);

      var user = response.data;
      var table = $("#table_body");
      table.html("");

      var tr = document.createElement("tr");
      table.append(tr);

      $(tr).append("<td><input type='checkbox' id='user_" + user.id + "' /></td>");
      $(tr).append("<td><img class='img_avatar' src='" + user.avatar + "' /></td>");
      $(tr).append("<td>" + user.id + "</td>");
      $(tr).append("<td>" + user.first_name + "</td>");
      $(tr).append("<td>" + user.last_name + "</td>");
    },
    error: function(error) {
      console.log("The error: " + error);
    }
  });
}

function delete_user(id) {
  $.ajax({
    url: "http://reqres.in/api/users/" + id,
    type: "DELETE",
    success: function(response) {
      console.log(response);
      $("#user_" + id).parent("td").parent("tr").remove();
      $("#counter").text("no");
    },
    error: function(error) {
      console.log("The error: " + error);
    }
  });
}

function set_pages(number_of_pages, current) {
  $("#pages").html("");
  for(var i = 1; i <= number_of_pages; i++) {
    if(i == current) {
      $("#pages").append("<option value='" + i + "' selected>" + i + "</option>");
    }
    else {
      $("#pages").append("<option value='" + i + "'>" + i + "</option>");
    }
  }
}
