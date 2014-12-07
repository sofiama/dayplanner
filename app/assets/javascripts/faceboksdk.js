 window.fbAsyncInit = function() {
        FB.init({
          appId      : '741149592640564',
          xfbml      : true,
          version    : 'v2.1',
        });
      };

      FB.ui({
        method: 'share_open_graph',
        action_type: 'og.image',
        action_properties: JSON.stringify({
            object:'https://developers.facebook.com/docs/',
        })
      }, function(response){});

     //  FB.ui(
     //   {
     //    method: 'share',
     //    href: 'https://developers.facebook.com/docs/',
     //    method: 'share_open_graph',
     //    action_type: 'og.likes',
     //    action_properties: JSON.stringify({
     //    object:'https://developers.facebook.com/docs/'
     // })
     //  }, function(response){});

      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));