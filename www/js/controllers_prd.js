var start = angular.module('starter.controllers', [])


start.controller('timerCtrl', function ($scope, $state, $timeout) {
    $timeout(callAtTimeout, 3000);
	
    function callAtTimeout() {
		//alert("test");
		$state.go('signin');
		//var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
		//alert(loginInfo.user_id);
		//if(!loginInfo.user_id){
			//$state.go('signin');
		//}
		//else{
			//$state.go('map');
		//}
        
    }

});

start.controller('MyCtrl', function ($scope) {
	
    $scope.locationChanged = function (location) {
		
   //alert(location);
    $scope.pickupfrom = location;
   
 };

});

start.controller('riderDest', function ($scope, $state, $http, $ionicPopup,$cordovaGeolocation,$cordovaDatePicker){ 
       //$scope.phoneNumbr = /^\+?\d{2}[- ]?\d{4}?\d{4}$/;
	   $scope.phoneNumbr =/^\d{8}$/;
           var picktype = document.getElementById("cartype").value;
           //alert(picktype);
		   /* $scope.showJB = false;
		   $scope.showSG = false; */
           if(picktype == 'minibus')
           {
			  
              $scope.showJB = true;
			 $scope.showSG = false;
           }
           else
           {
              $scope.showSG = true; 
              $scope.showJB = false;
           }
		   
		    		   
	$scope.showC = false;   
    var options = {
    date: new Date(),
    mode: 'date', // or 'time'
    minDate: new Date() - 10000,
    allowOldDates: true,
    allowFutureDates: false,
    doneButtonLabel: 'DONE',
    doneButtonColor: '#F2F3F4',
    cancelButtonLabel: 'CANCEL',
    cancelButtonColor: '#000000'
  };
// document.addEventListener("deviceready", function () {
//
//    $cordovaDatePicker.show(options).then(function(date){
//        alert(date);
//    });
//
//  }, false);
    //localStorage.clear();
    //$ionicHistory.clearHistory();
    var picktype = document.getElementById("cartype").value;
    //alert(picktype);
    
    $scope.showSelectValue = function(mySelect) {
        var pkgtype = mySelect;
        //alert(pkgtype);
        localStorage.setItem("packagetype", JSON.stringify(mySelect));
        //alert("beforetate");
        $http.get('http://www.primefield.co/gocar/rate.php?picktype=' + picktype + '&pkgtype=' + pkgtype ).
          success(function (data) {
                     //alert("rate");          
                $scope.fare=data.price;
                //alert($scope.fare);
               

           }).
           error(function (data) {
            //alert("error");
           }); 
    //alert(mySelect);
	if(pkgtype =="pkg08")
			   {
				  $scope.showJbdesc = true;
                  
			   }
			   else{
				   $scope.showJbdesc = false; 
             
			   }
	
};



   $scope.rider ={}; var latlng1="";
    $scope.rider.from=localStorage.getItem("des");
     var options = {timeout: 10000, enableHighAccuracy: true};
     $cordovaGeolocation.getCurrentPosition(options).then(function(position){
     var lat= localStorage.getItem("lat"); 
     var lng=localStorage.getItem("lng");
     var latLng = new google.maps.LatLng(lat, lng);
    var geocoder = new google.maps.Geocoder();
   /* var directionsService = new google.maps.DirectionsService();
    var directionsRequest = {
  origin: from,
  destination: to,
  travelMode: google.maps.DirectionsTravelMode.DRIVING,
  unitSystem: google.maps.UnitSystem.METRIC
};*/
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 //alert(document.getElementById("target").value);
  //alert(document.getElementById("cartype").value);
    $scope.map2 = new google.maps.Map(document.getElementById("map2"), mapOptions);
    
    google.maps.event.addListenerOnce($scope.map2, 'idle', function(){
 
  var marker1 = new google.maps.Marker({
      map: $scope.map2,
      animation: google.maps.Animation.DROP,
      position: latLng,
     // icon : "http://www.familycarrentals.com.au/images/icon-small.png"
  });      
   var infoWindow = new google.maps.InfoWindow({
      content: "click destination!"
  });
    
  google.maps.event.addListener(marker1, 'click', function () {
      infoWindow.open($scope.map2, marker1);
  });
  $scope.selectCode = function () { //alert("jj ");
    geocoder = new google.maps.Geocoder();
    var address = $scope.rider.dest;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        latLng1 = results[0].geometry.location;
  // alert("Latitude: "+results[0].geometry.location.lat());
      //alert("Longitude: "+results[0].geometry.location.lng());
      
      var marker2 = new google.maps.Marker({
      map: $scope.map2,
      animation: google.maps.Animation.DROP,
      position: latLng1,
      draggable:true
     // icon : "http://www.familycarrentals.com.au/images/icon-small.png"
  });   
      var lat1=results[0].geometry.location.lat();
      var lng1=results[0].geometry.location.lng();
      } 

      else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
   // alert("jkk");
    // var latLng1 = new google.maps.LatLng(lat1, lng1);
   
   google.maps.event.addListener(marker2, 'click', function () {
      infoWindow.open($scope.map2, marker2);
     // google.maps.event.addDomListener(window, 'load', initialize);
  });
  }
  
  
   /*   var address = "paya lebar";
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  }

      
      directionsService.route(
          directionsRequest,
          function(response, status)
          {
            if (status == google.maps.DirectionsStatus.OK)
            {
              new google.maps.DirectionsRenderer({
                map: mapObject,
                directions: response
              });
            }
            else
            {alert ("no load") ;}
          }
        );*/
  //}
   //$scope.phoneno = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
  $scope.rider.from = '';
    //$scope.email = '';
    $scope.rider.dest = '';
    $scope.name = '';
    $scope.phoneno = '';
    $scope.fare = '';
	$scope.noofpass = '';
    $scope.mySelectpymt ='';
    //$scope.picktype = "Standard";
    $scope.myBtn = true;
  $scope.pickNow =function(riderfrom,riderdest,phoneno,name,fare,mySelectpymt,noofpass) {
      //alert("picknow");
       var pack = JSON.parse(localStorage.getItem('packagetype'));
      
      var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
      //alert(loginInfo.user_id);
      //alert("klreledede");
      // $ionicLoading.show({
        //     template: 'Obtaining drivers list...'
          //   });
          //$state.go('signin');
          //alert("bookstart");
      
      $scope.rider.from = riderfrom;
       $scope.rider.dest = riderdest;
        $scope.phoneno = phoneno;
        $scope.name = name;
        $scope.fare = fare;
		$scope.noofpass = noofpass;
        $scope.mySelectpymt = mySelectpymt;
        
        //alert("pymt:"+ mySelectpymt);
        //alert($scope.fare);
        //$scope.picktype = picktype;
        //alert($scope.picktype);
		if($scope.rider.from!='' && $scope.rider.dest!='' && $scope.phoneno!='' && $scope.name!='' && $scope.noofpass!='' && $scope.fare!='' && $scope.mySelectpymt!='')
		{
			
        $scope.myBtn = false;
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var uid = "";
        for (var i = 0; i < 8; i++)
            uid += possible.charAt(Math.floor(Math.random() * possible.length));
            var riderfrom = $scope.rider.from;
            var riderdest =  $scope.rider.dest;
            var phoneno = $scope.phoneno;
            var name = $scope.name;
            var fare = $scope.fare;
			var noofpass = $scope.noofpass;
            var picktype = document.getElementById("cartype").value;
            var pymttype = $scope.mySelectpymt;
                 //alert(pack);
            $http.get('http://www.primefield.co/gocar/book.php?id=' + loginInfo.user_id + '&riderfrom=' + riderfrom + '&riderdest=' + riderdest + '&phoneno=' + phoneno + '&picktype=' + picktype + '&name=' + name + '&pack=' + pack + '&noofpass=' + noofpass + '&fare=' + fare + '&pymttype=' + pymttype).
            success(function (data) {
                //alert("testbook");
                //$state.go('signin');
                //
                //$ionicLoading.hide();
//                if(type == 'Employer'){
                    if(pymttype == 'cash'){
                    var msg = 'You have successfully Booked cab.Searching your Driver !!';
//                }else{
//                    var msg = 'You have successfully signed up as a Job Seeker. Thank you for using First Impression.';
//                }
                //if (data.status === "0") {

                    var alertPopup = $ionicPopup.alert({
                        title: 'Book Status',
                        template: msg
                        
                    });
                    //$state.go('bookstatus');
                    alertPopup.then(function(res) {
                        
                        $state.go('bookstatus');
                    });
                }
                else{
                    $state.go('addcard');
                }
                //}
//
//                if (data.status === "1") {
//                    var alertPopup = $ionicPopup.alert({
//                        title: 'Sign Up',
//                        template: 'This email id is already in use. Please enter another email id.'
//                    });
//                    alertPopup.then(function(res) {
//                        //$state.go('signin');
//                    });
//                }
//
//                if (data.status === "2") {
//                    var alertPopup = $ionicPopup.alert({
//                        title: 'Sign Up',
//                        template: 'Password is wrong.'
//                    });
//                    alertPopup.then(function(res) {
//                        //$state.go('signin');
//                    });
//                }
            }).
            error(function (data) {

            });
  }
  else
  {
	  var alertPopup = $ionicPopup.alert({
                        title: 'Field Error',
                        template: 'All Fields are Mandatory!'
                    });
  }
      
  }
  $scope.PickLater = function(riderfrom,riderdest,phoneno,name,fare,mySelectpymt,noofpass) {
            
       var pack = JSON.parse(localStorage.getItem('packagetype'));
      
      var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
      
      $scope.rider.from = riderfrom;
       $scope.rider.dest = riderdest;
        $scope.phoneno = phoneno;
        $scope.name = name;
        $scope.fare = fare;
		$scope.noofpass = noofpass;
        $scope.mySelectpymt = mySelectpymt;
        
        if($scope.rider.from!='' && $scope.rider.dest!='' && $scope.phoneno!='' && $scope.name!='' && $scope.noofpass!='' && $scope.fare!='' && $scope.mySelectpymt!='')
		{
        $scope.myBtn = false;
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var uid = "";
        for (var i = 0; i < 8; i++)
            uid += possible.charAt(Math.floor(Math.random() * possible.length));
            var riderfrom = $scope.rider.from;
            var riderdest =  $scope.rider.dest;
            var phoneno = $scope.phoneno;
            var name = $scope.name;
            var fare = $scope.fare;
			var noofpass = $scope.noofpass;
            var picktype = document.getElementById("cartype").value;
            var pymttype = $scope.mySelectpymt;
                 //alert(pack);
            $http.get('http://www.primefield.co/gocar/book.php?id=' + loginInfo.user_id + '&riderfrom=' + riderfrom + '&riderdest=' + riderdest + '&phoneno=' + phoneno + '&picktype=' + picktype + '&name=' + name + '&pack=' + pack + '&noofpass=' + noofpass + '&fare=' + fare + '&pymttype=' + pymttype).
            success(function (data) {
                $state.go('choosedate');
//                    if(pymttype == 'cash'){
//                    var msg = 'You have successfully Booked cab.Searching your Driver !!';
//
//
//                    var alertPopup = $ionicPopup.alert({
//                        title: 'Book Status',
//                        template: msg
//                        
//                    });
//                    //$state.go('bookstatus');
//                    alertPopup.then(function(res) {
//                        
//                        $state.go('bookstatus');
//                    });
//                }
//                else{
//                    $state.go('addcard');
//                }
                
            }).
            error(function (data) {

            });
  }
  else
  {
	  var alertPopup = $ionicPopup.alert({
                        title: 'Field Error',
                        template: 'All Fields are Mandatory!'
                    });
  }
     
  }
});
    
    
 
     });
});

//Contact
start.controller('contactCtrl', function ($scope, $http, $state, $ionicPopup, $ionicLoading,$filter) {
    //alert("test");
    var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
    var user_id = loginInfo.user_id;
    
    //alert(user_id);
   
        
        

});

//Top-Up
start.controller('topupCtrl', function ($scope, $http, $state, $ionicPopup, $ionicLoading,$filter) {
    //alert("test");
    var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
    var user_id = loginInfo.user_id;
    $scope.driverid=user_id;
	 /* $scope.currbal = document.getElementById("currbal").value;
    alert($scope.currbal); */
	
	$http.get('http://www.primefield.co/gocar/checkfee.php?id=' + loginInfo.user_id).
            success(function (data) {
                console.log(data);
        $scope.bal=data;
		$scope.currbal=data;
        $scope.$apply();
                     
            }).
            error(function (data) {

            });
   
        
        

});

//History
start.controller('historyCtrl', function ($scope, $http, $state, $ionicPopup, $ionicLoading,$filter) {
    //alert("test");
    var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
    var user_id = loginInfo.user_id;
    
    //alert(user_id);
   $.ajax({
            method: "POST",
            dataType: "json",
            data: {id: user_id},
            url: "http://www.primefield.co/gocar/history.php"
        }).then(function (data) {
			if(data != '')
			{
				 console.log(data);
            //alert("selected");
            $scope.dbValue = data;
            $scope.$apply();
            //alert($scope.dbValue);
			}
			else
			{
				var msg = 'No Records Found.';
				var alertPopup = $ionicPopup.alert({
                        title: 'History',
                        template: msg
                        
                    });
			}
           
            
        });
        
        

});

//Choose Date
start.controller('choosedateCtrl', function ($scope, $http, $state, $ionicPopup, $ionicLoading,$filter) {
    //alert("test");
    var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
    var user_id = loginInfo.user_id;
    var pymtmethod = document.getElementById("pymtmethod").value;
    $scope.confirm = function() {
        
        
        traveldate = document.getElementById("traveldate").value;
		if(traveldate!='')
		{
			//alert(traveldate);	
       $http.get('http://www.primefield.co/gocar/picklater.php?id=' + loginInfo.user_id + '&traveldate=' + traveldate  ).
            success(function (data) {
               //alert("success");
                //$state.go('bookstatus');
                 if(pymtmethod == 'cash'){
                    var msg = 'You have successfully Booked cab.Searching your Driver !!';
//                }else{
//                    var msg = 'You have successfully signed up as a Job Seeker. Thank you for using First Impression.';
//                }
                //if (data.status === "0") {

                    var alertPopup = $ionicPopup.alert({
                        title: 'Book Status',
                        template: msg
                        
                    });
                    //$state.go('bookstatus');
                    alertPopup.then(function(res) {
                        
                        $state.go('bookstatus');
                    });
                }
                else{
                    $state.go('addcard');
                }
                
            }).
            error(function (data) {

            }); 
	}
	else
	{
		var alertPopup = $ionicPopup.alert({
                        title: 'Field Error',
                        template: 'Date is Mandatory!'
                    });
	}
      
    };
    
        
        

});

//Add Credit/Debit Card Details
start.controller('addcardCtrl', function ($scope, $state, $http, $ionicPopup,$cordovaGeolocation,$cordovaDatePicker){ 
     var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
    $.ajax({
            method: "POST",
            dataType: "json",
            data: {custid: loginInfo.user_id},
            url: "http://www.primefield.co/gocar/checkcard.php"
        }).then(function (data) {
            //alert("selected");
            console.log(data);
            $scope.dbValue = data;
            $scope.$apply();
            //alert($scope.dbValue);
            
        });
        $scope.proceed =function() {
            $state.go('bookstatus');
        };
    $scope.go =function(cardnumber,expirationdate,cvv,firstname,lastname,email) {
      
      
      var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
      
      
            
      $scope.cardnumber= cardnumber;
       $scope.expirationdate = expirationdate;
        $scope.cvv = cvv;
		$scope.firstname = firstname;
		$scope.lastname = lastname;
		$scope.email = email;
        if($scope.cardnumber!=undefined && $scope.expirationdate!=undefined && $scope.cvv!=undefined && $scope.firstname!=undefined &&  $scope.lastname!=undefined && $scope.email!=undefined)
			{
				//alert($scope.cardnumber);
        $scope.myBtn = false;
        
            var cardnumber = $scope.cardnumber;
            var expirationdate =  $scope.expirationdate;
            var cvv = $scope.cvv;
			var firstname = $scope.firstname;
			var lastname= $scope.lastname;
			var email=$scope.email;
            
            $http.get('http://www.primefield.co/gocar/addcard.php?id=' + loginInfo.user_id + '&cardnumber=' + cardnumber + '&expirationdate=' + expirationdate + '&cvv=' + cvv + '&firstname=' + firstname + '&lastname=' + lastname + '&email=' + email ).
            success(function (data) {
               $state.go('bookstatus');
                
            }).
            error(function (data) {

            });
			}
			else
			{
				   var alertPopup = $ionicPopup.alert({
                        title: 'Field Error',
                        template: 'All Fields are Mandatory!'
                    });
			}
  }
});

//Book a cab
start.controller('bookCtrl', function ($scope, $http, $state, $ionicPopup, $ionicLoading) {
    alert("bookctl");
    //$scope.wrong = false;
    $scope.rider.from = '';
    //$scope.email = '';
    $scope.rider.dest = '';
    $scope.phoneno = '';
    $scope.pickType = 'Standard';
    $scope.myBtn = true;
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

//    $scope.chkEmail = function(email){
//        
//        if(!regex.test(email)){
//            $scope.wrong = true;
//            $scope.myBtn = true;
//        }else{
//           $scope.wrong = false;
//           $scope.myBtn = false;
//        }    
//    }

    $scope.pickNow = function(type,email,pwd1,pwd2){
        
        
        
        
        $scope.accType = type;
        $scope.email = email;
        $scope.pwd = pwd1;
        $scope.cpwd = pwd2;
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var uid = "";
        for (var i = 0; i < 8; i++)
            uid += possible.charAt(Math.floor(Math.random() * possible.length));
        if(regex.test($scope.email) && $scope.accType != '' && $scope.pwd != '' && $scope.cpwd != ''){
            $scope.myBtn = false;
            var uemail = $scope.email;
            var upass =  $scope.pwd;
            var ucpass = $scope.cpwd;
            var type = $scope.accType;
            // $ionicLoading.show({
            //   template: 'Loading...'
            // });
            $http.get('http://www.primefield.co/gocar/signup.php?id=' + uid + '&email=' + uemail + '&password=' + upass + '&cpassword=' + ucpass + '&type=' + type).
            success(function (data) {
                //
                //$ionicLoading.hide();
                if(type == 'Employer'){
                    var msg = 'You have successfully signed up as an Employer. Thank you for uisng First Impression.';
                }else{
                    var msg = 'You have successfully signed up as a Job Seeker. Thank you for using First Impression.';
                }
                if (data.status === "0") {

                    var alertPopup = $ionicPopup.alert({
                        title: 'Sign Up',
                        template: msg
                    });
                    alertPopup.then(function(res) {
                        $state.go('signin');
                    });
                }

                if (data.status === "1") {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Sign Up',
                        template: 'This email id is already in use. Please enter another email id.'
                    });
                    alertPopup.then(function(res) {
                        //$state.go('signin');
                    });
                }

                if (data.status === "2") {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Sign Up',
                        template: 'Password is wrong.'
                    });
                    alertPopup.then(function(res) {
                        //$state.go('signin');
                    });
                }
            }).
            error(function (data) {

            });
        }
    }

});


start.controller('forgotpwd', function ($scope, $state, $http, $ionicPopup){
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    $scope.wrong = false;
    $scope.myBtn = true;
    $scope.email = '';
    $scope.myFun = function(){
        if(!regex.test($scope.email)){
           $scope.wrong = true;
           $scope.myBtn = true;
        }else{
            $scope.myBtn = false;
            $scope.wrong = false;
        }
    }
    $scope.answer = function() {
        if($scope.email == undefined && !regex.test(e) || $scope.email == ''){
            $scope.wrong = true;
        }
        else{
            $.ajax({
                method: "post",
                dataType: "json",
                data: {email: $scope.email},
                url: "http://www.primefield.co/jobsearch/forgot.php"
            }).then(function (data) {
                //console.log(data);
                confirmPopup = $ionicPopup.confirm({
                    title: 'Success',
                    template: 'Password reset link sent your registerd email Successfully'
                });
                confirmPopup.then(function(res) {
                    if(res) {
                        window.history.back()
                    } else {
                        window.history.back()
                    }
                });
            })    
        }
    };
})

//SignUp
start.controller('signupCtrl', function ($scope, $http, $state, $ionicPopup, $ionicLoading) {
    $scope.wrong = false;
    $scope.accType = 'passenger';
    //$scope.email = '';
    $scope.pwd = '';
    $scope.cpwd = '';
    $scope.myBtn = true;
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    $scope.chkEmail = function(email){
        
        if(!regex.test(email)){
            $scope.wrong = true;
            $scope.myBtn = true;
        }else{
           $scope.wrong = false;
           $scope.myBtn = false;
        }    
    }

    $scope.go = function(type,email,pwd1,pwd2){
        
        
        
        
        $scope.accType = type;
        $scope.email = email;
        $scope.pwd = pwd1;
        $scope.cpwd = pwd2;
        //var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var possible = "0123456789";
        var uid = "";
        for (var i = 0; i < 8; i++)
            uid += possible.charAt(Math.floor(Math.random() * possible.length));
        if(regex.test($scope.email) && $scope.accType != '' && $scope.pwd != '' && $scope.cpwd != ''){
            $scope.myBtn = false;
            var uemail = $scope.email;
            var upass =  $scope.pwd;
            var ucpass = $scope.cpwd;
            var type = $scope.accType;
            // $ionicLoading.show({
            //   template: 'Loading...'
            // });
            $http.get('http://www.primefield.co/gocar/signup.php?id=' + uid + '&email=' + uemail + '&password=' + upass + '&cpassword=' + ucpass + '&type=' + type).
            success(function (data) {
                //alert("success");
                //alert(type);
                //
                //$ionicLoading.hide();
                if(type == 'passenger'){
                    var msg = 'You have successfully signed up as an Passenger. Thank you for uisng True JOSH.';
                }else{
                    var msg = 'You have successfully signed up as a Driver. Thank you for using True JOSH.';
                }
                if (data.status === "0") {
                    //alert(data.status);

                    var alertPopup = $ionicPopup.alert({
                        title: 'Sign Up',
                        template: msg
                    });
                    alertPopup.then(function(res) {
                        $state.go('signin');
                    });
                }

                if (data.status === "1") {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Sign Up',
                        template: 'This email id is already in use. Please enter another email id.'
                    });
                    alertPopup.then(function(res) {
                        //$state.go('signin');
                    });
                }

                if (data.status === "2") {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Sign Up',
                        template: 'Password is wrong.'
                    });
                    alertPopup.then(function(res) {
                        //$state.go('signin');
                    });
                }
            }).
            error(function (data) {

            });
        }
    }

});

start.controller('signinCtrl', function ($scope, $state, $http, $ionicPopup, $ionicHistory) {
    localStorage.clear();
    $ionicHistory.clearHistory();
//    $state.go('map');
    $scope.signin = function (x,y) {
        var type;
        // var uemail = $('#email').val();
        // var upassword = $('#password').val();

		$.ajax({
            method: "POST",
            dataType: "json",
            data: {email: x, password: y},
            url: "http://www.primefield.co/gocar/signin.php"
        }).then(function (data) {
            localStorage.setItem("logininfo", JSON.stringify(data));
            localStorage.setItem("userID", data.user_id);
            type = data.type;
            //alert(type);
			if (data.status === "0") {
            if (type === "driver"){
                
                        $state.go('availabletrips');
                    }
                    else if (type === "admin")
                        $state.go('admin');
                    else { 
                        
                     $state.go('map');
                 }
			}
				 else if (data.status === "1") {
                $ionicPopup.alert({
                 title: 'Sign In',
                 template: 'Wrong Email or Password.'
               });
            }
				 
//            if (data.status === "0") {
//                type = data.type;
//                if (data.status_level === "0") {
//                    if (type === "JobSeeker")
//                        $state.go('jobseeker-fillup');
//                    else if (type === "Employer")
//                        $state.go('employer-fillup');
//                }
//                else if (data.status_level === "1") {
//                    if (type === "JobSeeker")
//                        $state.go('test');
//                    else if (type === "Employer")
                     //$state.go('map');
//                }
//
//            }
//
//            else if (data.status === "1") {
//                $ionicPopup.alert({
//                 title: 'Sign In',
//                 template: 'Wrong Email or Password.'
//               });
//            }

        });

    };
});

//Driver SignUp
start.controller('driversignupCtrl', function ($scope, $http, $state, $ionicPopup, $ionicLoading) {
    $scope.wrong = false;
    $scope.accType = 'driver';
    //$scope.email = '';
    $scope.pwd = '';
    $scope.cpwd = '';
    $scope.myBtn = true;
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    $scope.chkEmail = function(email){
        
        if(!regex.test(email)){
            $scope.wrong = true;
            $scope.myBtn = true;
        }else{
           $scope.wrong = false;
           $scope.myBtn = false;
        }    
    }

    $scope.go = function(type,email,pwd1,pwd2){
        
        
       
       
        
        $scope.accType = type;
        $scope.email = email;
        $scope.pwd = pwd1;
        $scope.cpwd = pwd2;
        //var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var possible = "0123456789";
        var uid = "";
        for (var i = 0; i < 8; i++)
            uid += possible.charAt(Math.floor(Math.random() * possible.length));
        if(regex.test($scope.email) && $scope.accType != '' && $scope.pwd != '' && $scope.cpwd != ''){
            $scope.myBtn = false;
            var uemail = $scope.email;
            var upass =  $scope.pwd;
            var ucpass = $scope.cpwd;
            var type = $scope.accType;
            // $ionicLoading.show({
            //   template: 'Loading...'
            // });
            $http.get('http://www.primefield.co/gocar/driversignup.php?id=' + uid + '&email=' + uemail + '&password=' + upass + '&cpassword=' + ucpass + '&type=' + type).
            success(function (data) {
                localStorage.setItem("logininfo", JSON.stringify(data));
                //localStorage.setItem("userID", data.id);
                
                               
                //
                //$ionicLoading.hide();
                if(type == 'driver'){
                    var msg = 'You have successfully signed up as an Driver. Thank you for uisng True JOSH.';
                }else{
                    var msg = 'You have successfully signed up as a Passenger. Thank you for using True JOSH.';
                }
                if (data.status === "0") {

                    var alertPopup = $ionicPopup.alert({
                        title: 'Sign Up',
                        template: msg
                    });
                    alertPopup.then(function(res) {
                        $state.go('drivervehicledetails');
                    });
                }

                if (data.status === "1") {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Sign Up',
                        template: 'This email id is already in use. Please enter another email id.'
                    });
                    alertPopup.then(function(res) {
                        //$state.go('signin');
                    });
                }

                if (data.status === "2") {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Sign Up',
                        template: 'Password is wrong.'
                    });
                    alertPopup.then(function(res) {
                        //$state.go('signin');
                    });
                }
            }).
            error(function (data) {

            });
        }
    }

});

start.controller('bookstatusCtrl', function ($scope, $http, $state, $ionicPopup, $ionicLoading,$interval,$cordovaVibration) {
	var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
	
	
   
  /*  $scope.vibrateNotify = function() {
     $cordovaVibration.vibrate(1000);
}; */

	//alert(loginInfo.user_id);
	var interval = $interval(callAtInterval, 2000);
	
	function callAtInterval() {
    //alert("hi");
	$http.get('http://www.primefield.co/gocar/arrived.php?id=' + loginInfo.user_id + '&flag=' + 'passarr').
            success(function (data) {
			//alert(data.bookstatus);
			if(data.arrivalstatus == 'arrived')
			{
				//alert("if");
				var alertPopup = $ionicPopup.alert({
                        title: 'Arrived',
                        template: 'Driver has Arrived.'
                    });
					$scope.headername='In Transit';
					myStopFunction();
			}
            }).
            error(function (data) {

            });
	
	
}

		function myStopFunction()
		{
		$interval.cancel(interval);
		} 
		
		//Driver Alert for Passenger
		
			var acceptcallAtInterval = $interval(acceptcallAtInterval, 2000);
	$scope.showA = true;
	function acceptcallAtInterval() {
    //alert("hi");
	var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
                //alert(loginInfo.id);;
                //alert(loginInfo.user_id);
              $.ajax({
            method: "POST",
            dataType: "json",
            data: {userid: loginInfo.user_id},
            url: "http://www.primefield.co/gocar/getdriver.php"
        }).then(function (data) {
            //alert(data);
            //$scope.showA = true;
            /* if(data ==''){
                var alertPopup = $ionicPopup.alert({
                        title: 'Search Result',
                        template: 'Searching Inprogress !!!'
                    });
                    $scope.showA = true;
					myStopFunction1();
            } */
            //else{
                //alert("data");
				if(data !='')
				{
					var alertPopup = $ionicPopup.alert({
                        title: 'Trip Accepted',
                        template: 'Got Driver for You !!!'
                    });
                console.log(data);
                $scope.dbValue = data;
                $scope.$apply();
                $scope.headername='Driver on the Way';
                $scope.showA = false;
                $scope.showB = true;
				myStopFunction1();
				}
            //}
            
            //alert($scope.dbValue.name);
            
        });
        
	
	
}

		function myStopFunction1()
		{
		$interval.cancel(acceptcallAtInterval);
		} 
    $scope.showA = true;
    $scope.headername = 'Searching Driver';
    
      $scope.showB = false;
      //$scope.showB = false;
    $scope.getdriver = function(){
        
        var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
                //alert(loginInfo.id);;
                //alert(loginInfo.user_id);
              $.ajax({
            method: "POST",
            dataType: "json",
            data: {userid: loginInfo.user_id},
            url: "http://www.primefield.co/gocar/getdriver.php"
        }).then(function (data) {
            //alert(data);
            //$scope.showA = true;
            if(data == ""){
                var alertPopup = $ionicPopup.alert({
                        title: 'Search Result',
                        template: 'Searching Inprogress !!!'
                    });
                    $scope.showA = true;
            }
            else{
                //alert("data");
                console.log(data);
                $scope.dbValue = data;
                $scope.$apply();
                $scope.headername='Driver on the Way';
                $scope.showA = false;
                $scope.showB = true;
            }
            
            //alert($scope.dbValue.name);
            
        });
        
        
        
    }
    
    $scope.pay = function(id){
        //alert("showc");
        $scope.showB = true;
        $scope.showC = true;
        var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
                //alert(loginInfo.id);;
                //alert(loginInfo.user_id);
                var driverid = id;
                //alert(driverid);
              $.ajax({
            method: "POST",
            dataType: "json",
            data: {userid: loginInfo.user_id,driverid: driverid},
            url: "http://www.primefield.co/gocar/getpaidamount.php"
        }).then(function (data) {
            //alert("data");
            $scope.dbValue1 = data;
            var index = data.map(function (data) {
                $scope.amount = data.paidamount;
                alert($scope.amount);
                //var hour1=data.hour;
                
                //localStorage.setItem("totalhour", JSON.stringify(hour1));
            //return data.hour;
        });
            
            //$scope.showC = true;
                //alert("data");
                //$scope.dbValue = data;
        
        });
        
        
        
    }
    
    $scope.card = function(){
$http.get('http://www.primefield.co/gocar/test.php').
            success(function (data) {
alert("data");
            }).
            error(function (data) {

            });
      
        
        
        
    }
    
    $scope.paybycard = function(){
        alert("showc");
        
                //var paidamount = paidamount;
                //alert(paidamount);
              $.ajax({
            method: "POST",
            dataType: "json",
            //data: {paidamount: paidamount},
            url: "http://www.primefield.co/gocar/single_transactions.php"
        }).then(function (data) {
            alert("data");
            $state.go('signin');
            
            //$scope.showA = true;
                //alert("data");
                //$scope.dbValue = data;
        
        }).
            error(function (data) {
alert("error");
            });
        
        
        
    };

});

//Driver Vehicle Details
start.controller('drivervehicledetailsCtrl', function ($scope, $http, $state, $ionicPopup, $ionicLoading) {
    
    
    $scope.wrong = false;
    $scope.name = '';
     $scope.carmodel = '';
    $scope.cartype = '';
     $scope.carnumber = '';
      $scope.mobilenumber = '';
    $scope.myBtn = true;
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

//    $scope.chkEmail = function(email){
//        
//        if(!regex.test(email)){
//            $scope.wrong = true;
//            $scope.myBtn = true;
//        }else{
//           $scope.wrong = false;
//           $scope.myBtn = false;
//        }    
//    }

    $scope.go = function(name,carmodel,cartype,carnumber,mobilenumber){
        var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
                //alert(loginInfo.id);;
        $scope.name = name;
     $scope.carmodel = carmodel;
    $scope.cartype = cartype;
     $scope.carnumber = carnumber;
      $scope.mobilenumber = mobilenumber;
        
        
        
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var uid = "";
        for (var i = 0; i < 8; i++)
            uid += possible.charAt(Math.floor(Math.random() * possible.length));
        if($scope.name!='' && $scope.carmodel!='' && $scope.cartype!='' && $scope.carnumber!='' && $scope.mobilenumber!='')
		{
            $scope.myBtn = false;
            var uname = $scope.name;
            var ucarmodel =  $scope.carmodel;
            var ucartype = $scope.cartype;
            var ucarnumber = $scope.carnumber;
            var umobilenumber = $scope.mobilenumber;
            // $ionicLoading.show({
            //   template: 'Loading...'
            // });
            //alert(loginInfo.user_id);
            $http.get('http://www.primefield.co/gocar/drivervehicledetails.php?id=' + loginInfo.id + '&name=' + uname + '&carmodel=' + ucarmodel + '&cartype=' + ucartype + '&carnumber=' + ucarnumber + '&mobilenumber=' + umobilenumber).
            success(function (data) {
                
                //
                //$ionicLoading.hide();
//                if(type == 'Driver'){
                    var msg = 'Vehicle Details Saved Successfully !!';
//                }else{
//                    var msg = 'You have successfully signed up as a Job Seeker. Thank you for using First Impression.';
//                }
//                if (data.status === "0") {
//
                    var alertPopup = $ionicPopup.alert({
                        title: 'Vehicle Detail',
                        template: msg
                    });
                    alertPopup.then(function(res) {
                        //$state.go('signin');
                        $state.go('contact');
                    });
//                }

//                if (data.status === "1") {
//                    var alertPopup = $ionicPopup.alert({
//                        title: 'Sign Up',
//                        template: 'This email id is already in use. Please enter another email id.'
//                    });
//                    alertPopup.then(function(res) {
//                        //$state.go('signin');
//                    });
//                }

//                if (data.status === "2") {
//                    var alertPopup = $ionicPopup.alert({
//                        title: 'Sign Up',
//                        template: 'Password is wrong.'
//                    });
//                    alertPopup.then(function(res) {
//                        //$state.go('signin');
//                    });
//                }
            }).
            error(function (data) {

            });
			}
	else{
		var alertPopup = $ionicPopup.alert({
                        title: 'Field Error',
                        template: 'All Fields are Mandatory!'
                    });
	}

    }

});

