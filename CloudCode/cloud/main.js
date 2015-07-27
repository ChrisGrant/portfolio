Parse.Cloud.define("createNewUser", function(request, response) {

  Parse.Cloud.useMasterKey();

  // TODO: Auth check

  // TODO: Validation

  var requestUser = request.params;

  var user = new Parse.User();
  user.set("firstName", requestUser.firstName);
  user.set("lastName", requestUser.lastName);
  user.set("username", requestUser.username);
  user.set("password", requestUser.password);
  user.set("email", requestUser.email);

  user.save(null, {
    success: function(user) {
      // Hooray! Let them use the app now.
      response.success(user);
    },
    error: function(user, error) {
      response.error(error.message);
    }
  });

});
