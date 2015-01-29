(function() {
  'use strict';

  $(document).ready(function() {

    var serverURL = "http://tiny-pizza-server.herokuapp.com/collections/greenville-chats";


    //
    // Get Chat Message from input field
    //
    $(".name-button").on("click", storeName);
    $(".message-button").on("click", sendMessage);

    //
    // Store Username
    //
    function storeName() {
      // event.preventDefault();
      var userName = $(".user-name-field").val();
      console.log(userName);
    }


    //
    // Post message to Chat
    //
    function sendMessage() {
      var newMessage = $(".input-field").val();
      $.ajax({
        url: "http://tiny-pizza-server.herokuapp.com/collections/greenville-chats",
        type: "POST",
        data: {
          username: userName,
          message: newMessage,
        }
      }).done(function(data) {
        console.log(data);
      });
    }


    //
    // Get All Chat Messages From Server
    //
    // $.ajax({
    //   url: $url,
    //   type: "GET"
    // }).done(function(data) {
    //   console.log(data);
    // });

    //
    // Make Post On Server
    //


  });
})();