//Available Trips for Driver
start.controller('availabletripsCtrl', function ($scope, $http, $state, $ionicPopup, $ionicLoading, $interval,$window,$cordovaVibration) {
    
    var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
    var user_id = loginInfo.user_id;
       var interval = '';
$http.get('http://www.primefield.co/gocar/checkfee.php?id=' + loginInfo.user_id).
            success(function (data) {
                console.log(data);
        $scope.bal=data;
		$scope.currbal=data;
        $scope.$apply();
                     
            }).
            error(function (data) {

            });
		
//    $scope.reloadPage = function(){window.location.reload();};
//    $window.onload = function(e) {
//  alert("New Request");
//  window.location.reload(20000);
//};
    //$interval(callAtInterval, 2000);
   $.ajax({
            method: "POST",
            dataType: "json",
            data: {id: user_id},
            url: "http://www.primefield.co/gocar/availablepasstrip.php"
        }).then(function (data) {
            //alert("test");
            if(data ==="error")
            {
               var alertPopup = $ionicPopup.alert({
                       title: 'Job Error',
                        template: 'Please Top-Up to get AvailableTrips.'
                    }); 
                  alertPopup.then(function(res) {
                        //$state.go('signin');
                        $state.go('topup');
                    }); 
            }
            else
            {
            console.log(data);
            //window.location.reload(true);
            $scope.dbValue = data;
            $scope.$apply();
            }
            //window.location.reload(true);
            //alert($scope.dbValue);
            
        });
        
        //Interval
            $http.get('http://www.primefield.co/gocar/checkfee.php?id=' + loginInfo.user_id).
            success(function (data) {
				
                 //alert(data);
                 
                 //alert(parseInt(data));
                 if(data<5)
                 {
          /*            var alertPopup = $ionicPopup.alert({
                       title: 'Error',
                        template: 'Please Top-Up to get AvailableTrips.'
                    }); 
                  alertPopup.then(function(res) {
                        //$state.go('signin');
                        $state.go('topup');
                       
                    });  */
                 }
                 else
                 {
					  
                     //alert("else");
                 interval= $interval(callAtInterval, 600000);
                     //alert("test");
                     
                 }
                     
            }).
            error(function (data) {

            });
    
    function callAtInterval() {
    //alert("hi");
	$http.get('http://www.primefield.co/gocar/alerttrip.php?id=' + loginInfo.user_id).
            success(function (data) {
                
                     
			if(data !='')
			{
			//myStopFunction();
			//alert(data);
			 console.log(data);
			 $scope.dbValue = data;
                        $scope.$apply();
			$cordovaVibration.vibrate(1000);
            }
                  
            }).
            error(function (data) {

            });
	
	
}
//Alert for less than 10$
var topupinterval ='';
topupinterval = $interval(topupcallAtInterval, 600000);
	
	function topupcallAtInterval() {
    //alert("hi");
	$http.get('http://www.primefield.co/gocar/checkfee.php?id=' + loginInfo.user_id).
            success(function (data) {
			//alert(data.bookstatus);

			if(data==10)
			{
				//alert("if");
				var alertPopup = $ionicPopup.alert({
                        title: 'Top-UP',
                        template: 'You can avail only 2 more trips. Please Top-UP to avail more trips. '
                    });
					//$scope.headername='In Transit';
					//myStopFunction();
			}
            }).
            error(function (data) {

            });
	
	
}

		function myStopFunction()
		{
		$interval.cancel(topupinterval);
		} 
        
        //window.location.reload(true);
        $scope.accept =function(id) {
            var customerid= id
            var driverid = user_id
            //alert(id);
            //alert(driverid);
$http.get('http://www.primefield.co/gocar/checktrip.php?customerid=' + customerid + '&driverid=' + driverid ).
          success(function (data) {
                //alert(data.bookstatus);                    
                if(data.bookstatus =='new'){
                  $http.get('http://www.primefield.co/gocar/updatetrip.php?customerid=' + customerid + '&driverid=' + driverid ).
          success(function (data) {
                //alert(data.bookstatus);                    
                $state.go('travelprogress');

           }).
           error(function (data) {
            //alert("error");
           });  
                }
                else{
                    alert("already booked");
//                   var alertPopup = $ionicPopup.alert({
//                        title: 'Trip',
//                        template: 'Already Booked.'
//                    });
                    window.location.reload(true);
                }

           }).
           error(function (data) {
            alert("error");
           });

//            $http.get('http://www.primefield.co/gocar/updatetrip.php?customerid=' + customerid + '&driverid=' + driverid ).
//          success(function (data) {
//                //alert(data.bookstatus);                    
//                $state.go('travelprogress');
//
//           }).
//           error(function (data) {
//            //alert("error");
//           });
            
        };
        
        

//        $scope.tblshow = false;
//			$scope.changeValues = function (){
//				$scope.tblshow = true;
//				$http.get("http://www.primefield.co/gocar/availablepasstrip.php").success(
//				function(response) {
//					$scope.dbValue = response;
//                                        alert($scope.dbValue);
//				});
//			};

});
function callAtInterval() {
    //alert("interval");
    console.log("Interval occurred");
}
//Travel Progress
start.controller('travelprogressCtrl', function ($scope, $http, $state, $ionicPopup, $ionicLoading,$filter) {
    
    var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
    var user_id = loginInfo.user_id;
    $scope.myBtnStart = false;
    $scope.myBtnCash = true;
	$scope.myBtnCard = true;
	$scope.myBtnArrived = false;
   $.ajax({
            method: "POST",
            dataType: "json",
            data: {driverid: user_id,hourflag: "N"},
            url: "http://www.primefield.co/gocar/travelprogress.php"
        }).then(function (data) {
            console.log(data);
            //alert("selected");
            $scope.dbValue = data;
            $scope.$apply();
            //alert($scope.dbValue);
            
        });
		
		$scope.arrived = function(id){
            //alert(id);
            var customerid= id;
			
			
        $http.get('http://www.primefield.co/gocar/arrived.php?customerid=' + customerid + '&driverid=' + user_id + '&flag=' + 'arr').
          success(function (data) {
			  $scope.myBtnArrived = true;
			  //alert("data");
			  
                //alert("success");;                    
                //$state.go('travelprogress');

           }).
           error(function (data) {
            //alert("error");
           });
       };
	   
        $scope.start = function(id,pymtmethod){
            //alert(id);
            var customerid= id;
			var pymtmethod = pymtmethod;
			
        $http.get('http://www.primefield.co/gocar/starttimeupdate.php?customerid=' + customerid + '&driverid=' + user_id ).
          success(function (data) {
			  $scope.myBtnStart = true;
			  //alert(pymtmethod);
			  if(pymtmethod == 'cash'){
				  $scope.myBtnCash = false;
			  }
			  else{
				  $scope.myBtnCard = false;
			  }
                //alert("success");;                    
                //$state.go('travelprogress');

           }).
           error(function (data) {
            //alert("error");
           });
       };
        
        $scope.gettotalfare = function(id,fare,acceptedtime,packagetype,totalhour){
            //alert(packagetype);
            $.ajax({
            method: "POST",
            dataType: "json",
            data: {driverid: user_id,hourflag: "Y"},
            url: "http://www.primefield.co/gocar/travelprogress.php"
        }).then(function (data) {
            //alert("selected");
            console.log(data);
            var index = data.map(function (data) {
                $scope.totalhour = data.hour;
                $scope.$apply();
                var hour1=data.hour;
                //alert(hour1);
                localStorage.setItem("totalhour", JSON.stringify(hour1));
            //return data.hour;
        });
        
            //$scope.hourvalue = data;
            //alert(data.get(0));
            
        });
        
            var customerid= id;
	    var packagetype = packagetype;
            var pkgfare =fare;
            //alert(pkgfare);
            $scope.passid=id;
            $scope.driverid=user_id;
            var totalhour = JSON.parse(localStorage.getItem('totalhour'));
    
            //alert(totalhour.hour);
            var acceptedtime = "21";
            //alert(acceptedtime);
            var date = new Date();
           
            var dateformat = $filter('date')(date, 'HH:mm');
			var hourlydateformat = $filter('date')(date, 'HH');
            //var today = $filter('date')(new Date(),'yyyy-MM-dd H:mm:ss Z');
           var midnighttime = "23:30";
		   var midend = "07:00";
              //CityTour & JB Calculation
             /*  if(packagetype =="pkg06")
              {
                  //alert(totalhour);
                 if(totalhour <=8){
                      var pkgfare =fare;
                var midnight = 0;
                $scope.midnight = 0;
                $scope.pkgfare = pkgfare;
                //alert(pkgfare);
                $scope.totalfare = parseInt(pkgfare);  
                      
                  }
                  else{
                      var pkgfare =fare;
                      //alert("else");
                      alert(totalhour);
                      
                      $scope.pkgfare = pkgfare;
                      $scope.midnight = 0;
                      var extrahr = parseInt(totalhour) - 8;
                      //alert(extrahr);
                      $scope.totalfare = parseInt(pkgfare)+(parseInt(extrahr)*40); 
                  } 
              } */
            //alert(parseInt(hourlydateformat)-parseInt(acceptedtime));
            if(dateformat > midnighttime || dateformat < midend ){
				if(packagetype =="pkg04"){
					//alert("pkg04");
					$scope.pkgfare = parseInt(pkgfare)*parseInt(totalhour);
					//alert(parseInt(pkgfare)*4);
                                        //alert(totalhour);
					//var pkgfare =fare;
                var midnight = 15;
                $scope.midnight = midnight;
                $scope.pkgfare = parseInt(pkgfare)*parseInt(totalhour);
                $scope.totalfare = parseInt(midnight)+parseInt($scope.pkgfare);
				}
                                else if(packagetype =="pkg05")
                                {
                                   if(totalhour <=8){
                      var pkgfare =fare;
                var midnight = 0;
                $scope.midnight = 0;
                $scope.pkgfare = pkgfare;
                //alert(pkgfare);
                $scope.totalfare = parseInt(pkgfare);  
                      
                  }
                  else{
                      var pkgfare =fare;
                      //alert("else");
                      //alert(totalhour);
                      
                      $scope.pkgfare = pkgfare;
                      $scope.midnight = 0;
                      var extrahr = parseInt(totalhour) - 8;
                      //alert(extrahr);
                      $scope.totalfare = parseInt(pkgfare)+(parseInt(extrahr)*40); 
                  } 
                                }
								else if(packagetype == "pkg06")
								{
									
										var pkgfare =fare;
										var midnight = 0;
										$scope.midnight = 0;
										$scope.pkgfare = pkgfare;
										//alert(pkgfare);
										$scope.totalfare = parseInt(pkgfare); 
								}
								else if(packagetype == "pkg07")
								{
									
										var pkgfare =fare;
										var midnight = 0;
										$scope.midnight = 0;
										$scope.pkgfare = pkgfare;
										//alert(pkgfare);
										$scope.totalfare = parseInt(pkgfare); 
								}
								else if(packagetype=="pkg08")
								{
									
										  var pkgfare =fare;
										  //alert("else");
										  //alert(totalhour);
										  
										  $scope.pkgfare = pkgfare;
										  $scope.midnight = 0;
										  var temptotalfare = parseInt(pkgfare) * parseInt(totalhour);
										  $scope.totalfare = temptotalfare;
										  //$scope.$apply();										  
									 
								}
                                
				else{
				//alert("midnight");
                var pkgfare =fare;
                var midnight = 15;
                $scope.midnight = midnight;
                $scope.pkgfare = pkgfare;
                $scope.totalfare = parseInt(midnight)+parseInt(pkgfare);	
				}
				
            }
            else{
                if(packagetype =="pkg04"){
                    if(totalhour >=4){
                    //alert("pkg4");
                 $scope.pkgfare = parseInt(pkgfare)*parseInt(totalhour);
					
                var midnight = 0;
                $scope.midnight = midnight;
                //$scope.pkgfare = parseInt(pkgfare)*parseInt(totalhour);
                $scope.totalfare = parseInt(midnight)+parseInt($scope.pkgfare);
            }else{
                //alert("less");
                $scope.pkgfare = parseInt(pkgfare)*4;
					
                var midnight = 0;
                $scope.midnight = midnight;
                //$scope.pkgfare = parseInt(pkgfare)*parseInt(totalhour);
                $scope.totalfare = parseInt(midnight)+parseInt($scope.pkgfare);
            }
                }
                else if(packagetype =="pkg05")
                {
                    if(totalhour <=8){
                      var pkgfare =fare;
                var midnight = 0;
                $scope.midnight = 0;
                $scope.pkgfare = pkgfare;
                //alert(pkgfare);
                $scope.totalfare = parseInt(pkgfare);  
                      
                  }
				  
                  else{
                      //alert("eelse");
                      //alert(totalhour);
                      var pkgfare =fare;
                      $scope.pkgfare = pkgfare;
                      $scope.midnight = 0;
                      var extrahr = parseInt(totalhour) - 8;
                      //alert(extrahr);
                      $scope.totalfare = parseInt(pkgfare)+(parseInt(extrahr)*40); 
                  }
                }
				else if(packagetype=="pkg08")
				  {
					var pkgfare =fare;
					//alert("else09");
					//alert(totalhour);
						  
					$scope.pkgfare = pkgfare;
					$scope.midnight = 0;
					 
					$scope.totalfare = parseInt(pkgfare) * parseInt(totalhour);
				  }
                else{
					
                var pkgfare =fare;
                var midnight = 0;
                $scope.midnight = midnight;
                $scope.pkgfare = pkgfare;
                $scope.totalfare = parseInt(midnight)+parseInt(pkgfare);  
                }
                
            }
            
        var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
                //alert(loginInfo.id);;
                //alert(loginInfo.user_id);
      
         
        
        
    }
        
        $scope.dropoff =function(id) {
            var customerid= id;
            var driverid = user_id;
            var totalfare = $scope.totalfare;
             
            
            //alert(id);
            //alert(driverid);


            $http.get('http://www.primefield.co/gocar/dropoff.php?customerid=' + customerid + '&driverid=' + driverid + '&totalfare=' + totalfare  ).
          success(function (data) {
                                   
                $state.go('availabletrips');

           }).
           error(function (data) {
            alert("error");
           });
            
        };
        
        $scope.reject =function(id) {
            var customerid= id;
            var driverid = user_id
            alert(id);
            $http.get('http://www.primefield.co/gocar/driverreject.php?customerid=' + customerid + '&driverid=' + driverid ).
          success(function (data) {
                                   
                $state.go('availabletrips');

           }).
           error(function (data) {
            alert("error");
           });
            $state.go('availabletrips');
        };

//        $scope.tblshow = false;
//			$scope.changeValues = function (){
//				$scope.tblshow = true;
//				$http.get("http://www.primefield.co/gocar/availablepasstrip.php").success(
//				function(response) {
//					$scope.dbValue = response;
//                                        alert($scope.dbValue);
//				});
//			};

});

start.controller('admindetailsCtrl', function ($scope, $state, $http, $ionicPopup, $ionicHistory) {
    //localStorage.clear();
    //$ionicHistory.clearHistory();
    $scope.downloadreport = function(){
            $http.get('http://www.primefield.co/gocar/getadmintripdetails.php' ).
            success(function (data) {
                 var alertPopup = $ionicPopup.alert({
                       title: 'Report',
                        template: 'Report Downloaded Successfully & Mail Sent to Admin.'
                    });
            }).
            error(function (data) {

            });

    };
   $scope.vehicleno = '';
    $scope.topupamt = '';
    $scope.myBtn = false;
       $scope.topup = function(vehicleno,topupamt){
           $scope.vehicleno = vehicleno;
           $scope.topupamt = topupamt;
           //alert($scope.vehicleno);
           //alert($scope.topupamt);
            $http.get('http://www.primefield.co/gocar/topup.php?vehicleno=' + vehicleno + '&topupamt=' + topupamt ).
            success(function (data) {
                if(data=="error")
                {
                 var alertPopup = $ionicPopup.alert({
                       title: 'Top-Up',
                        template: 'Please Enter Registered Vehicle Number.'
                    }); 
                    document.getElementById("vehicleno").value='';
                    document.getElementById("topupamt").value='';
                }
                else
                {
                 var alertPopup = $ionicPopup.alert({
                       title: 'Top-Up',
                        template: 'Top-Up Done Successfully.'
                    });
                    document.getElementById("vehicleno").value='';
                    document.getElementById("topupamt").value='';
                }
            }).
            error(function (data) {

            });

    };
});

//// admin 
//start.controller('admin', function ($scope, $state, $http, myService) {
//      
//    $.ajax({
//            method: "POST",
//            dataType: "json",
//            url: "http://www.primefield.co/gocar/getadmintripdetails.php"
//        }).then(function (data) {
//            alert("selected");
//            //$scope.dbValue = data;
//            //alert($scope.dbValue);
//            
//        });
//});
//jobseeker-main
start.controller('JMainCtrl', function ($scope, $state, $http, myService) {
    //
    //$scope.company = myService.employer_company;
    var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
    $scope.isOnline = loginInfo.isOnline;
    $scope.changeState = function(){
        $state.go('jobseeker-profile')
    }
    angular.element(document).ready(function () {
        if(loginInfo.isOnline){
            $('#isOnline').prop('checked',true)
        }else{
            $('#isOnline').prop('checked',false)
        }

    
        var personalinfo = JSON.parse(localStorage.getItem('personalinfo'));
        if(personalinfo == null){
            $.ajax({
                method: "POST", 
                dataType: "json",
                data: {userid: loginInfo.user_id},
                url: "http://www.primefield.co/jobsearch/viewemployeeprofile.php"
            }).then(function (data) {
                $scope.personalinfo = data.personal;
                localStorage.setItem("dName",$scope.personalinfo.firstname);
                angular.element(document).ready(function () {
                    $('#main-name').text(localStorage.getItem('dName'));
                });
            });
        }else{
            localStorage.setItem("dName",personalinfo.firstname);
            angular.element(document).ready(function () {
                $('#main-name').text(localStorage.getItem('dName'));
            });
        }
    });    

    
    //$scope.fName = localStorage.getItem('dName');
    $scope.ChangeStatus = function(x){
        
        $.ajax({
            method: "POST", 
            dataType: "json",
            data: {userid: loginInfo.user_id,isOnline: x},
            url: "http://www.primefield.co/jobsearch/changeonline.php"
        }).then(function (data) {

        })
    }
    

    var user_id = loginInfo.user_id;
    $scope.sText = 'offline';
    $scope.Pstatus = false;
    $scope.changeStatus = function(s){
        if(s){
          $scope.sText = 'Live';  
        }else{
          $scope.sText = 'offline';  
        }
    }
    var path = 'http://www.primefield.co/jobsearch/pictureurl/' + localStorage.getItem("userID") + '.jpg?timestamp='+new Date().getTime();
    var Vpath = 'http://www.primefield.co/jobsearch/videos/' + localStorage.getItem("userID") + '.jpg?timestamp='+new Date().getTime();

    angular.element(document).ready(function () {
        $('#main-img').attr('src','');    
        $('#main-img').attr('src',  path);
        $('#main-video').attr('src',  Vpath);
        $('#main-video').attr('onclick', 'openFile(\'https://s3-ap-southeast-1.amazonaws.com/video1.123/' + localStorage.getItem("userID") + '.3gp\')');
    });
    // $.ajax({
    //     method: "POST",
    //     dataType: "json",
    //     data: {userid: user_id},
    //     url: "http://www.primefield.co/jobsearch/viewemployerprofile.php"
    // }).then(function (data) {
    //     //
    //     myService.employer_company = data.company;
    // });

});


//Jobseeker-profile
start.controller('JSProfileCtrl', function ($scope, $state, $http, myService, $ionicModal, $ionicPopup, $ionicLoading) {

    $ionicLoading.show({
      template: '<p>Loading...</p>'
    });

    $ionicModal.fromTemplateUrl('templates/modal1.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal1 = modal;
    });

    $ionicModal.fromTemplateUrl('templates/modal2.html', {
        id: 1,
        scope: $scope
    }).then(function(modal) {
        $scope.modal2 = modal;
    });
    var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
    var user_id = loginInfo.user_id;

    $scope.name1 = 'Personal Information';
    $scope.name2 = 'Education';
    $scope.name3 = 'Experience';
    $scope.name4 = "Social Links";
    $scope.name5 = "Please share your passion";
    $scope.months = ["01","02","03","04","05","06","07","08","09","10","11","12"];

    var dateYear = new Date().getFullYear();
    $scope.years = [];
    for( i = 1960; i <= dateYear; i++ ) {
        $scope.years.push(""+i);
    }
    $scope.radiobutton = {};
    //$scope.shownGroup2 = false;
    $scope.toggleGroup = function(x) {
        if($scope.openGroup != x){
            $scope.openGroup = x;
        }
        else{
            $scope.openGroup = 0;
        } 
    };

    $scope.limitWord = function(x){
        var words = x.match(/\S+/g).length;
        console.log(words)
        if (words > 200) {

        }
    }

   var path = 'http://www.primefield.co/jobsearch/pictureurl/' + localStorage.getItem("userID") + '.jpg?timestamp='+new Date().getTime();
    var Vpath = 'http://www.primefield.co/jobsearch/videos/' + localStorage.getItem("userID") + '.jpg?timestamp='+new Date().getTime(); 
    angular.element(document).ready(function () {
        $('#p-img').attr('src',  path);
        $('#p-video').attr('src',  Vpath);
        $('#p-video').attr('onclick', 'openFile(\'https://s3-ap-southeast-1.amazonaws.com/video1.123/' + localStorage.getItem("userID") + '.3gp\')');
    });

    angular.element(document).ready(function () {
    $.ajax({
        method: "POST",
        dataType: "json",
        data: {userid: user_id},
        url: "http://www.primefield.co/jobsearch/viewemployeeprofile.php"
    }).then(function (data) {
        //
        $scope.personalinfo = data.personal;
        $scope.radiobutton.group1 = $scope.personalinfo.gender;
        
        $scope.dob = new Date($scope.personalinfo.dob);

        $scope.educationinfo = data.education;
        $scope.educationCount = data.education.length;
        var eCount = $scope.educationinfo.length;
        $scope.eShow = eCount;
        $('#eCount').text(eCount);
        

        for (var i = 0; i < $scope.educationinfo.length; i++) {
            $scope.startyear = new Date($scope.educationinfo[i].startyear);
            $scope.endyear = new Date($scope.educationinfo[i].endyear);
        }

        var experienceDetails = data.experience;
        for( i = 0 ; i < experienceDetails.length; i++ ) {
            var timestart = experienceDetails[i].timestart.split('-');
            var timeend = experienceDetails[i].timeend.split('-');
            experienceDetails[i].timestartMonth = timestart[1];
            experienceDetails[i].timestartYear = timestart[0];
            experienceDetails[i].timeendMonth = timeend[1];
            experienceDetails[i].timeendYear = timeend[0];
        }
        
        if(experienceDetails.length<3) {
            $('#experianceModalShow').css("display","block");
            $scope.disCountExp = experienceDetails.length;
        } else {
            $('#experianceModalShow').css("display","none");
        }
        if(data.education.length<3) {
            $('#schoolModalShow').css("display","block");
            $scope.disCount = data.education.length;
        } else {
            $('#schoolModalShow').css("display","none");
        }
        $scope.experienceinfo = experienceDetails;
        var epCount = $scope.experienceinfo.length;
        $scope.epShow = epCount;
        $('#epCount').text(epCount)

        for (var i = 0; i < $scope.experienceinfo.length; i++) {
            $scope.timestart = new Date($scope.experienceinfo[i].timestart);
            $scope.timeend = new Date($scope.experienceinfo[i].timeend);
            
        }

        $scope.link = data.social;

        $scope.misc = data.miscellaneous;
        $scope.$apply();
        $ionicLoading.hide();
    });
})
    var nselected;
    $scope.onTypeChange = function () {
        
        nselected = $scope.radiobutton.group1;
    };

    $scope.test = function(){
        
        var country = $('#personalinfo-country').val();
        if(country=='Afghanistan'){
            $('#personalinfo-phonecountry').val('+93');
        }else if(country == "Aland Islands"){
            $('#personalinfo-phonecountry').val('+358');
        }
        else if(country == "Albania"){
            //$('#personalinfo-phonecountry').val('+355');
            $('#personalinfo-phonecountry').val('+355')
        }
        else if(country == "Algeria"){
            $('#personalinfo-phonecountry').val('+213');
        }
        else if(country == "American Samoa"){
            $('#personalinfo-phonecountry').val('+1-684');
        }
        else if(country == "Andorra"){
            $('#personalinfo-phonecountry').val('+376');
        }
        else if(country == "Angola"){
            $('#personalinfo-phonecountry').val('+244');
        }
        else if(country == "Anguilla"){
            $('#personalinfo-phonecountry').val('+1-264');
        }
        else if(country == "Antarctica"){
            $('#personalinfo-phonecountry').val('+672');
        }
        else if(country == "Antigua And Barbuda"){
            $('#personalinfo-phonecountry').val('+1-268');
        }
        else if(country == "Argentina"){
            $('#personalinfo-phonecountry').val('+54');
        }
        else if(country == "Armenia"){
            $('#personalinfo-phonecountry').val('+374');
        }
        else if(country == "Aruba"){
            $('#personalinfo-phonecountry').val('+297');
        }
        else if(country == "Australia"){
            $('#personalinfo-phonecountry').val('+61');
        }
        else if(country == "Austria"){
            $('#personalinfo-phonecountry').val('+43');
        }
        else if(country == "Azerbaijan"){
            $('#personalinfo-phonecountry').val('+994');
        }
        else if(country == "Bahamas"){
            $('#personalinfo-phonecountry').val('+1-242');
        }
        else if(country == "Bahrain"){
            $('#personalinfo-phonecountry').val('+973');
        }
        else if(country == "Bangladesh"){
            $('#personalinfo-phonecountry').val('+880');
        }
        else if(country == "Barbados"){
            $('#personalinfo-phonecountry').val('+1-246');
        }
        else if(country == "Belarus"){
            $('#personalinfo-phonecountry').val('+375');
        }
        else if(country == "Belgium"){
            $('#personalinfo-phonecountry').val('+32');
        }
        else if(country == "Belize"){
            $('#personalinfo-phonecountry').val('+501');
        }
        else if(country == "Benin"){
            $('#personalinfo-phonecountry').val('+229');
        }
        else if(country == "Bermuda"){
            $('#personalinfo-phonecountry').val('+1-441');
        }
        else if(country == "Bhutan"){
            $('#personalinfo-phonecountry').val('+975');
        }
        else if(country == "Bolivia,Plurinational State of"){
            $('#personalinfo-phonecountry').val('+591');
        }
        else if(country == "Bonaire,Sint Eustatius and Saba"){
            $('#personalinfo-phonecountry').val('+599');
        }
        else if(country == "Bosnia and Herzegovina"){
            $('#personalinfo-phonecountry').val('+387');
        }
        else if(country == "Botswana"){
            $('#personalinfo-phonecountry').val('+267');
        }
        else if(country == "Bouvet Island"){
            $('#personalinfo-phonecountry').val('+NONE');
        }
        else if(country == "Brazil"){
            $('#personalinfo-phonecountry').val('+55');
        }
        else if(country == "British Indian Ocean Territory"){
            $('#personalinfo-phonecountry').val('+246');
        }
        else if(country == "Brunei Darussalam"){
            $('#personalinfo-phonecountry').val('+673');
        }
        else if(country == "Bulgaria"){
            $('#personalinfo-phonecountry').val('+359');
        }
        else if(country == "Burkina Faso"){
            $('#personalinfo-phonecountry').val('+226');
        }
        else if(country == "Burundi"){
            $('#personalinfo-phonecountry').val('+257');
        }
        else if(country == "Cambodia"){
            $('#personalinfo-phonecountry').val('+855');
        }
        else if(country == "Cameroon"){
            $('#personalinfo-phonecountry').val('+237');
        }
        else if(country == "Canada"){
            $('#personalinfo-phonecountry').val('+1');
        }
        else if(country == "Cape Verde"){
            $('#personalinfo-phonecountry').val('+238');
        }
        else if(country == "Cayman Islands"){
            $('#personalinfo-phonecountry').val('+1-345');
        }
        else if(country == "Central African Republic"){
            $('#personalinfo-phonecountry').val('+236');
        }
        else if(country == "Chad"){
            $('#personalinfo-phonecountry').val('+235');
        }
        else if(country == "Chile"){
            $('#personalinfo-phonecountry').val('+56');
        }
        else if(country == "China"){
            $('#personalinfo-phonecountry').val('+86');
        }
        else if(country == "Christmas Island"){
            $('#personalinfo-phonecountry').val('+61');
        }
        else if(country == "Cocos (Keeling) Islands"){
            $('#personalinfo-phonecountry').val('+682');
        }
        else if(country == "Colombia"){
            $('#personalinfo-phonecountry').val('+57');
        }
        else if(country == "Comoros"){
            $('#personalinfo-phonecountry').val('+269');
        }
        else if(country == "Congo"){
            $('#personalinfo-phonecountry').val('+242');
        }
        else if(country == "Congo,the Democratic Republic of the"){
            $('#personalinfo-phonecountry').val('+243');
        }
        else if(country == "Cook Islands"){
            $('#personalinfo-phonecountry').val('+682');
        }
        else if(country == "Costa Rica"){
            $('#personalinfo-phonecountry').val('+506');
        }
        else if(country == "Cote d'Ivoire"){
            $('#personalinfo-phonecountry').val('+225');
        }
        else if(country == "Croatia"){
            $('#personalinfo-phonecountry').val('+385');
        }
        else if(country == "Cuba"){
            $('#personalinfo-phonecountry').val('+53');
        }
        else if(country == "Cyprus"){
            $('#personalinfo-phonecountry').val('+357');
        }
        else if(country == "Czech Republic"){
            $('#personalinfo-phonecountry').val('+420');
        }
        else if(country == "Denmark"){
            $('#personalinfo-phonecountry').val('+45');
        }
        else if(country == "Djibouti"){
            $('#personalinfo-phonecountry').val('+253');
        }
        else if(country == "Dominica"){
            $('#personalinfo-phonecountry').val('+1-767');
        }
        else if(country == "Dominican Republic"){
            $('#personalinfo-phonecountry').val('+1-809');
        }
        else if(country == "Ecuador"){
            $('#personalinfo-phonecountry').val('+593');
        }
        else if(country == "Egypt"){
            $('#personalinfo-phonecountry').val('+20');
        }
        else if(country == "El Salvador"){
            $('#personalinfo-phonecountry').val('+503');
        }
        else if(country == "Equatorial Guinea"){
            $('#personalinfo-phonecountry').val('+240');
        }
        else if(country == "Eritrea"){
            $('#personalinfo-phonecountry').val('+291');
        }
        else if(country == "Estonia"){
            $('#personalinfo-phonecountry').val('+372');
        }
        else if(country == "Ethiopia"){
            $('#personalinfo-phonecountry').val('+251');
        }
        else if(country == "Falkland Islands (Malvinas)"){
            $('#personalinfo-phonecountry').val('+500');
        }
        else if(country == "Faroe Islands"){
            $('#personalinfo-phonecountry').val('+298');
        }
        else if(country == "Fiji"){
            $('#personalinfo-phonecountry').val('+679');
        }
        else if(country == "Finland"){
            $('#personalinfo-phonecountry').val('+358');
        }
        else if(country == "France"){
            $('#personalinfo-phonecountry').val('+33');
        }
        else if(country == "French Guiana"){
            $('#personalinfo-phonecountry').val('+594');
        }
        else if(country == "French Polynesia"){
            $('#personalinfo-phonecountry').val('+689');
        }
        else if(country == "French Southern Territories"){
            $('#personalinfo-phonecountry').val('+NONE');
        }
        else if(country == "Gabon"){
            $('#personalinfo-phonecountry').val('+241');
        }
        else if(country == "Gambia"){
            $('#personalinfo-phonecountry').val('+220');
        }
        else if(country == "Georgia"){
            $('#personalinfo-phonecountry').val('+995');
        }
        else if(country == "Germany"){
            $('#personalinfo-phonecountry').val('+49');
        }
        else if(country == "Ghana"){
            $('#personalinfo-phonecountry').val('+233');
        }
        else if(country == "Gibraltar"){
            $('#personalinfo-phonecountry').val('+350');
        }
        else if(country == "Greece"){
            $('#personalinfo-phonecountry').val('+30');
        }
        else if(country == "Greenland"){
            $('#personalinfo-phonecountry').val('+299');
        }
        else if(country == "Guatemala"){
            $('#personalinfo-phonecountry').val('+502');
        }
        else if(country == "Guernsey"){
            $('#personalinfo-phonecountry').val('+44-1481');
        }
        else if(country == "Guinea"){
            $('#personalinfo-phonecountry').val('+224');
        }
        else if(country == "Guinea-Bissau"){
            $('#personalinfo-phonecountry').val('+245');
        }
        else if(country == "Guyana"){
            $('#personalinfo-phonecountry').val('+592');
        }
        else if(country == "Haiti"){
            $('#personalinfo-phonecountry').val('+509');
        }
        else if(country == "Heard Island and McDonald Islands"){
            $('#personalinfo-phonecountry').val('+NONE');
        }
        else if(country == "Holy See (Vatican City State)"){
            $('#personalinfo-phonecountry').val('+379');
        }
        else if(country == "Honduras"){
            $('#personalinfo-phonecountry').val('+504');
        }
        else if(country == "Hong Kong"){
            $('#personalinfo-phonecountry').val('+852');
        }
        else if(country == "Hungary"){
            $('#personalinfo-phonecountry').val('+36');
        }
        else if(country == "Iceland"){
            $('#personalinfo-phonecountry').val('+354');
        }
        else if(country == "India"){
            $('#personalinfo-phonecountry').val('+91');
        }
        else if(country == "Indonesia"){
            $('#personalinfo-phonecountry').val('+62');
        }
        else if(country == "Iran,Islamic Republic of"){
            $('#personalinfo-phonecountry').val('+98');
        }
        else if(country == "Iraq"){
            $('#personalinfo-phonecountry').val('+964');
        }
        else if(country == "Ireland"){
            $('#personalinfo-phonecountry').val('+353');
        }
        else if(country == "Isle of Man"){
            $('#personalinfo-phonecountry').val('+44');
        }
        else if(country == "Israel"){
            $('#personalinfo-phonecountry').val('+972');
        }
        else if(country == "Italy"){
            $('#personalinfo-phonecountry').val('+39');
        }
        else if(country == "Jamaica"){
            $('#personalinfo-phonecountry').val('+1-876');
        }
        else if(country == "Japan"){
            $('#personalinfo-phonecountry').val('+81');
        }
        else if(country == "Jersey"){
            $('#personalinfo-phonecountry').val('+4-1534');
        }
        else if(country == "Jordan"){
            $('#personalinfo-phonecountry').val('+962');
        }
        else if(country == "Kazakhstan"){
            $('#personalinfo-phonecountry').val('+7');
        }
        else if(country == "Kenya"){
            $('#personalinfo-phonecountry').val('+254');
        }
        else if(country == "Kiribati"){
            $('#personalinfo-phonecountry').val('+686');
        }
        else if(country == "Korea,Democratic People's Republic of"){
            $('#personalinfo-phonecountry').val('+850');
        }
        else if(country == "Korea,Republic of"){
            $('#personalinfo-phonecountry').val('+82');
        }
        else if(country == "Kuwait"){
            $('#personalinfo-phonecountry').val('+965');
        }
        else if(country == "Kyrgyzstan"){
            $('#personalinfo-phonecountry').val('+996');
        }
        else if(country == "Lao People's Democratic Republic"){
            $('#personalinfo-phonecountry').val('+856');
        }
        else if(country == "Latvia"){
            $('#personalinfo-phonecountry').val('+371');
        }
        else if(country == "Lebanon"){
            $('#personalinfo-phonecountry').val('+961');
        }
        else if(country == "Lesotho"){
            $('#personalinfo-phonecountry').val('+266');
        }
        else if(country == "Liberia"){
            $('#personalinfo-phonecountry').val('+231');
        }
        else if(country == "Libya"){
            $('#personalinfo-phonecountry').val('+218');
        }
        else if(country == "Liechtenstein"){
            $('#personalinfo-phonecountry').val('+423');
        }
        else if(country == "Lithuania"){
            $('#personalinfo-phonecountry').val('+370');
        }
        else if(country == "Luxembourg"){
            $('#personalinfo-phonecountry').val('+352');
        }
        else if(country == "Macao"){
            $('#personalinfo-phonecountry').val('+853');
        }
        else if(country == "Macedonia,The Former Yugoslav Republic Of"){
            $('#personalinfo-phonecountry').val('+389');
        }
        else if(country == "Madagascar"){
            $('#personalinfo-phonecountry').val('+261');
        }
        else if(country == "Malawi"){
            $('#personalinfo-phonecountry').val('+265');
        }
        else if(country == "Malaysia"){
            $('#personalinfo-phonecountry').val('+60');
        }
        else if(country == "Maldives"){
            $('#personalinfo-phonecountry').val('+960');
        }
        else if(country == "Mali"){
            $('#personalinfo-phonecountry').val('+223');
        }
        else if(country == "Malta"){
            $('#personalinfo-phonecountry').val('+356');
        }
        else if(country == "Marshall Islands"){
            $('#personalinfo-phonecountry').val('+692');
        }
        else if(country == "Martinique"){
            $('#personalinfo-phonecountry').val('+596');
        }
        else if(country == "Mauritania"){
            $('#personalinfo-phonecountry').val('+222');
        }
        else if(country == "Mauritius"){
            $('#personalinfo-phonecountry').val('+230');
        }
        else if(country == "Mayotte"){
            $('#personalinfo-phonecountry').val('+262');
        }
        else if(country == "Mexico"){
            $('#personalinfo-phonecountry').val('+52');
        }
        else if(country == "Micronesia,Federated States of"){
            $('#personalinfo-phonecountry').val('+691');
        }
        else if(country == "Moldova,Republic of"){
            $('#personalinfo-phonecountry').val('+373');
        }
        else if(country == "Monaco"){
            $('#personalinfo-phonecountry').val('+377');
        }
        else if(country == "Mongolia"){
            $('#personalinfo-phonecountry').val('+976');
        }
        else if(country == "Montenegro"){
            $('#personalinfo-phonecountry').val('+382');
        }
        else if(country == "Montserrat"){
            $('#personalinfo-phonecountry').val('+1-664');
        }
        else if(country == "Morocco"){
            $('#personalinfo-phonecountry').val('+212');
        }
        else if(country == "Mozambique"){
            $('#personalinfo-phonecountry').val('+258');
        }
        else if(country == "Myanmar"){
            $('#personalinfo-phonecountry').val('+95');
        }
        else if(country == "Namibia"){
            $('#personalinfo-phonecountry').val('+264');
        }
        else if(country == "Nauru"){
            $('#personalinfo-phonecountry').val('+674');
        }
        else if(country == "Nepal"){
            $('#personalinfo-phonecountry').val('+977');
        }
        else if(country == "Netherlands"){
            $('#personalinfo-phonecountry').val('+31');
        }
        else if(country == "New Caledonia"){
            $('#personalinfo-phonecountry').val('+687');
        }
        else if(country == "New Zealand"){
            $('#personalinfo-phonecountry').val('+64');
        }
        else if(country == "Nicaragua"){
            $('#personalinfo-phonecountry').val('+505');
        }
        else if(country == "Niger"){
            $('#personalinfo-phonecountry').val('+227');
        }
        else if(country == "Nigeria"){
            $('#personalinfo-phonecountry').val('+234');
        }
        else if(country == "Niue"){
            $('#personalinfo-phonecountry').val('+683');
        }
        else if(country == "Norfolk Island"){
            $('#personalinfo-phonecountry').val('+672');
        }
        else if(country == "Northern Mariana Islands"){
            $('#personalinfo-phonecountry').val('+1-670');
        }
        else if(country == "Norway"){
            $('#personalinfo-phonecountry').val('+47');
        }
        else if(country == "Oman"){
            $('#personalinfo-phonecountry').val('+968');
        }
        else if(country == "Pakistan"){
            $('#personalinfo-phonecountry').val('+92');
        }
        else if(country == "Palau"){
            $('#personalinfo-phonecountry').val('+680');
        }
        else if(country == "Palestinian Territory,Occupied"){
            $('#personalinfo-phonecountry').val('+970');
        }
        else if(country == "Panama"){
            $('#personalinfo-phonecountry').val('+507');
        }
        else if(country == "Papua New Guinea"){
            $('#personalinfo-phonecountry').val('+675');
        }
        else if(country == "Paraguay"){
            $('#personalinfo-phonecountry').val('+595');
        }
        else if(country == "Peru"){
            $('#personalinfo-phonecountry').val('+51');
        }
        else if(country == "Philippines"){
            $('#personalinfo-phonecountry').val('+63');
        }
        else if(country == "Pitcairn"){
            $('#personalinfo-phonecountry').val('+64');
        }
        else if(country == "Poland"){
            $('#personalinfo-phonecountry').val('+48');
        }
        else if(country == "Portugal"){
            $('#personalinfo-phonecountry').val('+351');
        }
        else if(country == "Puerto Rico"){
            $('#personalinfo-phonecountry').val('+1-787');
        }
        else if(country == "Qatar"){
            $('#personalinfo-phonecountry').val('+974');
        }
        else if(country == "Reunion"){
            $('#personalinfo-phonecountry').val('+262');
        }
        else if(country == "Romania"){
            $('#personalinfo-phonecountry').val('+40');
        }
        else if(country == "Russian Federation"){
            $('#personalinfo-phonecountry').val('+7');
        }
        else if(country == "Rwanda"){
            $('#personalinfo-phonecountry').val('+250');
        }
        else if(country == "Saint Barthelemy"){
            $('#personalinfo-phonecountry').val('+590');
        }
        else if(country == "Saint Helena,Ascension and Tristan da Cunha"){
            $('#personalinfo-phonecountry').val('+290');
        }
        else if(country == "Saint Kitts and Nevis"){
            $('#personalinfo-phonecountry').val('+1-869');
        }
        else if(country == "Saint Lucia"){
            $('#personalinfo-phonecountry').val('+1-758');
        }
        else if(country == "Saint Martin (French Part)"){
            $('#personalinfo-phonecountry').val('+590');
        }
        else if(country == "Saint Pierre and Miquelon"){
            $('#personalinfo-phonecountry').val('+508');
        }
        else if(country == "Saint Vincent and the Grenadines"){
            $('#personalinfo-phonecountry').val('+1-784');
        }
        else if(country == "Samoa"){
            $('#personalinfo-phonecountry').val('+685');
        }
        else if(country == "San Marino"){
            $('#personalinfo-phonecountry').val('+378');
        }
        else if(country == "Sao Tome and Principe"){
            $('#personalinfo-phonecountry').val('+239');
        }
        else if(country == "Saudi Arabia"){
            $('#personalinfo-phonecountry').val('+966');
        }
        else if(country == "Senegal"){
            $('#personalinfo-phonecountry').val('+221');
        }
        else if(country == "Serbia"){
            $('#personalinfo-phonecountry').val('+381');
        }
        else if(country == "Seychelles"){
            $('#personalinfo-phonecountry').val('+248');
        }
        else if(country == "Sierra Leone"){
            $('#personalinfo-phonecountry').val('+232');
        }
        else if(country == "Singapore"){
            $('#personalinfo-phonecountry').val('+65');
        }
        else if(country == "Sint Maarten (Dutch Part)"){
            $('#personalinfo-phonecountry').val('+1-721');
        }
        else if(country == "Slovakia"){
            $('#personalinfo-phonecountry').val('+421');
        }
        else if(country == "Slovenia"){
            $('#personalinfo-phonecountry').val('+386');
        }
        else if(country == "Solomon Islands"){
            $('#personalinfo-phonecountry').val('+677');
        }
        else if(country == "Somalia"){
            $('#personalinfo-phonecountry').val('+252');
        }
        else if(country == "South Africa"){
            $('#personalinfo-phonecountry').val('+27');
        }
        else if(country == "South Georgia and the South Sandwich Islands"){
            $('#personalinfo-phonecountry').val('+500');
        }
        else if(country == "South Sudan"){
            $('#personalinfo-phonecountry').val('+211');
        }
        else if(country == "Spain"){
            $('#personalinfo-phonecountry').val('+34');
        }
        else if(country == "Sri Lanka"){
            $('#personalinfo-phonecountry').val('+94');
        }
        else if(country == "Sudan"){
            $('#personalinfo-phonecountry').val('+249');
        }
        else if(country == "Suriname"){
            $('#personalinfo-phonecountry').val('+597');
        }
        else if(country == "Svalbard and Jan Mayen"){
            $('#personalinfo-phonecountry').val('+47');
        }
        else if(country == "Swaziland"){
            $('#personalinfo-phonecountry').val('+268');
        }
        else if(country == "Sweden"){
            $('#personalinfo-phonecountry').val('+46');
        }
        else if(country == "Switzerland"){
            $('#personalinfo-phonecountry').val('+41');
        }
        else if(country == "Syrian Arab Republic"){
            $('#personalinfo-phonecountry').val('+963');
        }
        else if(country == "Taiwan,Province of China"){
            $('#personalinfo-phonecountry').val('+886');
        }
        else if(country == "Tajikistan"){
            $('#personalinfo-phonecountry').val('+992');
        }
        else if(country == "Tanzania,United Republic of"){
            $('#personalinfo-phonecountry').val('+255');
        }
        else if(country == "Thailand"){
            $('#personalinfo-phonecountry').val('+66');
        }
        else if(country == "Timor-Leste"){
            $('#personalinfo-phonecountry').val('+670');
        }
        else if(country == "Togo"){
            $('#personalinfo-phonecountry').val('+228');
        }
        else if(country == "Tokelau"){
            $('#personalinfo-phonecountry').val('+690');
        }
        else if(country == "Tonga"){
            $('#personalinfo-phonecountry').val('+676');
        }
        else if(country == "Trinidad and Tobago"){
            $('#personalinfo-phonecountry').val('+1-868');
        }
        else if(country == "Tunisia"){
            $('#personalinfo-phonecountry').val('+216');
        }
        else if(country == "Turkey"){
            $('#personalinfo-phonecountry').val('+90');
        }
        else if(country == "Turkmenistan"){
            $('#personalinfo-phonecountry').val('+993');
        }
        else if(country == "Turks and Caicos Islands"){
            $('#personalinfo-phonecountry').val('+1-649');
        }
        else if(country == "Tuvalu"){
            $('#personalinfo-phonecountry').val('+688');
        }
        else if(country == "Uganda"){
            $('#personalinfo-phonecountry').val('+256');
        }
        else if(country == "Ukraine"){
            $('#personalinfo-phonecountry').val('+380');
        }
        else if(country == "United Arab Emirates"){
            $('#personalinfo-phonecountry').val('+971');
        }
        else if(country == "United Kingdom"){
            $('#personalinfo-phonecountry').val('+44');
        }
        else if(country == "United States"){
            $('#personalinfo-phonecountry').val('+1');
        }
        else if(country == "United States Minor Outlying Islands"){
            $('#personalinfo-phonecountry').val('+NONE');
        }
        else if(country == "Uruguay"){
            $('#personalinfo-phonecountry').val('+598');
        }
        else if(country == "Uzbekistan"){
            $('#personalinfo-phonecountry').val('+998');
        }
        else if(country == "Vanuatu"){
            $('#personalinfo-phonecountry').val('+678');
        }
        else if(country == "Venezuela,Bolivarian Republic of"){
            $('#personalinfo-phonecountry').val('+58');
        }
        else if(country == "Viet Nam"){
            $('#personalinfo-phonecountry').val('+84');
        }
        else if(country == "Virgin Islands,British"){
            $('#personalinfo-phonecountry').val('+1-284');
        }
        else if(country == "Virgin Islands,U.S."){
            $('#personalinfo-phonecountry').val('+1-340');
        }
        else if(country == "Wallis and Futuna"){
            $('#personalinfo-phonecountry').val('+681');
        }
        else if(country == "Western Sahara"){
            $('#personalinfo-phonecountry').val('+212');
        }
        else if(country == "Yemen"){
            $('#personalinfo-phonecountry').val('+967');
        }
        else if(country == "Zambia"){
            $('#personalinfo-phonecountry').val('+260');
        }
        else if(country == "Zimbabwe"){
            $('#personalinfo-phonecountry').val('+263');
        }
        else{
            $('#personalinfo-phonecountry').val('');
        }
    }

     $scope.myAlert = function(msg){
        $ionicPopup.alert({
         title: 'Alert',
         template: ''+msg
        });
    }

    $scope.showSmsg = function(){
        if(localStorage.getItem('flag') != undefined){
            localStorage.removeItem('flag')
        }
        localStorage.setItem('flag',1); 
        $state.go('jobseeker-applyvideo');
    }

    $scope.personalinfoupdate = function () {
        
        $scope.personalinfo.gender = $('#personalinfo-gender').val();;
        var abc = $('#personalinfo-dob').val();
        $scope.personalinfo.dob = abc;
        $.ajax({
            method: "POST",
            dataType: "json",
            data: {userid: user_id, personal: $scope.personalinfo},
            url: "http://www.primefield.co/jobsearch/updatepersonalemployee.php"
        }).then(function (data) {
            $scope.myAlert('Personal information has been updated..'); 
        });
    };

    $scope.addNewEdu = function(u) {
        eduArray.push(u);
        localStorage.setItem('educationinfo', JSON.stringify(eduArray));
        if(eduArray.length === 3){
            $scope.maxEdu = true;
        }
        $scope.educounter = eduArray.length;
        if($scope.disCount == 1 || $scope.disCount == 2){
            $scope.disCount = 1+$scope.disCount;
        }

        if($scope.disCount<3) {
         $('#schoolModalShow').css("display","block");
        } else {
            $('#schoolModalShow').css("display","none");
        }

        educationinfo = JSON.parse(localStorage.getItem('educationinfo'));

        $.ajax({
            method: "POST",
            dataType: "json",
            // data: {personal: personalinfo, education: educationinfo, experience: experienceinfo, social: linkinfo, misc: miscinfo, userid: user_id},
            data: {education: educationinfo,userid: user_id},
            url: "http://www.primefield.co/jobsearch/savepreview.php"
        }).then(function (data) {
            //
            //$ionicLoading.hide();
            $state.go($state.current, {}, {reload: true});
        });

        $('#Modaleducationinfo-school').val('');
        $('#Modaleducationinfo-year').val('');
        $('#Modaleducationinfo-country').val('');
        $('#Modaleducationinfo-degree').val('');
        $('#Modaleducationinfo-specialization').val('');
        $('#Modaleducationinfo-activities').val('');
        $('#eduModal').find('.has-input').removeClass('has-input');
        $scope.modal1.hide();
    };


    $scope.educationinfoupdate = function (index, eduid) {
        var sy = $('#educationinfo-startyear').val();
        $scope.educationinfo[index].startyear = sy;
        var ey = $('#educationinfo-endyear').val();
        $scope.educationinfo[index].endyear = ey;
        
        $.ajax({
            method: "POST",
            dataType: "json",
            data: {eduid: eduid, education: $scope.educationinfo[index], action: "update"},
            url: "http://www.primefield.co/jobsearch/updateeducationemployee.php"
        }).then(function (data) {
            $scope.myAlert('Education information has been updated..'); 
        });
    };

    $scope.educationinfodelete1 = function (eduid) {
        //
        if(confirm('Would you like to delete it') == true){
            $.ajax({
                method: "POST",
                dataType: "json",
                data: {eduid: eduid, action: "delete"},
                url: "http://www.primefield.co/jobsearch/updateeducationemployee.php"
            }).then(function (data) {
                //
                $scope.disCountExp = $scope.disCountExp - 1;
                var temp = parseInt($('#eCount').text());
                if(temp != 0){
                  $('#eCount').text(temp-1);  
                }else{
                    var temp = 0;
                    $('#eCount').text(temp); 
                }
                $state.go($state.current, {}, {reload: true});  
            });
            
        }
        
    };

    $scope.addNewExp = function(u) {
        var timestart = u.timestartYear+"-"+u.timestartMonth;
        var timeend = u.timeendYear+"-"+u.timeendMonth;
        experienceinfo = {companyname: u.companyname, title: u.title, location: u.location, timestart: timestart, timeend: timeend, description: u.description, country: u.country, highlights: u.highlights};
        expArray.push(experienceinfo);
        localStorage.setItem('experienceinfo', JSON.stringify(expArray));

        if($scope.disCountExp == 1 || $scope.disCountExp == 2){
            $scope.disCountExp = 1+$scope.disCountExp;
        } 

        if($scope.disCountExp<3) {
            $('#experianceModalShow').css("display","block");
        } else {
            $('#experianceModalShow').css("display","none");
        }

        experienceinfo = JSON.parse(localStorage.getItem('experienceinfo'));

        $.ajax({
            method: "POST",
            dataType: "json",
            // data: {personal: personalinfo, education: educationinfo, experience: experienceinfo, social: linkinfo, misc: miscinfo, userid: user_id},
            data: {experience: experienceinfo,userid: user_id},
            url: "http://www.primefield.co/jobsearch/savepreview.php"
        }).then(function (data) {
            //
            //$ionicLoading.hide();
            $state.go($state.current, {}, {reload: true});
        });

        $('#Modalexperienceinfo-company').val('')
        $('#Modalexperienceinfo-title').val('')
        $('#Modalexperienceinfo-location').val('')
        $('#Modalexperienceinfo-country').val('')
        $('#Modalexperienceinfo-timestartMonth').val('')
        $('#Modalexperienceinfo-timestartYear').val('')
        $('#Modalexperienceinfo-timeendMonth').val('')
        $('#Modalexperienceinfo-timestartYear').val('')
        $('#Modalexperienceinfo-description').val('');
        $('#Modalexperienceinfo-highlights').val('');
        $('#expModal').find('.has-input').removeClass('has-input');
        $scope.modal2.hide();
    }


    $scope.experienceinfoupdate = function (index, exid) {
        var timestart = $scope.experienceinfo[index].timestartYear+"-"+$scope.experienceinfo[index].timestartMonth;
        var timeend = $scope.experienceinfo[index].timeendYear+"-"+$scope.experienceinfo[index].timeendMonth;
        
        $scope.experienceinfo[index].timestart = timestart;
        $scope.experienceinfo[index].timeend = timeend;
        //
        $.ajax({
            method: "POST",
            dataType: "json",
            data: {exid: exid, experience: $scope.experienceinfo[index], action: "update"},
            url: "http://www.primefield.co/jobsearch/updateexperienceemployee.php"
        }).then(function (data) {
            $scope.myAlert('Experience information has been updated..');
        });
    };

    $scope.experienceinfodelete1 = function (exid) {
        if(confirm('Would you like to delete it') == true){
            $.ajax({
                method: "POST",
                dataType: "json",
                data: {exid: exid, action: "delete"},
                url: "http://www.primefield.co/jobsearch/updateexperienceemployee.php"
            }).then(function (data) {
                //
                var temp = parseInt($('#epCount').text());
                if(temp != 0){
                   $('#epCount').text(temp-1) 
               }else{
                    var temp = 0;
                    $('#epCount').text(temp);
               }
               $state.go($state.current, {}, {reload: true}); 
            });
        }    
    };

    $scope.linkinfoupdate = function () {
        $.ajax({
            method: "POST",
            dataType: "json",
            data: {userid: user_id, social: $scope.link},
            url: "http://www.primefield.co/jobsearch/updatesocialemployee.php"
        }).then(function (data) {
            $scope.myAlert('Your social links has been updated..');
        });
    };

    $scope.miscinfoupdate = function () {
        $.ajax({
            method: "POST",
            dataType: "json",
            data: {userid: user_id, miscellaneous: $scope.misc},
            url: "http://www.primefield.co/jobsearch/updatemiscellaneousemployee.php"
        }).then(function (data) {
            $scope.myAlert('Your passion has been updated..');
        });
    };

    $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });

        $scope.hide = function(u) {        

            $scope.modal.hide();
        };

    $scope.edit = function (ev) {
        $scope.modal.show();
    };

    var eduArray = [];
    $scope.EenableBtn = false;
    $scope.educationsave = function () {
        //
        var educationinfo = {};
        var school = $('#educationinfo-school1').val();
        var year = $('#educationinfo-year1').val();
        var degree = $('#educationinfo-degree1').val();
        var country = $('#educationinfo-country1').val();
        var specialization = $('#educationinfo-specialization1').val();
        var activities = $('#educationinfo-activities1').val();

        if(school == '' && year == '' && degree == '' && country == '? undefined:undefined ?' && specialization == '' && activities == ''){
          $scope.myAlert('Please fill the all fields');  
        }else if(country == ''){
            $scope.myAlert('Please slect the Country');
        }else if(school == ''){
            $scope.myAlert('Please enter the School Name');
        }else if(year == ''){
            $scope.myAlert('Please enter the Year Graduated');
        }else if(degree == ''){
            $scope.myAlert('Please enter the Degree');
        }else if(specialization == ''){
            $scope.myAlert('Please enter the Specialization');
        }else if(activities == ''){
            $scope.myAlert('Please enter your Activities and Societies');
        }else{

            educationinfo = {school: school, degree: degree, specialization: specialization, year: year, country: country, activities: activities};
            eduArray.push(educationinfo);
            //
            localStorage.setItem('educationinfo', JSON.stringify(eduArray));
            $scope.educounter = eduArray.length;
            $('#eCount').text(eduArray.length);
            if($scope.educounter==3){
                var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
                var user_id = loginInfo.user_id;

                //var personalinfo = JSON.parse(localStorage.getItem('personalinfo'));
                var educationinfo = JSON.parse(localStorage.getItem('educationinfo'));
                //var experienceinfo = JSON.parse(localStorage.getItem('experienceinfo'));
                //var linkinfo = JSON.parse(localStorage.getItem('linkinfo'));
                //var miscinfo = JSON.parse(localStorage.getItem('miscinfo'));

                $.ajax({
                    method: "POST",
                    dataType: "json",
                    data: {education: educationinfo, userid: user_id},
                    url: "http://www.primefield.co/jobsearch/savepreview.php"
                }).then(function (data) {
                    
                    $scope.EenableBtn = true;
                    $state.go($state.current, {}, {reload: true});
                });
            }
        }    
    };

    $scope.educationAdd = function () {
        //
        $scope.educationsave();
        var school = $('#educationinfo-school1').val();
        var year = $('#educationinfo-year1').val();
        var degree = $('#educationinfo-degree1').val();
        var country = $('#educationinfo-country1').val();
        var specialization = $('#educationinfo-specialization1').val();
        var activities = $('#educationinfo-activities1').val();

        if(school == '' && year == '' && degree == '' && country == '? undefined:undefined ?' && specialization == '' && activities == ''){
          $scope.myAlert('Please fill the all fields');  
        }else if(country == ''){
            $scope.myAlert('Please slect the Country');
        }else if(school == ''){
            $scope.myAlert('Please enter the School Name');
        }else if(year == ''){
            $scope.myAlert('Please enter the Year Graduated');
        }else if(degree == ''){
            $scope.myAlert('Please enter the Degree');
        }else if(specialization == ''){
            $scope.myAlert('Please enter the Specialization');
        }else if(activities == ''){
            $scope.myAlert('Please enter your Activities and Societies');
        }else{
        $('#educationinfo-school1').val("");
        $('#educationinfo-year1').val("");
        $('#educationinfo-degree1').val("");
        $('#educationinfo-specialization1').val("");
        $('#educationinfo-country1').val("");
        $('#educationinfo-activities1').val("");

        $scope.educounter = eduArray.length;
        }
    };

    var expArray = [];
    $scope.EPenableBtn = false;
    $scope.experiencesave = function () {
        var experienceinfo = {};
        var companyname = $('#experienceinfo-company').val();
        var title = $('#experienceinfo-title').val();
        var location = $('#experienceinfo-location').val();
        var timestart = $('#experienceinfo-timestartYear').val()+"-"+$('#experienceinfo-timestartMonth').val();
        var timeend = $('#experienceinfo-timeendYear').val()+"-"+$('#experienceinfo-timestartMonth').val();
        var description = $('#experienceinfo-description').val();
        var country = $('#experienceinfo-country').val();
        var highlights = $('#experienceinfo-highlights').val();

        if(companyname == '' && title == '' && location == '' && timestart == '' && timeend == '' && description == '' && country == '' && highlights == ''){
            $scope.myAlert('Please fill the all fields');
        }else if(companyname == ''){
            $scope.myAlert('Please enter the Company Name');
        }else if(title == ''){
            $scope.myAlert('Please enter the Title');
        }else if(location == ''){
            $scope.myAlert('Please enter the Location');
        }else if(timestart == ''){
            $scope.myAlert('Please enter the From');
        }else if(timeend == ''){
            $scope.myAlert('Please enter the To');
        }else if(description == ''){
            $scope.myAlert('Please enter your Description');
        }else if(country == ''){
            $scope.myAlert('Please enter your Country');
        }else if(highlights == ''){
            $scope.myAlert('Please enter your Key Highlights');
        }else{

            experienceinfo = {companyname: companyname, title: title, location: location, timestart: timestart, timeend: timeend, description: description, country:country, highlights:highlights};
            expArray.push(experienceinfo);
            //
            localStorage.setItem('experienceinfo', JSON.stringify(expArray));

            $scope.expcounter = expArray.length;
            //
            $('#epCount').text(expArray.length);

            if($scope.expcounter == 3){
                var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
                var user_id = loginInfo.user_id;

                //var personalinfo = JSON.parse(localStorage.getItem('personalinfo'));
                //var educationinfo = JSON.parse(localStorage.getItem('educationinfo'));
                var experienceinfo = JSON.parse(localStorage.getItem('experienceinfo'));
                //var linkinfo = JSON.parse(localStorage.getItem('linkinfo'));
                //var miscinfo = JSON.parse(localStorage.getItem('miscinfo'));

                $.ajax({
                    method: "POST",
                    dataType: "json",
                    data: {experience: experienceinfo, userid: user_id},
                    url: "http://www.primefield.co/jobsearch/savepreview.php"
                }).then(function (data) {
                    //
                    $scope.EPenableBtn = true;
                    $state.go($state.current, {}, {reload: true});
                });

            }
        }    
    };

    $scope.myAlert = function(msg){
        $ionicPopup.alert({
         title: 'Alert',
         template: ''+msg
        });
    }
    
    $scope.experienceAdd = function () {
        $scope.experiencesave();
        var companyname = $('#experienceinfo-company').val();
        var title = $('#experienceinfo-title').val();
        var location = $('#experienceinfo-location').val();
        var timestart = $('#experienceinfo-timestartYear').val()+"-"+$('#experienceinfo-timestartMonth').val();
        var timeend = $('#experienceinfo-timeendYear').val()+"-"+$('#experienceinfo-timestartMonth').val();
        var description = $('#experienceinfo-description').val();
        var country = $('#experienceinfo-country').val();
        var highlights = $('#experienceinfo-highlights').val();

        if(companyname == '' && title == '' && location == '' && timestart == '' && timeend == '' && description == '' && country == '' && highlights == ''){
            $scope.myAlert('Please fill the all fields');
        }else if(companyname == ''){
            $scope.myAlert('Please enter the Company Name');
        }else if(title == ''){
            $scope.myAlert('Please enter the Title');
        }else if(location == ''){
            $scope.myAlert('Please enter the Location');
        }else if(timestart == ''){
            $scope.myAlert('Please enter the From');
        }else if(timeend == ''){
            $scope.myAlert('Please enter the To');
        }else if(description == ''){
            $scope.myAlert('Please enter your Description');
        }else if(country == ''){
            $scope.myAlert('Please enter your Country');
        }else if(highlights == ''){
            $scope.myAlert('Please enter your Key Highlights');
        }else{
        $('#experienceinfo-company').val("");
        $('#experienceinfo-title').val("");
        $('#experienceinfo-location').val("");
        $('#experienceinfo-timestart').val("");
        $('#experienceinfo-timeend').val("");
        $('#experienceinfo-description').val("");
        $('#experienceinfo-country').val("");
        $('#experienceinfo-highlights').val("");

        $scope.expcounter = expArray.length;
        }
    };
});

