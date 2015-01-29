(function() {
  'use strict';

  $(document).ready(function() {

    var $url = "http://tiny-pizza-server.herokuapp.com/collections/greenville-chats";
    var $user;
    var $message;

    $user = "codebabe";
    $message = "Looking forward to the weekend";

    //
    // Get All Chat Messages From Server
    //
    $.ajax({
      url: $url,
      type: "GET"
    }).done(function(data) {
      // console.log(data);

    });

    //
    // Make Post On Server
    //
    $.ajax({
      url: "http://tiny-pizza-server.herokuapp.com/collections/greenville-chats",
      type: "POST",
      data: {
        message: "Hi!",
        username: "BillyBob",
        createdAt: Date.now()
      }
    }).done(function(data) {
      console.log(data);

    });

  });
})();