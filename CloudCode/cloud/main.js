Parse.Cloud.define("deleteUser", function(request, response) {
  Parse.Cloud.useMasterKey();

  // TODO: Auth check

  var userId = request.params.userId;

  var query = new Parse.Query(Parse.User);
  query.equalTo("objectId", userId);
  query.find({
    success: function(users) {
      if (users.length !== 1) {
        response.error("Could not find user with user ID '+ userID + '.")
        return;
      }

      var user = users[0];
      user.destroy({
        success: function() {
          response.success();
        },
        error: function(user, error) {
          response.error("Could not delete user: " + error.message);
        }
      });

    },
    error: function(error) {
      response.error('Could not find user with ID '+ userID + '.');
    }
  });

});


Parse.Cloud.define("updateUser", function(request, response) {
  Parse.Cloud.useMasterKey();

  // TODO: Auth check

  var requestUser = request.params;

  var userId = request.params.userId;

  var query = new Parse.Query(Parse.User);
  query.equalTo("objectId", userId);
  query.find({
    success: function(users) {
      if (users.length !== 1) {
        response.error("Could not find user with user ID "+ userID + ".");
        return;
      }

      var user = users[0];

      if (requestUser.firstName === undefined || requestUser.firstName.length < 1) {
        response.error("Please specify a first name for this user.");
        return;
      }
      user.set("firstName", requestUser.firstName);

      if (requestUser.lastName === undefined || requestUser.lastName.length < 1) {
        response.error("Please specify a last name for this user.");
        return;
      }
      user.set("lastName", requestUser.lastName);

      if (requestUser.username === undefined || requestUser.username.length < 1) {
        response.error("Please specify a username for this user.");
        return;
      }
      user.set("username", requestUser.username);

      if (requestUser.email === undefined || requestUser.email.length < 1) {
        response.error("Please specify an email address for this user.");
        return;
      }
      user.set("email", requestUser.email.toLowerCase());

      user.save(null, {
        success: function(user) {
          response.success(user);
        },
        error: function(user, error) {
          response.error('Could not update user: ' + error.message);
        }
      });
    },
    error: function(error) {
      response.error('Could not find user with ID '+ userID + '.');
    }
  });
});

Parse.Cloud.define("createNewUser", function(request, response) {
  Parse.Cloud.useMasterKey();

  // TODO: Auth check

  var requestUser = request.params;

  var user = new Parse.User();

  if (requestUser.firstName === undefined || requestUser.firstName.length < 1) {
    response.error("Please specify a first name for this user.");
    return;
  }
  user.set("firstName", requestUser.firstName);

  if (requestUser.lastName === undefined || requestUser.lastName.length < 1) {
    response.error("Please specify a last name for this user.");
    return;
  }
  user.set("lastName", requestUser.lastName);

  if (requestUser.username === undefined || requestUser.username.length < 1) {
    response.error("Please specify a username for this user.");
    return;
  }
  user.set("username", requestUser.username);

  if (requestUser.password === undefined || requestUser.password.length < 1) {
    response.error("Please specify a password for this user.");
    return;
  }
  user.set("password", requestUser.password);

  if (requestUser.email === undefined || requestUser.email.length < 1) {
    response.error("Please specify an email address for this user.");
    return;
  }
  user.set("email", requestUser.email.toLowerCase());
  
  if (requestUser.corporation === undefined || requestUser.corporation.length < 1) {
    response.error("Please specify a corporation for this user.");
    return;
  }
  var Corporation = Parse.Object.extend("Corporation");
  var query = new Parse.Query(Corporation);
  query.equalTo("objectId", requestUser.corporation);
  query.first({
    success: function(corporation) {
      
      if (corporation === undefined) {
        response.error("Please specify a valid corporation.");
        return;
      }

      user.set("corporation", corporation);

      user.save(null, {
        success: function(user) {
          response.success(user);
        },
        error: function(user, error) {
          response.error(error.message);
        }
      });

    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
      response.error("Could not find corporation.");
    }
  });

});