//JAppyJobCtrl application btn in jobseeker main page
start.controller('JAppyJobCtrl', function ($scope, $state, $http, myService, $ionicLoading, $timeout) {
    var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
    var user_id = loginInfo.user_id;
    $ionicLoading.show({
      template: 'Loading...'
    });
    $timeout(function() {
        $ionicLoading.hide();
    }, 1000);
    $.ajax({
        method: "POST",
        dataType: "json",
        data: {userid: localStorage.getItem('userID')},
        url: "http://www.primefield.co/jobsearch/getappliedjobs.php"
    }).then(function (data) {
        $scope.Applyjob = data.applyjob;
        $scope.$apply();
        if( data.applyjob == "" ) {
            $('.Applyjob').show();
        } else {
            $('.Applyjob').hide();
        }
        console.log($scope.Applyjob);
    });
    $scope.goToSelectedJob = function (index) {
        
        $http({
            url: 'http://primefield.co/jobsearch/getcompanydetail.php', 
            method: "GET",
            params: {userid: index.userid}
         }).then(function(r){
            myService.employer_company = r.data[0];
            myService.employer_postjob = index;
            $state.go('employer-openjobdetail');
            //
        })
    };
})

//Employer-openjobdetail
start.controller('riderDriverListCtrl1', function ($scope, $state, $http, myService) {
    var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
    var user_id = loginInfo.user_id;
    var userType = loginInfo.type;
    if(userType === 'JobSeeker'){
        $scope.hide3Btn = true;
        $scope.pitchVideo = false;
    }else{
        $scope.hide3Btn = false;
        $scope.pitchVideo = true;
    }
    //$scope.item = [{id: 1, industry: "Education"}, {id: 2, industry: "Information Technology"}, {id: 3, industry: "Business"},{id:4,industry:"Real estate‎"},{id:5,industry:"Textile‎"},{id:6,industry:"Professional sports"}];
    $scope.name1 = "Company Information";
    $scope.name2 = "Job Information";
    $scope.name3 = "Job Seeker Pitch";

 
    $scope.toggleGroup = function(x) {
        $scope.disablethis = true;
        $scope.disabledjob = true;
        $scope.postjob = myService.employer_postjob;
        $scope.company = myService.employer_company; 
        if(userType === 'JobSeeker'){ 
        var path = 'http://www.primefield.co/jobsearch/companyImage/com_' + $scope.company.userid + '.jpg?timestamp='+new Date().getTime();
        var Vpath = 'http://www.primefield.co/jobsearch/videos/' + $scope.company.userid + '.jpg?timestamp='+new Date().getTime();
        $('#p-video').attr('src',  Vpath);
        $('#p-video').attr('onclick', 'openFile(\'https://s3-ap-southeast-1.amazonaws.com/video1.123/' + $scope.company.userid + '.3gp\')');

        }
        else{
            var path = 'http://www.primefield.co/jobsearch/companyImage/com_' + localStorage.getItem('userID') + '.jpg?timestamp='+new Date().getTime();
            var Vpath = 'http://www.primefield.co/jobsearch/videos/' + localStorage.getItem('userID') + '.jpg?timestamp='+new Date().getTime();
            $('#p-video').attr('onclick', 'openFile(\'https://s3-ap-southeast-1.amazonaws.com/video1.123/' + localStorage.getItem('userID') + '.3gp\')');
            $('#p-video').attr('src',  Vpath);
        }
       
        var JApath = 'http://www.primefield.co/jobsearch/videos/' + 'apply_'+$scope.postjob.jobid+'_'+localStorage.getItem('userID') + '.jpg?timestamp='+new Date().getTime();
        var Jpath = 'http://www.primefield.co/jobsearch/videos/' + $scope.postjob.jobid + '.jpg?timestamp='+new Date().getTime();
        angular.element(document).ready(function () {
            $('#p-img').attr('src',  path);
            
        
            $('#ja-video').attr('src',  JApath);
            $('#ja-video').attr('onclick', 'openFile(\'https://s3-ap-southeast-1.amazonaws.com/video1.123/' + 'apply_'+$scope.postjob.jobid+'_'+localStorage.getItem('userID') + '.3gp\')');
            $('#job-img').attr('src',  Jpath);
            $('#job-img').attr('onclick', 'openFile(\'https://s3-ap-southeast-1.amazonaws.com/video1.123/' + $scope.postjob.jobid+ '.3gp\')');
        });
        $scope.postjob.deadline = new Date($scope.postjob.deadline);
        $.ajax({
            method: "POST",
            dataType: "json",
            data: {userid: user_id},
            url: "http://www.primefield.co/jobsearch/viewpostjob.php"
        }).then(function (data) {
            $scope.postjob.viewcount = 0;
            $scope.postjob.application = 0;
            $scope.postjob.shortlisted = 0;
            for( i=0; i<data.postjob.length; i++) {
                if(data.postjob[i].jobid == $scope.postjob.jobid) {
                    console.log($scope.postjob.jobid);
                    console.log(data.postjob[i].jobid);
                    $scope.postjob.viewcount = data.postjob[i].viewcount;
                    $scope.postjob.application = data.postjob[i].applicationcount;
                    $scope.postjob.shortlisted = data.postjob[i].shortlistedcount;
                }
            }
        });

        if($scope.openGroup != x){
            $scope.openGroup = x;
        }
        else{
            $scope.openGroup = 0;
        } 
    };
    //$scope.industry = $scope.postjob.industry;
    // $scope.industrySelect = function (r) {
    //     //
    //     $scope.industry = r;
    // };
    
    $scope.view = function () {

        $state.go('employer-openjobdetailview');
        //
    };
    $scope.application = function () {
        $state.go('employer-openjobdetailapplication');
        //
    };

    $scope.shortlisted = function () {
        $state.go('employer-openjobdetailshortlisted');
        //
    };
});

//Employer-openjobdetailview
start.controller('EOpenJobDetailViewCtrl', function ($scope, $state, $http, myService) {
        var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
        var user_id = loginInfo.user_id;
        $scope.postjob = myService.employer_postjob;
        console.log($scope.postjob);
        $.ajax({
            method: "POST",
            dataType: "json",
            data: {jobid: $scope.postjob.jobid},
            url: "http://www.primefield.co/jobsearch/viewpersonalinfo.php"
        }).then(function (data) {
            $scope.user = data.personal;
            console.log($scope.user);
            
            if( data.personal == "" ) {
                $('.nouser').show();
            } else {
                $('.nouser').hide();
            }
            $scope.$apply();
        });   

    $scope.goToSelectedUser = function (index) {
        myService.user = {};
        myService.user = $scope.user[index];
        $state.go('employer-openjobdetailviewjobseeker');
    };

});

//Employer-openjobdetailapplication
start.controller('riderDriverListCtrl', function ($scope, $state, $http, myService) {
    var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
    var user_id = loginInfo.user_id;
    $scope.postjob = myService.employer_postjob;
    console.log($scope.postjob);
    $.ajax({
        method: "POST",
        dataType: "json",
        data: {jobid: $scope.postjob.jobid},
        url: "http://www.primefield.co/jobsearch/viewapplicationdetails.php"
    }).then(function (data) {
        console.log(data);
        $scope.user = data.personal;
        $scope.$apply();
        if( data.personal == "" ) {
            $('.nouser').show();
        } else {
            $('.nouser').hide();
        }
        
    });

    $scope.goToSelectedUser = function (index) {
        myService.user = {};
        myService.user = $scope.user[index];
        $state.go('employer-openjobdetailapplicationjobseeker');
    };

});

//Employer-openjobdetailshortlisted
start.controller('EOpenJobDetailShortlistedCtrl', function ($scope, $state, $http, myService) {
    var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
    var user_id = loginInfo.user_id;
    $scope.postjob = myService.employer_postjob;
    //console.log($scope.postjob.jobid);
    $.ajax({
        method: "POST",
        dataType: "json",
        data: {jobid: $scope.postjob.jobid},
        url: "http://www.primefield.co/jobsearch/viewShortlistDetails.php"
    }).then(function (data) {
        $scope.user = data.personal;
        console.log($scope.user)
        $scope.$apply();
        if( data.personal == "" ) {
            $('.nouser').show();
        } else {
            $('.nouser').hide();
        }
    });

    $scope.goToSelectedUser = function (index) {
        myService.user = {};
        myService.user = $scope.user[index];
        $state.go('employer-openjobdetailshortlistedjobseeker');
    };

});

//savedjobsctrl jobseeker savedjobs
start.controller('savedjobsctrl', function ($scope, $state, $http, myService, $timeout, $ionicLoading) {
    //console.log(JSON.stringify(localStorage.getItem('sJobs')))
    $ionicLoading.show({
      template: 'Loading...'
    });
    $timeout(function() {
        $ionicLoading.hide();
    }, 800);
    var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
    var user_id = loginInfo.user_id;
    $.ajax({
        method: "POST",
        dataType: "json",
        data: {userid: localStorage.getItem('userID')},
        url: "http://www.primefield.co/jobsearch/getsavedjobs.php"
    }).then(function (data) {
        console.log(data)
        $scope.sJobsinfo = data.applyjob;
        myService.jobseeker_savedJobs = $scope.sJobsinfo;
        $scope.$apply();
        if( data.applyjob == "" ) {
            $('.sJobsinfo').show();
        } else {
            $('.sJobsinfo').hide();
        }
    });
    $scope.goToSelectedJob = function (index) {
        myService.selectedJob = index;
        //console.log($scope.jobseeker_selectedjob);
        $state.go('jobseeker-viewSavedJobs');
    };

    //$scope.sJobsinfo = JSON.parse(localStorage.getItem('sJobs'));
    //console.log($scope.sJobsinfo);
});

//viewSavedJob
start.controller('viewSavedJob', function ($scope, $http, myService, $state, $http) {
    
    
    $scope.toggleGroup = function(x) {
        if($scope.openGroup !== x){
            $scope.openGroup = x;
        }
        else{
            $scope.openGroup = 0;
        } 
    };  
    $scope.disablethis = 1;
    $scope.name1 = 'Company Information';
    $scope.name2 = "Job Information";
    $scope.postjob = myService.selectedJob;
    $scope.postjob.deadline = new Date(myService.selectedJob.deadline);
    $scope.postjob.location = myService.selectedJob.joblocation
    console.log(myService.selectedJob);
    $http({
        url: 'http://primefield.co/jobsearch/getcompanydetail.php', 
        method: "GET",
        params: {userid: $scope.postjob.userid}
     }).then(function(r){
        $scope.company = r.data[0];
        var cPath = 'http://www.primefield.co/jobsearch/companyImage/com_'+$scope.company.userid+'.jpg?timestamp='+new Date().getTime();
        var cVideoPath = 'http://www.primefield.co/jobsearch/videos/'+$scope.company.userid+'.jpg?timestamp='+new Date().getTime();
        var jVideoPath = 'http://www.primefield.co/jobsearch/videos/'+$scope.postjob.jobid+'.jpg?timestamp='+new Date().getTime();
        $('#p-img').attr('src',cPath); 
        $('#p-video').attr('src',cVideoPath);
        $('#p-video').attr('onclick', 'openFile(\'https://s3-ap-southeast-1.amazonaws.com/video1.123/' + $scope.company.userid + '.3gp\')');
        $('#Job-img').attr('src',jVideoPath); 
         $('#Job-img').attr('onclick', 'openFile(\'https://s3-ap-southeast-1.amazonaws.com/video1.123/' + $scope.postjob.jobid + '.3gp\')');
       
    });
    $scope.hide = true;
    $scope.applyhide = true;
     $scope.apply = function () {  
        $.ajax({
            method: "POST",
            dataType: "json",
            data: {userid: localStorage.getItem("userID"), jobid:$scope.postjob.jobid},
            url: "http://www.primefield.co/jobsearch/Checkapply.php"
        }).then(function (data) { 
            if( data.status == '1' ) { 
                $state.go('jobseeker-apply');
            } else { alert("You have already applied for this job...");
                $scope.myAlert('You have already applied for this job...');
            }
        }); 
        
    };
    $scope.removeApply = function ($event) {
        confirm = $ionicPopup.confirm({
         title: 'Confirmation',
         template: 'Are you sure you want to remove Application?'
        });
        confirm.then(function(res) {
             if(res) {
                $scope.applyhide = !$scope.applyhide;
             } else {
               //console.log('You are not sure');
             }
        });
    };
      angular.element(document).ready(function () {
        $('.md-char-counter').hide();
    });
});

//Jobseeker-impressed
start.controller('JSImpressedCtrl', function ($scope, $http, myService, $state, $timeout, $ionicLoading) {
    var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
    var user_id = loginInfo.user_id;
    $ionicLoading.show({
      template: 'Loading...'
    });
    $timeout(function() {
        $ionicLoading.hide();
    }, 1000);
    $.ajax({
        method: "POST",
        dataType: "json",
        data: {userid: user_id},
        url: "http://www.primefield.co/jobsearch/viewimpressedjob.php"
    }).then(function (data) {
        $scope.Impressedjob = data.emp;
        $scope.$apply();
        if(JSON.stringify(localStorage.getItem("viewEmp")).length){
            //console.log('hh')
            localStorage.removeItem('viewEmp');
        }
        if( data.emp == "" ) {
            $('.impressedjob').show();
        } else {
            $('.impressedjob').hide();
        }

        //localStorage.setItem('viewEmp', JSON.stringify($scope.Impressedjob));
    });
    $scope.goToSelectedJob = function (index) {
        console.log(index);
        var myData = index;
        myService.jobseeker_impressedjob = {};
        myService.jobseeker_impressedjob = index;
        localStorage.setItem('viewEmp', JSON.stringify(myData));
        console.log(myData);
        $state.go('jobseeker-viewemp');
    };
});

//JShortlistJobCtrl shortlist btn in jobseeker main page
start.controller('JShortlistJobCtrl', function ($scope, $state, $http, myService, $ionicLoading, $timeout) {
    var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
    var user_id = loginInfo.user_id;
    $ionicLoading.show({
      template: 'Loading...'
    });
    $timeout(function() {
        $ionicLoading.hide();
    }, 1000);
    $.ajax({
        method: "POST",
        dataType: "json",
        data: {userid: user_id},
        url: "http://www.primefield.co/jobsearch/viewshortlistjob.php"
    }).then(function (data) {
        $scope.Shortlistjob = data;
        $scope.$apply();
    });
    
    $scope.goToSelectedJob = function (index) {
        $.ajax({
            method: "POST",
            dataType: "json",
            data: {userid: index.userid},
            url: "http://www.primefield.co/jobsearch/getJobByJobId.php"
        }).then(function (data) {
            myService.employer_company = data.company[0];
            
            console.log(myService.employer_company);
            myService.employer_postjob = index;
            //console.log(myService.employer_postjob);
            $state.go('employer-openjobdetail');
        });
    };
})

start.controller('SearchCtrl', function ($scope, $state, $http, myserv, $timeout, $q, $timeout, $ionicLoading){
    $scope.data = { "airlines" : [], "search" : '' };
    $scope.hideLi = false;
    $scope.sliderSal = 0;
    $scope.sliderFrom = 0;
    $scope.sliderTo = 0;
    $scope.selcountry = '';
    $scope.name1 = 'Industry';
    $scope.name2= 'Minimum Salary';
    $scope.name3 = 'Minimum Experience (in years)';
    $scope.name4 = 'Country'
    $scope.Industry = ['Information Technology','Education','Business','Real estate‎','Textile‎','Professional sports'];

    $scope.selectCon = function(x){
        console.log(x)
        $scope.selcountry = x;
    }

    $scope.toggleGroup = function(x) {
        if($scope.openGroup != x){
            $scope.openGroup = x;
        }
        else{
            $scope.openGroup = 0;
        } 
    };
    $ionicLoading.show({
      template: 'Loading...'
    });
    $timeout(function() {
        $ionicLoading.hide();
    }, 1000);
    $scope.search = function() {
        //console.log($scope.data.search);
        $scope.hideLi = false;
        if($scope.data.search.length){
            myserv.searchAirlines($scope.data.search).then(
                function(matches) {
                    $scope.data.airlines = matches;
                }
            )
        }else{
            $scope.data.airlines = [];
        }
    }
    $scope.clearSearch = function(){
        $scope.data.airlines = [];
        $scope.data.search = '';
    }
    $scope.setTxt = function(txt){
        console.log(myserv.jobs);
        $scope.data.search = txt;
        $scope.hideLi = true;
    }

    $scope.selectInd = function(txt){
        console.log(txt);
        $scope.selInd = txt;
    }
    $scope.selectSalary = function(txt){
        console.log(txt);
        $scope.sliderSal = txt; 
    }
    $scope.selectFrom = function(txt){
        console.log(txt);
        $scope.sliderFrom = txt; 
    }
    $scope.selectTo = function(txt){
        console.log(txt);
        if(txt < $scope.sliderFrom){
            alert('Please select To is higher then From')
        }else{
            $scope.sliderTo = txt;
        }
    }

    $scope.getJobsFilter = function(){
        var searchTxt = $scope.data.search;
        var selectIndustry = $scope.selInd;
        var selectSalary = $scope.sliderSal;
        var selectFrom = $scope.sliderFrom;
        var selectTo = $scope.sliderTo;
        var selectCountry = $scope.selcountry;

        var result = {searchTxt:searchTxt,selectIndustry:selectIndustry,selectSalary:selectSalary,selectFrom:selectFrom,selectTo:selectTo,selectCountry:selectCountry};
        console.log(result);
        if(selectSalary == 0){
            delete result["selectSalary"];
        }
        if(selectFrom == 0){
            delete result["selectFrom"];
        }
        if(selectTo == 0){
            delete result["selectTo"];
        }
        if(selectIndustry == '' || selectIndustry == undefined || selectIndustry == null){
            delete result["selectIndustry"];
        }
        if(selectCountry == '' || selectCountry == undefined || selectCountry == null){
            delete result["selectCountry"];
        }
        //console.log(result);
        if(localStorage.getItem('FliterTxt') != null || localStorage.getItem('FliterTxt') != undefined){
            localStorage.removeItem('FliterTxt');
        }
        localStorage.setItem('FliterTxt',JSON.stringify(result));
        $state.go('searchResults');
    }
})

start.controller('searchResult', searchResult);
function searchResult($scope, $q, $timeout, $state, myserv) {
    console.log(JSON.parse(localStorage.getItem('mySearchJobs')));
    $scope.temp = JSON.parse(localStorage.getItem('mySearchJobs'));
    $scope.tempFliter = JSON.parse(localStorage.getItem('FliterTxt'));
    $scope.mySearchTxt = $scope.tempFliter.searchTxt;
    $scope.myIndustry = $scope.tempFliter.selectIndustry;
    $scope.mySalary = $scope.tempFliter.selectSalary;
    $scope.myFrom = $scope.tempFliter.selectFrom;
    $scope.myTo = $scope.tempFliter.selectTo;
    $scope.selectCountry = $scope.tempFliter.selectCountry; 

    if($scope.mySalary != undefined){
        $scope.greaterThan = function(prop, val){
            return function(x){
              if (x[prop] >= parseInt(val)) return true;
            }
        }
    }

    if($scope.myFrom != undefined){
        $scope.greaterExThan = function(prop, val){
            return function(x){
              if (x[prop] >= parseInt(val)) return true;
            }
        }
    }
    
    $scope.noRes = function(){
        var res = $('.card').css('display');
        if(res == 'none'){
            return 1
        }else{
            return 0
        }
    }     

    $scope.goToJob = function (job) {
        var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
        var user_id = loginInfo.user_id;
        $.ajax({
            method: "POST",
            dataType: "json",
            data: {employerid:job.userid, jobseekerid:user_id, jobid:job.jobid},
            url: "http://www.primefield.co/jobsearch/saveviewjob.php"
        }).then(function (data) {
        });
        console.log(job);
        myserv.currentjob = {};
        myserv.currentjob = job;
        $state.go('searchData-company');
    };

    //myserv.jobsFilter = JSON.parse(window.localStorage.getItem('jobsFilter'));
}

