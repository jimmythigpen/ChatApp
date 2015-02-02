(function() {
  'use strict';

  $(document).ready(function() {
    var serverURL = "http://tiny-pizza-server.herokuapp.com/collections/greenville-chats";
    var updatedMessagesList;
    var initialMessages;
    var updateIDs;
    var initialIDs;

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
    // Get Chat Message from input field and call sendMessage function
    //
    $(".message-button").on("click", sendMessage);

    //
    // Send/Post message to Server
    //
    function sendMessage() {
      var timeStamp = moment().format();
      var newMessage = $(".text-field").val();
      $.ajax({
        url: "http://tiny-pizza-server.herokuapp.com/collections/greenville-chats",
        type: "POST",
        data: {
          username: userName,
          message: newMessage,
          createdAt: timeStamp
        }
      }).done(function(data) {

        // console.log(data);
      });
      $('.text-field').val('');
    }

    //
    // Initial Get All Messages From Server
    //
    messageTemplate.empty();
    $.ajax({
      url: serverURL,
      type: "GET"
    }).done(function(messages) {
      initialMessages = messages.reverse();
      _.each(initialMessages, function(message) {
        initialIDs = _.pluck(initialMessages, '_id');

        //
        // Pluck displayed IDs
        //
        // displayedIds = _.pluck(initialMessages, '_id');

        if (message.createdAt == null) {
          message.createdAt = "unknown ago";
        } else {
          message.createdAt = moment(message.createdAt).fromNow();
        }

        if (message.message == null) {
          message.message = "";
        }

        if (message.username == null) {
          message.username = "";
        }
        messageTemplate.append(renderMessageTemplate(message));

        //
        // Set container to start list display at bootom
        //
        $('.messages-container').scrollTop($('.messages-container').prop('scrollHeight'));
      });
    });

    //
    // Update New Messages To List
    //
    function update() {
      messageTemplate.empty();
      $.ajax({
        url: serverURL,
        type: "GET"
      }).done(function(allMessagesRefresh) {
        updatedMessagesList = allMessagesRefresh.reverse();
        _.each(updatedMessagesList, function(newMessage) {


          if (newMessage.createdAt == null) {
            newMessage.createdAt = "unknown ago";
          } else {
            newMessage.createdAt = moment(newMessage.createdAt).fromNow();
          }

          if (newMessage.message == null) {
            newMessage.message = "";
          }

          if (newMessage.username == null) {
            newMessage.username = "";
          }

          messageTemplate.append(renderMessageTemplate(newMessage));

        });
        $('.messages-container').scrollTop($('.messages-container').prop('scrollHeight'));

        //
        // Check if updated IDs exist
        //
        if (updateIDs != undefined) {
          initialIDs = updateIDs;
        }
      })
    }

    function getIDs() {
      updateIDs = _.pluck(updatedMessagesList, '_id');
      var newMessages = _.difference(updateIDs, initialIDs);


    }


    //
    // Update Interval
    //
    setInterval(update, 10000);
    // clearInterval(interval);
    setInterval(getIDs, 11000);

  });
})();




//
// filter_.filter(list, predicate, [context]) Alias: select
// Looks through each value in the list, returning an array of all the values that pass a truth test (predicate).
//
// var evens = _.filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
// => [2, 4, 6]









// var shownMessages = [];
//
// function initial(messages) {
//   shownMessages = shownMessages.concat(messages);
//   console.log(messages);
// }
//
// function update(messages) {
//   var newMessages = _.difference(messages, shownMessages);
//   console.log(newMessages);
//   shownMessages = shownMessages.concat(newMessages);
// }
//
// initial([1, 2, 3]);
// update([1, 2, 3, 4]);
// update([1, 2, 3, 4, 5]);

//  [1, 2, 3]
//  [4]
//  [5]