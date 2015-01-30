(function() {
  'use strict';

  $(document).ready(function() {

    var serverURL = "http://tiny-pizza-server.herokuapp.com/collections/greenville-chats";

    //
    // Find Username
    //
    var userName = prompt("Enter a username");
    if (userName == null) {
      userName = "Anonymous";
    }

    var renderMessageTemplate = _.template($('.message-data').text());
    var messageTemplate = $('.messages-list');

    //
    // Get Chat Message from input field
    //
    // $(".name-button").on("click", storeName);
    $(".message-button").on("click", sendMessage);

    // $(".name-button").click(function() {
    //   ($(".message-container").scrollTop(400) + " px");
    // });



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
      var newMessage = $(".text-field").val();
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
    // Get All Messages from server
    //

    // function getMessages() {
    messageTemplate.empty();
    $.ajax({
      url: serverURL,
      type: "GET"
    }).done(function(messages) {
      messages = messages.reverse();
      _.each(messages, function(message) {

        if (message.createdAt == null) {
          message.createdAt = "unknown ago";
        } else {
          message.createdAt = moment(message.createdAt).fromNow();
        }

        if (message.message == null) {
          message.message = "";
        }

        messageTemplate.append(renderMessageTemplate(message));

      });
    });
    // }
    // setInterval(getMessages, 5000);

    // $(".messages-container").animate({
    //   scrollTop: $('.messages-container')[0].scrollHeight
    // }, 1000);
    // var interval = setInterval(function(){
    //   console.log(Date.now());
    // }, 1000);
    //
    // clearInterval(interval);

    // setInterval(function() {
    //
    //   $.ajax({
    //     url: serverURL,
    //     type: "GET"
    //   }).done(function(messages) {
    //     _.each(messages, function(message) {
    //       messageTemplate.append(renderMessageTemplate(message));
    //     });
    //   });
    // }, 3000);


  });
})();