//SearchDataCompanyCtrl
start.controller('SearchDataCompanyCtrl', function ($scope, $state, $http, myService, myserv, $ionicPopup) {

    //console.log(myserv.currentjob)
    $scope.company = myserv.companydata;
    //console.log($scope.company); 
    $scope.postjob = myserv.currentjob;
    localStorage.setItem('currentjob',JSON.stringify($scope.postjob));
    //console.log($scope.postjob)
    $scope.jobid = $scope.postjob.jobid;
    if(localStorage.getItem('jobID') != null){
        localStorage.removeItem('jobID');
    }
    localStorage.setItem('jobID',$scope.jobid);
    var Jpath = 'http://www.primefield.co/jobsearch/videos/' + $scope.jobid + '.jpg?timestamp='+new Date().getTime();
    angular.element(document).ready(function () {
        $('#J-img').attr('src',  Jpath);
    })

    $scope.name1 = 'Company Information';
    $scope.name2 = 'Job Information';

    $scope.toggleGroup = function(x) {
        if($scope.openGroup != x){
            $scope.openGroup = x;
        }
        else{
            $scope.openGroup = 0;
        } 
    };

    $http({
        url: 'http://primefield.co/jobsearch/getcompanydetail.php', 
        method: "GET",
        params: {userid: $scope.postjob.userid}
     }).then(function(r){
        //console.log(r.data[0]);
        var path = 'http://www.primefield.co/jobsearch/companyImage/com_' + $scope.postjob.userid + '.jpg?timestamp='+new Date().getTime();
        var Vpath = 'http://www.primefield.co/jobsearch/videos/' + $scope.postjob.userid + '.jpg?timestamp='+new Date().getTime();
        $('#c-img').attr('src',  path);
        $('#cv-img').attr('src', Vpath);
        $('#cv-img').attr('onclick', 'openFile(\'https://s3-ap-southeast-1.amazonaws.com/video1.123/' + $scope.postjob.userid + '.3gp\')');
        $scope.company = r.data[0];
        console.log($scope.company); 
    })
    
    
    
    $scope.postjob.deadline = new Date(myserv.currentjob.deadline);
    //$scope.industry = myserv.currentjob.industry;
    var nselected;
    $scope.disabledjob = true;
    $scope.disablethis = true;
    $scope.hide = true;
    $scope.applyhide = true;
    $scope.saveBtn = 'Save';
    $scope.saveBtndisabled = false;
    //$scope.isdisabled = true;
    $scope.onTypeChange = function () {
        nselected = $scope.radiobutton.group1;
    };

    $scope.impress = function () {
        $scope.hide = !$scope.hide;
        $scope.isdisabled = !$scope.isdisabled;
        $.ajax({
            method: "POST",
            dataType: "json",
            data: {employerID:$scope.postjob.userid , jobseekerID:localStorage.getItem("userID"), jobid:$scope.postjob.jobid},
            url: "http://www.primefield.co/jobsearch/impressedjobseeker.php"
        }).then(function (data) {
            if(data.status==0){
                $scope.myAlert('You have already liked this job...');
            }
        });
    };

    $scope.removeImpress = function ($event) {

        confirm = $ionicPopup.confirm({
            title: 'Confirmation',
            template: 'Are you sure you want to unlike this?'
        });
        confirm.then(function(res) {
            if(res) {
                $scope.hide = !$scope.hide;
                $.ajax({
                    method: "POST",
                    dataType: "json",
                    data: {uid:localStorage.getItem("userID"), jobid:$scope.postjob.jobid},
                    url: "http://www.primefield.co/jobsearch/unimpressed.php"
                }).then(function (data) {
                    console.log(data);
                });
                $scope.isdisabled = !$scope.isdisabled;
            } else {
                //console.log('You are not sure');
            }
        });
        
    };

    $scope.phone = function (data) {
        //var temp = [];
        $scope.saveBtndisabled = true;
        $scope.saveBtn = 'Saved';
        var old = JSON.parse(localStorage.getItem('sJobs'));
        if(old === null){ 
            old = [];
        }
        old.push(data);  
        localStorage.setItem('sJobs',JSON.stringify(old));
        $.ajax({
            method: "POST",
            dataType: "json",
            data: {userid: localStorage.getItem("userID"), jobid:$scope.postjob.jobid},
            url: "http://www.primefield.co/jobsearch/jssavedjob.php"
        }).then(function (data) {
            console.log(data.status);
            if(data.status==0){
                $scope.myAlert('You have already saved this job...');
            }
        }); 
    };

    $scope.myAlert = function(msg){
        $ionicPopup.alert({
         title: 'Alert',
         template: ''+msg
        });
    }

    $scope.apply = function () {
        $.ajax({
            method: "POST",
            dataType: "json",
            data: {userid: localStorage.getItem("userID"), jobid:$scope.postjob.jobid},
            url: "http://www.primefield.co/jobsearch/Checkapply.php"
        }).then(function (data) {
            if( data.status == '1' ) {
                $state.go('jobseeker-apply');
            } else {
                $scope.myAlert('You have already applied for this job...');
            }
        }); 
        
    };
    $scope.removeApply = function ($event) {
        confirm = $ionicPopup.confirm({
         title: 'Confirmation',
         template: 'Are you sure you want to remove Application?'
        });
        confirm.then(function(res) {
             if(res) {
                $scope.applyhide = !$scope.applyhide;
             } else {
               //console.log('You are not sure');
             }
        });
    };

    angular.element(document).ready(function () {
        $('.md-char-counter').hide();
    })

});

start.controller('EVideoCtrl', function ($scope, $state, $http, myService, $ionicPopup ) {
    console.log(JSON.parse(localStorage.getItem('currentjob')));
    $scope.gallery = function(){
        console.log('click gallery btn')
    }
    $scope.showSmsg = function(){
        $.ajax({
            method: "POST",
            dataType: "json",
            data: {userid: localStorage.getItem("userID"), jobid:JSON.parse(localStorage.getItem('currentjob')).jobid},
            url: "http://www.primefield.co/jobsearch/apply.php"
        }).then(function (data) {
            if(localStorage.getItem('flag') == 1){
                $ionicPopup.alert({
                     title: 'Success',
                     template: 'Your job application has been submitted successfully. Good luck.'
                });
            }
            $state.go('jobseeker-main');
        }); 
    }
});

