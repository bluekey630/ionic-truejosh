// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ion-place-tools','starter.controllers','countrySelect','ngCordova'])

.run(function($ionicPlatform, $ionicPopup, $location) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
  // Disable BACK button on home
    $ionicPlatform.registerBackButtonAction(function(event) {
	   
	   //alert("ss");
	
      if ($location.path() == "/travelprogress" || $location.path() == "travelprogress") {
		  event.preventDefault(); 
        //navigator.app.exitApp();
      }
	  else if($location.path() == "/signin" || $location.path() == "signin"){
		  //alert("sigin");
	var retVal = confirm("Are you sure you want to exit?");
	if( retVal == true ){
                  navigator.app.exitApp(); 
                  return true;
               }
               else{
                 event.preventDefault(); 
                  return false;
               }

	  }
	  else if($location.path() == "/availabletrips" || $location.path() == "availabletrips") {
		  event.preventDefault(); 
        //navigator.app.exitApp();
      }
	  	  else if($location.path() == "/choosedate" || $location.path() == "choosedate") {
		  event.preventDefault(); 
        //navigator.app.exitApp();
      }
      else {
		  //alert("else");
        window.history.back();
      }
    }, 100);
})

.directive('selectWheel', [
    '$ionicScrollDelegate',
    '$ionicGesture',
    function($ionicScrollDelegate, $ionicGesture) {
      return {
        restrict: 'E',
        scope: {
          itemHeight: '@',
          amplitude: '@',
          ngModel: '=',
          options: '='
        },
        templateUrl: 'select-wheel.html',
        link: function(scope, element) {
          var _fixed = false,
            _touched = false;
          scope.itemHeight = scope.itemHeight || 50;
          scope.amplitude = scope.amplitude || 5;
          scope._index = 0;

          // Try to identify the model to an option value
          if (scope.ngModel !== 'undefined') {
            for (var i = 0, len = scope.options.length; i < len; ++i) {
              if (scope.options[i].value === scope.ngModel) {
                scope._index = i;
                break;
              }
            }
          }
          scope.onScroll = function(event, scrollTop) {
            scrollTop = Math.round(scrollTop);

            var height = scope.itemHeight,
              amplitude = scope.amplitude,
              remainder = scrollTop % height,
              distance, nearestPos,
              middle = Math.floor(height / 2),
              index,
              minDist = middle - amplitude;

            // Find the distance between the item and the center of the wheel
            // So if the height of the item is 50, it finds the nearest
            // integer for scrollTop to reach a multiple of 50
            // 160 = 3 * 50 + 10 => For 160, the distance is 10
            // 145 = 3 * 50 - 5 => For 145, the distance is 5
            if (remainder > middle) {
              distance = height - remainder;
              nearestPos = scrollTop + distance;
              index = Math.floor(scrollTop / height) + 1;
            } else {
              distance = remainder;
              nearestPos = scrollTop - distance;
              index = Math.floor(scrollTop / height);
            }
            if (!_touched && !_fixed) {
              $ionicScrollDelegate.scrollTo(0, nearestPos);
              _fixed = true;
              scope._index = index;
              scope.$apply(function() {
                scope.ngModel = scope.options[index].value;
              });
            }
          };
          // Detect when the wheel is touched
          $ionicGesture.on('touch', function() {
            _touched = true;
            _fixed = false;
          }, element, {});

          $ionicGesture.on('release', function() {
            _touched = false;
          }, element, {});
          // Scroll to the right value (depends on how ngModel was set)
          $ionicScrollDelegate.scrollTo(0, scope._index * scope.itemHeight);
        }
      };
    }
  ])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('landingpage', {
        url: "/landingpage",
        templateUrl: "landingpage.html"
    })
    .state('signin', {
        cache: false,
        url: "/signin",
        templateUrl: "signin.html"
    })
	
	    .state('taxi', {
        cache: false,
        url: "/taxi",
        templateUrl: "taxi.html"
    })
    .state('taxifree', {
        cache: false,
        url: "/taxifree",
        templateUrl: "taxifree.html"
    })
	
	.state('bookpage', {
        cache: false,
        url: "/bookpage",
        templateUrl: "bookpage.html"
    })
       .state('choosedate', {
        cache: false,
        url: "/choosedate",
        templateUrl: "choosedate.html"
    })
	 .state('taxiinfo', {
        cache: false,
        url: "/taxiinfo",
        templateUrl: "taxiinfo.html"
    })
        .state('addcard', {
        cache: false,
        url: "/addcard",
        templateUrl: "addcard.html"
    })
	
	.state('addcardmenu', {
        cache: false,
        url: "/addcardmenu",
        templateUrl: "addcardmenu.html"
    })
	.state('scheduled', {
        cache: false,
        url: "/scheduled",
        templateUrl: "scheduled.html"
    })
	
	
	.state('driverscheduled', {
        cache: false,
        url: "/driverscheduled",
        templateUrl: "driverscheduled.html"
    })
	
	.state('support', {
        cache: false,
        url: "/support",
        templateUrl: "support.html"
    })
	
		   .state('notify', {
        cache: false,
        url: "/notify",
        templateUrl: "notification.html"
    })
	
			   .state('changepwd', {
        cache: false,
        url: "/changepwd",
        templateUrl: "changepwd.html"
    })
	
	
			   .state('driverhistory', {
        cache: false,
        url: "/driverhistory",
        templateUrl: "driverhistory.html"
    })
				   .state('forgotpwd', {
        cache: false,
        url: "/forgotpwd",
        templateUrl: "forgotpassword.html"
    })
	
	
				   .state('driverrechistory', {
        cache: false,
        url: "/driverrechistory",
        templateUrl: "driverrechistory.html"
    })
		   .state('recordhistory', {
        cache: false,
        url: "/recordhistory",
        templateUrl: "rechistory.html"
    })
	
	.state('recordscheduled', {
        cache: false,
        url: "/recordscheduled",
        templateUrl: "recscheduled.html"
    })
    
    .state('contact', {
        cache: false,
        url: "/contact",
        templateUrl: "contact.html"
    })
	
	    .state('userinfo', {
        cache: false,
        url: "/userinfo",
        templateUrl: "userinfo.html"
    })
    
    
        .state('topup', {
        cache: false,
        url: "/topup",
        templateUrl: "topup.html"
    })
    
    .state('bookstatus', {
        cache: false,
        url: "/bookstatus",
        templateUrl: "bookstatus.html"
    })
    
    .state('history', {
        cache: false,
        url: "/history",
        templateUrl: "history.html"
    })
	
	.state('street', {
        cache: false,
        url: "/street",
        templateUrl: "street.html"
    })
    
    .state('driversignup', {
        cache: false,
        url: "/driversignup",
        templateUrl: "driversignup.html"
    })
    
        .state('admin', {
        cache: false,
        url: "/admin",
        templateUrl: "admin.html"
    })
    .state('drivervehicledetails', {
        cache: false,
        url: "/drivervehicledetails",
        templateUrl: "drivervehicledetails.html"
    })
       .state('availabletrips', {
        cache: false,
        url: "/availabletrips",
        templateUrl: "availabletrips.html"
    })
	
	       .state('availabletripstaxi', {
        cache: false,
        url: "/availabletripstaxi",
        templateUrl: "availabletripstaxi.html"
    })
    .state('passengerhistory', {
        cache: false,
        url: "/passengerhistory",
        templateUrl: "passengerhistory.html"
    })
     .state('travelprogress', {
        cache: false,
        url: "/travelprogress",
        templateUrl: "travelprogress.html"
    })
    .state('map', {
		   cache: false,
            url: '/map',
            templateUrl: 'map.html',
            controller: 'MapCtrl'
        })
    
    .state('signout', {
        url: "/signin",
        templateUrl: "signin.html"
    })
    .state('forgotpassword', {
        cache: false,
        url: '/forgotpassword',
        templateUrl: 'forgotpwd.html',
    })
    .state('signup', {
        cache: false,
        url: "/signup",
        templateUrl: "signup.html"
    })
    .state('riderdest', {
        cache: false,
        url: "/riderdest",
        templateUrl: "riderdest.html"
		//controller: 'riderDest'
    })
    .state('riderdestfree', {
        cache: false,
        url: "/riderdestfree",
        templateUrl: "riderdestfree.html"
		//controller: 'riderDest'
    })
    .state('jobseeker-profile', {
        cache: false,
        url: "/jobseeker/profile",
        templateUrl: "jobseeker-profile.html"
    })
    .state('jobseeker-application', {
        cache: false,
        url: '/appliedjobs',
        templateUrl: 'jobseeker-application.html',
    })
    .state('riderDriverListCtrl', {
        cache: false,
        url: "/driver/detail",
        templateUrl: "employer-openjobdetailapplication.html"
    })
    .state('test', {
        cache: false,
        url: "test",
        templateUrl: "test.html"
    })
    .state('employer-openjobdetailapplication', {
        cache: false,
        url: "/employer/openjob/detail/application",
        templateUrl: "employer-openjobdetailapplication.html"
    })
    .state('employer-openjobdetailshortlisted', {
        cache: false,
        url: "/employer/openjob/detail/shortlisted",
        templateUrl: "employer-openjobdetailshortlisted.html"
    })
    .state('jobseeker-savedjobs', {
        cache: false,
        url: '/savedjobs',
        templateUrl: 'jobseeker-savedjobs.html',
    })
    .state('jobseeker-impressed', {
        cache: false,
        url: '/impressed',
        templateUrl: 'jobseeker-impressed.html',
    })
    .state('jobseeker-shortlist', {
        cache: false,
        url: '/shortlistjobs',
        templateUrl: 'jobseeker-shortlist.html',
    })
    .state('search', {
        cache: false,
        url: '/search',
        templateUrl: 'search.html',
    })
    .state('searchResults', {
        cache: false,
        url: '/searchresult',
        templateUrl: 'searchResult.html'
    })
    .state('searchData-company', {
        cache: false,
        url: '/searchresult/company',
        templateUrl: 'searchData-company.html'
    })
    .state('jobseeker-apply', {
        cache: false,
        url: '/apply',
        templateUrl: 'jobseeker-apply.html',
    })
    .state('jobseeker-applyvideo', {
        cache: false,
        url: '/apply/video',
        templateUrl: 'jobseeker-applyvideo.html',
    })
    .state('jobseeker-fillup', {
        cache: false,
        url: "/jobseeker/fillup",
        templateUrl: "jobseeker-fillup.html"
    })
    .state('jobseeker-video', {
        cache: false,
        url: "/jobseeker/video",
        templateUrl: "jobseeker-video.html"
    })
    .state('jobseeker-preview', {
        cache: false,
        url: "/jobseeker/preview",
        templateUrl: "jobseeker-preview.html"
    })
    .state('jobseeker-viewemp', {
        cache: false,
        url: '/viewemp',
        templateUrl: 'jobseeker-vivewemp.html',
    })
    .state('employer-main', {
        cache: false,
        url: "/employer/main",
        templateUrl: "employer-main.html"
    })
    .state('employer-stats', {
        cache: false,
        url: "/employer/stats",
        templateUrl: "employer-stats.html"
    })
    .state('jobseeker-buycredit', {
        cache: false,
        url: "/employer/buy/credits",
        templateUrl: "employer-buycredit.html"
    })
    .state('employer-openjob', {
        cache: false,
        url: "/employer/openjob",
        templateUrl: "employer-openjob.html"
    })
    .state('employer-profile', {
        cache: false,
        url: "/employer/profile",
        templateUrl: "employer-profile.html"
    })
    .state('employer-postjob', {
        cache: false,
        url: "/employer/postjob",
        templateUrl: "employer-postjob.html"
    })
    .state('employer-postjobvideo', {
        cache: false,
        url: "/employer/postjob/video",
        templateUrl: "employer-postjobvideo.html"
    })
    .state('employer-postjobpreview', {
        cache: false,
        url: "/employer/postjob/preview",
        templateUrl: "employer-postjobpreview.html"
    })
    .state('employer-fillup', {
        cache: false,
        url: "/employer/fillup",
        templateUrl: "employer-fillup.html"
    })
    .state('employer-video', {
        cache: false,
        url: "/employer/video",
        templateUrl: "employer-video.html"
    })
    .state('employer-preview', {
        cache: false,
        url: "/employer/preview",
        templateUrl: "employer-preview.html"
    })
    .state('employer-openjobdetailviewjobseeker', {
        cache: false,
        url: "/employer/openjob/detail/view/jobseeker",
        templateUrl: "employer-openjobdetailviewjobseeker.html"
    })
    .state('employer-openjobdetailshortlistedjobseeker', {
        cache: false,
        url: "/employer/openjob/detail/shortlisted/jobseeker",
        templateUrl: "employer-openjobdetailshortlistedjobseeker.html"
    })
    .state('employer-openjobdetailapplicationjobseeker', {
        cache: false,
        url: "/employer/openjob/detail/shortlisted/application",
        templateUrl: "employer-openjobdetailapplicationjobseeker.html"
    })
    .state('thankyou', {
        cache: false,
        url: "/thankyou",
        templateUrl: "thankyou.html"
    })
    .state('jobseeker-viewSavedJobs', {
        cache: false,
        url: "viewSavedJobs",
        templateUrl: "view-savedjobs.html"
    })
//Norazman Hafiz added//
    .state('promotion', {
        cache : false,
        url : "/promotion",
        templateUrl : "promotion.html",
        controller: 'PromotionCtrl'    
    })

    .state('showvideo', {
        cache : false,
        url : "/showvideo/:videoId",
        templateUrl : "showvideo.html",
        controller: 'VideoCtrl'    
    });


///////////////////////
   $urlRouterProvider.otherwise('/landingpage');
})

.factory('Video', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var videos = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/mike.png',
    video:'img/1.mp4'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/mike.png',
    video:'img/1.mp4'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/mike.png',
    video:'img/1.mp4'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/mike.png',
    video:'img/1.mp4'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png',
    video:'img/1.mp4'
  }];

  return {
    all: function() {
      return videos;
    },
    remove: function(video) {
      videos.splice(videos.indexOf(video), 1);
    },
    get: function(videoId) {
      for (var i = 0; i < videos.length; i++) {
        if (videos[i].id === parseInt(videoId)) {
          return videos[i];
        }
      }
      return null;
    }
  };
});

