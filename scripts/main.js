(function() {
  'use strict';

  $(document).ready(function() {

    var serverURL = "http://tiny-pizza-server.herokuapp.com/collections/greenville-chats";
    var userName = '';

    var renderMessageTemplate = _.template($('.message-data').text());
    var messageTemplate = $('.messages-list');

    //
    // Get Chat Message from input field
    //
    $(".name-button").on("click", storeName);
    $(".message-button").on("click", sendMessage);

    //
    // Store Username
    //
    function storeName() {
      userName = $(".user-name-field").val();
      console.log(userName);
    }

    //
    // Post message to Server
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
    // Get ALl Messages from server
    //

    $.ajax({
      url: serverURL,
      type: "GET"
    }).done(function(messages) {
      _.each(messages, function(message) {
        messageTemplate.append(renderMessageTemplate(message));
      });
    });


  });
})();