//Jobseeker-preview
start.controller('JSPreviewCtrl', function ($scope, $state, $http, myService, $ionicLoading,$ionicPopup) {
    var path = 'http://www.primefield.co/jobsearch/pictureurl/' + localStorage.getItem("userID") + '.jpg?timestamp='+new Date().getTime();
    var Vpath = 'http://www.primefield.co/jobsearch/videos/' + localStorage.getItem("userID") + '.jp?timestamp='+new Date().getTime();
    angular.element(document).ready(function () {
        $('#p-img').attr('src',  path);
        $('#p-video').attr('src',  Vpath);
    });

    $scope.myAlert = function(msg){
        $ionicPopup.alert({
         title: 'Alert',
         template: ''+msg
        });
    }

 
    $scope.back = function () {
        var personalinfo = JSON.parse(localStorage.getItem('personalinfo'));
        var educationinfo = JSON.parse(localStorage.getItem('educationinfo'));
        var experienceinfo = JSON.parse(localStorage.getItem('experienceinfo'));
        var linkinfo = JSON.parse(localStorage.getItem('linkinfo'));
        var miscinfo = JSON.parse(localStorage.getItem('miscinfo'));
        var main = {};
        main['personalinfo'] = personalinfo;
        main['educationinfo'] = educationinfo;
        main['experienceinfo'] = experienceinfo;
        main['linkinfo'] = linkinfo;
        main['miscinfo'] = miscinfo;
        myService.jobseeker_signup = [];
        myService.jobseeker_signup.push(main);
        myService.jobseeker_personalinfo = personalinfo;
        var edu = {};
        edu['educationinfo'] = educationinfo;
        myService.jobseeker_educationinfo = [];
        myService.jobseeker_educationinfo.push(edu);
        var exp = {};
        exp['experienceinfo'] = experienceinfo;
        myService.jobseeker_experienceinfo = [];
        myService.jobseeker_experienceinfo.push(exp);
        myService.jobseeker_linkinfo = linkinfo;
        myService.jobseeker_miscinfo = miscinfo;
        window.history.back();
    };
    $scope.go = function () {

        var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
        var user_id = loginInfo.user_id;

        var personalinfo = JSON.parse(localStorage.getItem('personalinfo'));
        var educationinfo = JSON.parse(localStorage.getItem('educationinfo'));
        var experienceinfo = JSON.parse(localStorage.getItem('experienceinfo'));
        var linkinfo = JSON.parse(localStorage.getItem('linkinfo'));
        var miscinfo = JSON.parse(localStorage.getItem('miscinfo'));
        // $ionicLoading.show({
        //   template: 'Loading...'
        // });
        // $.ajax({
        //     method: "POST",
        //     dataType: "json",
        //     data: {personal: personalinfo, education: educationinfo, experience: experienceinfo, social: linkinfo, misc: miscinfo, userid: user_id},
        //     url: "http://www.primefield.co/jobsearch/savepreview.php"
        // }).then(function (data) {
            //console.log(data);
            //$ionicLoading.hide();
            $state.go('jobseeker-main');
        //});

    };
    $scope.eduRemove = function (r) {
        if(confirm('Would you like to delete it') == true){
            myService.jobseeker_signup[0].educationinfo.splice(r, 1);
            localStorage.setItem('educationinfo', JSON.stringify(myService.jobseeker_signup[0].educationinfo));
        }    
    };
    $scope.expRemove = function (r) {
        if(confirm('Would you like to delete it') == true){
            myService.jobseeker_signup[0].experienceinfo.splice(r, 1);
            localStorage.setItem('experienceinfo', JSON.stringify(myService.jobseeker_signup[0].experienceinfo));
        }    
    };

    $scope.months = ["01","02","03","04","05","06","07","08","09","10","11","12"];

    var dateYear = new Date().getFullYear();
    $scope.years = [];
    for( i = 1960; i <= dateYear; i++ ) {
        $scope.years.push(""+i);
    }

    if (myService.jobseeker_personalinfo !== undefined) {
        //console.log(myService)
        $scope.personalinfo = myService.jobseeker_personalinfo;
        console.log($scope.personalinfo)
        $scope.radiobutton = {group1: $scope.personalinfo.gender};
        $scope.personalinfo.date = new Date($scope.personalinfo.dob.substring(0, 4), ($scope.personalinfo.dob.substring(5, 7) - 1), $scope.personalinfo.dob.substring(8, 10));

    }

    if (myService.jobseeker_linkinfo !== undefined) {
        $scope.linkinfo = myService.jobseeker_linkinfo;
        //console.log($scope.linkinfo)
    }

    if (myService.jobseeker_miscinfo !== undefined) {
        $scope.miscinfo = myService.jobseeker_miscinfo;
        //console.log($scope.miscinfo)
    }

    if (myService.jobseeker_educationinfo.length > 0) {
        $scope.educationinfo = myService.jobseeker_educationinfo[0].educationinfo;
        //console.log($scope.educationinfo)
    }

    if (myService.jobseeker_experienceinfo.length > 0) {
        var experienceDetails = JSON.parse(JSON.stringify(myService.jobseeker_experienceinfo[0].experienceinfo));
        console.log(experienceDetails);
        if (experienceDetails.length) {
            for( i = 0; i < experienceDetails.length; i++ ) {
                var timestart = experienceDetails[i].timestart.split('-');
                var timeend = experienceDetails[i].timeend.split('-');
                experienceDetails[i].timestartMonth = timestart[1];
                experienceDetails[i].timestartYear = timestart[i];
                experienceDetails[i].timeendMonth = timeend[1];
                experienceDetails[i].timeendYear = timeend[0];
            }
        }
        $scope.experienceinfo = experienceDetails;
        console.log($scope.experienceinfo);

    }

    $scope.radiobutton.group1 = $scope.personalinfo.gender;
    var nselected;
    $scope.onTypeChange = function () {
        nselected = $scope.radiobutton.group1;
    };
    $('#personalinfo-save').hide();
    $('#personalinfo-edit').show();
    $scope.myPersonal = true;
    $scope.personaledit = function () {
        $scope.myPersonal = false;
        //console.log('h')
        $('#personalinfo-edit').hide();
        $('#personalinfo-save').show();
        $('#personalinfo-gender').attr('disabled', false);
        $('#personalinfo-1').attr('disabled', false);
        $('#personalinfo-2').attr('disabled', false);
        $('#personalinfo-country').prop('disabled', false);
        $('#personalinfo-firstname').prop('disabled', false);
        $('#personalinfo-lastname').prop('disabled', false);
        $('#personalinfo-email').prop('disabled', false);
        $('#personalinfo-phone').prop('disabled', false);
        $('#personalinfo-status').prop('disabled', false);
        $('#personalinfo-date').prop('disabled', false);
    };
    $scope.personalsave = function () {
        $scope.myPersonal = true;
        $('#personalinfo-save').hide();
        $('#personalinfo-edit').show();
        $('#personalinfo-gender').attr('disabled', true);
        $('#personalinfo-1').attr('disabled', true);
        $('#personalinfo-2').attr('disabled', true);
        $('#personalinfo-country').prop('disabled', true);
        $('#personalinfo-firstname').prop('disabled', true);
        $('#personalinfo-lastname').prop('disabled', true);
        $('#personalinfo-email').prop('disabled', true);
        $('#personalinfo-phone').prop('disabled', true);
        $('#personalinfo-status').prop('disabled', true);
        $('#personalinfo-date').prop('disabled', true);
        var personalinfo = {};
        var image = $('#p-img').attr('src');
        //console.log(image);
        var gender = nselected;
        var country = $('#personalinfo-country').val();
        var firstname = $('#personalinfo-firstname').val();
        var lastname = $('#personalinfo-lastname').val();
        var email = $('#personalinfo-email').val();
        var phone = $('#personalinfo-phone').val();
        var status = $('#personalinfo-pstatus').val();
        var dob = $('#personalinfo-date').val();
        personalinfo = {image: image, firstname: firstname, lastname: lastname, country: country, email: email, phone: phone, status: status, dob: dob, gender: gender};
        // console.log(personalinfo);
        localStorage.setItem('personalinfo', JSON.stringify(personalinfo));
        $scope.myAlert('Personal infomation saved.');
    };

    $('.educationinfo-save').hide();
    $('.educationinfo-edit').show();

    $scope.educationedit = function (id) {
        $('#educationinfo-edit_'+id).hide();
        $('#educationinfo-save_'+id).show();
        $('.eduDesable_'+id).prop('disabled', false);
    };

    eduArray = [];
    $scope.educationsave = function (edu,id) {
        myService.jobseeker_signup[0].educationinfo[id].school = edu.school;
        myService.jobseeker_signup[0].educationinfo[id].degree = edu.degree;
        myService.jobseeker_signup[0].educationinfo[id].specialization = edu.specialization;
        myService.jobseeker_signup[0].educationinfo[id].year = edu.year;
        myService.jobseeker_signup[0].educationinfo[id].activities = edu.activities;
        localStorage.setItem('educationinfo', JSON.stringify(myService.jobseeker_signup[0].educationinfo));
        console.log(myService.jobseeker_signup[0].educationinfo);
        $scope.myAlert('Educational infomation saved.');
        $('#educationinfo-save_'+id).hide();
        $('#educationinfo-edit_'+id).show();
        $('.eduDesable_'+id).prop('disabled', true);
    };

    $('.experienceinfo-save').hide();
    $('.experienceinfo-edit').show();

    $scope.experienceedit = function (id) {
        $('.expDesable_'+id).prop('disabled', false);
        $('#experienceinfo-edit_'+id).hide();
        $('#experienceinfo-save_'+id).show();
    };

    expArray = [];
    $scope.experiencesave = function (exp,exid) {
        //console.log(exp);
        var timestart = exp.timestartYear+"-"+exp.timestartMonth;
        var timeend = exp.timeendYear+"-"+exp.timeendMonth;
        myService.jobseeker_signup[0].experienceinfo[exid].companyname = exp.companyname;
        myService.jobseeker_signup[0].experienceinfo[exid].title = exp.title;
        myService.jobseeker_signup[0].experienceinfo[exid].location = exp.location;
        myService.jobseeker_signup[0].experienceinfo[exid].timestart = timestart;
        myService.jobseeker_signup[0].experienceinfo[exid].timeend = timeend;
        myService.jobseeker_signup[0].experienceinfo[exid].description = exp.description;
        myService.jobseeker_signup[0].experienceinfo[exid].country = exp.country;
        myService.jobseeker_signup[0].experienceinfo[exid].highlights = exp.highlights;
        console.log(myService.jobseeker_signup[0].experienceinfo[exid]);
        localStorage.setItem('experienceinfo', JSON.stringify(myService.jobseeker_signup[0].experienceinfo));
        $scope.myAlert('Experience infomation saved.');
        $scope.expcounter = expArray.length;
        $('.expDesable_'+exid).prop('disabled', true);
        $('#experienceinfo-save_'+exid).hide();
        $('#experienceinfo-edit_'+exid).show();
    };
    $('#linkinfo-save').hide();
    $('#linkinfo-edit').show();
    $scope.myLink = true;
    $scope.linkedit = function () {
        $('#linkinfo-edit').hide();
        $('#linkinfo-save').show();
        $scope.myLink = false;
        // $('#linkinfo-facebook').prop('disabled', false);
        // $('#linkinfo-twitter').prop('disabled', false);
        // $('#linkinfo-linkedin').prop('disabled', false);
    };
    $scope.linksave = function () {
        var linkinfo = {};

        var facebook = $('#linkinfo-facebook').val();
        var skype = $('#linkinfo-skype').val();
        var twitter = $('#linkinfo-twitter').val();
        var linkedin = $('#linkinfo-linkedin').val();
        $('#linkinfo-save').hide();
        $('#linkinfo-edit').show();
        $scope.myLink = true;
        linkinfo = {facebook: facebook, twitter: twitter, linkedin: linkedin, skype: skype};
        localStorage.setItem('linkinfo', JSON.stringify(linkinfo));
        $scope.myAlert('Social infomation saved.');
    };
    $('#miscinfo-save').hide();
    $('#miscinfo-edit').show();
    $scope.myPSYP = true;
    $scope.miscedit = function () {
        $('#miscinfo-edit').hide();
        $('#miscinfo-save').show();
        $scope.myPSYP = false;
        //$('#miscinfo-description').prop('disabled', false);
    };
    $scope.miscsave = function () {
        var miscinfo = {};
        var miscdescription = $('#miscinfo-description').val();
        $('#miscinfo-save').hide();
        $('#miscinfo-edit').show();
        miscinfo = {description: miscdescription};
        //console.log(miscinfo);
        localStorage.setItem('miscinfo', JSON.stringify(miscinfo));
        $scope.myAlert('Passion details saved.');
        $scope.myPSYP = true;
        //$('#miscinfo-description').prop('disabled', true);
    };


});
//JobSeeker-fillup
start.controller('JSCollapseCtrl', function ($scope, $state, myService, $ionicModal, $ionicPopup) {

    $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $ionicModal.fromTemplateUrl('templates/modal2.html', {
        id: 1,
        scope: $scope
    }).then(function(modal) {
        $scope.modal1 = modal;
    });

    $scope.name1 = 'Personal Information';
    $scope.name2 = 'Education';
    $scope.name3 = 'Experience';
    $scope.name4 = "Social Links";
    $scope.name5 = "Please share your passion";
    $scope.radiobutton = {};
    //$scope.shownGroup2 = false;
    $scope.toggleGroup = function(x) {
        if($scope.openGroup != x){
            $scope.openGroup = x;
        }
        else{
            $scope.openGroup = 0;
        } 
    };

    $scope.radiobutton = {group1: "Male", group2: "Female"};
    var nselected = $scope.radiobutton.group1;
    $scope.onTypeChange = function () {
        nselected = $scope.radiobutton.group1;
    };

    var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
    //console.log(loginInfo);
    if (localStorage.getItem('personalinfo') !== null) {
        //console.log("Personal info Storage exist");
        var personalinfo = JSON.parse(localStorage.getItem('personalinfo'));
        $scope.radiobutton = {group1: personalinfo.gender};
        var country = personalinfo.country;
        var firstname = personalinfo.firstname;
        var lastname = personalinfo.lastname;
        var email = loginInfo.email;
        var phone = personalinfo.phone;
        var status = personalinfo.status;
        var dob = personalinfo.dob;
        var countrycode = personalinfo.countrycode;
        $scope.personalinfo = {image: "img/dummy.png", country: country, firstname: firstname, lastname: lastname, email: email, phone: phone, status: status, phonecountry:countrycode, date: new Date(dob.substring(0, 4), (dob.substring(5, 7) - 1), dob.substring(8, 10))};

    }
    else {
        //console.log("Personal info Storage not exist");
        var email = loginInfo.email;
        $scope.personalinfo = {image: "img/dummy.png", country: "", firstname: "", lastname: "", email: email, phone: "", status: "", phonecountry: ""};
    }

    $scope.test = function(){
        var country = $('#personalinfo-country').val();
        if(country=='Afghanistan'){
            $scope.personalinfo.phonecountry = '+93';
        }else if(country == "Aland Islands"){
            $scope.personalinfo.phonecountry = '+358';
        }
        else if(country == "Albania"){
            $scope.personalinfo.phonecountry = '+355';
        }
        else if(country == "Algeria"){
            $scope.personalinfo.phonecountry = '+213';
        }
        else if(country == "American Samoa"){
            $scope.personalinfo.phonecountry = '+1-684';
        }
        else if(country == "Andorra"){
            $scope.personalinfo.phonecountry = '+376';
        }
        else if(country == "Angola"){
            $scope.personalinfo.phonecountry = '+244';
        }
        else if(country == "Anguilla"){
            $scope.personalinfo.phonecountry = '+1-264';
        }
        else if(country == "Antarctica"){
            $scope.personalinfo.phonecountry = '+672';
        }
        else if(country == "Antigua And Barbuda"){
            $scope.personalinfo.phonecountry = '+1-268';
        }
        else if(country == "Argentina"){
            $scope.personalinfo.phonecountry = '+54';
        }
        else if(country == "Armenia"){
            $scope.personalinfo.phonecountry = '+374';
        }
        else if(country == "Aruba"){
            $scope.personalinfo.phonecountry = '+297';
        }
        else if(country == "Australia"){
            $scope.personalinfo.phonecountry = '+61';
        }
        else if(country == "Austria"){
            $scope.personalinfo.phonecountry = '+43';
        }
        else if(country == "Azerbaijan"){
            $scope.personalinfo.phonecountry = '+994';
        }
        else if(country == "Bahamas"){
            $scope.personalinfo.phonecountry = '+1-242';
        }
        else if(country == "Bahrain"){
            $scope.personalinfo.phonecountry = '+973';
        }
        else if(country == "Bangladesh"){
            $scope.personalinfo.phonecountry = '+880';
        }
        else if(country == "Barbados"){
            $scope.personalinfo.phonecountry = '+1-246';
        }
        else if(country == "Belarus"){
            $scope.personalinfo.phonecountry = '+375';
        }
        else if(country == "Belgium"){
            $scope.personalinfo.phonecountry = '+32';
        }
        else if(country == "Belize"){
            $scope.personalinfo.phonecountry = '+501';
        }
        else if(country == "Benin"){
            $scope.personalinfo.phonecountry = '+229';
        }
        else if(country == "Bermuda"){
            $scope.personalinfo.phonecountry = '+1-441';
        }
        else if(country == "Bhutan"){
            $scope.personalinfo.phonecountry = '+975';
        }
        else if(country == "Bolivia,Plurinational State of"){
            $scope.personalinfo.phonecountry = '+591';
        }
        else if(country == "Bonaire,Sint Eustatius and Saba"){
            $scope.personalinfo.phonecountry = '+599';
        }
        else if(country == "Bosnia and Herzegovina"){
            $scope.personalinfo.phonecountry = '+387';
        }
        else if(country == "Botswana"){
            $scope.personalinfo.phonecountry = '+267';
        }
        else if(country == "Bouvet Island"){
            $scope.personalinfo.phonecountry = '+NONE';
        }
        else if(country == "Brazil"){
            $scope.personalinfo.phonecountry = '+55';
        }
        else if(country == "British Indian Ocean Territory"){
            $scope.personalinfo.phonecountry = '+246';
        }
        else if(country == "Brunei Darussalam"){
            $scope.personalinfo.phonecountry = '+673';
        }
        else if(country == "Bulgaria"){
            $scope.personalinfo.phonecountry = '+359';
        }
        else if(country == "Burkina Faso"){
            $scope.personalinfo.phonecountry = '+226';
        }
        else if(country == "Burundi"){
            $scope.personalinfo.phonecountry = '+257';
        }
        else if(country == "Cambodia"){
            $scope.personalinfo.phonecountry = '+855';
        }
        else if(country == "Cameroon"){
            $scope.personalinfo.phonecountry = '+237';
        }
        else if(country == "Canada"){
            $scope.personalinfo.phonecountry = '+1';
        }
        else if(country == "Cape Verde"){
            $scope.personalinfo.phonecountry = '+238';
        }
        else if(country == "Cayman Islands"){
            $scope.personalinfo.phonecountry = '+1-345';
        }
        else if(country == "Central African Republic"){
            $scope.personalinfo.phonecountry = '+236';
        }
        else if(country == "Chad"){
            $scope.personalinfo.phonecountry = '+235';
        }
        else if(country == "Chile"){
            $scope.personalinfo.phonecountry = '+56';
        }
        else if(country == "China"){
            $scope.personalinfo.phonecountry = '+86';
        }
        else if(country == "Christmas Island"){
            $scope.personalinfo.phonecountry = '+61';
        }
        else if(country == "Cocos (Keeling) Islands"){
            $scope.personalinfo.phonecountry = '+682';
        }
        else if(country == "Colombia"){
            $scope.personalinfo.phonecountry = '+57';
        }
        else if(country == "Comoros"){
            $scope.personalinfo.phonecountry = '+269';
        }
        else if(country == "Congo"){
            $scope.personalinfo.phonecountry = '+242';
        }
        else if(country == "Congo,the Democratic Republic of the"){
            $scope.personalinfo.phonecountry = '+243';
        }
        else if(country == "Cook Islands"){
            $scope.personalinfo.phonecountry = '+682';
        }
        else if(country == "Costa Rica"){
            $scope.personalinfo.phonecountry = '+506';
        }
        else if(country == "Cote d'Ivoire"){
            $scope.personalinfo.phonecountry = '+225';
        }
        else if(country == "Croatia"){
            $scope.personalinfo.phonecountry = '+385';
        }
        else if(country == "Cuba"){
            $scope.personalinfo.phonecountry = '+53';
        }
        else if(country == "Cyprus"){
            $scope.personalinfo.phonecountry = '+357';
        }
        else if(country == "Czech Republic"){
            $scope.personalinfo.phonecountry = '+420';
        }
        else if(country == "Denmark"){
            $scope.personalinfo.phonecountry = '+45';
        }
        else if(country == "Djibouti"){
            $scope.personalinfo.phonecountry = '+253';
        }
        else if(country == "Dominica"){
            $scope.personalinfo.phonecountry = '+1-767';
        }
        else if(country == "Dominican Republic"){
            $scope.personalinfo.phonecountry = '+1-809';
        }
        else if(country == "Ecuador"){
            $scope.personalinfo.phonecountry = '+593';
        }
        else if(country == "Egypt"){
            $scope.personalinfo.phonecountry = '+20';
        }
        else if(country == "El Salvador"){
            $scope.personalinfo.phonecountry = '+503';
        }
        else if(country == "Equatorial Guinea"){
            $scope.personalinfo.phonecountry = '+240';
        }
        else if(country == "Eritrea"){
            $scope.personalinfo.phonecountry = '+291';
        }
        else if(country == "Estonia"){
            $scope.personalinfo.phonecountry = '+372';
        }
        else if(country == "Ethiopia"){
            $scope.personalinfo.phonecountry = '+251';
        }
        else if(country == "Falkland Islands (Malvinas)"){
            $scope.personalinfo.phonecountry = '+500';
        }
        else if(country == "Faroe Islands"){
            $scope.personalinfo.phonecountry = '+298';
        }
        else if(country == "Fiji"){
            $scope.personalinfo.phonecountry = '+679';
        }
        else if(country == "Finland"){
            $scope.personalinfo.phonecountry = '+358';
        }
        else if(country == "France"){
            $scope.personalinfo.phonecountry = '+33';
        }
        else if(country == "French Guiana"){
            $scope.personalinfo.phonecountry = '+594';
        }
        else if(country == "French Polynesia"){
            $scope.personalinfo.phonecountry = '+689';
        }
        else if(country == "French Southern Territories"){
            $scope.personalinfo.phonecountry = '+NONE';
        }
        else if(country == "Gabon"){
            $scope.personalinfo.phonecountry = '+241';
        }
        else if(country == "Gambia"){
            $scope.personalinfo.phonecountry = '+220';
        }
        else if(country == "Georgia"){
            $scope.personalinfo.phonecountry = '+995';
        }
        else if(country == "Germany"){
            $scope.personalinfo.phonecountry = '+49';
        }
        else if(country == "Ghana"){
            $scope.personalinfo.phonecountry = '+233';
        }
        else if(country == "Gibraltar"){
            $scope.personalinfo.phonecountry = '+350';
        }
        else if(country == "Greece"){
            $scope.personalinfo.phonecountry = '+30';
        }
        else if(country == "Greenland"){
            $scope.personalinfo.phonecountry = '+299';
        }
        else if(country == "Guatemala"){
            $scope.personalinfo.phonecountry = '+502';
        }
        else if(country == "Guernsey"){
            $scope.personalinfo.phonecountry = '+44-1481';
        }
        else if(country == "Guinea"){
            $scope.personalinfo.phonecountry = '+224';
        }
        else if(country == "Guinea-Bissau"){
            $scope.personalinfo.phonecountry = '+245';
        }
        else if(country == "Guyana"){
            $scope.personalinfo.phonecountry = '+592';
        }
        else if(country == "Haiti"){
            $scope.personalinfo.phonecountry = '+509';
        }
        else if(country == "Heard Island and McDonald Islands"){
            $scope.personalinfo.phonecountry = '+NONE';
        }
        else if(country == "Holy See (Vatican City State)"){
            $scope.personalinfo.phonecountry = '+379';
        }
        else if(country == "Honduras"){
            $scope.personalinfo.phonecountry = '+504';
        }
        else if(country == "Hong Kong"){
            $scope.personalinfo.phonecountry = '+852';
        }
        else if(country == "Hungary"){
            $scope.personalinfo.phonecountry = '+36';
        }
        else if(country == "Iceland"){
            $scope.personalinfo.phonecountry = '+354';
        }
        else if(country == "India"){
            $scope.personalinfo.phonecountry = '+91';
        }
        else if(country == "Indonesia"){
            $scope.personalinfo.phonecountry = '+62';
        }
        else if(country == "Iran,Islamic Republic of"){
            $scope.personalinfo.phonecountry = '+98';
        }
        else if(country == "Iraq"){
            $scope.personalinfo.phonecountry = '+964';
        }
        else if(country == "Ireland"){
            $scope.personalinfo.phonecountry = '+353';
        }
        else if(country == "Isle of Man"){
            $scope.personalinfo.phonecountry = '+44';
        }
        else if(country == "Israel"){
            $scope.personalinfo.phonecountry = '+972';
        }
        else if(country == "Italy"){
            $scope.personalinfo.phonecountry = '+39';
        }
        else if(country == "Jamaica"){
            $scope.personalinfo.phonecountry = '+1-876';
        }
        else if(country == "Japan"){
            $scope.personalinfo.phonecountry = '+81';
        }
        else if(country == "Jersey"){
            $scope.personalinfo.phonecountry = '+4-1534';
        }
        else if(country == "Jordan"){
            $scope.personalinfo.phonecountry = '+962';
        }
        else if(country == "Kazakhstan"){
            $scope.personalinfo.phonecountry = '+7';
        }
        else if(country == "Kenya"){
            $scope.personalinfo.phonecountry = '+254';
        }
        else if(country == "Kiribati"){
            $scope.personalinfo.phonecountry = '+686';
        }
        else if(country == "Korea,Democratic People's Republic of"){
            $scope.personalinfo.phonecountry = '+850';
        }
        else if(country == "Korea,Republic of"){
            $scope.personalinfo.phonecountry = '+82';
        }
        else if(country == "Kuwait"){
            $scope.personalinfo.phonecountry = '+965';
        }
        else if(country == "Kyrgyzstan"){
            $scope.personalinfo.phonecountry = '+996';
        }
        else if(country == "Lao People's Democratic Republic"){
            $scope.personalinfo.phonecountry = '+856';
        }
        else if(country == "Latvia"){
            $scope.personalinfo.phonecountry = '+371';
        }
        else if(country == "Lebanon"){
            $scope.personalinfo.phonecountry = '+961';
        }
        else if(country == "Lesotho"){
            $scope.personalinfo.phonecountry = '+266';
        }
        else if(country == "Liberia"){
            $scope.personalinfo.phonecountry = '+231';
        }
        else if(country == "Libya"){
            $scope.personalinfo.phonecountry = '+218';
        }
        else if(country == "Liechtenstein"){
            $scope.personalinfo.phonecountry = '+423';
        }
        else if(country == "Lithuania"){
            $scope.personalinfo.phonecountry = '+370';
        }
        else if(country == "Luxembourg"){
            $scope.personalinfo.phonecountry = '+352';
        }
        else if(country == "Macao"){
            $scope.personalinfo.phonecountry = '+853';
        }
        else if(country == "Macedonia,The Former Yugoslav Republic Of"){
            $scope.personalinfo.phonecountry = '+389';
        }
        else if(country == "Madagascar"){
            $scope.personalinfo.phonecountry = '+261';
        }
        else if(country == "Malawi"){
            $scope.personalinfo.phonecountry = '+265';
        }
        else if(country == "Malaysia"){
            $scope.personalinfo.phonecountry = '+60';
        }
        else if(country == "Maldives"){
            $scope.personalinfo.phonecountry = '+960';
        }
        else if(country == "Mali"){
            $scope.personalinfo.phonecountry = '+223';
        }
        else if(country == "Malta"){
            $scope.personalinfo.phonecountry = '+356';
        }
        else if(country == "Marshall Islands"){
            $scope.personalinfo.phonecountry = '+692';
        }
        else if(country == "Martinique"){
            $scope.personalinfo.phonecountry = '+596';
        }
        else if(country == "Mauritania"){
            $scope.personalinfo.phonecountry = '+222';
        }
        else if(country == "Mauritius"){
            $scope.personalinfo.phonecountry = '+230';
        }
        else if(country == "Mayotte"){
            $scope.personalinfo.phonecountry = '+262';
        }
        else if(country == "Mexico"){
            $scope.personalinfo.phonecountry = '+52';
        }
        else if(country == "Micronesia,Federated States of"){
            $scope.personalinfo.phonecountry = '+691';
        }
        else if(country == "Moldova,Republic of"){
            $scope.personalinfo.phonecountry = '+373';
        }
        else if(country == "Monaco"){
            $scope.personalinfo.phonecountry = '+377';
        }
        else if(country == "Mongolia"){
            $scope.personalinfo.phonecountry = '+976';
        }
        else if(country == "Montenegro"){
            $scope.personalinfo.phonecountry = '+382';
        }
        else if(country == "Montserrat"){
            $scope.personalinfo.phonecountry = '+1-664';
        }
        else if(country == "Morocco"){
            $scope.personalinfo.phonecountry = '+212';
        }
        else if(country == "Mozambique"){
            $scope.personalinfo.phonecountry = '+258';
        }
        else if(country == "Myanmar"){
            $scope.personalinfo.phonecountry = '+95';
        }
        else if(country == "Namibia"){
            $scope.personalinfo.phonecountry = '+264';
        }
        else if(country == "Nauru"){
            $scope.personalinfo.phonecountry = '+674';
        }
        else if(country == "Nepal"){
            $scope.personalinfo.phonecountry = '+977';
        }
        else if(country == "Netherlands"){
            $scope.personalinfo.phonecountry = '+31';
        }
        else if(country == "New Caledonia"){
            $scope.personalinfo.phonecountry = '+687';
        }
        else if(country == "New Zealand"){
            $scope.personalinfo.phonecountry = '+64';
        }
        else if(country == "Nicaragua"){
            $scope.personalinfo.phonecountry = '+505';
        }
        else if(country == "Niger"){
            $scope.personalinfo.phonecountry = '+227';
        }
        else if(country == "Nigeria"){
            $scope.personalinfo.phonecountry = '+234';
        }
        else if(country == "Niue"){
            $scope.personalinfo.phonecountry = '+683';
        }
        else if(country == "Norfolk Island"){
            $scope.personalinfo.phonecountry = '+672';
        }
        else if(country == "Northern Mariana Islands"){
            $scope.personalinfo.phonecountry = '+1-670';
        }
        else if(country == "Norway"){
            $scope.personalinfo.phonecountry = '+47';
        }
        else if(country == "Oman"){
            $scope.personalinfo.phonecountry = '+968';
        }
        else if(country == "Pakistan"){
            $scope.personalinfo.phonecountry = '+92';
        }
        else if(country == "Palau"){
            $scope.personalinfo.phonecountry = '+680';
        }
        else if(country == "Palestinian Territory,Occupied"){
            $scope.personalinfo.phonecountry = '+970';
        }
        else if(country == "Panama"){
            $scope.personalinfo.phonecountry = '+507';
        }
        else if(country == "Papua New Guinea"){
            $scope.personalinfo.phonecountry = '+675';
        }
        else if(country == "Paraguay"){
            $scope.personalinfo.phonecountry = '+595';
        }
        else if(country == "Peru"){
            $scope.personalinfo.phonecountry = '+51';
        }
        else if(country == "Philippines"){
            $scope.personalinfo.phonecountry = '+63';
        }
        else if(country == "Pitcairn"){
            $scope.personalinfo.phonecountry = '+64';
        }
        else if(country == "Poland"){
            $scope.personalinfo.phonecountry = '+48';
        }
        else if(country == "Portugal"){
            $scope.personalinfo.phonecountry = '+351';
        }
        else if(country == "Puerto Rico"){
            $scope.personalinfo.phonecountry = '+1-787';
        }
        else if(country == "Qatar"){
            $scope.personalinfo.phonecountry = '+974';
        }
        else if(country == "Reunion"){
            $scope.personalinfo.phonecountry = '+262';
        }
        else if(country == "Romania"){
            $scope.personalinfo.phonecountry = '+40';
        }
        else if(country == "Russian Federation"){
            $scope.personalinfo.phonecountry = '+7';
        }
        else if(country == "Rwanda"){
            $scope.personalinfo.phonecountry = '+250';
        }
        else if(country == "Saint Barthelemy"){
            $scope.personalinfo.phonecountry = '+590';
        }
        else if(country == "Saint Helena,Ascension and Tristan da Cunha"){
            $scope.personalinfo.phonecountry = '+290';
        }
        else if(country == "Saint Kitts and Nevis"){
            $scope.personalinfo.phonecountry = '+1-869';
        }
        else if(country == "Saint Lucia"){
            $scope.personalinfo.phonecountry = '+1-758';
        }
        else if(country == "Saint Martin (French Part)"){
            $scope.personalinfo.phonecountry = '+590';
        }
        else if(country == "Saint Pierre and Miquelon"){
            $scope.personalinfo.phonecountry = '+508';
        }
        else if(country == "Saint Vincent and the Grenadines"){
            $scope.personalinfo.phonecountry = '+1-784';
        }
        else if(country == "Samoa"){
            $scope.personalinfo.phonecountry = '+685';
        }
        else if(country == "San Marino"){
            $scope.personalinfo.phonecountry = '+378';
        }
        else if(country == "Sao Tome and Principe"){
            $scope.personalinfo.phonecountry = '+239';
        }
        else if(country == "Saudi Arabia"){
            $scope.personalinfo.phonecountry = '+966';
        }
        else if(country == "Senegal"){
            $scope.personalinfo.phonecountry = '+221';
        }
        else if(country == "Serbia"){
            $scope.personalinfo.phonecountry = '+381';
        }
        else if(country == "Seychelles"){
            $scope.personalinfo.phonecountry = '+248';
        }
        else if(country == "Sierra Leone"){
            $scope.personalinfo.phonecountry = '+232';
        }
        else if(country == "Singapore"){
            $scope.personalinfo.phonecountry = '+65';
        }
        else if(country == "Sint Maarten (Dutch Part)"){
            $scope.personalinfo.phonecountry = '+1-721';
        }
        else if(country == "Slovakia"){
            $scope.personalinfo.phonecountry = '+421';
        }
        else if(country == "Slovenia"){
            $scope.personalinfo.phonecountry = '+386';
        }
        else if(country == "Solomon Islands"){
            $scope.personalinfo.phonecountry = '+677';
        }
        else if(country == "Somalia"){
            $scope.personalinfo.phonecountry = '+252';
        }
        else if(country == "South Africa"){
            $scope.personalinfo.phonecountry = '+27';
        }
        else if(country == "South Georgia and the South Sandwich Islands"){
            $scope.personalinfo.phonecountry = '+500';
        }
        else if(country == "South Sudan"){
            $scope.personalinfo.phonecountry = '+211';
        }
        else if(country == "Spain"){
            $scope.personalinfo.phonecountry = '+34';
        }
        else if(country == "Sri Lanka"){
            $scope.personalinfo.phonecountry = '+94';
        }
        else if(country == "Sudan"){
            $scope.personalinfo.phonecountry = '+249';
        }
        else if(country == "Suriname"){
            $scope.personalinfo.phonecountry = '+597';
        }
        else if(country == "Svalbard and Jan Mayen"){
            $scope.personalinfo.phonecountry = '+47';
        }
        else if(country == "Swaziland"){
            $scope.personalinfo.phonecountry = '+268';
        }
        else if(country == "Sweden"){
            $scope.personalinfo.phonecountry = '+46';
        }
        else if(country == "Switzerland"){
            $scope.personalinfo.phonecountry = '+41';
        }
        else if(country == "Syrian Arab Republic"){
            $scope.personalinfo.phonecountry = '+963';
        }
        else if(country == "Taiwan,Province of China"){
            $scope.personalinfo.phonecountry = '+886';
        }
        else if(country == "Tajikistan"){
            $scope.personalinfo.phonecountry = '+992';
        }
        else if(country == "Tanzania,United Republic of"){
            $scope.personalinfo.phonecountry = '+255';
        }
        else if(country == "Thailand"){
            $scope.personalinfo.phonecountry = '+66';
        }
        else if(country == "Timor-Leste"){
            $scope.personalinfo.phonecountry = '+670';
        }
        else if(country == "Togo"){
            $scope.personalinfo.phonecountry = '+228';
        }
        else if(country == "Tokelau"){
            $scope.personalinfo.phonecountry = '+690';
        }
        else if(country == "Tonga"){
            $scope.personalinfo.phonecountry = '+676';
        }
        else if(country == "Trinidad and Tobago"){
            $scope.personalinfo.phonecountry = '+1-868';
        }
        else if(country == "Tunisia"){
            $scope.personalinfo.phonecountry = '+216';
        }
        else if(country == "Turkey"){
            $scope.personalinfo.phonecountry = '+90';
        }
        else if(country == "Turkmenistan"){
            $scope.personalinfo.phonecountry = '+993';
        }
        else if(country == "Turks and Caicos Islands"){
            $scope.personalinfo.phonecountry = '+1-649';
        }
        else if(country == "Tuvalu"){
            $scope.personalinfo.phonecountry = '+688';
        }
        else if(country == "Uganda"){
            $scope.personalinfo.phonecountry = '+256';
        }
        else if(country == "Ukraine"){
            $scope.personalinfo.phonecountry = '+380';
        }
        else if(country == "United Arab Emirates"){
            $scope.personalinfo.phonecountry = '+971';
        }
        else if(country == "United Kingdom"){
            $scope.personalinfo.phonecountry = '+44';
        }
        else if(country == "United States"){
            $scope.personalinfo.phonecountry = '+1';
        }
        else if(country == "United States Minor Outlying Islands"){
            $scope.personalinfo.phonecountry = '+NONE';
        }
        else if(country == "Uruguay"){
            $scope.personalinfo.phonecountry = '+598';
        }
        else if(country == "Uzbekistan"){
            $scope.personalinfo.phonecountry = '+998';
        }
        else if(country == "Vanuatu"){
            $scope.personalinfo.phonecountry = '+678';
        }
        else if(country == "Venezuela,Bolivarian Republic of"){
            $scope.personalinfo.phonecountry = '+58';
        }
        else if(country == "Viet Nam"){
            $scope.personalinfo.phonecountry = '+84';
        }
        else if(country == "Virgin Islands,British"){
            $scope.personalinfo.phonecountry = '+1-284';
        }
        else if(country == "Virgin Islands,U.S."){
            $scope.personalinfo.phonecountry = '+1-340';
        }
        else if(country == "Wallis and Futuna"){
            $scope.personalinfo.phonecountry = '+681';
        }
        else if(country == "Western Sahara"){
            $scope.personalinfo.phonecountry = '+212';
        }
        else if(country == "Yemen"){
            $scope.personalinfo.phonecountry = '+967';
        }
        else if(country == "Zambia"){
            $scope.personalinfo.phonecountry = '+260';
        }
        else if(country == "Zimbabwe"){
            $scope.personalinfo.phonecountry = '+263';
        }
        else{
            $scope.personalinfo.phonecountry = '';
        }
    }

    if (localStorage.getItem('linkinfo') !== null) {
        // console.log("Link info Storage exist");
        var linkinfo = JSON.parse(localStorage.getItem('linkinfo'));
        var skype = linkinfo.skype;
        var facebook = linkinfo.facebook;
        var twitter = linkinfo.twitter;
        var linkedin = linkinfo.linkedin;


        $scope.link = {facebook: facebook, twitter: twitter, linkedin: linkedin, skype:skype};

    }
    else {
        //console.log("Link info Storage not exist");

        $scope.link = {facebook: "", twitter: "", linkedin: "", skype: ""};
    }

    $('.newExp1').css("display","none");
    $('.newExp2').css("display","none");
    $('.expAddBtn').css("display","none");
    $('.eduAddBtn').css("display","none");
    $('.newEdu1').css("display","none");
    $('.newEdu2').css("display","none");

    if (localStorage.getItem('miscinfo') !== null) {
        //console.log("Misc info Storage exist");
        var miscinfo = JSON.parse(localStorage.getItem('miscinfo'));

        var description = miscinfo.description;

        $scope.misc = {description: description};

    }
    else {
        //console.log("Misc info Storage not exist");

        $scope.misc = {description: ""};
    }

    $scope.go = function () {
        var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
        var user_id = loginInfo.user_id;
        var personalinfo = JSON.parse(localStorage.getItem('personalinfo'));
        var educationinfo = JSON.parse(localStorage.getItem('educationinfo'));
        var experienceinfo = JSON.parse(localStorage.getItem('experienceinfo'));
        console.log(experienceinfo);
        var linkinfo = JSON.parse(localStorage.getItem('linkinfo'));
        var miscinfo = JSON.parse(localStorage.getItem('miscinfo'));

        var main = {};
        main['personalinfo'] = personalinfo;
        main['educationinfo'] = educationinfo;
        main['experienceinfo'] = experienceinfo;
        main['linkinfo'] = linkinfo;
        main['miscinfo'] = miscinfo;

        myService.jobseeker_signup = [];
        myService.jobseeker_signup.push(main);
        console.log(myService.jobseeker_signup);
        myService.jobseeker_personalinfo = personalinfo;

        var edu = {};
        edu['educationinfo'] = educationinfo;
        myService.jobseeker_educationinfo = [];
        myService.jobseeker_educationinfo.push(edu);

        var exp = {};
        exp['experienceinfo'] = experienceinfo;
        myService.jobseeker_experienceinfo = [];
        myService.jobseeker_experienceinfo.push(exp);
        console.log(myService.jobseeker_experienceinfo);

        myService.jobseeker_linkinfo = linkinfo;
        myService.jobseeker_miscinfo = miscinfo;
        if(personalinfo != null && educationinfo != null && experienceinfo != null && miscinfo != null){
            $.ajax({
                method: "POST",
                dataType: "json",
                data: {personal: personalinfo, education: educationinfo, experience: experienceinfo, social: linkinfo, misc: miscinfo, userid: user_id},
                url: "http://www.primefield.co/jobsearch/savepreview.php"
            }).then(function (data) {
                $state.go('jobseeker-video');
            });
        }else{
            $scope.myAlert('Please fill the all fields');
        }    
    };

    $scope.myAlert = function(msg){
        $ionicPopup.alert({
         title: 'Alert',
         template: ''+msg
        });
    }

    $scope.months = ["01","02","03","04","05","06","07","08","09","10","11","12"];
    $scope.timestartMonth = '01';
    $scope.timeendMonth = '01';

    localStorage.removeItem("educationinfo");
    localStorage.removeItem("experienceinfo");

    var dateYear = new Date().getFullYear();
    $scope.years = [];
    for( i = 1950; i <= dateYear; i++ ) {
        $scope.years.push(""+i);
    }
    $scope.timestartYear = "1950";
    $scope.timeendYear = "1950";
    $scope.eduCount = 3;
    $scope.expCount = 3;

    $scope.personalsave = function () {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var personalinfo = {};
        var image = $('#p-img').attr('src');
        //console.log(image);
        var gender = nselected;
        var country = $('#personalinfo-country').val();
        var firstname = $('#personalinfo-firstname').val();
        var lastname = $('#personalinfo-lastname').val();
        var email = $('#personalinfo-email').val();
        var phone = $('#personalinfo-phone').val();
        var status = $('#personalinfo-status').val();
        var dob = $('#personalinfo-date').val();
        var countrycode = $('#personalinfo-phonecountry').val();

        if(dob == '' && firstname == '' && lastname == '' && email == '' && phone == '' && status == ''){
            $scope.myAlert('Please fill the all fields');
        }else if(country == ''){
            $scope.myAlert('Please slect the Country');
        }else if(firstname == ''){
            $scope.myAlert('Please enter the First Name');
        }else if(lastname == ''){
            $scope.myAlert('Please enter the Last Name');
        }else if(email == '' && !regex.test(email)){
            $scope.myAlert('Please enter the valid email address');
        }else if(phone == ''){
            $scope.myAlert('Please enter the Phone Number');
        }else if(status == ''){
            $scope.myAlert('Please enter the Marital Status');
        }else if(dob == ''){
            $scope.myAlert('Please enter your Date of Birth');
        }else{

            personalinfo = {image: image, firstname: firstname, lastname: lastname, country: country, email: email, phone: phone, status: status, dob: dob, gender: gender, countrycode: countrycode};

            // console.log(personalinfo);
            localStorage.setItem('personalinfo', JSON.stringify(personalinfo));
            $scope.myAlert('Personal infomation saved.');
        }    
    };

    $scope.eduRemove = function (r) {
        if(confirm('Would you like to delete it') == true){
            $scope.disCount = $scope.disCount-1;
            var educationinfo = JSON.parse(localStorage.getItem('educationinfo'));
            if( educationinfo.length == 2 ){
                educationinfo.splice(1, 1);
                console.log(educationinfo);
                localStorage.removeItem("educationinfo");
                localStorage.setItem('educationinfo', JSON.stringify(educationinfo));
                educationinfo = JSON.parse(localStorage.getItem('educationinfo'));
                console.log(educationinfo);
                $('.newEdu'+r).css("display","none");
                $scope.maxEdu = false;
            } else {
                educationinfo.splice(r, 1);
                console.log(educationinfo);
                localStorage.removeItem("educationinfo");
                localStorage.setItem('educationinfo', JSON.stringify(educationinfo));
                educationinfo = JSON.parse(localStorage.getItem('educationinfo'));
                console.log(educationinfo);
                $('.newEdu'+r).css("display","none");
                $scope.maxEdu = false;
                eduArray = [];
            }
            $scope.eduCount = 2;
            $('.eduAddBtn').css("display","block");
        }    
    };
    $scope.expRemove = function (r) {
        if(confirm('Would you like to delete it') == true){
            $scope.disCountExp = $scope.disCountExp-1;
            var experienceinfo = JSON.parse(localStorage.getItem('experienceinfo'));
            if( experienceinfo.length == 2 ){
                experienceinfo.splice(1, 1);
                console.log(experienceinfo);
                localStorage.removeItem("experienceinfo");
                localStorage.setItem('experienceinfo', JSON.stringify(experienceinfo));
                experienceinfo = JSON.parse(localStorage.getItem('experienceinfo'));
                console.log(experienceinfo);
                $('.newExp'+r).css("display","none");
                $scope.maxExp = false;
            } else {
                experienceinfo.splice(r, 1);
                console.log(experienceinfo);
                localStorage.removeItem("experienceinfo");
                localStorage.setItem('experienceinfo', JSON.stringify(experienceinfo));
                experienceinfo = JSON.parse(localStorage.getItem('experienceinfo'));
                console.log(experienceinfo);
                $('.newExp'+r).css("display","none");
                $scope.maxExp = false;
            }
            $scope.expCount = 2;
            $('.expAddBtn').css("display","block");
        }    
    };

    $scope.myEduEdit = function(){
        $scope.saveEduBtn = 0;
    }
    $scope.myExpEdit = function(){
        $scope.saveExpBtn1 = 0;
    }
    var eduArray = [];
    $scope.disCount = 1;
    $scope.maxEdu = false;
    $scope.saveEduBtn = false;
    var educationinfo = {};
    $scope.educationsave = function (edu) {
        var educationinfo = JSON.parse(localStorage.getItem('educationinfo'));
        if( educationinfo != null ) {
            localStorage.removeItem("educationinfo");
            var school = $('#educationinfo-school'+edu).val();
            var year = $('#educationinfo-year'+edu).val();
            var degree = $('#educationinfo-degree'+edu).val();
            var country = $('#educationinfo-country'+edu).val();
            var specialization = $('#educationinfo-specialization'+edu).val();
            var activities = $('#educationinfo-activities'+edu).val();

            if(school == '' && year == '' && degree == '' && country == '' && specialization == '' && activities == ''){
              $scope.myAlert('Please fill the all fields');  
            }else if(country == ''){
                $scope.myAlert('Please slect the Country');
            }else if(school == ''){
                $scope.myAlert('Please enter the School Name');
            }else if(year == ''){
                $scope.myAlert('Please enter the Year Graduated');
            }else if(degree == ''){
                $scope.myAlert('Please enter the Degree');
            }else if(specialization == ''){
                $scope.myAlert('Please enter the Specialization');
            }else if(activities == ''){
                $scope.myAlert('Please enter your Activities and Societies');
            }else{
                if( educationinfo.length == 2 ) {
                    educationinfo[1].school = school;
                    educationinfo[1].degree = degree;
                    educationinfo[1].specialization = specialization;
                    educationinfo[1].year = year;
                    educationinfo[1].country = country;
                    educationinfo[1].activities = activities;
                    localStorage.setItem('educationinfo', JSON.stringify(educationinfo));
                    educationinfo = JSON.parse(localStorage.getItem('educationinfo'));
                    console.log(educationinfo);
                    $scope.myAlert('Educational infomation saved.');
                } else {
                    educationinfo[edu].school = school;
                    educationinfo[edu].degree = degree;
                    educationinfo[edu].specialization = specialization;
                    educationinfo[edu].year = year;
                    educationinfo[edu].country = country;
                    educationinfo[edu].activities = activities;
                    localStorage.setItem('educationinfo', JSON.stringify(educationinfo));
                    educationinfo = JSON.parse(localStorage.getItem('educationinfo'));
                    console.log(educationinfo);
                    $scope.myAlert('Educational infomation saved.');
                }
            } 
        } else {
            var school = $('#educationinfo-school0').val();
            var year = $('#educationinfo-year0').val();
            var degree = $('#educationinfo-degree0').val();
            var country = $('#educationinfo-country0').val();
            var specialization = $('#educationinfo-specialization0').val();
            var activities = $('#educationinfo-activities0').val();

            if(school == '' && year == '' && degree == '' && country == '' && specialization == '' && activities == ''){
              $scope.myAlert('Please fill the all fields');  
            }else if(country == ''){
                $scope.myAlert('Please slect the Country');
            }else if(school == ''){
                $scope.myAlert('Please enter the School Name');
            }else if(year == ''){
                $scope.myAlert('Please enter the Year Graduated');
            }else if(degree == ''){
                $scope.myAlert('Please enter the Degree');
            }else if(specialization == ''){
                $scope.myAlert('Please enter the Specialization');
            }else if(activities == ''){
                $scope.myAlert('Please enter your Activities and Societies');
            }else{
                //$scope.saveEduBtn = true;
                educationinfo = {school: school, degree: degree, specialization: specialization, year: year, country: country, activities: activities};
                eduArray.push(educationinfo);
                //console.log(educationinfo);
                localStorage.setItem('educationinfo', JSON.stringify(eduArray));
                $scope.educounter = eduArray.length + 1;
                if($scope.disCount === 3){
                    $scope.maxEdu = true;
                }
                $('.eduAddBtn').css("display","block");
                $scope.myAlert('Educational infomation saved.');
            }    
        }    
    };

    $scope.addNewEdu = function(u) {
        var educationinfo = JSON.parse(localStorage.getItem('educationinfo'));
        var length = educationinfo.length;
        educationinfo.push(u);
        console.log(u);
        localStorage.setItem('educationinfo', JSON.stringify(educationinfo));
        educationinfo = JSON.parse(localStorage.getItem('educationinfo'));
        if(educationinfo.length === 3){
            $('.eduAddBtn').css("display","none");
        }
        if( length == 2 ) {
            if( $('.newEdu1').css('display') == 'none' ) {
                var temp = educationinfo[1];
                educationinfo.splice(1, 1);
                educationinfo.push(temp);
                localStorage.removeItem("educationinfo");
                localStorage.setItem('educationinfo', JSON.stringify(educationinfo));
                $('#educationinfo-school1').val(educationinfo[1].school)
                $('#educationinfo-year1').val(educationinfo[1].year)
                $('#educationinfo-country1').val(educationinfo[1].country)
                $('#educationinfo-degree1').val(educationinfo[1].degree)
                $('#educationinfo-specialization1').val(educationinfo[1].specialization)
                $('#educationinfo-activities1').val(educationinfo[1].activities)
                
                $('#educationinfo-school2').val(educationinfo[2].school)
                $('#educationinfo-year2').val(educationinfo[2].year)
                $('#educationinfo-country2').val(educationinfo[2].country)
                $('#educationinfo-degree2').val(educationinfo[2].degree)
                $('#educationinfo-specialization2').val(educationinfo[2].specialization)
                $('#educationinfo-activities2').val(educationinfo[2].activities)
                $('.newEdu1').css("display","block");
            } else {
                $('#educationinfo-school'+$scope.disCount).val(u.school);
                $('#educationinfo-year'+$scope.disCount).val(u.year);
                $('#educationinfo-country'+$scope.disCount).val(u.country);
                $('#educationinfo-degree'+$scope.disCount).val(u.degree);
                $('#educationinfo-specialization'+$scope.disCount).val(u.specialization);
                $('#educationinfo-activities'+$scope.disCount).val(u.activities);
            }
        } else {
            $('#educationinfo-school'+$scope.disCount).val(u.school);
            $('#educationinfo-year'+$scope.disCount).val(u.year);
            $('#educationinfo-country'+$scope.disCount).val(u.country);
            $('#educationinfo-degree'+$scope.disCount).val(u.degree);
            $('#educationinfo-specialization'+$scope.disCount).val(u.specialization);
            $('#educationinfo-activities'+$scope.disCount).val(u.activities);
        }
        $scope.eduCount = 3;
        $('.newEdu'+$scope.disCount).css("display","block");
        $scope.modal.hide();

        $scope.educounter = eduArray.length;
        if($scope.disCount == 1 || $scope.disCount == 2){
            $scope.disCount = 1+$scope.disCount;
        }
        $('#Modaleducationinfo-school').val('');
        $('#Modaleducationinfo-year').val('');
        $('#Modaleducationinfo-country').val('');
        $('#Modaleducationinfo-degree').val('');
        $('#Modaleducationinfo-specialization').val('');
        $('#Modaleducationinfo-activities').val('');
        $('#eduModal').find('.has-input').removeClass('has-input');
    };
    
    var expArray = [];
    $scope.disCountExp = 1;
    $scope.maxExp = false;
    $scope.saveEduBtn1 = false;
    var experienceinfo = {};
    $scope.experiencesave = function (evet, exp) {
        var experienceinfo = JSON.parse(localStorage.getItem('experienceinfo'));
        if(experienceinfo != null){
            localStorage.removeItem("experienceinfo");
            var companyname = $('#experienceinfo-company'+exp).val();
            var title = $('#experienceinfo-title'+exp).val();
            var location = $('#experienceinfo-location'+exp).val();
            var timestart = $('#experienceinfo-timestartYear'+exp).val()+"-"+$('#experienceinfo-timestartMonth'+exp).val();
            var timeend = $('#experienceinfo-timeendYear'+exp).val()+"-"+$('#experienceinfo-timeendMonth'+exp).val();
            var description = $('#experienceinfo-description'+exp).val();
            var country = $('#experienceinfo-country'+exp).val();
            var highlights = $('#experienceinfo-highlights'+exp).val();

            if(companyname == '' && title == '' && location == '' && timestart == '' && timeend == '' && description == '' && country == '' && highlights == ''){
                $scope.myAlert('Please fill the all fields');
            }else if(companyname == ''){
                $scope.myAlert('Please enter the Company Name');
            }else if(title == ''){
                $scope.myAlert('Please enter the Title');
            }else if(location == ''){
                $scope.myAlert('Please enter the Location');
            }else if(timestart == ''){
                $scope.myAlert('Please enter the From');
            }else if(timeend == ''){
                $scope.myAlert('Please enter the To');
            }else if(description == ''){
                $scope.myAlert('Please enter your Description');
            }else if(country == ''){
                $scope.myAlert('Please enter your Country');
            }else if(highlights == ''){
                $scope.myAlert('Please enter your Key Highlights');
            }else{
                if( experienceinfo.length == 2 ) {
                    experienceinfo[1].companyname = companyname;
                    experienceinfo[1].title = title;
                    experienceinfo[1].location = location;
                    experienceinfo[1].location = location;
                    experienceinfo[1].timestart = timestart;
                    experienceinfo[1].timeend = timeend;
                    experienceinfo[1].description = description;
                    experienceinfo[1].country = country;
                    experienceinfo[1].highlights = highlights;
                    localStorage.setItem('experienceinfo', JSON.stringify(experienceinfo));
                    $scope.myAlert('Experience infomation saved.');
                    experienceinfo = JSON.parse(localStorage.getItem('experienceinfo'));
                    console.log(experienceinfo);
                } else {
                    experienceinfo[exp].companyname = companyname;
                    experienceinfo[exp].title = title;
                    experienceinfo[exp].location = location;
                    experienceinfo[exp].location = location;
                    experienceinfo[exp].timestart = timestart;
                    experienceinfo[exp].timeend = timeend;
                    experienceinfo[exp].description = description;
                    experienceinfo[exp].country = country;
                    experienceinfo[exp].highlights = highlights;
                    localStorage.setItem('experienceinfo', JSON.stringify(experienceinfo));
                    $scope.myAlert('Experience infomation saved.');
                    experienceinfo = JSON.parse(localStorage.getItem('experienceinfo'));
                    console.log(experienceinfo);
                }
            }
        } else {
            if($scope.disCountExp === 3){
                $scope.maxExp = true;
            }
            localStorage.removeItem("experienceinfo");
            var companyname = $('#experienceinfo-company0').val();
            var title = $('#experienceinfo-title0').val();
            var location = $('#experienceinfo-location0').val();
            var timestart = $('#experienceinfo-timestartYear0').val()+"-"+$('#experienceinfo-timestartMonth0').val();
            var timeend = $('#experienceinfo-timeendYear0').val()+"-"+$('#experienceinfo-timestartMonth0').val();
            var description = $('#experienceinfo-description0').val();
            var country = $('#experienceinfo-country0').val();
            var highlights = $('#experienceinfo-highlights0').val();

            if(companyname == '' && title == '' && location == '' && timestart == '' && timeend == '' && description == '' && country == '' && highlights == ''){
                $scope.myAlert('Please fill the all fields');
            }else if(companyname == ''){
                $scope.myAlert('Please enter the Company Name');
            }else if(title == ''){
                $scope.myAlert('Please enter the Title');
            }else if(location == ''){
                $scope.myAlert('Please enter the Location');
            }else if(timestart == ''){
                $scope.myAlert('Please enter the From');
            }else if(timeend == ''){
                $scope.myAlert('Please enter the To');
            }else if(description == ''){
                $scope.myAlert('Please enter your Description');
            }else if(country == ''){
                $scope.myAlert('Please enter your Country');
            }else if(highlights == ''){
                $scope.myAlert('Please enter your Key Highlights');
            }else{
                experienceinfo = {companyname: companyname, title: title, location: location, timestart: timestart, timeend: timeend, description: description, country:country, highlights:highlights};
                expArray.push(experienceinfo);
                localStorage.setItem('experienceinfo', JSON.stringify(expArray));
                $scope.myAlert('Experience infomation saved.');
                $('.expAddBtn').css("display","block");
                $scope.expcounter = expArray.length;
            }  
        } 
    };

    $scope.addNewExp = function(u) {
        var timestart = u.timestartYear+"-"+u.timestartMonth;
        var timeend = u.timeendYear+"-"+u.timeendMonth;
        var experienceinfonew = {companyname: u.companyname, title: u.title, location: u.location, timestart: timestart, timeend: timeend, description: u.description, country: u.country, highlights: u.highlights};
        console.log(experienceinfonew);
        var experienceinfo = JSON.parse(localStorage.getItem('experienceinfo'));
        var length = experienceinfo.length;
        experienceinfo.push(experienceinfonew);
        localStorage.setItem('experienceinfo', JSON.stringify(experienceinfo));
        experienceinfo = JSON.parse(localStorage.getItem('experienceinfo'));
        console.log(experienceinfo);
        $scope.expcounter = expArray.length;
        if(experienceinfo.length === 3){
            $('.expAddBtn').css("display","none");
        }
        if( length == 2 ) {
            if( $('.newExp1').css('display') == 'none' ) {
                var temp = experienceinfo[1];
                experienceinfo.splice(1, 1);
                experienceinfo.push(temp);
                localStorage.removeItem("educationinfo");
                localStorage.setItem('experienceinfo', JSON.stringify(experienceinfo));
                $('#experienceinfo-company1').val(experienceinfo[1].companyname)
                $('#experienceinfo-title1').val(experienceinfo[1].title)
                $('#experienceinfo-location1').val(experienceinfo[1].location)
                $('#experienceinfo-country1').val(experienceinfo[1].country)
                var timestart = experienceinfo[1].timestart.split('-');
                var timeend = experienceinfo[1].timeend.split('-');
                $('#experienceinfo-timestartMonth1').val(timestart[1])
                $('#experienceinfo-timestartYear1').val(timestart[0])
                $('#experienceinfo-timeendMonth1').val(timeend[1])
                $('#experienceinfo-timeendYear1').val(timeend[0])
                $('#experienceinfo-description1').val(experienceinfo[1].description)
                $('#experienceinfo-highlights1').val(experienceinfo[1].highlights)
                $('#experienceinfo-company2').val(experienceinfo[2].companyname)
                $('#experienceinfo-title2').val(experienceinfo[2].title)
                $('#experienceinfo-location2').val(experienceinfo[2].location)
                $('#experienceinfo-country2').val(experienceinfo[2].country)
                var timestart1 = experienceinfo[2].timestart.split('-');
                var timeend1 = experienceinfo[2].timeend.split('-');
                $('#experienceinfo-timestartMonth2').val(timestart1[1])
                $('#experienceinfo-timestartYear2').val(timestart1[0])
                $('#experienceinfo-timeendMonth2').val(timeend1[1])
                $('#experienceinfo-timeendYear2').val(timeend1[0])
                $('#experienceinfo-description2').val(experienceinfo[2].description)
                $('#experienceinfo-highlights2').val(experienceinfo[2].highlights)
                $('.newExp1').css("display","block");
            } else {
                $('#experienceinfo-company'+$scope.disCountExp).val(u.companyname)
                $('#experienceinfo-title'+$scope.disCountExp).val(u.title)
                $('#experienceinfo-location'+$scope.disCountExp).val(u.location)
                $('#experienceinfo-country'+$scope.disCountExp).val(u.country)
                $('#experienceinfo-timestartMonth'+$scope.disCountExp).val(u.timestartMonth)
                $('#experienceinfo-timestartYear'+$scope.disCountExp).val(u.timestartYear)
                $('#experienceinfo-timeendMonth'+$scope.disCountExp).val(u.timeendMonth)
                $('#experienceinfo-timeendYear'+$scope.disCountExp).val(u.timeendYear)
                $('#experienceinfo-description'+$scope.disCountExp).val(u.description)
                $('#experienceinfo-highlights'+$scope.disCountExp).val(u.highlights)
            }
        } else {
            $('#experienceinfo-company'+$scope.disCountExp).val(u.companyname)
            $('#experienceinfo-title'+$scope.disCountExp).val(u.title)
            $('#experienceinfo-location'+$scope.disCountExp).val(u.location)
            $('#experienceinfo-country'+$scope.disCountExp).val(u.country)
            $('#experienceinfo-timestartMonth'+$scope.disCountExp).val(u.timestartMonth)
            $('#experienceinfo-timestartYear'+$scope.disCountExp).val(u.timestartYear)
            $('#experienceinfo-timeendMonth'+$scope.disCountExp).val(u.timeendMonth)
            $('#experienceinfo-timeendYear'+$scope.disCountExp).val(u.timeendYear)
            $('#experienceinfo-description'+$scope.disCountExp).val(u.description)
            $('#experienceinfo-highlights'+$scope.disCountExp).val(u.highlights)
        }
        $scope.expCount = 3;
        $('.newExp'+$scope.disCountExp).css("display","block");
        if($scope.disCountExp == 1 || $scope.disCountExp == 2){
            $scope.disCountExp = 1+$scope.disCountExp;
        } 
        $('#Modalexperienceinfo-company').val('')
        $('#Modalexperienceinfo-title').val('')
        $('#Modalexperienceinfo-location').val('')
        $('#Modalexperienceinfo-country').val('')
        $('#Modalexperienceinfo-timestartMonth').val('')
        $('#Modalexperienceinfo-timestartYear').val('')
        $('#Modalexperienceinfo-timeendMonth').val('')
        $('#Modalexperienceinfo-timeendYear').val('')
        $('#Modalexperienceinfo-description').val('');
        $('#Modalexperienceinfo-highlights').val('');
        $('#expModal').find('.has-input').removeClass('has-input');
        $scope.modal1.hide();
    }

    $scope.linksave = function () {
        var linkinfo = {};

        var facebook = $('#linkinfo-facebook').val();
        var skype = $('#linkinfo-skype').val();
        var twitter = $('#linkinfo-twitter').val();
        var linkedin = $('#linkinfo-linkedin').val();

        // if(facebook == '' &&  skype == '' && twitter == '' && linkedin == ''){
        //    $scope.myAlert('Please fill the all fields'); 
        // }else if(facebook == ''){
        //     $scope.myAlert('Please enter your Facebook');
        // }else if(skype == ''){
        //     $scope.myAlert('Please enter your skype Id');
        // }else if(twitter == ''){
        //     $scope.myAlert('Please enter your Twitter Id');
        // }else if(linkedin == ''){
        //     $scope.myAlert('Please enter Your linkedin');
        // }else{

            linkinfo = {facebook: facebook, twitter: twitter, linkedin: linkedin, skype: skype};

            //console.log(linkinfo);
            localStorage.setItem('linkinfo', JSON.stringify(linkinfo));
            $scope.myAlert('Social infomation saved.');
        //}
    };

    $scope.miscsave = function () {
        var miscinfo = {};

        var miscdescription = $('#miscinfo-description').val();
        if( miscdescription == '' ){
            $scope.myAlert('Please enter the about your passion'); 
        }else{
            miscinfo = {description: miscdescription};
            //console.log(miscinfo);
            localStorage.setItem('miscinfo', JSON.stringify(miscinfo));
             $scope.myAlert('Passion details saved.');
        }    
    };
});

//Jobseeker-video
start.controller('JSVideoCtrl', function ($scope, $state, $http, myService) {
//    console.log(myService.jobseeker_signup);
//    console.log(myService.jobseeker_personalinfo);
//    console.log(myService.jobseeker_educationinfo);
//    console.log(myService.jobseeker_experienceinfo);
//    console.log(myService.jobseeker_linkinfo);
//    console.log(myService.jobseeker_miscinfo);
});

//viewEprofile
start.controller('viewEprofile', function ($scope, $http, myService, $state, $ionicPopup) {
    $scope.name1 = 'Company Information';
    $scope.name2 = 'Job Information';
    $scope.disablethis = 1;
    var data = JSON.parse(localStorage.getItem("viewEmp"));
    console.log(data)
    $scope.company = data;
    $scope.company.deadline = new Date(data.deadline);
    console.log($scope.company);

    var cPath = 'http://www.primefield.co/jobsearch/companyImage/com_'+$scope.company.userid+'.jpg?timestamp='+new Date().getTime();
    var cVideoPath = 'http://www.primefield.co/jobsearch/videos/'+$scope.company.userid+'.jpg?timestamp='+new Date().getTime();
    var jVideoPath = 'http://www.primefield.co/jobsearch/videos/'+$scope.company.jobid+'.jpg?timestamp='+new Date().getTime();
    $('#p-img').attr('src',cPath);
    $('#p-video').attr('src',cVideoPath);
    $('#p-video').attr('onclick', 'openFile(\'https://s3-ap-southeast-1.amazonaws.com/video1.123/' + $scope.company.userid + '.3gp\')');
    $('#Job-img').attr('src',jVideoPath);
    $('#Job-img').attr('onclick', 'openFile(\'https://s3-ap-southeast-1.amazonaws.com/video1.123/' + $scope.company.jobid + '.3gp\')');
    

    $scope.toggleGroup = function(x) {
        if($scope.openGroup != x){
            $scope.openGroup = x;
        }
        else{
            $scope.openGroup = 0;
        } 
    };

    $scope.myAlert = function(msg){
        $ionicPopup.alert({
         title: 'Alert',
         template: ''+msg
        });
    }

    $scope.apply = function () {
        //$scope.applyhide = !$scope.applyhide;
        console.log(localStorage.getItem("userID"));
        console.log($scope.company.jobid);
        

        $.ajax({
            method: "POST",
            dataType: "json",
            data: {userid: localStorage.getItem("userID"), jobid:$scope.company.jobid},
            url: "http://www.primefield.co/jobsearch/apply.php"
        }).then(function (data) {
            if( data.status == '1' ) {
                $state.go('jobseeker-applyvideo');
            } else {
                $scope.myAlert('You have already applyed this job...');
            }
        }); 
    };
});

start.controller('EMainCtrl', function ($scope, $state, $http, myService, $ionicLoading) {
    //console.log(myService.employer_company);
    //$scope.company = myService.employer_company;
    var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
    var user_id = loginInfo.user_id;
    // $ionicLoading.show({
    //   template: 'Loading...'
    // });
    $.ajax({
        method: "POST",
        dataType: "json",
        data: {userid: user_id},
        url: "http://www.primefield.co/jobsearch/viewemployerprofile.php"
    }).then(function (data) {
        $scope.companyName = data.company.companyname;
        console.log($scope.companyName)
        angular.element(document).ready(function () {
            $('.companyName').text($scope.companyName);
        })
        myService.employer_company = data.company;
        var path = 'http://www.primefield.co/jobsearch/companyImage/com_' + localStorage.getItem("userID") + '.jpg?timestamp='+new Date().getTime();
        var Vpath = 'http://www.primefield.co/jobsearch/videos/' + localStorage.getItem("userID") + '.jpg?timestamp='+new Date().getTime();
        $('#p-img').attr('src',path);
        $('#p-video').attr('src',Vpath);
        $('#p-video').attr('onclick', 'openFile(\'https://s3-ap-southeast-1.amazonaws.com/video1.123/' + localStorage.getItem("userID") + '.3gp\')');
        //$ionicLoading.hide();
    });


});

//Employer-stats
start.controller('Estatsctrl', function ($scope, $http, myService, $state, $ionicPopup) {
    var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
    var user_id = loginInfo.user_id;
    
    $http({
        url: 'http://primefield.co/jobsearch/checkCredits.php?userid='+loginInfo.user_id, 
        method: "GET"
     }).then(function(r){
        //console.log(r.data.CreditsCount);
        $scope.myCredits = r.data.CreditsCount
    })

    $.ajax({
        method: "POST",
        dataType: "json",
        data: {userid: user_id},
        url: "http://www.primefield.co/jobsearch/getstats.php"
    }).then(function (data) {
        console.log(data.view[0].jobcount);
        $scope.totalJob = data.view[0].jobcount;
        $scope.liveJob = data.view[0].livejob;
        $scope.views = data.view[0].viewCount;
        $scope.applicats = data.view[0].applyCount;
        $scope.shortlist =data.view[0].shortlisted;
        $scope.$apply();
    }); 

    $scope.buycredit = function(){
        $state.go('jobseeker-buycredit');
    }

})

//Employer-stats
start.controller('Ebuycredits', function ($scope, $http, $ionicPopup,$state) {
    var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
    var user_id = loginInfo.user_id;
    $http({
        url: 'http://primefield.co/jobsearch/checkCredits.php?userid='+loginInfo.user_id, 
        method: "GET"
     }).then(function(r){
        //console.log(r.data.CreditsCount);
        $scope.myCredits = r.data.CreditsCount
    })
    $scope.myValue = function(rs,cr){
        //console.log(cr)
        $('#checkedvalue').val(rs);
        if(localStorage.getItem('rs')!=undefined || localStorage.getItem('rs')!=null || localStorage.getItem('rs')!=''){
            localStorage.removeItem('rs');
            localStorage.removeItem('cr');
        }
        localStorage.setItem('rs',rs);
        localStorage.setItem('cr',cr);
        $('#buyNowBtn').attr('onClick','testbtn('+rs+','+cr+')')
    }
    $http.get('http://www.primefield.co/jobsearch/viewCreditsDetails.php').
    success(function (data) {
       console.log(data);
       $scope.myData = data;
    }).
    error(function (data) {

    });
    
    $scope.checkAmountSelected = function(a){
        var temp = $('#checkedvalue').val();
        if(temp == '' || temp == null || temp == undefined){
            $ionicPopup.alert({
             title: 'Alert',
             template: 'Please select the credits pack first'
            });
        }
    } 
    
    $scope.goHome = function(){        
        if($scope.myCredits == 0)
        {
            var data        =   loginInfo;
            if (data.status === "0") {
                type = data.type;
                if (data.status_level === "0") {
                    if (type === "JobSeeker")
                        $state.go('jobseeker-fillup');
                    else if (type === "Employer")
                        $state.go('employer-fillup');
                }
                else if (data.status_level === "1") {
                    if (type === "JobSeeker")
                        $state.go('jobseeker-main');
                    else if (type === "Employer")
                        $state.go('employer-main');
                }
            }
        }
        else
        {
            window.history.back()
        }    
    }
})

