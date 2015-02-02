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
      });
      $('.text-field').val('');
    }

    //
    // Initial Get All Messages From Server
    //
    $.ajax({
      url: serverURL,
      type: "GET"
    }).done(function(messages) {
      initialMessages = messages.reverse();
      _.each(initialMessages, function(message) {
        initialIDs = _.pluck(initialMessages, '_id');
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
      });
    });

    //
    // Pull New Messages Form Server
    //
    function update() {
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
        });

        //
        // Check if updated IDs already exist
        //
        if (updateIDs != undefined) {
          initialIDs = updateIDs;
        }
      })
    }

    //
    // Compare initial IDs with updatedIDs and display new messages
    //

    function getIDs() {
      updateIDs = _.pluck(updatedMessagesList, '_id');
      var difference = _.difference(updateIDs, initialIDs);
      var newList = _.filter(updatedMessagesList, function(m) {
        return _.contains(difference, m._id);
      });
      _.each(newList, function(newMessageUpdate) {
        if (newMessageUpdate.createdAt == null) {
          newMessageUpdate.createdAt = "unknown ago";
        } else {
          newMessageUpdate.createdAt = moment(newMessageUpdate.createdAt).fromNow();
        }

        if (newMessageUpdate.message == null) {
          newMessageUpdate.message = "";
        }

        if (newMessageUpdate.username == null) {
          newMessageUpdate.username = "";
        }
        messageTemplate.append(renderMessageTemplate(newMessageUpdate));
        $('.messages-container').scrollTop($('.messages-container')[0].scrollHeight);
      });
    }

    //
    // Update Interval
    //
    setInterval(update, 1500);
    setInterval(getIDs, 1500);
    setInterval(display, 1500);

    function display() {
      $('.messages-container').scrollTop($('.messages-container')[0].scrollHeight);
    }

  });
})();