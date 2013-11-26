(function() {
  // Prepare a deferred we can wait on for login
  var ready = $.Deferred();
  window.FBReady = ready.promise();

  window.fbAsyncInit = function() {
    FB.init({
      appId      : window.FB_APP_ID, // App ID
      channelUrl : '//' + window.location.host + '/channel.html', // Channel File
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true,  // parse XFBML
      frictionlessRequests: true      
    });

    // Make sure the user is logged in and redirect if needed
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        ready.resolve(response);
      } else {
        ready.reject(response);
      }
    });
  };

  // Load the SDK Asynchronously
  (function(d){
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "http://connect.facebook.net/en_US/all.js";
     ref.parentNode.insertBefore(js, ref);
  }(document));
})();