//Employer-Thanks
start.controller('Thanks', function ($scope, $http, $state) {
    var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
    var user_id = loginInfo.user_id;

    if(localStorage.getItem('tranID') == undefined || localStorage.getItem('tranID') == null || localStorage.getItem('tranID') == ''){
        $state.go('employer-main');
    }

    $scope.Tid = localStorage.getItem('tranID');
    $scope.Pstatus = localStorage.getItem('Pstatus');
    $scope.amount = localStorage.getItem('rs');
    $scope.credits = localStorage.getItem('cr');

    
    $.ajax({
        method: "POST",
        dataType: "json",
        url: "http://www.primefield.co/jobsearch/saveCreditsDetails.php?userid="+user_id+'&transactionId='+$scope.Tid+'&amount='+$scope.amount+'&creditLimits='+$scope.credits+'&pStatus='+$scope.Pstatus
    }).then(function (data) {
        //alert(data)
        localStorage.removeItem('tranID');
        localStorage.removeItem('Pstatus');
        localStorage.removeItem('rs');
        localStorage.removeItem('cr');
        $scope.credits = data.creditsCount;
        $('#cr').text(data.creditsCount)
    }).fail(function (data) {
        alert(JSON.stringify(data))
    });


    // localStorage.setItem('tranID',payment.response.id);
    //  localStorage.setItem('createDate',payment.response.create_time);
    //  localStorage.setItem('Pstatus',payment.response.state);
    //onClick="testbtn()"
    //   $.ajax({
    //     method: "POST",
    //     dataType: "json",
    //     data: {userid: user_id},
    //     url: "http://www.primefield.co/jobsearch/getstats.php"
    // }).then(function (data) {
    //     console.log(data.view[0].jobcount);
    //     $scope.totalJob = data.view[0].jobcount;
    //     $scope.liveJob = data.view[0].livejob;
    //     $scope.views = data.view[0].viewCount;
    //     $scope.applicats = data.view[0].applyCount;
    //     $scope.shortlist =data.view[0].shortlisted;
    //     $scope.$apply();
    // }); 

})

//Employer-openjob
start.controller('EOpenJobCtrl', function ($scope, $state, myService, $ionicLoading) {
    var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
    var user_id = loginInfo.user_id;
    //console.log(user_id);
    // $ionicLoading.show({
    //   template: 'Loading...'
    // });
    $.ajax({
        method: "POST",
        dataType: "json",
        data: {userid: user_id},
        url: "http://www.primefield.co/jobsearch/viewpostjob.php"
    }).then(function (data) {
        console.log(data);
        //$ionicLoading.hide();
        // for (var j = 0; j < data.postjob.length; j++) {
        //     data.postjob[j].viewcount = 0;
        //     data.postjob[j].shortlistedcount = 2;
        //     data.postjob[j].applicationcount = 0;
        // }
        // for (var i = 0; i < data.view.length; i++) {
        //     for (var j = 0; j < data.postjob.length; j++) {
        //         if (data.view[i].jobid === data.postjob[j].jobid) {
        //             data.postjob[j].viewcount = data.view[i].viewcount;
        //         }
        //     }
        // }

        $scope.postjob = data.postjob;
        $scope.$apply();

        //console.log($scope.postjob);
    });

    $scope.goToSelectedJob = function (index) {
        //console.log($scope.postjob[index]);
        myService.employer_postjob = {};
        myService.employer_postjob = $scope.postjob[index];
        //console.log(myService.employer_postjob);
        $state.go('employer-openjobdetail');
    };
    $scope.view = function (index, $event) {
        $event.stopPropagation();
        myService.employer_postjob = {};
        myService.employer_postjob = $scope.postjob[index];
        $state.go('employer-openjobdetailview');
        //console.log(id + " view");
    };
    $scope.application = function (index, $event) {
        $event.stopPropagation();
        myService.employer_postjob = {};
        myService.employer_postjob = $scope.postjob[index];
        $state.go('employer-openjobdetailapplication');
        //console.log(id + " application");
    };
    $scope.shortlisted = function (index, $event) {
        $event.stopPropagation();
        myService.employer_postjob = {};
        myService.employer_postjob = $scope.postjob[index];
        $state.go('employer-openjobdetailshortlisted');
        //console.log(id + " shortlisted");
    };
});

//Employer-profile
start.controller('EProfileCtrl', function ($scope, $state, $http, myService, $ionicPopup, $ionicLoading) {
    //console.log(myService.employer_company);
    //$scope.company = myService.employer_company;
    $scope.name1 = 'Company Information';
    $scope.toggleGroup = function(x) {
        if($scope.openGroup != x){
            $scope.openGroup = x;
        }
        else{
            $scope.openGroup = 0;
        } 
    };

    

    var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
    var user_id = loginInfo.user_id;
    $scope.company = {};
    $scope.company.phonecountry = '';

    $scope.item = [{id: 1, industry: "Education"}, {id: 2, industry: "Information Technology"}, {id: 3, industry: "Business"},{id:4,industry:"Real estate‎"},{id:5,industry:"Textile‎"},{id:6,industry:"Professional sports"}];
    $scope.status = {isopen: false
    };
    $scope.industry = "Select Industry";

    $scope.industrySelect = function (r) {
        //console.log(r);
        $scope.industry = r;
        localStorage.setItem("industry", r);
    };

    $scope.test = function(){
        var country = $('#company-country').val();
        if(country=='Afghanistan'){
            $scope.company.phonecountry = '+93';
        }else if(country == "Aland Islands"){
            $scope.company.phonecountry = '+358';
        }
        else if(country == "Albania"){
            $scope.company.phonecountry = '+355';
        }
        else if(country == "Algeria"){
            $scope.company.phonecountry = '+213';
        }
        else if(country == "American Samoa"){
            $scope.company.phonecountry = '+1-684';
        }
        else if(country == "Andorra"){
            $scope.company.phonecountry = '+376';
        }
        else if(country == "Angola"){
            $scope.company.phonecountry = '+244';
        }
        else if(country == "Anguilla"){
            $scope.company.phonecountry = '+1-264';
        }
        else if(country == "Antarctica"){
            $scope.company.phonecountry = '+672';
        }
        else if(country == "Antigua And Barbuda"){
            $scope.company.phonecountry = '+1-268';
        }
        else if(country == "Argentina"){
            $scope.company.phonecountry = '+54';
        }
        else if(country == "Armenia"){
            $scope.company.phonecountry = '+374';
        }
        else if(country == "Aruba"){
            $scope.company.phonecountry = '+297';
        }
        else if(country == "Australia"){
            $scope.company.phonecountry = '+61';
        }
        else if(country == "Austria"){
            $scope.company.phonecountry = '+43';
        }
        else if(country == "Azerbaijan"){
            $scope.company.phonecountry = '+994';
        }
        else if(country == "Bahamas"){
            $scope.company.phonecountry = '+1-242';
        }
        else if(country == "Bahrain"){
            $scope.company.phonecountry = '+973';
        }
        else if(country == "Bangladesh"){
            $scope.company.phonecountry = '+880';
        }
        else if(country == "Barbados"){
            $scope.company.phonecountry = '+1-246';
        }
        else if(country == "Belarus"){
            $scope.company.phonecountry = '+375';
        }
        else if(country == "Belgium"){
            $scope.company.phonecountry = '+32';
        }
        else if(country == "Belize"){
            $scope.company.phonecountry = '+501';
        }
        else if(country == "Benin"){
            $scope.company.phonecountry = '+229';
        }
        else if(country == "Bermuda"){
            $scope.company.phonecountry = '+1-441';
        }
        else if(country == "Bhutan"){
            $scope.company.phonecountry = '+975';
        }
        else if(country == "Bolivia,Plurinational State of"){
            $scope.company.phonecountry = '+591';
        }
        else if(country == "Bonaire,Sint Eustatius and Saba"){
            $scope.company.phonecountry = '+599';
        }
        else if(country == "Bosnia and Herzegovina"){
            $scope.company.phonecountry = '+387';
        }
        else if(country == "Botswana"){
            $scope.company.phonecountry = '+267';
        }
        else if(country == "Bouvet Island"){
            $scope.company.phonecountry = '+NONE';
        }
        else if(country == "Brazil"){
            $scope.company.phonecountry = '+55';
        }
        else if(country == "British Indian Ocean Territory"){
            $scope.company.phonecountry = '+246';
        }
        else if(country == "Brunei Darussalam"){
            $scope.company.phonecountry = '+673';
        }
        else if(country == "Bulgaria"){
            $scope.company.phonecountry = '+359';
        }
        else if(country == "Burkina Faso"){
            $scope.company.phonecountry = '+226';
        }
        else if(country == "Burundi"){
            $scope.company.phonecountry = '+257';
        }
        else if(country == "Cambodia"){
            $scope.company.phonecountry = '+855';
        }
        else if(country == "Cameroon"){
            $scope.company.phonecountry = '+237';
        }
        else if(country == "Canada"){
            $scope.company.phonecountry = '+1';
        }
        else if(country == "Cape Verde"){
            $scope.company.phonecountry = '+238';
        }
        else if(country == "Cayman Islands"){
            $scope.company.phonecountry = '+1-345';
        }
        else if(country == "Central African Republic"){
            $scope.company.phonecountry = '+236';
        }
        else if(country == "Chad"){
            $scope.company.phonecountry = '+235';
        }
        else if(country == "Chile"){
            $scope.company.phonecountry = '+56';
        }
        else if(country == "China"){
            $scope.company.phonecountry = '+86';
        }
        else if(country == "Christmas Island"){
            $scope.company.phonecountry = '+61';
        }
        else if(country == "Cocos (Keeling) Islands"){
            $scope.company.phonecountry = '+682';
        }
        else if(country == "Colombia"){
            $scope.company.phonecountry = '+57';
        }
        else if(country == "Comoros"){
            $scope.company.phonecountry = '+269';
        }
        else if(country == "Congo"){
            $scope.company.phonecountry = '+242';
        }
        else if(country == "Congo,the Democratic Republic of the"){
            $scope.company.phonecountry = '+243';
        }
        else if(country == "Cook Islands"){
            $scope.company.phonecountry = '+682';
        }
        else if(country == "Costa Rica"){
            $scope.company.phonecountry = '+506';
        }
        else if(country == "Cote d'Ivoire"){
            $scope.company.phonecountry = '+225';
        }
        else if(country == "Croatia"){
            $scope.company.phonecountry = '+385';
        }
        else if(country == "Cuba"){
            $scope.company.phonecountry = '+53';
        }
        else if(country == "Cyprus"){
            $scope.company.phonecountry = '+357';
        }
        else if(country == "Czech Republic"){
            $scope.company.phonecountry = '+420';
        }
        else if(country == "Denmark"){
            $scope.company.phonecountry = '+45';
        }
        else if(country == "Djibouti"){
            $scope.company.phonecountry = '+253';
        }
        else if(country == "Dominica"){
            $scope.company.phonecountry = '+1-767';
        }
        else if(country == "Dominican Republic"){
            $scope.company.phonecountry = '+1-809';
        }
        else if(country == "Ecuador"){
            $scope.company.phonecountry = '+593';
        }
        else if(country == "Egypt"){
            $scope.company.phonecountry = '+20';
        }
        else if(country == "El Salvador"){
            $scope.company.phonecountry = '+503';
        }
        else if(country == "Equatorial Guinea"){
            $scope.company.phonecountry = '+240';
        }
        else if(country == "Eritrea"){
            $scope.company.phonecountry = '+291';
        }
        else if(country == "Estonia"){
            $scope.company.phonecountry = '+372';
        }
        else if(country == "Ethiopia"){
            $scope.company.phonecountry = '+251';
        }
        else if(country == "Falkland Islands (Malvinas)"){
            $scope.company.phonecountry = '+500';
        }
        else if(country == "Faroe Islands"){
            $scope.company.phonecountry = '+298';
        }
        else if(country == "Fiji"){
            $scope.company.phonecountry = '+679';
        }
        else if(country == "Finland"){
            $scope.company.phonecountry = '+358';
        }
        else if(country == "France"){
            $scope.company.phonecountry = '+33';
        }
        else if(country == "French Guiana"){
            $scope.company.phonecountry = '+594';
        }
        else if(country == "French Polynesia"){
            $scope.company.phonecountry = '+689';
        }
        else if(country == "French Southern Territories"){
            $scope.company.phonecountry = '+NONE';
        }
        else if(country == "Gabon"){
            $scope.company.phonecountry = '+241';
        }
        else if(country == "Gambia"){
            $scope.company.phonecountry = '+220';
        }
        else if(country == "Georgia"){
            $scope.company.phonecountry = '+995';
        }
        else if(country == "Germany"){
            $scope.company.phonecountry = '+49';
        }
        else if(country == "Ghana"){
            $scope.company.phonecountry = '+233';
        }
        else if(country == "Gibraltar"){
            $scope.company.phonecountry = '+350';
        }
        else if(country == "Greece"){
            $scope.company.phonecountry = '+30';
        }
        else if(country == "Greenland"){
            $scope.company.phonecountry = '+299';
        }
        else if(country == "Guatemala"){
            $scope.company.phonecountry = '+502';
        }
        else if(country == "Guernsey"){
            $scope.company.phonecountry = '+44-1481';
        }
        else if(country == "Guinea"){
            $scope.company.phonecountry = '+224';
        }
        else if(country == "Guinea-Bissau"){
            $scope.company.phonecountry = '+245';
        }
        else if(country == "Guyana"){
            $scope.company.phonecountry = '+592';
        }
        else if(country == "Haiti"){
            $scope.company.phonecountry = '+509';
        }
        else if(country == "Heard Island and McDonald Islands"){
            $scope.company.phonecountry = '+NONE';
        }
        else if(country == "Holy See (Vatican City State)"){
            $scope.company.phonecountry = '+379';
        }
        else if(country == "Honduras"){
            $scope.company.phonecountry = '+504';
        }
        else if(country == "Hong Kong"){
            $scope.company.phonecountry = '+852';
        }
        else if(country == "Hungary"){
            $scope.company.phonecountry = '+36';
        }
        else if(country == "Iceland"){
            $scope.company.phonecountry = '+354';
        }
        else if(country == "India"){
            $scope.company.phonecountry = '+91';
        }
        else if(country == "Indonesia"){
            $scope.company.phonecountry = '+62';
        }
        else if(country == "Iran,Islamic Republic of"){
            $scope.company.phonecountry = '+98';
        }
        else if(country == "Iraq"){
            $scope.company.phonecountry = '+964';
        }
        else if(country == "Ireland"){
            $scope.company.phonecountry = '+353';
        }
        else if(country == "Isle of Man"){
            $scope.company.phonecountry = '+44';
        }
        else if(country == "Israel"){
            $scope.company.phonecountry = '+972';
        }
        else if(country == "Italy"){
            $scope.company.phonecountry = '+39';
        }
        else if(country == "Jamaica"){
            $scope.company.phonecountry = '+1-876';
        }
        else if(country == "Japan"){
            $scope.company.phonecountry = '+81';
        }
        else if(country == "Jersey"){
            $scope.company.phonecountry = '+4-1534';
        }
        else if(country == "Jordan"){
            $scope.company.phonecountry = '+962';
        }
        else if(country == "Kazakhstan"){
            $scope.company.phonecountry = '+7';
        }
        else if(country == "Kenya"){
            $scope.company.phonecountry = '+254';
        }
        else if(country == "Kiribati"){
            $scope.company.phonecountry = '+686';
        }
        else if(country == "Korea,Democratic People's Republic of"){
            $scope.company.phonecountry = '+850';
        }
        else if(country == "Korea,Republic of"){
            $scope.company.phonecountry = '+82';
        }
        else if(country == "Kuwait"){
            $scope.company.phonecountry = '+965';
        }
        else if(country == "Kyrgyzstan"){
            $scope.company.phonecountry = '+996';
        }
        else if(country == "Lao People's Democratic Republic"){
            $scope.company.phonecountry = '+856';
        }
        else if(country == "Latvia"){
            $scope.company.phonecountry = '+371';
        }
        else if(country == "Lebanon"){
            $scope.company.phonecountry = '+961';
        }
        else if(country == "Lesotho"){
            $scope.company.phonecountry = '+266';
        }
        else if(country == "Liberia"){
            $scope.company.phonecountry = '+231';
        }
        else if(country == "Libya"){
            $scope.company.phonecountry = '+218';
        }
        else if(country == "Liechtenstein"){
            $scope.company.phonecountry = '+423';
        }
        else if(country == "Lithuania"){
            $scope.company.phonecountry = '+370';
        }
        else if(country == "Luxembourg"){
            $scope.company.phonecountry = '+352';
        }
        else if(country == "Macao"){
            $scope.company.phonecountry = '+853';
        }
        else if(country == "Macedonia,The Former Yugoslav Republic Of"){
            $scope.company.phonecountry = '+389';
        }
        else if(country == "Madagascar"){
            $scope.company.phonecountry = '+261';
        }
        else if(country == "Malawi"){
            $scope.company.phonecountry = '+265';
        }
        else if(country == "Malaysia"){
            $scope.company.phonecountry = '+60';
        }
        else if(country == "Maldives"){
            $scope.company.phonecountry = '+960';
        }
        else if(country == "Mali"){
            $scope.company.phonecountry = '+223';
        }
        else if(country == "Malta"){
            $scope.company.phonecountry = '+356';
        }
        else if(country == "Marshall Islands"){
            $scope.company.phonecountry = '+692';
        }
        else if(country == "Martinique"){
            $scope.company.phonecountry = '+596';
        }
        else if(country == "Mauritania"){
            $scope.company.phonecountry = '+222';
        }
        else if(country == "Mauritius"){
            $scope.company.phonecountry = '+230';
        }
        else if(country == "Mayotte"){
            $scope.company.phonecountry = '+262';
        }
        else if(country == "Mexico"){
            $scope.company.phonecountry = '+52';
        }
        else if(country == "Micronesia,Federated States of"){
            $scope.company.phonecountry = '+691';
        }
        else if(country == "Moldova,Republic of"){
            $scope.company.phonecountry = '+373';
        }
        else if(country == "Monaco"){
            $scope.company.phonecountry = '+377';
        }
        else if(country == "Mongolia"){
            $scope.company.phonecountry = '+976';
        }
        else if(country == "Montenegro"){
            $scope.company.phonecountry = '+382';
        }
        else if(country == "Montserrat"){
            $scope.company.phonecountry = '+1-664';
        }
        else if(country == "Morocco"){
            $scope.company.phonecountry = '+212';
        }
        else if(country == "Mozambique"){
            $scope.company.phonecountry = '+258';
        }
        else if(country == "Myanmar"){
            $scope.company.phonecountry = '+95';
        }
        else if(country == "Namibia"){
            $scope.company.phonecountry = '+264';
        }
        else if(country == "Nauru"){
            $scope.company.phonecountry = '+674';
        }
        else if(country == "Nepal"){
            $scope.company.phonecountry = '+977';
        }
        else if(country == "Netherlands"){
            $scope.company.phonecountry = '+31';
        }
        else if(country == "New Caledonia"){
            $scope.company.phonecountry = '+687';
        }
        else if(country == "New Zealand"){
            $scope.company.phonecountry = '+64';
        }
        else if(country == "Nicaragua"){
            $scope.company.phonecountry = '+505';
        }
        else if(country == "Niger"){
            $scope.company.phonecountry = '+227';
        }
        else if(country == "Nigeria"){
            $scope.company.phonecountry = '+234';
        }
        else if(country == "Niue"){
            $scope.company.phonecountry = '+683';
        }
        else if(country == "Norfolk Island"){
            $scope.company.phonecountry = '+672';
        }
        else if(country == "Northern Mariana Islands"){
            $scope.company.phonecountry = '+1-670';
        }
        else if(country == "Norway"){
            $scope.company.phonecountry = '+47';
        }
        else if(country == "Oman"){
            $scope.company.phonecountry = '+968';
        }
        else if(country == "Pakistan"){
            $scope.company.phonecountry = '+92';
        }
        else if(country == "Palau"){
            $scope.company.phonecountry = '+680';
        }
        else if(country == "Palestinian Territory,Occupied"){
            $scope.company.phonecountry = '+970';
        }
        else if(country == "Panama"){
            $scope.company.phonecountry = '+507';
        }
        else if(country == "Papua New Guinea"){
            $scope.company.phonecountry = '+675';
        }
        else if(country == "Paraguay"){
            $scope.company.phonecountry = '+595';
        }
        else if(country == "Peru"){
            $scope.company.phonecountry = '+51';
        }
        else if(country == "Philippines"){
            $scope.company.phonecountry = '+63';
        }
        else if(country == "Pitcairn"){
            $scope.company.phonecountry = '+64';
        }
        else if(country == "Poland"){
            $scope.company.phonecountry = '+48';
        }
        else if(country == "Portugal"){
            $scope.company.phonecountry = '+351';
        }
        else if(country == "Puerto Rico"){
            $scope.company.phonecountry = '+1-787';
        }
        else if(country == "Qatar"){
            $scope.company.phonecountry = '+974';
        }
        else if(country == "Reunion"){
            $scope.company.phonecountry = '+262';
        }
        else if(country == "Romania"){
            $scope.company.phonecountry = '+40';
        }
        else if(country == "Russian Federation"){
            $scope.company.phonecountry = '+7';
        }
        else if(country == "Rwanda"){
            $scope.company.phonecountry = '+250';
        }
        else if(country == "Saint Barthelemy"){
            $scope.company.phonecountry = '+590';
        }
        else if(country == "Saint Helena,Ascension and Tristan da Cunha"){
            $scope.company.phonecountry = '+290';
        }
        else if(country == "Saint Kitts and Nevis"){
            $scope.company.phonecountry = '+1-869';
        }
        else if(country == "Saint Lucia"){
            $scope.company.phonecountry = '+1-758';
        }
        else if(country == "Saint Martin (French Part)"){
            $scope.company.phonecountry = '+590';
        }
        else if(country == "Saint Pierre and Miquelon"){
            $scope.company.phonecountry = '+508';
        }
        else if(country == "Saint Vincent and the Grenadines"){
            $scope.company.phonecountry = '+1-784';
        }
        else if(country == "Samoa"){
            $scope.company.phonecountry = '+685';
        }
        else if(country == "San Marino"){
            $scope.company.phonecountry = '+378';
        }
        else if(country == "Sao Tome and Principe"){
            $scope.company.phonecountry = '+239';
        }
        else if(country == "Saudi Arabia"){
            $scope.company.phonecountry = '+966';
        }
        else if(country == "Senegal"){
            $scope.company.phonecountry = '+221';
        }
        else if(country == "Serbia"){
            $scope.company.phonecountry = '+381';
        }
        else if(country == "Seychelles"){
            $scope.company.phonecountry = '+248';
        }
        else if(country == "Sierra Leone"){
            $scope.company.phonecountry = '+232';
        }
        else if(country == "Singapore"){
            $scope.company.phonecountry = '+65';
        }
        else if(country == "Sint Maarten (Dutch Part)"){
            $scope.company.phonecountry = '+1-721';
        }
        else if(country == "Slovakia"){
            $scope.company.phonecountry = '+421';
        }
        else if(country == "Slovenia"){
            $scope.company.phonecountry = '+386';
        }
        else if(country == "Solomon Islands"){
            $scope.company.phonecountry = '+677';
        }
        else if(country == "Somalia"){
            $scope.company.phonecountry = '+252';
        }
        else if(country == "South Africa"){
            $scope.company.phonecountry = '+27';
        }
        else if(country == "South Georgia and the South Sandwich Islands"){
            $scope.company.phonecountry = '+500';
        }
        else if(country == "South Sudan"){
            $scope.company.phonecountry = '+211';
        }
        else if(country == "Spain"){
            $scope.company.phonecountry = '+34';
        }
        else if(country == "Sri Lanka"){
            $scope.company.phonecountry = '+94';
        }
        else if(country == "Sudan"){
            $scope.company.phonecountry = '+249';
        }
        else if(country == "Suriname"){
            $scope.company.phonecountry = '+597';
        }
        else if(country == "Svalbard and Jan Mayen"){
            $scope.company.phonecountry = '+47';
        }
        else if(country == "Swaziland"){
            $scope.company.phonecountry = '+268';
        }
        else if(country == "Sweden"){
            $scope.company.phonecountry = '+46';
        }
        else if(country == "Switzerland"){
            $scope.company.phonecountry = '+41';
        }
        else if(country == "Syrian Arab Republic"){
            $scope.company.phonecountry = '+963';
        }
        else if(country == "Taiwan,Province of China"){
            $scope.company.phonecountry = '+886';
        }
        else if(country == "Tajikistan"){
            $scope.company.phonecountry = '+992';
        }
        else if(country == "Tanzania,United Republic of"){
            $scope.company.phonecountry = '+255';
        }
        else if(country == "Thailand"){
            $scope.company.phonecountry = '+66';
        }
        else if(country == "Timor-Leste"){
            $scope.company.phonecountry = '+670';
        }
        else if(country == "Togo"){
            $scope.company.phonecountry = '+228';
        }
        else if(country == "Tokelau"){
            $scope.company.phonecountry = '+690';
        }
        else if(country == "Tonga"){
            $scope.company.phonecountry = '+676';
        }
        else if(country == "Trinidad and Tobago"){
            $scope.company.phonecountry = '+1-868';
        }
        else if(country == "Tunisia"){
            $scope.company.phonecountry = '+216';
        }
        else if(country == "Turkey"){
            $scope.company.phonecountry = '+90';
        }
        else if(country == "Turkmenistan"){
            $scope.company.phonecountry = '+993';
        }
        else if(country == "Turks and Caicos Islands"){
            $scope.company.phonecountry = '+1-649';
        }
        else if(country == "Tuvalu"){
            $scope.company.phonecountry = '+688';
        }
        else if(country == "Uganda"){
            $scope.company.phonecountry = '+256';
        }
        else if(country == "Ukraine"){
            $scope.company.phonecountry = '+380';
        }
        else if(country == "United Arab Emirates"){
            $scope.company.phonecountry = '+971';
        }
        else if(country == "United Kingdom"){
            $scope.company.phonecountry = '+44';
        }
        else if(country == "United States"){
            $scope.company.phonecountry = '+1';
        }
        else if(country == "United States Minor Outlying Islands"){
            $scope.company.phonecountry = '+NONE';
        }
        else if(country == "Uruguay"){
            $scope.company.phonecountry = '+598';
        }
        else if(country == "Uzbekistan"){
            $scope.company.phonecountry = '+998';
        }
        else if(country == "Vanuatu"){
            $scope.company.phonecountry = '+678';
        }
        else if(country == "Venezuela,Bolivarian Republic of"){
            $scope.company.phonecountry = '+58';
        }
        else if(country == "Viet Nam"){
            $scope.company.phonecountry = '+84';
        }
        else if(country == "Virgin Islands,British"){
            $scope.company.phonecountry = '+1-284';
        }
        else if(country == "Virgin Islands,U.S."){
            $scope.company.phonecountry = '+1-340';
        }
        else if(country == "Wallis and Futuna"){
            $scope.company.phonecountry = '+681';
        }
        else if(country == "Western Sahara"){
            $scope.company.phonecountry = '+212';
        }
        else if(country == "Yemen"){
            $scope.company.phonecountry = '+967';
        }
        else if(country == "Zambia"){
            $scope.company.phonecountry = '+260';
        }
        else if(country == "Zimbabwe"){
            $scope.company.phonecountry = '+263';
        }
        else{
            $scope.company.phonecountry = '';
        }
    }

    // $ionicLoading.show({
    //   template: 'Loading...'
    // });
    $.ajax({
        method: "POST",
        dataType: "json",
        data: {userid: user_id},
        url: "http://www.primefield.co/jobsearch/viewemployerprofile.php"
    }).then(function (data) {
        //console.log(data);
        //$('.md-char-counter').hide();
        $scope.$apply(function() {
          $scope.company = data.company;
          $scope.industry = data.company.industry;
          $scope.company.phonecountry = data.company.countrycode;
        });
        var path = 'http://www.primefield.co/jobsearch/companyImage/com_' + localStorage.getItem("userID") + '.jpg?timestamp='+new Date().getTime();
        var Vpath = 'http://www.primefield.co/jobsearch/videos/' + localStorage.getItem("userID") + '.jpg?timestamp='+new Date().getTime();
        $('#p-img').attr('src',path);
        $('#p-video').attr('src',Vpath);
        $('#p-video').attr('onclick', 'openFile(\'https://s3-ap-southeast-1.amazonaws.com/video1.123/' + localStorage.getItem("userID") + '.3gp\')');
        $('#Preview').attr('onclick', 'openFile(\'https://s3-ap-southeast-1.amazonaws.com/video1.123/' + localStorage.getItem("userID") + '.3gp\')');
       // $ionicLoading.hide(); 
    });

    $scope.myAlert = function(msg){
        $ionicPopup.alert({
         title: 'Alert',
         template: ''+msg
        });
    }

    $scope.go = function () {
        
        if(localStorage.getItem("industry") != null){
            $scope.company.industry = localStorage.getItem("industry")
        }else{
            localStorage.setItem('industry',$scope.company.industry)
        }
        $scope.company.countrycode = $('#company-phonecountry').val();
        console.log($scope.company)
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        //console.log(regex.test($scope.company.email));
        if($scope.company.companyname === '' || $scope.company.companyname == undefined){
            $scope.myAlert('Please enter the company name');
        }else if(!regex.test($scope.company.email) || $scope.company.email == '' || $scope.company.email == undefined){
            $scope.myAlert('Please enter the email and check your mail address')
        }else if($scope.company.country === '' || $scope.company.country == undefined){
            $scope.myAlert('Please select the country');
        }else if($scope.company.address === '' || $scope.company.address == undefined){
            $scope.myAlert('Please enter the company address');
        }else if($scope.company.phone === '' || $scope.company.phone == undefined){
            $scope.myAlert('Please enter the company contact(Phone number)');
        }else if($scope.company.website === '' || $scope.company.website == undefined){
            $scope.myAlert('Please enter the company website');
        }else if($scope.company.overview === '' || $scope.company.overview == undefined){
            $scope.myAlert('Please enter the company overview');
        }else if(localStorage.getItem("industry") === '' || localStorage.getItem("industry") == null){
            $scope.myAlert('Please select the industry');
        }else{
            // $ionicLoading.show({
            //   template: 'Loading...'
            // });
            $.ajax({
                method: "POST",
                dataType: "json",
                data: {userid: user_id, company: $scope.company},
                url: "http://www.primefield.co/jobsearch/updatecompany.php"
            }).then(function (data) {
                //console.log(data);
                //$ionicLoading.hide();
                $state.go('employer-main');

            });
        }    
    };
});

//Employer-postjob
start.controller('EPostJobCtrl', function ($scope, $state, $http, myService, $ionicPopup) {

    var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
    $http({
        url: 'http://primefield.co/jobsearch/checkCredits.php?userid='+loginInfo.user_id, 
        method: "POST"
     }).then(function(r){
        console.log(r.data.CreditsCount);
        if(r.data.CreditsCount == 0){
            $state.go('jobseeker-buycredit');
        }
    })

    $scope.item = [{id: 1, industry: "Education"}, {id: 2, industry: "Information Technology"}, {id: 3, industry: "Business"},{id:4,industry:"Real estate‎"},{id:5,industry:"Textile‎"},{id:6,industry:"Professional sports"}];
    $scope.status = {isopen: false
    };
    
    if(myService.employer_company.industry != '' || myService.employer_company.industry != null || myService.employer_company.industry != undefined){
        $scope.industry = myService.employer_company.industry;
    }else{
        $scope.industry = industry;
    }
    $scope.currency = 'SGD';

    if(localStorage.getItem('currency') != ''){
        localStorage.removeItem('currency')
    }
    localStorage.setItem('currency','SGD');
    //console.log(localStorage.getItem('postjobinfo'));
    // if( localStorage.getItem('postjobinfo') != undefined ) {
    //     var postjobinfoNew = JSON.parse(localStorage.getItem('postjobinfo'));
    //     console.log(postjobinfoNew);
    //     $scope.industry = postjobinfoNew.industry;
    //     $scope.currency = postjobinfoNew.currency;
    //     $scope.deadline = new Date(postjobinfoNew.deadline);
    //     $scope.educational = postjobinfoNew.educational;
    //     $scope.joblocation = postjobinfoNew.joblocation;
    //     $scope.salary = postjobinfoNew.salary;
    //     $scope.title = postjobinfoNew.title;
    //     $scope.requirement = postjobinfoNew.requirement;
    //     $scope.goodtohave = postjobinfoNew.goodtohave;
    //     $scope.experience = postjobinfoNew.experience;

    // }

    $scope.industrySelect = function (r) {
        console.log(r);
        $scope.industry = r;
        if(localStorage.getItem('industry') != ''){
            localStorage.removeItem('industry')
        }
        localStorage.setItem("industry", r);
    };
    $scope.currencySet = function(c){
        //console.log(c);
        $scope.currency = c;
        localStorage.setItem("currency", c);
    }
    if (localStorage.getItem('postjobinfo') !== null) {
        var postjobinfo = JSON.parse(localStorage.getItem('postjobinfo'));
        //console.log(postjobinfo);
        $scope.industry = postjobinfo.industry;
        postjobinfo.deadline = new Date(postjobinfo.deadline);
        $scope.postjob = postjobinfo;
    } else {
        $scope.postjob = "";
    }
    $scope.myAlert = function(msg){
        $ionicPopup.alert({
         title: 'Alert',
         template: ''+msg
        });
    }

    $scope.convert = function (str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth()+1)).slice(-2),
            day  = ("0" + date.getDate()).slice(-2);
        return [ date.getFullYear(), mnth, day ].join("-");
    }

    $scope.go = function (data) {
        console.log(data)
        if(data == '' || data == undefined || data == null){
            $scope.myAlert('Please fill the all fieldes')
        }else{
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var jid = "job";
            for (var i = 0; i < 20; i++)
                jid += possible.charAt(Math.floor(Math.random() * possible.length));

            localStorage.setItem('jobID',jid)

            if(localStorage.getItem('industry') == null || localStorage.getItem('industry') == '' || localStorage.getItem('industry') == undefined){
                var temp = $scope.industry;
            }else{
                var temp = localStorage.getItem('industry');
            }

            var industry = data.industry;
            var title = data.title;
            var currency = localStorage.getItem('currency');
            var salary = data.salary;
            var deadline = $scope.convert(data.deadline);
            var experience = data.experience;
            var requirement = data.requirement;
            var educational = data.educational;
            var goodtohave = data.goodtohave;
            var joblocation = data.joblocation;
            
            if(industry == ''){
                $scope.myAlert('Please select the Industry');  
            }else if(title == ''){
                $scope.myAlert('Please enter the Job Title'); 
            }else if(salary == ''){
                $scope.myAlert('Please enter the Salary'); 
            }else if(deadline == ''){
                $scope.myAlert('Please enter the Application Deadline'); 
            }else if(experience == ''){
                $scope.myAlert('Please enter the Experience'); 
            }else if(requirement == ''){
                $scope.myAlert('Please enter the Job Requirement'); 
            }else if(educational == ''){
                $scope.myAlert('Please enter the Educational Requirement'); 
            }else if(goodtohave == ''){
                $scope.myAlert('Please enter the Good To Have'); 
            }else if(joblocation == ''){
                $scope.myAlert('Please enter the Job Location'); 
            }else{

                var postjob = {};
                postjob = {
                    industry: industry, title: title, currency:currency, salary: salary, deadline: deadline, experience: experience, requirement: requirement, educational: educational, goodtohave: goodtohave, joblocation:joblocation, jid:jid
                };
                console.log(postjob)

                myService.employer_postjob = postjob;

                localStorage.setItem('postjobinfo', JSON.stringify(postjob));
                $state.go('employer-postjobvideo');
            }
        }        
    };
});

//Employer-postjobpreview
start.controller('EPostJobPreviewCtrl', function ($scope, $state, $http, myService, $ionicLoading, $ionicPopup) {
    var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
    var user_id = loginInfo.user_id;

    $scope.name1 = 'Company Information';
    $scope.name2 = 'Job Information';
    $scope.toggleGroup = function(x) {
        if($scope.openGroup != x){
            $scope.openGroup = x;
        }
        else{
            $scope.openGroup = 0;
        } 
    };

    var path = 'http://www.primefield.co/jobsearch/pictureurl/' + localStorage.getItem("userID") + '.jpg?timestamp='+new Date().getTime();
    var Vpath = 'http://www.primefield.co/jobsearch/videos/' + localStorage.getItem("userID") + '.jpg?timestamp='+new Date().getTime();

    var Vjobpath = 'http://www.primefield.co/jobsearch/videos/' + localStorage.getItem('jobID') + '.jpg?timestamp='+new Date().getTime();
    //var Vjob = 'http://www.primefield.co/jobsearch/videos/' + localStorage.getItem('jobID') + '.jpg';

    angular.element(document).ready(function () {
        //$('#p-img').attr('src',  path);
        $('#p-img').attr('src', 'http://www.primefield.co/jobsearch/companyImage/com_'+localStorage.getItem("userID") + '.jpg?timestamp='+new Date().getTime());
        $('#videothumbnail').attr('src',Vpath);
        $('#videothumbnail').attr('onclick', 'openFile(\'https://s3-ap-southeast-1.amazonaws.com/video1.123/' + localStorage.getItem("userID") + '.3gp\')');
        $('#pjob-img').attr('src',Vjobpath);
        $('#pjob-img').attr('onclick', 'openFile(\'https://s3-ap-southeast-1.amazonaws.com/video1.123/' + localStorage.getItem("jobID") + '.3gp\')');
    });

    $.ajax({
        method: "POST",
        dataType: "json",
        data: {userid: user_id},
        url: "http://www.primefield.co/jobsearch/viewemployerprofile.php"
    }).then(function (data) {
        console.log(data);
        $scope.company = data.company;
        $scope.company.phonecountry = data.company.countrycode
    });

    $scope.item = [{id: 1, industry: "Education"}, {id: 2, industry: "Information Technology"}, {id: 3, industry: "Business"},{id:4,industry:"Real estate‎"},{id:5,industry:"Textile‎"},{id:6,industry:"Professional sports"}];
    $scope.status = {
        isopen: false
    };

    $scope.industry = localStorage.getItem("industry");
    $scope.industrySelect = function (r) {
        //console.log(r);
        $scope.industry = r;
    };

    $scope.hidethis = true;
    $scope.disablethis = true;

    $scope.hidejob = true;
    $scope.disabledjob = true;

    $scope.company = JSON.parse(localStorage.getItem('companyinfo'));
    $scope.postjob = myService.employer_postjob;
    $scope.postjob.location = myService.employer_postjob.joblocation
    console.log($scope.postjob)
    $scope.deadline = new Date($scope.postjob.deadline);


    $scope.companyedit = function () {
        $scope.hidethis = !$scope.hidethis;
        $scope.disablethis = !$scope.disablethis;
    };

    $scope.companysave = function () {
        $scope.hidethis = !$scope.hidethis;
        $scope.disablethis = !$scope.disablethis;

        $.ajax({
            method: "POST",
            dataType: "json",
            data: {userid: user_id, company: $scope.company},
            url: "http://www.primefield.co/jobsearch/updatecompany.php"
        }).then(function (data) {
            //console.log(data);

        });
    };

    $scope.postjobedit = function () {
        $scope.hidejob = !$scope.hidejob;
        $scope.disabledjob = !$scope.disabledjob;
    };

    $scope.postjobsave = function () {
        $scope.hidejob = !$scope.hidejob;
        $scope.disabledjob = !$scope.disabledjob;
    };

    $scope.go = function () {
        // $ionicLoading.show({
        //   template: 'Loading...'
        // });
        $.ajax({
            method: "POST",
            dataType: "json",
            data: {userid: user_id, postjob: $scope.postjob},
            url: "http://www.primefield.co/jobsearch/savepostjobpreview.php"
        }).then(function (data) {
            //console.log(data);
            //$ionicLoading.hide();
            $scope.postjob = {};
            localStorage.removeItem("postjobinfo");
            $ionicPopup.alert({
             title: 'Success',
             template: 'Thank you for posting a job.'
           });

            $state.go('employer-main');
        });
    };
});

//Employer-fillup
start.controller('EFillupCtrl', function ($scope, $state, $http, myService, $ionicPopup) {

    var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
    $scope.name1 = 'Company Information';
    $scope.toggleGroup = function(x) {
        if($scope.openGroup != x){
            $scope.openGroup = x;
        }
        else{
            $scope.openGroup = 0;
        } 
    };

    $scope.myAlert = function(msg){
        $ionicPopup.alert({
         title: 'Alert',
         template: ''+msg
        });
    }

    if (localStorage.getItem('companyinfo') !== null) {
        var companyinfo = JSON.parse(localStorage.getItem('companyinfo'));
        console.log(companyinfo);
        $scope.company = companyinfo;
        $scope.industry = localStorage.getItem('industry');
        $scope.company.phonecountry = companyinfo.countrycode;
        $scope.industrySelect = function (r) {
            //console.log(r);
            $scope.industry = r;
            localStorage.setItem("industry", r);
        };
        $scope.test = function(){
            var country = $('#company-country').val();
            if(country=='Afghanistan'){
                $scope.company.phonecountry = '+93';
            }else if(country == "Aland Islands"){
                $scope.company.phonecountry = '+358';
            }
            else if(country == "Albania"){
                $scope.company.phonecountry = '+355';
            }
            else if(country == "Algeria"){
                $scope.company.phonecountry = '+213';
            }
            else if(country == "American Samoa"){
                $scope.company.phonecountry = '+1-684';
            }
            else if(country == "Andorra"){
                $scope.company.phonecountry = '+376';
            }
            else if(country == "Angola"){
                $scope.company.phonecountry = '+244';
            }
            else if(country == "Anguilla"){
                $scope.company.phonecountry = '+1-264';
            }
            else if(country == "Antarctica"){
                $scope.company.phonecountry = '+672';
            }
            else if(country == "Antigua And Barbuda"){
                $scope.company.phonecountry = '+1-268';
            }
            else if(country == "Argentina"){
                $scope.company.phonecountry = '+54';
            }
            else if(country == "Armenia"){
                $scope.company.phonecountry = '+374';
            }
            else if(country == "Aruba"){
                $scope.company.phonecountry = '+297';
            }
            else if(country == "Australia"){
                $scope.company.phonecountry = '+61';
            }
            else if(country == "Austria"){
                $scope.company.phonecountry = '+43';
            }
            else if(country == "Azerbaijan"){
                $scope.company.phonecountry = '+994';
            }
            else if(country == "Bahamas"){
                $scope.company.phonecountry = '+1-242';
            }
            else if(country == "Bahrain"){
                $scope.company.phonecountry = '+973';
            }
            else if(country == "Bangladesh"){
                $scope.company.phonecountry = '+880';
            }
            else if(country == "Barbados"){
                $scope.company.phonecountry = '+1-246';
            }
            else if(country == "Belarus"){
                $scope.company.phonecountry = '+375';
            }
            else if(country == "Belgium"){
                $scope.company.phonecountry = '+32';
            }
            else if(country == "Belize"){
                $scope.company.phonecountry = '+501';
            }
            else if(country == "Benin"){
                $scope.company.phonecountry = '+229';
            }
            else if(country == "Bermuda"){
                $scope.company.phonecountry = '+1-441';
            }
            else if(country == "Bhutan"){
                $scope.company.phonecountry = '+975';
            }
            else if(country == "Bolivia,Plurinational State of"){
                $scope.company.phonecountry = '+591';
            }
            else if(country == "Bonaire,Sint Eustatius and Saba"){
                $scope.company.phonecountry = '+599';
            }
            else if(country == "Bosnia and Herzegovina"){
                $scope.company.phonecountry = '+387';
            }
            else if(country == "Botswana"){
                $scope.company.phonecountry = '+267';
            }
            else if(country == "Bouvet Island"){
                $scope.company.phonecountry = '+NONE';
            }
            else if(country == "Brazil"){
                $scope.company.phonecountry = '+55';
            }
            else if(country == "British Indian Ocean Territory"){
                $scope.company.phonecountry = '+246';
            }
            else if(country == "Brunei Darussalam"){
                $scope.company.phonecountry = '+673';
            }
            else if(country == "Bulgaria"){
                $scope.company.phonecountry = '+359';
            }
            else if(country == "Burkina Faso"){
                $scope.company.phonecountry = '+226';
            }
            else if(country == "Burundi"){
                $scope.company.phonecountry = '+257';
            }
            else if(country == "Cambodia"){
                $scope.company.phonecountry = '+855';
            }
            else if(country == "Cameroon"){
                $scope.company.phonecountry = '+237';
            }
            else if(country == "Canada"){
                $scope.company.phonecountry = '+1';
            }
            else if(country == "Cape Verde"){
                $scope.company.phonecountry = '+238';
            }
            else if(country == "Cayman Islands"){
                $scope.company.phonecountry = '+1-345';
            }
            else if(country == "Central African Republic"){
                $scope.company.phonecountry = '+236';
            }
            else if(country == "Chad"){
                $scope.company.phonecountry = '+235';
            }
            else if(country == "Chile"){
                $scope.company.phonecountry = '+56';
            }
            else if(country == "China"){
                $scope.company.phonecountry = '+86';
            }
            else if(country == "Christmas Island"){
                $scope.company.phonecountry = '+61';
            }
            else if(country == "Cocos (Keeling) Islands"){
                $scope.company.phonecountry = '+682';
            }
            else if(country == "Colombia"){
                $scope.company.phonecountry = '+57';
            }
            else if(country == "Comoros"){
                $scope.company.phonecountry = '+269';
            }
            else if(country == "Congo"){
                $scope.company.phonecountry = '+242';
            }
            else if(country == "Congo,the Democratic Republic of the"){
                $scope.company.phonecountry = '+243';
            }
            else if(country == "Cook Islands"){
                $scope.company.phonecountry = '+682';
            }
            else if(country == "Costa Rica"){
                $scope.company.phonecountry = '+506';
            }
            else if(country == "Cote d'Ivoire"){
                $scope.company.phonecountry = '+225';
            }
            else if(country == "Croatia"){
                $scope.company.phonecountry = '+385';
            }
            else if(country == "Cuba"){
                $scope.company.phonecountry = '+53';
            }
            else if(country == "Cyprus"){
                $scope.company.phonecountry = '+357';
            }
            else if(country == "Czech Republic"){
                $scope.company.phonecountry = '+420';
            }
            else if(country == "Denmark"){
                $scope.company.phonecountry = '+45';
            }
            else if(country == "Djibouti"){
                $scope.company.phonecountry = '+253';
            }
            else if(country == "Dominica"){
                $scope.company.phonecountry = '+1-767';
            }
            else if(country == "Dominican Republic"){
                $scope.company.phonecountry = '+1-809';
            }
            else if(country == "Ecuador"){
                $scope.company.phonecountry = '+593';
            }
            else if(country == "Egypt"){
                $scope.company.phonecountry = '+20';
            }
            else if(country == "El Salvador"){
                $scope.company.phonecountry = '+503';
            }
            else if(country == "Equatorial Guinea"){
                $scope.company.phonecountry = '+240';
            }
            else if(country == "Eritrea"){
                $scope.company.phonecountry = '+291';
            }
            else if(country == "Estonia"){
                $scope.company.phonecountry = '+372';
            }
            else if(country == "Ethiopia"){
                $scope.company.phonecountry = '+251';
            }
            else if(country == "Falkland Islands (Malvinas)"){
                $scope.company.phonecountry = '+500';
            }
            else if(country == "Faroe Islands"){
                $scope.company.phonecountry = '+298';
            }
            else if(country == "Fiji"){
                $scope.company.phonecountry = '+679';
            }
            else if(country == "Finland"){
                $scope.company.phonecountry = '+358';
            }
            else if(country == "France"){
                $scope.company.phonecountry = '+33';
            }
            else if(country == "French Guiana"){
                $scope.company.phonecountry = '+594';
            }
            else if(country == "French Polynesia"){
                $scope.company.phonecountry = '+689';
            }
            else if(country == "French Southern Territories"){
                $scope.company.phonecountry = '+NONE';
            }
            else if(country == "Gabon"){
                $scope.company.phonecountry = '+241';
            }
            else if(country == "Gambia"){
                $scope.company.phonecountry = '+220';
            }
            else if(country == "Georgia"){
                $scope.company.phonecountry = '+995';
            }
            else if(country == "Germany"){
                $scope.company.phonecountry = '+49';
            }
            else if(country == "Ghana"){
                $scope.company.phonecountry = '+233';
            }
            else if(country == "Gibraltar"){
                $scope.company.phonecountry = '+350';
            }
            else if(country == "Greece"){
                $scope.company.phonecountry = '+30';
            }
            else if(country == "Greenland"){
                $scope.company.phonecountry = '+299';
            }
            else if(country == "Guatemala"){
                $scope.company.phonecountry = '+502';
            }
            else if(country == "Guernsey"){
                $scope.company.phonecountry = '+44-1481';
            }
            else if(country == "Guinea"){
                $scope.company.phonecountry = '+224';
            }
            else if(country == "Guinea-Bissau"){
                $scope.company.phonecountry = '+245';
            }
            else if(country == "Guyana"){
                $scope.company.phonecountry = '+592';
            }
            else if(country == "Haiti"){
                $scope.company.phonecountry = '+509';
            }
            else if(country == "Heard Island and McDonald Islands"){
                $scope.company.phonecountry = '+NONE';
            }
            else if(country == "Holy See (Vatican City State)"){
                $scope.company.phonecountry = '+379';
            }
            else if(country == "Honduras"){
                $scope.company.phonecountry = '+504';
            }
            else if(country == "Hong Kong"){
                $scope.company.phonecountry = '+852';
            }
            else if(country == "Hungary"){
                $scope.company.phonecountry = '+36';
            }
            else if(country == "Iceland"){
                $scope.company.phonecountry = '+354';
            }
            else if(country == "India"){
                $scope.company.phonecountry = '+91';
            }
            else if(country == "Indonesia"){
                $scope.company.phonecountry = '+62';
            }
            else if(country == "Iran,Islamic Republic of"){
                $scope.company.phonecountry = '+98';
            }
            else if(country == "Iraq"){
                $scope.company.phonecountry = '+964';
            }
            else if(country == "Ireland"){
                $scope.company.phonecountry = '+353';
            }
            else if(country == "Isle of Man"){
                $scope.company.phonecountry = '+44';
            }
            else if(country == "Israel"){
                $scope.company.phonecountry = '+972';
            }
            else if(country == "Italy"){
                $scope.company.phonecountry = '+39';
            }
            else if(country == "Jamaica"){
                $scope.company.phonecountry = '+1-876';
            }
            else if(country == "Japan"){
                $scope.company.phonecountry = '+81';
            }
            else if(country == "Jersey"){
                $scope.company.phonecountry = '+4-1534';
            }
            else if(country == "Jordan"){
                $scope.company.phonecountry = '+962';
            }
            else if(country == "Kazakhstan"){
                $scope.company.phonecountry = '+7';
            }
            else if(country == "Kenya"){
                $scope.company.phonecountry = '+254';
            }
            else if(country == "Kiribati"){
                $scope.company.phonecountry = '+686';
            }
            else if(country == "Korea,Democratic People's Republic of"){
                $scope.company.phonecountry = '+850';
            }
            else if(country == "Korea,Republic of"){
                $scope.company.phonecountry = '+82';
            }
            else if(country == "Kuwait"){
                $scope.company.phonecountry = '+965';
            }
            else if(country == "Kyrgyzstan"){
                $scope.company.phonecountry = '+996';
            }
            else if(country == "Lao People's Democratic Republic"){
                $scope.company.phonecountry = '+856';
            }
            else if(country == "Latvia"){
                $scope.company.phonecountry = '+371';
            }
            else if(country == "Lebanon"){
                $scope.company.phonecountry = '+961';
            }
            else if(country == "Lesotho"){
                $scope.company.phonecountry = '+266';
            }
            else if(country == "Liberia"){
                $scope.company.phonecountry = '+231';
            }
            else if(country == "Libya"){
                $scope.company.phonecountry = '+218';
            }
            else if(country == "Liechtenstein"){
                $scope.company.phonecountry = '+423';
            }
            else if(country == "Lithuania"){
                $scope.company.phonecountry = '+370';
            }
            else if(country == "Luxembourg"){
                $scope.company.phonecountry = '+352';
            }
            else if(country == "Macao"){
                $scope.company.phonecountry = '+853';
            }
            else if(country == "Macedonia,The Former Yugoslav Republic Of"){
                $scope.company.phonecountry = '+389';
            }
            else if(country == "Madagascar"){
                $scope.company.phonecountry = '+261';
            }
            else if(country == "Malawi"){
                $scope.company.phonecountry = '+265';
            }
            else if(country == "Malaysia"){
                $scope.company.phonecountry = '+60';
            }
            else if(country == "Maldives"){
                $scope.company.phonecountry = '+960';
            }
            else if(country == "Mali"){
                $scope.company.phonecountry = '+223';
            }
            else if(country == "Malta"){
                $scope.company.phonecountry = '+356';
            }
            else if(country == "Marshall Islands"){
                $scope.company.phonecountry = '+692';
            }
            else if(country == "Martinique"){
                $scope.company.phonecountry = '+596';
            }
            else if(country == "Mauritania"){
                $scope.company.phonecountry = '+222';
            }
            else if(country == "Mauritius"){
                $scope.company.phonecountry = '+230';
            }
            else if(country == "Mayotte"){
                $scope.company.phonecountry = '+262';
            }
            else if(country == "Mexico"){
                $scope.company.phonecountry = '+52';
            }
            else if(country == "Micronesia,Federated States of"){
                $scope.company.phonecountry = '+691';
            }
            else if(country == "Moldova,Republic of"){
                $scope.company.phonecountry = '+373';
            }
            else if(country == "Monaco"){
                $scope.company.phonecountry = '+377';
            }
            else if(country == "Mongolia"){
                $scope.company.phonecountry = '+976';
            }
            else if(country == "Montenegro"){
                $scope.company.phonecountry = '+382';
            }
            else if(country == "Montserrat"){
                $scope.company.phonecountry = '+1-664';
            }
            else if(country == "Morocco"){
                $scope.company.phonecountry = '+212';
            }
            else if(country == "Mozambique"){
                $scope.company.phonecountry = '+258';
            }
            else if(country == "Myanmar"){
                $scope.company.phonecountry = '+95';
            }
            else if(country == "Namibia"){
                $scope.company.phonecountry = '+264';
            }
            else if(country == "Nauru"){
                $scope.company.phonecountry = '+674';
            }
            else if(country == "Nepal"){
                $scope.company.phonecountry = '+977';
            }
            else if(country == "Netherlands"){
                $scope.company.phonecountry = '+31';
            }
            else if(country == "New Caledonia"){
                $scope.company.phonecountry = '+687';
            }
            else if(country == "New Zealand"){
                $scope.company.phonecountry = '+64';
            }
            else if(country == "Nicaragua"){
                $scope.company.phonecountry = '+505';
            }
            else if(country == "Niger"){
                $scope.company.phonecountry = '+227';
            }
            else if(country == "Nigeria"){
                $scope.company.phonecountry = '+234';
            }
            else if(country == "Niue"){
                $scope.company.phonecountry = '+683';
            }
            else if(country == "Norfolk Island"){
                $scope.company.phonecountry = '+672';
            }
            else if(country == "Northern Mariana Islands"){
                $scope.company.phonecountry = '+1-670';
            }
            else if(country == "Norway"){
                $scope.company.phonecountry = '+47';
            }
            else if(country == "Oman"){
                $scope.company.phonecountry = '+968';
            }
            else if(country == "Pakistan"){
                $scope.company.phonecountry = '+92';
            }
            else if(country == "Palau"){
                $scope.company.phonecountry = '+680';
            }
            else if(country == "Palestinian Territory,Occupied"){
                $scope.company.phonecountry = '+970';
            }
            else if(country == "Panama"){
                $scope.company.phonecountry = '+507';
            }
            else if(country == "Papua New Guinea"){
                $scope.company.phonecountry = '+675';
            }
            else if(country == "Paraguay"){
                $scope.company.phonecountry = '+595';
            }
            else if(country == "Peru"){
                $scope.company.phonecountry = '+51';
            }
            else if(country == "Philippines"){
                $scope.company.phonecountry = '+63';
            }
            else if(country == "Pitcairn"){
                $scope.company.phonecountry = '+64';
            }
            else if(country == "Poland"){
                $scope.company.phonecountry = '+48';
            }
            else if(country == "Portugal"){
                $scope.company.phonecountry = '+351';
            }
            else if(country == "Puerto Rico"){
                $scope.company.phonecountry = '+1-787';
            }
            else if(country == "Qatar"){
                $scope.company.phonecountry = '+974';
            }
            else if(country == "Reunion"){
                $scope.company.phonecountry = '+262';
            }
            else if(country == "Romania"){
                $scope.company.phonecountry = '+40';
            }
            else if(country == "Russian Federation"){
                $scope.company.phonecountry = '+7';
            }
            else if(country == "Rwanda"){
                $scope.company.phonecountry = '+250';
            }
            else if(country == "Saint Barthelemy"){
                $scope.company.phonecountry = '+590';
            }
            else if(country == "Saint Helena,Ascension and Tristan da Cunha"){
                $scope.company.phonecountry = '+290';
            }
            else if(country == "Saint Kitts and Nevis"){
                $scope.company.phonecountry = '+1-869';
            }
            else if(country == "Saint Lucia"){
                $scope.company.phonecountry = '+1-758';
            }
            else if(country == "Saint Martin (French Part)"){
                $scope.company.phonecountry = '+590';
            }
            else if(country == "Saint Pierre and Miquelon"){
                $scope.company.phonecountry = '+508';
            }
            else if(country == "Saint Vincent and the Grenadines"){
                $scope.company.phonecountry = '+1-784';
            }
            else if(country == "Samoa"){
                $scope.company.phonecountry = '+685';
            }
            else if(country == "San Marino"){
                $scope.company.phonecountry = '+378';
            }
            else if(country == "Sao Tome and Principe"){
                $scope.company.phonecountry = '+239';
            }
            else if(country == "Saudi Arabia"){
                $scope.company.phonecountry = '+966';
            }
            else if(country == "Senegal"){
                $scope.company.phonecountry = '+221';
            }
            else if(country == "Serbia"){
                $scope.company.phonecountry = '+381';
            }
            else if(country == "Seychelles"){
                $scope.company.phonecountry = '+248';
            }
            else if(country == "Sierra Leone"){
                $scope.company.phonecountry = '+232';
            }
            else if(country == "Singapore"){
                $scope.company.phonecountry = '+65';
            }
            else if(country == "Sint Maarten (Dutch Part)"){
                $scope.company.phonecountry = '+1-721';
            }
            else if(country == "Slovakia"){
                $scope.company.phonecountry = '+421';
            }
            else if(country == "Slovenia"){
                $scope.company.phonecountry = '+386';
            }
            else if(country == "Solomon Islands"){
                $scope.company.phonecountry = '+677';
            }
            else if(country == "Somalia"){
                $scope.company.phonecountry = '+252';
            }
            else if(country == "South Africa"){
                $scope.company.phonecountry = '+27';
            }
            else if(country == "South Georgia and the South Sandwich Islands"){
                $scope.company.phonecountry = '+500';
            }
            else if(country == "South Sudan"){
                $scope.company.phonecountry = '+211';
            }
            else if(country == "Spain"){
                $scope.company.phonecountry = '+34';
            }
            else if(country == "Sri Lanka"){
                $scope.company.phonecountry = '+94';
            }
            else if(country == "Sudan"){
                $scope.company.phonecountry = '+249';
            }
            else if(country == "Suriname"){
                $scope.company.phonecountry = '+597';
            }
            else if(country == "Svalbard and Jan Mayen"){
                $scope.company.phonecountry = '+47';
            }
            else if(country == "Swaziland"){
                $scope.company.phonecountry = '+268';
            }
            else if(country == "Sweden"){
                $scope.company.phonecountry = '+46';
            }
            else if(country == "Switzerland"){
                $scope.company.phonecountry = '+41';
            }
            else if(country == "Syrian Arab Republic"){
                $scope.company.phonecountry = '+963';
            }
            else if(country == "Taiwan,Province of China"){
                $scope.company.phonecountry = '+886';
            }
            else if(country == "Tajikistan"){
                $scope.company.phonecountry = '+992';
            }
            else if(country == "Tanzania,United Republic of"){
                $scope.company.phonecountry = '+255';
            }
            else if(country == "Thailand"){
                $scope.company.phonecountry = '+66';
            }
            else if(country == "Timor-Leste"){
                $scope.company.phonecountry = '+670';
            }
            else if(country == "Togo"){
                $scope.company.phonecountry = '+228';
            }
            else if(country == "Tokelau"){
                $scope.company.phonecountry = '+690';
            }
            else if(country == "Tonga"){
                $scope.company.phonecountry = '+676';
            }
            else if(country == "Trinidad and Tobago"){
                $scope.company.phonecountry = '+1-868';
            }
            else if(country == "Tunisia"){
                $scope.company.phonecountry = '+216';
            }
            else if(country == "Turkey"){
                $scope.company.phonecountry = '+90';
            }
            else if(country == "Turkmenistan"){
                $scope.company.phonecountry = '+993';
            }
            else if(country == "Turks and Caicos Islands"){
                $scope.company.phonecountry = '+1-649';
            }
            else if(country == "Tuvalu"){
                $scope.company.phonecountry = '+688';
            }
            else if(country == "Uganda"){
                $scope.company.phonecountry = '+256';
            }
            else if(country == "Ukraine"){
                $scope.company.phonecountry = '+380';
            }
            else if(country == "United Arab Emirates"){
                $scope.company.phonecountry = '+971';
            }
            else if(country == "United Kingdom"){
                $scope.company.phonecountry = '+44';
            }
            else if(country == "United States"){
                $scope.company.phonecountry = '+1';
            }
            else if(country == "United States Minor Outlying Islands"){
                $scope.company.phonecountry = '+NONE';
            }
            else if(country == "Uruguay"){
                $scope.company.phonecountry = '+598';
            }
            else if(country == "Uzbekistan"){
                $scope.company.phonecountry = '+998';
            }
            else if(country == "Vanuatu"){
                $scope.company.phonecountry = '+678';
            }
            else if(country == "Venezuela,Bolivarian Republic of"){
                $scope.company.phonecountry = '+58';
            }
            else if(country == "Viet Nam"){
                $scope.company.phonecountry = '+84';
            }
            else if(country == "Virgin Islands,British"){
                $scope.company.phonecountry = '+1-284';
            }
            else if(country == "Virgin Islands,U.S."){
                $scope.company.phonecountry = '+1-340';
            }
            else if(country == "Wallis and Futuna"){
                $scope.company.phonecountry = '+681';
            }
            else if(country == "Western Sahara"){
                $scope.company.phonecountry = '+212';
            }
            else if(country == "Yemen"){
                $scope.company.phonecountry = '+967';
            }
            else if(country == "Zambia"){
                $scope.company.phonecountry = '+260';
            }
            else if(country == "Zimbabwe"){
                $scope.company.phonecountry = '+263';
            }
            else{
                $scope.company.phonecountry = '';
            }
        }
    }
    else{
        $scope.company = {};
        $scope.company.phonecountry = '';
        $scope.company.email = loginInfo.email;
        $scope.item = [{id: 1, industry: "Education"}, {id: 2, industry: "Information Technology"}, {id: 3, industry: "Business"},{id:4,industry:"Real estate‎"},{id:5,industry:"Textile‎"},{id:6,industry:"Professional sports"}];
        $scope.status = {isopen: false};
        $scope.industry = "Select Industry";

        $scope.industrySelect = function (r) {
            //console.log(r);
            $scope.industry = r;
            localStorage.setItem("industry", r);
        };
        $scope.test = function(){
            var country = $('#company-country').val();
            if(country=='Afghanistan'){
                $scope.company.phonecountry = '+93';
            }else if(country == "Aland Islands"){
                $scope.company.phonecountry = '+358';
            }
            else if(country == "Albania"){
                $scope.company.phonecountry = '+355';
            }
            else if(country == "Algeria"){
                $scope.company.phonecountry = '+213';
            }
            else if(country == "American Samoa"){
                $scope.company.phonecountry = '+1-684';
            }
            else if(country == "Andorra"){
                $scope.company.phonecountry = '+376';
            }
            else if(country == "Angola"){
                $scope.company.phonecountry = '+244';
            }
            else if(country == "Anguilla"){
                $scope.company.phonecountry = '+1-264';
            }
            else if(country == "Antarctica"){
                $scope.company.phonecountry = '+672';
            }
            else if(country == "Antigua And Barbuda"){
                $scope.company.phonecountry = '+1-268';
            }
            else if(country == "Argentina"){
                $scope.company.phonecountry = '+54';
            }
            else if(country == "Armenia"){
                $scope.company.phonecountry = '+374';
            }
            else if(country == "Aruba"){
                $scope.company.phonecountry = '+297';
            }
            else if(country == "Australia"){
                $scope.company.phonecountry = '+61';
            }
            else if(country == "Austria"){
                $scope.company.phonecountry = '+43';
            }
            else if(country == "Azerbaijan"){
                $scope.company.phonecountry = '+994';
            }
            else if(country == "Bahamas"){
                $scope.company.phonecountry = '+1-242';
            }
            else if(country == "Bahrain"){
                $scope.company.phonecountry = '+973';
            }
            else if(country == "Bangladesh"){
                $scope.company.phonecountry = '+880';
            }
            else if(country == "Barbados"){
                $scope.company.phonecountry = '+1-246';
            }
            else if(country == "Belarus"){
                $scope.company.phonecountry = '+375';
            }
            else if(country == "Belgium"){
                $scope.company.phonecountry = '+32';
            }
            else if(country == "Belize"){
                $scope.company.phonecountry = '+501';
            }
            else if(country == "Benin"){
                $scope.company.phonecountry = '+229';
            }
            else if(country == "Bermuda"){
                $scope.company.phonecountry = '+1-441';
            }
            else if(country == "Bhutan"){
                $scope.company.phonecountry = '+975';
            }
            else if(country == "Bolivia,Plurinational State of"){
                $scope.company.phonecountry = '+591';
            }
            else if(country == "Bonaire,Sint Eustatius and Saba"){
                $scope.company.phonecountry = '+599';
            }
            else if(country == "Bosnia and Herzegovina"){
                $scope.company.phonecountry = '+387';
            }
            else if(country == "Botswana"){
                $scope.company.phonecountry = '+267';
            }
            else if(country == "Bouvet Island"){
                $scope.company.phonecountry = '+NONE';
            }
            else if(country == "Brazil"){
                $scope.company.phonecountry = '+55';
            }
            else if(country == "British Indian Ocean Territory"){
                $scope.company.phonecountry = '+246';
            }
            else if(country == "Brunei Darussalam"){
                $scope.company.phonecountry = '+673';
            }
            else if(country == "Bulgaria"){
                $scope.company.phonecountry = '+359';
            }
            else if(country == "Burkina Faso"){
                $scope.company.phonecountry = '+226';
            }
            else if(country == "Burundi"){
                $scope.company.phonecountry = '+257';
            }
            else if(country == "Cambodia"){
                $scope.company.phonecountry = '+855';
            }
            else if(country == "Cameroon"){
                $scope.company.phonecountry = '+237';
            }
            else if(country == "Canada"){
                $scope.company.phonecountry = '+1';
            }
            else if(country == "Cape Verde"){
                $scope.company.phonecountry = '+238';
            }
            else if(country == "Cayman Islands"){
                $scope.company.phonecountry = '+1-345';
            }
            else if(country == "Central African Republic"){
                $scope.company.phonecountry = '+236';
            }
            else if(country == "Chad"){
                $scope.company.phonecountry = '+235';
            }
            else if(country == "Chile"){
                $scope.company.phonecountry = '+56';
            }
            else if(country == "China"){
                $scope.company.phonecountry = '+86';
            }
            else if(country == "Christmas Island"){
                $scope.company.phonecountry = '+61';
            }
            else if(country == "Cocos (Keeling) Islands"){
                $scope.company.phonecountry = '+682';
            }
            else if(country == "Colombia"){
                $scope.company.phonecountry = '+57';
            }
            else if(country == "Comoros"){
                $scope.company.phonecountry = '+269';
            }
            else if(country == "Congo"){
                $scope.company.phonecountry = '+242';
            }
            else if(country == "Congo,the Democratic Republic of the"){
                $scope.company.phonecountry = '+243';
            }
            else if(country == "Cook Islands"){
                $scope.company.phonecountry = '+682';
            }
            else if(country == "Costa Rica"){
                $scope.company.phonecountry = '+506';
            }
            else if(country == "Cote d'Ivoire"){
                $scope.company.phonecountry = '+225';
            }
            else if(country == "Croatia"){
                $scope.company.phonecountry = '+385';
            }
            else if(country == "Cuba"){
                $scope.company.phonecountry = '+53';
            }
            else if(country == "Cyprus"){
                $scope.company.phonecountry = '+357';
            }
            else if(country == "Czech Republic"){
                $scope.company.phonecountry = '+420';
            }
            else if(country == "Denmark"){
                $scope.company.phonecountry = '+45';
            }
            else if(country == "Djibouti"){
                $scope.company.phonecountry = '+253';
            }
            else if(country == "Dominica"){
                $scope.company.phonecountry = '+1-767';
            }
            else if(country == "Dominican Republic"){
                $scope.company.phonecountry = '+1-809';
            }
            else if(country == "Ecuador"){
                $scope.company.phonecountry = '+593';
            }
            else if(country == "Egypt"){
                $scope.company.phonecountry = '+20';
            }
            else if(country == "El Salvador"){
                $scope.company.phonecountry = '+503';
            }
            else if(country == "Equatorial Guinea"){
                $scope.company.phonecountry = '+240';
            }
            else if(country == "Eritrea"){
                $scope.company.phonecountry = '+291';
            }
            else if(country == "Estonia"){
                $scope.company.phonecountry = '+372';
            }
            else if(country == "Ethiopia"){
                $scope.company.phonecountry = '+251';
            }
            else if(country == "Falkland Islands (Malvinas)"){
                $scope.company.phonecountry = '+500';
            }
            else if(country == "Faroe Islands"){
                $scope.company.phonecountry = '+298';
            }
            else if(country == "Fiji"){
                $scope.company.phonecountry = '+679';
            }
            else if(country == "Finland"){
                $scope.company.phonecountry = '+358';
            }
            else if(country == "France"){
                $scope.company.phonecountry = '+33';
            }
            else if(country == "French Guiana"){
                $scope.company.phonecountry = '+594';
            }
            else if(country == "French Polynesia"){
                $scope.company.phonecountry = '+689';
            }
            else if(country == "French Southern Territories"){
                $scope.company.phonecountry = '+NONE';
            }
            else if(country == "Gabon"){
                $scope.company.phonecountry = '+241';
            }
            else if(country == "Gambia"){
                $scope.company.phonecountry = '+220';
            }
            else if(country == "Georgia"){
                $scope.company.phonecountry = '+995';
            }
            else if(country == "Germany"){
                $scope.company.phonecountry = '+49';
            }
            else if(country == "Ghana"){
                $scope.company.phonecountry = '+233';
            }
            else if(country == "Gibraltar"){
                $scope.company.phonecountry = '+350';
            }
            else if(country == "Greece"){
                $scope.company.phonecountry = '+30';
            }
            else if(country == "Greenland"){
                $scope.company.phonecountry = '+299';
            }
            else if(country == "Guatemala"){
                $scope.company.phonecountry = '+502';
            }
            else if(country == "Guernsey"){
                $scope.company.phonecountry = '+44-1481';
            }
            else if(country == "Guinea"){
                $scope.company.phonecountry = '+224';
            }
            else if(country == "Guinea-Bissau"){
                $scope.company.phonecountry = '+245';
            }
            else if(country == "Guyana"){
                $scope.company.phonecountry = '+592';
            }
            else if(country == "Haiti"){
                $scope.company.phonecountry = '+509';
            }
            else if(country == "Heard Island and McDonald Islands"){
                $scope.company.phonecountry = '+NONE';
            }
            else if(country == "Holy See (Vatican City State)"){
                $scope.company.phonecountry = '+379';
            }
            else if(country == "Honduras"){
                $scope.company.phonecountry = '+504';
            }
            else if(country == "Hong Kong"){
                $scope.company.phonecountry = '+852';
            }
            else if(country == "Hungary"){
                $scope.company.phonecountry = '+36';
            }
            else if(country == "Iceland"){
                $scope.company.phonecountry = '+354';
            }
            else if(country == "India"){
                $scope.company.phonecountry = '+91';
            }
            else if(country == "Indonesia"){
                $scope.company.phonecountry = '+62';
            }
            else if(country == "Iran,Islamic Republic of"){
                $scope.company.phonecountry = '+98';
            }
            else if(country == "Iraq"){
                $scope.company.phonecountry = '+964';
            }
            else if(country == "Ireland"){
                $scope.company.phonecountry = '+353';
            }
            else if(country == "Isle of Man"){
                $scope.company.phonecountry = '+44';
            }
            else if(country == "Israel"){
                $scope.company.phonecountry = '+972';
            }
            else if(country == "Italy"){
                $scope.company.phonecountry = '+39';
            }
            else if(country == "Jamaica"){
                $scope.company.phonecountry = '+1-876';
            }
            else if(country == "Japan"){
                $scope.company.phonecountry = '+81';
            }
            else if(country == "Jersey"){
                $scope.company.phonecountry = '+4-1534';
            }
            else if(country == "Jordan"){
                $scope.company.phonecountry = '+962';
            }
            else if(country == "Kazakhstan"){
                $scope.company.phonecountry = '+7';
            }
            else if(country == "Kenya"){
                $scope.company.phonecountry = '+254';
            }
            else if(country == "Kiribati"){
                $scope.company.phonecountry = '+686';
            }
            else if(country == "Korea,Democratic People's Republic of"){
                $scope.company.phonecountry = '+850';
            }
            else if(country == "Korea,Republic of"){
                $scope.company.phonecountry = '+82';
            }
            else if(country == "Kuwait"){
                $scope.company.phonecountry = '+965';
            }
            else if(country == "Kyrgyzstan"){
                $scope.company.phonecountry = '+996';
            }
            else if(country == "Lao People's Democratic Republic"){
                $scope.company.phonecountry = '+856';
            }
            else if(country == "Latvia"){
                $scope.company.phonecountry = '+371';
            }
            else if(country == "Lebanon"){
                $scope.company.phonecountry = '+961';
            }
            else if(country == "Lesotho"){
                $scope.company.phonecountry = '+266';
            }
            else if(country == "Liberia"){
                $scope.company.phonecountry = '+231';
            }
            else if(country == "Libya"){
                $scope.company.phonecountry = '+218';
            }
            else if(country == "Liechtenstein"){
                $scope.company.phonecountry = '+423';
            }
            else if(country == "Lithuania"){
                $scope.company.phonecountry = '+370';
            }
            else if(country == "Luxembourg"){
                $scope.company.phonecountry = '+352';
            }
            else if(country == "Macao"){
                $scope.company.phonecountry = '+853';
            }
            else if(country == "Macedonia,The Former Yugoslav Republic Of"){
                $scope.company.phonecountry = '+389';
            }
            else if(country == "Madagascar"){
                $scope.company.phonecountry = '+261';
            }
            else if(country == "Malawi"){
                $scope.company.phonecountry = '+265';
            }
            else if(country == "Malaysia"){
                $scope.company.phonecountry = '+60';
            }
            else if(country == "Maldives"){
                $scope.company.phonecountry = '+960';
            }
            else if(country == "Mali"){
                $scope.company.phonecountry = '+223';
            }
            else if(country == "Malta"){
                $scope.company.phonecountry = '+356';
            }
            else if(country == "Marshall Islands"){
                $scope.company.phonecountry = '+692';
            }
            else if(country == "Martinique"){
                $scope.company.phonecountry = '+596';
            }
            else if(country == "Mauritania"){
                $scope.company.phonecountry = '+222';
            }
            else if(country == "Mauritius"){
                $scope.company.phonecountry = '+230';
            }
            else if(country == "Mayotte"){
                $scope.company.phonecountry = '+262';
            }
            else if(country == "Mexico"){
                $scope.company.phonecountry = '+52';
            }
            else if(country == "Micronesia,Federated States of"){
                $scope.company.phonecountry = '+691';
            }
            else if(country == "Moldova,Republic of"){
                $scope.company.phonecountry = '+373';
            }
            else if(country == "Monaco"){
                $scope.company.phonecountry = '+377';
            }
            else if(country == "Mongolia"){
                $scope.company.phonecountry = '+976';
            }
            else if(country == "Montenegro"){
                $scope.company.phonecountry = '+382';
            }
            else if(country == "Montserrat"){
                $scope.company.phonecountry = '+1-664';
            }
            else if(country == "Morocco"){
                $scope.company.phonecountry = '+212';
            }
            else if(country == "Mozambique"){
                $scope.company.phonecountry = '+258';
            }
            else if(country == "Myanmar"){
                $scope.company.phonecountry = '+95';
            }
            else if(country == "Namibia"){
                $scope.company.phonecountry = '+264';
            }
            else if(country == "Nauru"){
                $scope.company.phonecountry = '+674';
            }
            else if(country == "Nepal"){
                $scope.company.phonecountry = '+977';
            }
            else if(country == "Netherlands"){
                $scope.company.phonecountry = '+31';
            }
            else if(country == "New Caledonia"){
                $scope.company.phonecountry = '+687';
            }
            else if(country == "New Zealand"){
                $scope.company.phonecountry = '+64';
            }
            else if(country == "Nicaragua"){
                $scope.company.phonecountry = '+505';
            }
            else if(country == "Niger"){
                $scope.company.phonecountry = '+227';
            }
            else if(country == "Nigeria"){
                $scope.company.phonecountry = '+234';
            }
            else if(country == "Niue"){
                $scope.company.phonecountry = '+683';
            }
            else if(country == "Norfolk Island"){
                $scope.company.phonecountry = '+672';
            }
            else if(country == "Northern Mariana Islands"){
                $scope.company.phonecountry = '+1-670';
            }
            else if(country == "Norway"){
                $scope.company.phonecountry = '+47';
            }
            else if(country == "Oman"){
                $scope.company.phonecountry = '+968';
            }
            else if(country == "Pakistan"){
                $scope.company.phonecountry = '+92';
            }
            else if(country == "Palau"){
                $scope.company.phonecountry = '+680';
            }
            else if(country == "Palestinian Territory,Occupied"){
                $scope.company.phonecountry = '+970';
            }
            else if(country == "Panama"){
                $scope.company.phonecountry = '+507';
            }
            else if(country == "Papua New Guinea"){
                $scope.company.phonecountry = '+675';
            }
            else if(country == "Paraguay"){
                $scope.company.phonecountry = '+595';
            }
            else if(country == "Peru"){
                $scope.company.phonecountry = '+51';
            }
            else if(country == "Philippines"){
                $scope.company.phonecountry = '+63';
            }
            else if(country == "Pitcairn"){
                $scope.company.phonecountry = '+64';
            }
            else if(country == "Poland"){
                $scope.company.phonecountry = '+48';
            }
            else if(country == "Portugal"){
                $scope.company.phonecountry = '+351';
            }
            else if(country == "Puerto Rico"){
                $scope.company.phonecountry = '+1-787';
            }
            else if(country == "Qatar"){
                $scope.company.phonecountry = '+974';
            }
            else if(country == "Reunion"){
                $scope.company.phonecountry = '+262';
            }
            else if(country == "Romania"){
                $scope.company.phonecountry = '+40';
            }
            else if(country == "Russian Federation"){
                $scope.company.phonecountry = '+7';
            }
            else if(country == "Rwanda"){
                $scope.company.phonecountry = '+250';
            }
            else if(country == "Saint Barthelemy"){
                $scope.company.phonecountry = '+590';
            }
            else if(country == "Saint Helena,Ascension and Tristan da Cunha"){
                $scope.company.phonecountry = '+290';
            }
            else if(country == "Saint Kitts and Nevis"){
                $scope.company.phonecountry = '+1-869';
            }
            else if(country == "Saint Lucia"){
                $scope.company.phonecountry = '+1-758';
            }
            else if(country == "Saint Martin (French Part)"){
                $scope.company.phonecountry = '+590';
            }
            else if(country == "Saint Pierre and Miquelon"){
                $scope.company.phonecountry = '+508';
            }
            else if(country == "Saint Vincent and the Grenadines"){
                $scope.company.phonecountry = '+1-784';
            }
            else if(country == "Samoa"){
                $scope.company.phonecountry = '+685';
            }
            else if(country == "San Marino"){
                $scope.company.phonecountry = '+378';
            }
            else if(country == "Sao Tome and Principe"){
                $scope.company.phonecountry = '+239';
            }
            else if(country == "Saudi Arabia"){
                $scope.company.phonecountry = '+966';
            }
            else if(country == "Senegal"){
                $scope.company.phonecountry = '+221';
            }
            else if(country == "Serbia"){
                $scope.company.phonecountry = '+381';
            }
            else if(country == "Seychelles"){
                $scope.company.phonecountry = '+248';
            }
            else if(country == "Sierra Leone"){
                $scope.company.phonecountry = '+232';
            }
            else if(country == "Singapore"){
                $scope.company.phonecountry = '+65';
            }
            else if(country == "Sint Maarten (Dutch Part)"){
                $scope.company.phonecountry = '+1-721';
            }
            else if(country == "Slovakia"){
                $scope.company.phonecountry = '+421';
            }
            else if(country == "Slovenia"){
                $scope.company.phonecountry = '+386';
            }
            else if(country == "Solomon Islands"){
                $scope.company.phonecountry = '+677';
            }
            else if(country == "Somalia"){
                $scope.company.phonecountry = '+252';
            }
            else if(country == "South Africa"){
                $scope.company.phonecountry = '+27';
            }
            else if(country == "South Georgia and the South Sandwich Islands"){
                $scope.company.phonecountry = '+500';
            }
            else if(country == "South Sudan"){
                $scope.company.phonecountry = '+211';
            }
            else if(country == "Spain"){
                $scope.company.phonecountry = '+34';
            }
            else if(country == "Sri Lanka"){
                $scope.company.phonecountry = '+94';
            }
            else if(country == "Sudan"){
                $scope.company.phonecountry = '+249';
            }
            else if(country == "Suriname"){
                $scope.company.phonecountry = '+597';
            }
            else if(country == "Svalbard and Jan Mayen"){
                $scope.company.phonecountry = '+47';
            }
            else if(country == "Swaziland"){
                $scope.company.phonecountry = '+268';
            }
            else if(country == "Sweden"){
                $scope.company.phonecountry = '+46';
            }
            else if(country == "Switzerland"){
                $scope.company.phonecountry = '+41';
            }
            else if(country == "Syrian Arab Republic"){
                $scope.company.phonecountry = '+963';
            }
            else if(country == "Taiwan,Province of China"){
                $scope.company.phonecountry = '+886';
            }
            else if(country == "Tajikistan"){
                $scope.company.phonecountry = '+992';
            }
            else if(country == "Tanzania,United Republic of"){
                $scope.company.phonecountry = '+255';
            }
            else if(country == "Thailand"){
                $scope.company.phonecountry = '+66';
            }
            else if(country == "Timor-Leste"){
                $scope.company.phonecountry = '+670';
            }
            else if(country == "Togo"){
                $scope.company.phonecountry = '+228';
            }
            else if(country == "Tokelau"){
                $scope.company.phonecountry = '+690';
            }
            else if(country == "Tonga"){
                $scope.company.phonecountry = '+676';
            }
            else if(country == "Trinidad and Tobago"){
                $scope.company.phonecountry = '+1-868';
            }
            else if(country == "Tunisia"){
                $scope.company.phonecountry = '+216';
            }
            else if(country == "Turkey"){
                $scope.company.phonecountry = '+90';
            }
            else if(country == "Turkmenistan"){
                $scope.company.phonecountry = '+993';
            }
            else if(country == "Turks and Caicos Islands"){
                $scope.company.phonecountry = '+1-649';
            }
            else if(country == "Tuvalu"){
                $scope.company.phonecountry = '+688';
            }
            else if(country == "Uganda"){
                $scope.company.phonecountry = '+256';
            }
            else if(country == "Ukraine"){
                $scope.company.phonecountry = '+380';
            }
            else if(country == "United Arab Emirates"){
                $scope.company.phonecountry = '+971';
            }
            else if(country == "United Kingdom"){
                $scope.company.phonecountry = '+44';
            }
            else if(country == "United States"){
                $scope.company.phonecountry = '+1';
            }
            else if(country == "United States Minor Outlying Islands"){
                $scope.company.phonecountry = '+NONE';
            }
            else if(country == "Uruguay"){
                $scope.company.phonecountry = '+598';
            }
            else if(country == "Uzbekistan"){
                $scope.company.phonecountry = '+998';
            }
            else if(country == "Vanuatu"){
                $scope.company.phonecountry = '+678';
            }
            else if(country == "Venezuela,Bolivarian Republic of"){
                $scope.company.phonecountry = '+58';
            }
            else if(country == "Viet Nam"){
                $scope.company.phonecountry = '+84';
            }
            else if(country == "Virgin Islands,British"){
                $scope.company.phonecountry = '+1-284';
            }
            else if(country == "Virgin Islands,U.S."){
                $scope.company.phonecountry = '+1-340';
            }
            else if(country == "Wallis and Futuna"){
                $scope.company.phonecountry = '+681';
            }
            else if(country == "Western Sahara"){
                $scope.company.phonecountry = '+212';
            }
            else if(country == "Yemen"){
                $scope.company.phonecountry = '+967';
            }
            else if(country == "Zambia"){
                $scope.company.phonecountry = '+260';
            }
            else if(country == "Zimbabwe"){
                $scope.company.phonecountry = '+263';
            }
            else{
                $scope.company.phonecountry = '';
            }
        }
    }

    $scope.go = function (data) {
        console.log(data)
        var company = {};

        if(localStorage.getItem("industry") == null || localStorage.getItem("industry") == '' || localStorage.getItem("industry") == undefined){
            var temp = data.industry;
        }else{
            var temp = localStorage.getItem("industry");
        }
        var image = $('#company-img').attr('src');
        var country = data.country;
        var companyname = data.companyname;
        var address = data.address;
        var code = data.phonecountry;
        var phone = data.phone;
        var email = data.email;
        var website = data.website;
        var overview = data.overview;
        var industry = temp;
        if(country == '' || country == null || country == undefined){
            $scope.myAlert('Please select the country')
        }else if(companyname == '' || companyname == null || companyname == undefined){
            $scope.myAlert('Please fill the company name')
        }else if(address == '' || address == null || address == undefined){
            $scope.myAlert('Please fill the address')
        }else if(phone == '' || phone == null || phone == undefined){
            $scope.myAlert('Please fill the phone')
        }else if(email == '' || email == null || email == undefined){
            $scope.myAlert('Please fill the email')
        }else if(website == '' || website == null || website == undefined){
            $scope.myAlert('Please fill the website')
        }else if(overview == '' || overview == null || overview == undefined){
            $scope.myAlert('Please fill the overview')
        }else if(industry == '' || industry == null || industry == undefined){
            $scope.myAlert('Please select the industry')
        }else{

        company = {
            image: image, country: country, companyname: companyname, address: address, phone: phone, email: email, website: website, overview: overview, countrycode : code, industry: industry
        };
        //console.log(company)
        myService.employer_company = company;
        var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
        var user_id = loginInfo.user_id;
        localStorage.setItem('companyinfo', JSON.stringify(company));
        // $.ajax({
        //     method: "POST",
        //     dataType: "json",
        //     data: {userid: user_id, company: company},
        //     url: "http://www.primefield.co/jobsearch/saveemployerpreview.php"
        // }).then(function (data) {
            //$ionicLoading.hide();
            $state.go('employer-video');
        //});
        
        }
    };
});

//Employer-preview
start.controller('EPreviewCtrl', function ($scope, $state, $http, myService, $ionicLoading) {
    $scope.comP = true;
    var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
    var user_id = loginInfo.user_id;
    $scope.item = [{id: 1, industry: "Education"}, {id: 2, industry: "Information Technology"}, {id: 3, industry: "Business"},{id:4,industry:"Real estate‎"},{id:5,industry:"Textile‎"},{id:6,industry:"Professional sports"}];
    $scope.status = {isopen: false
    };
    $scope.industry = "Select Industry";

    $scope.toggleGroup = function(x) {
        if($scope.openGroup != x){
            $scope.openGroup = x;
        }
        else{
            $scope.openGroup = 0;
        } 
    };

    $scope.name1 = 'Company Information';

    $scope.industrySelect = function (r) {
        //console.log(r);
        $scope.industry = r;
        localStorage.setItem("industry", r);
    };
    console.log(myService.employer_company);
    $scope.company = myService.employer_company;
    console.log($scope.company);
    $scope.company.phonecountry = myService.employer_company.countrycode
    $scope.industry = localStorage.getItem("industry");
    //$('#industry-button').prop('disabled', true);

    $('#company-edit').show();
    $('#company-save').hide();
    var Cpath = 'http://www.primefield.co/jobsearch/companyImage/com_' + localStorage.getItem("userID") + '.jpg?timestamp='+new Date().getTime();
    var path = 'http://www.primefield.co/jobsearch/pictureurl/' + localStorage.getItem("userID") + '.jpg?timestamp='+new Date().getTime()
    var Vpath = 'http://www.primefield.co/jobsearch/videos/' + localStorage.getItem("userID") + '.jpg?timestamp='+new Date().getTime();
    angular.element(document).ready(function () {
        $('#p-img').attr('src',  path);
        $('#p-video').attr('src',  Vpath);
        $('#p-video').attr('onclick', 'openFile(\'https://s3-ap-southeast-1.amazonaws.com/video1.123/' + localStorage.getItem("userID") + '.3gp\')');
        $('#company-img').attr('src',  Cpath);
    });

    $scope.companyedit = function () {
        $('#company-edit').hide();
        $('#company-save').show();
        $scope.comP = false;

        // $('#company-country').prop('disabled', false);
        // $('#company-companyname').prop('disabled', false);
        // $('#company-address').prop('disabled', false);
        // $('#company-phone').prop('disabled', false);
        // $('#company-email').prop('disabled', false);
        // $('#company-website').prop('disabled', false);
        // $('#company-overview').prop('disabled', false);
        // $('#industry-button').prop('disabled', false);

    };
    $scope.companysave = function () {
        $('#company-edit').show();
        $('#company-save').hide();
        $scope.comP = true;

        // $('#company-country').prop('disabled', true);
        // $('#company-companyname').prop('disabled', true);
        // $('#company-address').prop('disabled', true);
        // $('#company-phone').prop('disabled', true);
        // $('#company-email').prop('disabled', true);
        // $('#company-website').prop('disabled', true);
        // $('#company-overview').prop('disabled', true);
        // $('#industry-button').prop('disabled', true);
    };

    $scope.go = function () {
        console.log($scope.company);
        //console.log(user_id);
        $ionicLoading.show({
          template: 'Loading...'
        });
        $.ajax({
            method: "POST",
            dataType: "json",
            data: {userid: user_id, company: $scope.company},
            url: "http://www.primefield.co/jobsearch/saveemployerpreview.php"
        }).then(function (data) {
            $ionicLoading.hide();
            $state.go('employer-main');
        });


    };
});

//Employer-openjobdetailviewjobseeker
start.controller('EJSProfileCtrl', function ($scope, $state, $http, myService) {
    
    $scope.name1 = 'Personal Information';
    $scope.name2 = 'Education';
    $scope.name3 = 'Experience';
    $scope.name4 = "Social Links";
    $scope.name5 = "Please share your passion";
    var user_id = myService.user.userid;
    $scope.viwedJob = myService.employer_postjob
    $scope.radiobutton = {};
    //$scope.shownGroup2 = false;
    $scope.toggleGroup = function(x) {
        if($scope.openGroup != x){
            $scope.openGroup = x;
        }
        else{
            $scope.openGroup = 0;
        } 
    };

    var path = 'http://www.primefield.co/jobsearch/pictureurl/' + user_id + '.jpg?timestamp='+new Date().getTime();
    var Vpath = 'http://www.primefield.co/jobsearch/videos/' + user_id + '.jpg?timestamp='+new Date().getTime();
    angular.element(document).ready(function () {
        $('#p-img').attr('src',  path);
        $('#p-video').attr('src',  Vpath);
        $('#p-video').attr('onclick', 'openFile(\'https://s3-ap-southeast-1.amazonaws.com/video1.123/' + user_id + '.3gp\')');
       
    });
    
    //console.log(user_id);
    $.ajax({
        method: "POST", 
        dataType: "json",
        data: {userid: user_id},
        url: "http://www.primefield.co/jobsearch/viewemployeeprofile.php"
    }).then(function (data) {
        //console.log(data);
        //$scope.isdisabled = false;
        $scope.isdisabled = true;
        $scope.personalinfo = data.personal;
        $scope.radiobutton = $scope.personalinfo.gender;
        $scope.dob = new Date($scope.personalinfo.dob);

        $scope.educationinfo = data.education;



        $scope.experienceinfo = data.experience;


        $scope.link = data.social;

        $scope.misc = data.miscellaneous;
    });
    var nselected;
    $scope.onTypeChange = function () {
        nselected = $scope.radiobutton.group1;
    };
    $scope.personalinfoupdate = function () {
        //console.log($scope.personalinfo)
        $scope.personalinfo.gender = nselected;
        var abc = $('#personalinfo-dob').val();
        $scope.personalinfo.dob = abc;
        $.ajax({
            method: "POST",
            dataType: "json",
            data: {userid: user_id, personal: $scope.personalinfo},
            url: "http://www.primefield.co/jobsearch/updatepersonalemployee.php"
        }).then(function (data) {
            //console.log(data);
        });
    };


    $scope.educationinfoupdate = function (index, eduid) {
        var sy = $('#educationinfo-startyear').val();
        $scope.educationinfo[index].startyear = sy;
        var ey = $('#educationinfo-endyear').val();
        $scope.educationinfo[index].endyear = ey;
        //console.log($scope.educationinfo[index]);
        $.ajax({
            method: "POST",
            dataType: "json",
            data: {eduid: eduid, education: $scope.educationinfo[index], action: "update"},
            url: "http://www.primefield.co/jobsearch/updateeducationemployee.php"
        }).then(function (data) {
            //console.log(data);
        });
    };

    $scope.educationinfodelete = function (eduid) {
        if(confirm('Would you like to delete it') == true){
            $.ajax({
                method: "POST",
                dataType: "json",
                data: {eduid: eduid, action: "delete"},
                url: "http://www.primefield.co/jobsearch/updateeducationemployee.php"
            }).then(function (data) {
                //console.log(data);
            });
        }
        
    };

    $scope.experienceinfoupdate = function (index, exid) {
        var timestart = $('#experienceinfo-timestartYear').val()+"-"+$('#experienceinfo-timestartMonth').val();
        var timeend = $('#experienceinfo-timeendYear').val()+"-"+$('#experienceinfo-timestartMonth').val();
        $scope.experienceinfo[index].timestart = timestart;
        $scope.experienceinfo[index].timeend = timeend;
        //console.log($scope.experienceinfo[index]);
        $.ajax({
            method: "POST",
            dataType: "json",
            data: {exid: exid, experience: $scope.experienceinfo[index], action: "update"},
            url: "http://www.primefield.co/jobsearch/updateexperienceemployee.php"
        }).then(function (data) {
            //console.log(data);
        });
    };

    $scope.experienceinfodelete = function (exid) {
        if(confirm('Would you like to delete it') == true){
            $.ajax({
                method: "POST",
                dataType: "json",
                data: {exid: exid, action: "delete"},
                url: "http://www.primefield.co/jobsearch/updateexperienceemployee.php"
            }).then(function (data) {
                //console.log(data);
            });
        }    
    };

    $scope.linkinfoupdate = function () {
        $.ajax({
            method: "POST",
            dataType: "json",
            data: {userid: user_id, social: $scope.link},
            url: "http://www.primefield.co/jobsearch/updatesocialemployee.php"
        }).then(function (data) {
            //console.log(data);
        });
    };

    $scope.miscinfoupdate = function () {
        $.ajax({
            method: "POST",
            dataType: "json",
            data: {userid: user_id, miscellaneous: $scope.misc},
            url: "http://www.primefield.co/jobsearch/updatemiscellaneousemployee.php"
        }).then(function (data) {
            //console.log(data);
        });
    };

});

//EOpenJobDetailShortlistedJobseekerCtrl
start.controller('EOpenJobDetailShortlistedJobseekerCtrl', function ($scope, $state, $http, myService, $window) {

    var user_id = myService.user.userid;
    var jobid = myService.employer_postjob.jobid;
    //console.log(myService.employer_postjob);
    var employerid = localStorage.getItem("userID");

    $scope.name1 = 'Personal Information';
    $scope.name2 = 'Education';
    $scope.name3 = 'Experience';
    $scope.name4 = "Social Links";
    $scope.name5 = "Please share your passion";
    $scope.name6 = "Job Applicant Pitch";
    $scope.radiobutton = {};
    $scope.viwedJob = myService.employer_postjob
    //$scope.shownGroup2 = false;
    $scope.toggleGroup = function(x) {
        if($scope.openGroup != x){
            $scope.openGroup = x;
        }
        else{
            $scope.openGroup = 0;
        } 
    };
    
    var path = 'http://www.primefield.co/jobsearch/pictureurl/' + user_id + '.jpg?timestamp='+new Date().getTime();
    var Vpath = 'http://www.primefield.co/jobsearch/videos/' + user_id + '.jpg?timestamp='+new Date().getTime();
    var jobA = 'http://www.primefield.co/jobsearch/videos/apply_' + jobid + '_'+ user_id +'.jpg?timestamp='+new Date().getTime();
    angular.element(document).ready(function () {
        $('#p-img').attr('src',  path);
        $('#p-video').attr('src',  Vpath);
        $('#p-video').attr('onclick', 'openFile(\'https://s3-ap-southeast-1.amazonaws.com/video1.123/' + user_id + '.3gp\')');
    });
    //console.log(jobid);
    ///$scope.isdisabled = false;
    //console.log(user_id);
    $.ajax({
        method: "POST",
        dataType: "json",
        data: {userid: user_id,jobid:jobid},
        url: "http://www.primefield.co/jobsearch/getEmployeeIsShortlisted.php"
    }).then(function (data) {
        if(data.shortListed.length) {
            $scope.hide = !$scope.hide;
        } else {
            $scope.hide = $scope.hide;
        }
    });

    $.ajax({
        method: "POST",
        dataType: "json",
        data: {userid: user_id},
        url: "http://www.primefield.co/jobsearch/viewemployeeprofile.php"
    }).then(function (data) { 
        $('#jobA-img').attr('src', jobA); 
        $('#jobA-img').attr('onclick', 'openFile(\'https://s3-ap-southeast-1.amazonaws.com/video1.123/apply_' + jobid + '_'+ user_id + '.3gp\')');
        console.log(data.personal);
        $scope.personalinfo = data.personal;
        $scope.phonecountry = $scope.personalinfo.phonecountry;
        $scope.radiobutton = $scope.personalinfo.gender;
        $scope.dob = new Date($scope.personalinfo.dob);

        $scope.educationinfo = data.education;
        //console.log($scope.educationinfo);
        for (var i = 0; i < $scope.educationinfo.length; i++) {
            $scope.startyear = new Date($scope.educationinfo[i].startyear);
            $scope.endyear = new Date($scope.educationinfo[i].endyear);
        }

        $scope.experienceinfo = data.experience;
        for (var i = 0; i < $scope.experienceinfo.length; i++) {
            $scope.timestart = new Date($scope.experienceinfo[i].timestart);
            $scope.timeend = new Date($scope.experienceinfo[i].timeend);
        }

        $scope.link = data.social;

        $scope.misc = data.miscellaneous;
        $scope.$apply();

    });

    var nselected;
    $scope.hide = true;
    $scope.isdisabled = true;
    $scope.onTypeChange = function () {
        nselected = $scope.radiobutton.group1;
    };


    $scope.shortlist = function () {
        $scope.hide = !$scope.hide;
        $scope.isdisabled = !$scope.isdisabled;
        console.log($scope.personalinfo);
        $.ajax({
            method: "POST",
            dataType: "json",
            data: {jobseekerid: user_id, employerid:employerid, jobid:jobid},
            url: "http://www.primefield.co/jobsearch/saveshortlisted.php"
        }).then(function (data) {
            console.log(data);
        })
    };

    $scope.removeShortlist = function ($event) {

        if(confirm('Are you sure you want to remove this applicant from shortlist?') == true){
            $scope.hide = !$scope.hide;
            $scope.isdisabled = !$scope.isdisabled;
            $.ajax({
                method: "POST",
                dataType: "json",
                data: {jobseekerid: user_id, employerid:employerid, jobid:jobid},
                url: "http://www.primefield.co/jobsearch/deleteshortlisted.php"
            }).then(function (data) {

            })
        }
    };

    $scope.phone = function (tel) {
        tel = $scope.phonecountry+''+tel;
        window.open('tel:' + tel, '_system');
    };

    $scope.email = function(email, subject, body) {
        console.log(email)
        var temp = [];
        temp.push(email);
        if(window.plugins && window.plugins.emailComposer) {
            window.plugins.emailComposer.showEmailComposerWithCallback(function(result) {
                console.log("Response -> " + result);
            }, 
            "Shortlisted for job", // Subject
            "I would like to inform you your profile is shortlisted for our job",                      // Body
            temp,    // To
            null,                    // CC
            null,                    // BCC
            false,                   // isHTML
            null,                    // Attachments
            null);                   // Attachment Data
        }
        // var link = "mailto:"+ email
        //          + "?subject=New%20email " + escape(subject)
        //          + "&body=" + escape(body); 

        // window.location.href = link;
     };
    // $scope.email = function (email) {
    //     $window.location.href = 'mailto:'+email;
    //     alert("Email");
    // };
    $scope.message = function () {
        alert("Message");
    };



    $scope.personalinfoupdate = function () {
        //console.log($scope.personalinfo)
        $scope.personalinfo.gender = nselected;
        var abc = $('#personalinfo-dob').val();
        $scope.personalinfo.dob = abc;
        $.ajax({
            method: "POST",
            dataType: "json",
            data: {userid: user_id, personal: $scope.personalinfo},
            url: "http://www.primefield.co/jobsearch/updatepersonalemployee.php"
        }).then(function (data) {
            //console.log(data);
        });
    };


    $scope.educationinfoupdate = function (index, eduid) {
        var sy = $('#educationinfo-startyear').val();
        $scope.educationinfo[index].startyear = sy;
        var ey = $('#educationinfo-endyear').val();
        $scope.educationinfo[index].endyear = ey;
        //console.log($scope.educationinfo[index]);
        $.ajax({
            method: "POST",
            dataType: "json",
            data: {eduid: eduid, education: $scope.educationinfo[index], action: "update"},
            url: "http://www.primefield.co/jobsearch/updateeducationemployee.php"
        }).then(function (data) {
            //console.log(data);
        });
    };

    $scope.educationinfodelete = function (eduid) {
        if(confirm('Would you like to delete it') == true){
            $.ajax({
                method: "POST",
                dataType: "json",
                data: {eduid: eduid, action: "delete"},
                url: "http://www.primefield.co/jobsearch/updateeducationemployee.php"
            }).then(function (data) {
                //console.log(data);
            });
        }
        
    };

    $scope.experienceinfoupdate = function (index, exid) {
        var timestart = $('#experienceinfo-timestartYear').val()+"-"+$('#experienceinfo-timestartMonth').val();
        var timeend = $('#experienceinfo-timeendYear').val()+"-"+$('#experienceinfo-timestartMonth').val();
        $scope.experienceinfo[index].timestart = timestart;
        $scope.experienceinfo[index].timeend = timeend;
        //console.log($scope.experienceinfo[index]);
        $.ajax({
            method: "POST",
            dataType: "json",
            data: {exid: exid, experience: $scope.experienceinfo[index], action: "update"},
            url: "http://www.primefield.co/jobsearch/updateexperienceemployee.php"
        }).then(function (data) {
            //console.log(data);
        });
    };

    $scope.experienceinfodelete = function (exid) {
        if(confirm('Would you like to delete it') == true){
            $.ajax({
                method: "POST",
                dataType: "json",
                data: {exid: exid, action: "delete"},
                url: "http://www.primefield.co/jobsearch/updateexperienceemployee.php"
            }).then(function (data) {
                //console.log(data);
            });
        }    
    };

    $scope.linkinfoupdate = function () {
        $.ajax({
            method: "POST",
            dataType: "json",
            data: {userid: user_id, social: $scope.link},
            url: "http://www.primefield.co/jobsearch/updatesocialemployee.php"
        }).then(function (data) {
            //console.log(data);
        });
    };

    $scope.miscinfoupdate = function () {
        $.ajax({
            method: "POST",
            dataType: "json",
            data: {userid: user_id, miscellaneous: $scope.misc},
            url: "http://www.primefield.co/jobsearch/updatemiscellaneousemployee.php"
        }).then(function (data) {
            //console.log(data);
        });
    };

});
start.controller('testCtrl', function($scope,$state,$http ) {
 
alert("hello test");
 // $cordovaGeolocation.getCurrentPosition(options).then(function(position){
  
 $scope.user.dest = "genting lane";  

  //});
});

start.controller('MapCtrl', function($scope,$state ,$cordovaGeolocation,$ionicLoading,$interval,$ionicPopup,$window,$ionicHistory) {
	 $scope.user = {};
      $ionicLoading.show({
             template: 'Getting current location...'
             });
var onSuccess = function(position) {
    //$scope.position = position;
	//alert(position.coords.latitude);
	$scope.lat=position.coords.latitude;
    $scope.lng=position.coords.longitude;
    $scope.user.desc = "";
	var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	
	var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
	$scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
	//alert($scope.map);
	$ionicLoading.hide();
	
	google.maps.event.addListenerOnce($scope.map, 'idle', function(){
 
  var marker = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: latLng
  });      
   var infoWindow = new google.maps.InfoWindow({
      content: "Here I am!"
  });
 
  google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open($scope.map, marker);
  });
});

$scope.saveDetails = function(){
  //      alert("you click save button");alert("hello"); //$state.go("riderDest");
    //var lat = $scope.lat;
    //var lgt = $scope.lng;
    //var des = $scope.user.desc;
     localStorage.setItem('lat',$scope.lat);
     localStorage.setItem('lng',$scope.lng);
     localStorage.setItem('des',$scope.user.desc);
    //localStorage.setItem("lat", lat);
   // localStorage.setItem("lng", lng);
    //localStorage.setItem("des", des);
//alert("helloss"); 
   $state.go("riderdest");
    // Code to write to Firebase will be here
  };
  };
  
  var onError = function(error) {
    console.log('ERROR! code: ' + error.code + ' ' + 'message: ' + error.message);
	var msg = 'Please turn on Location Services.';
	var alertPopup = $ionicPopup.alert({
                        title: 'Location Not Found!',
                        template: msg
                    });
					//cordova.plugins.settings.openSetting('application')
	//alert(error.message);
	$ionicLoading.hide();
	var interval = $interval(callAtInterval, 5000);
  };
  function callAtInterval() {
	  //alert("inter");
	  window.location.reload(true);
	  //alert(position.coords.latitude);
	  if(position.coords.latitude !=null)
	  {
		  $interval.cancel(interval);
	  }
  }
  
  
   navigator.geolocation.getCurrentPosition(onSuccess, onError, {timeout: 10000, enableHighAccuracy: true});

    
});



//start.directive('map', function($cordovaGeolocation) {
  //  return {
    //    restrict: 'A',
      //  link:function(scope, element, attrs){

        //  var zValue = 15;
         // var lat = scope.$eval(attrs.lat);
          //var lng = scope.$eval(attrs.lng);
          //alert(scope.$eval(attrs.lat));

          //var myLatlng = new google.maps.LatLng(lat,lng),
         // mapOptions = {
           //   zoom: zValue,
             // center: myLatlng
          //},
          //map = new google.maps.Map(element[0],mapOptions),
          //marker = new google.maps.Marker({
            //    position: myLatlng,
              //  map: map,
                //draggable:true
          //});
          //google.maps.event.addListener(marker, 'dragend', function(evt){
        //console.log('Current Latitude:',evt.latLng.lat(),'Current Longitude:',evt.latLng.lng());
        //scope.$parent.user.latitude = evt.latLng.lat();alert("you are here");
    //scope.$parent.user.longitude = evt.latLng.lng();
    //scope.$apply();
      //   });


        //}
    //};
//});

//EOpenJobDetailApplicationJobseekerCtrl
start.controller('EOpenJobDetailApplicationJobseekerCtrl', function ($scope, $state, $http, myService) {
    $scope.isdisabled = true; alert("check");
    var user_id = myService.user.userid;
    $scope.name1 = 'Personal Information';
    $scope.name2 = 'Education';
    $scope.name3 = 'Experience';
    $scope.name4 = "Social Links";
    $scope.name5 = "Please share your passion";
    $scope.radiobutton = {};
    var path = 'http://www.primefield.co/jobsearch/pictureurl/' + user_id + '.jpg?timestamp='+new Date().getTime();
    var Vpath = 'http://www.primefield.co/jobsearch/videos/' + user_id + '.jpg?timestamp='+new Date().getTime();
    angular.element(document).ready(function () {
        $('#p-img').attr('src',  path);
        $('#p-video').attr('src',  Vpath);
    });
    //$scope.shownGroup2 = false;
    $scope.toggleGroup = function(x) {
        if($scope.openGroup != x){
            $scope.openGroup = x;
        }
        else{
            $scope.openGroup = 0;
        } 
    };

    $scope.shortlist = function() {
        $.ajax({
            method: "POST",
            dataType: "json",
            data: {userid: user_id},
            url: "http://www.primefield.co/jobsearch/saveshortlisted.php"
        }).then(function (data) { 
            
        });
    };

    //console.log(user_id);
    $.ajax({
        method: "POST",
        dataType: "json",
        data: {userid: user_id},
        url: "http://www.primefield.co/jobsearch/viewemployeeprofile.php"
    }).then(function (data) {
        //console.log(data);
        $scope.personalinfo = data.personal;
        $scope.radiobutton = {group1: $scope.personalinfo.gender};
        $scope.dob = new Date($scope.personalinfo.dob);

        $scope.educationinfo = data.education;
        //console.log($scope.educationinfo);
        for (var i = 0; i < $scope.educationinfo.length; i++) {
            $scope.startyear = new Date($scope.educationinfo[i].startyear);
            $scope.endyear = new Date($scope.educationinfo[i].endyear);
        }

        $scope.experienceinfo = data.experience;
        for (var i = 0; i < $scope.experienceinfo.length; i++) {
            $scope.timestart = new Date($scope.experienceinfo[i].timestart);
            $scope.timeend = new Date($scope.experienceinfo[i].timeend);
        }

        $scope.link = data.social;

        $scope.misc = data.miscellaneous;
        $scope.$apply();

    });

    var nselected;
    $scope.onTypeChange = function () {
        nselected = $scope.radiobutton.group1;
    };
    $scope.personalinfoupdate = function () {
        //console.log($scope.personalinfo)
        $scope.personalinfo.gender = nselected;
        var abc = $('#personalinfo-dob').val();
        $scope.personalinfo.dob = abc;
        $.ajax({
            method: "POST",
            dataType: "json",
            data: {userid: user_id, personal: $scope.personalinfo},
            url: "http://www.primefield.co/jobsearch/updatepersonalemployee.php"
        }).then(function (data) {
            //console.log(data);
        });
    };


    $scope.educationinfoupdate = function (index, eduid) {
        var sy = $('#educationinfo-startyear').val();
        $scope.educationinfo[index].startyear = sy;
        var ey = $('#educationinfo-endyear').val();
        $scope.educationinfo[index].endyear = ey;
        //console.log($scope.educationinfo[index]);
        $.ajax({
            method: "POST",
            dataType: "json",
            data: {eduid: eduid, education: $scope.educationinfo[index], action: "update"},
            url: "http://www.primefield.co/jobsearch/updateeducationemployee.php"
        }).then(function (data) {
            //console.log(data);
        });
    };

    $scope.educationinfodelete = function (eduid) {
        if(confirm('Would you like to delete it') == true){
            $.ajax({
                method: "POST",
                dataType: "json",
                data: {eduid: eduid, action: "delete"},
                url: "http://www.primefield.co/jobsearch/updateeducationemployee.php"
            }).then(function (data) {
                //console.log(data);
            });
        }
        
    };

    $scope.experienceinfoupdate = function (index, exid) {
        var timestart = $('#experienceinfo-timestartYear').val()+"-"+$('#experienceinfo-timestartMonth').val();
        var timeend = $('#experienceinfo-timeendYear').val()+"-"+$('#experienceinfo-timestartMonth').val();
        $scope.experienceinfo[index].timestart = timestart;
        $scope.experienceinfo[index].timeend = timeend;
        //console.log($scope.experienceinfo[index]);
        $.ajax({
            method: "POST",
            dataType: "json",
            data: {exid: exid, experience: $scope.experienceinfo[index], action: "update"},
            url: "http://www.primefield.co/jobsearch/updateexperienceemployee.php"
        }).then(function (data) {
            //console.log(data);
        });
    };

    $scope.experienceinfodelete = function (exid) {
        if(confirm('Would you like to delete it') == true){
            $.ajax({
                method: "POST",
                dataType: "json",
                data: {exid: exid, action: "delete"},
                url: "http://www.primefield.co/jobsearch/updateexperienceemployee.php"
            }).then(function (data) {
                //console.log(data);
            });
        }    
    };

    $scope.linkinfoupdate = function () {
        $.ajax({
            method: "POST",
            dataType: "json",
            data: {userid: user_id, social: $scope.link},
            url: "http://www.primefield.co/jobsearch/updatesocialemployee.php"
        }).then(function (data) {
            //console.log(data);
        });
    };

    $scope.miscinfoupdate = function () {
        $.ajax({
            method: "POST",
            dataType: "json",
            data: {userid: user_id, miscellaneous: $scope.misc},
            url: "http://www.primefield.co/jobsearch/updatemiscellaneousemployee.php"
        }).then(function (data) {
            //console.log(data);
        });
    };
});

start.service('myserv', function ($http,$q,$timeout) {
    //this.jobsFilter = '';
    this.filters = [];

    this.jobs = [{companyname: 'Primefield', salary: '3000', title: 'Administrator', experience: '0', deadline: '06-19-2016', requirement: 'Degree', description: '5 years Primefield', industry: 'Information Technology'},
        {companyname: 'Exoon', salary: '2000', title: 'Executive', experience: '1', deadline: '08-19-2016', requirement: 'Degree', description: '5 years Exoon', industry: 'Education'},
        {companyname: 'HMan', salary: '1400', title: 'Sales', experience: '1', deadline: '09-19-2016', requirement: 'Diploma', description: '5 years HMan', industry: 'Business'},
        {companyname: 'Jquiery', salary: '1500', title: 'Programmer', experience: '1', deadline: '08-20-2016', requirement: 'O Level', description: '5 years Jquiery', industry: 'Information Technology'},
        {companyname: 'Anhgular', salary: '6000', title: 'Language', experience: '2', deadline: '08-01-2016', requirement: 'N Level', description: '5 years Anhgular', industry: 'Information Technology'},
        {companyname: 'PSOhkhet', salary: '5000', title: 'Powerful Executive', experience: '2', deadline: '08-10-2016', requirement: 'Higher Nitec', description: '5 years PSOhkhet', industry: 'Information Technology'},
        {companyname: 'PrimefieldGroup', salary: '3000', title: 'Administrator', experience: '1', deadline: '10-29-2016', requirement: 'Masters', description: '5 years PrimefieldGroup', industry: 'Information Technology'}];
    $http.get('http://primefield.co/jobsearch/viewjobdetails.php')
    .success(function (data) {
        console.log(data)
        this.jobs = data;
        if(localStorage.getItem('mySearchJobs') != null || localStorage.getItem('mySearchJobs') != undefined){
            localStorage.removeItem('mySearchJobs')
        }
        localStorage.setItem('mySearchJobs',JSON.stringify(data));
        //console.log(data);
    });
    this.companydata = {country: 'Singapore', companyname: 'Exoon', address: '88 Genting Lane',
        phone: '88811133', email: 'helloworld@primefield.com', website: 'maxxximum.primefield.com',
        overview: 'Ok can.'};

    this.currentjob = {};

    airlines = this.jobs.sort(function(a, b) {
        var airlineA = a.companyname.toLowerCase();
        var airlineB = b.companyname.toLowerCase();

        if(airlineA > airlineB) return 1;
        if(airlineA < airlineB) return -1;
        return 0;
    });

    var searchAirlines = function(searchFilter) {
         
        console.log('Searching airlines for ' + searchFilter);

        var deferred = $q.defer();

        var matches = jobs.filter( function(jobs) {
            console.log(jobs)
            if(jobs.companyname.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1 || jobs.title.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1 ) return true;
        })

        $timeout( function(){
        
           deferred.resolve( matches );

        }, 100);

        return deferred.promise;

    };

    return {

        searchAirlines : searchAirlines

    }
});