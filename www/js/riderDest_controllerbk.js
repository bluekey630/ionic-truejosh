start.controller('riderDest', function ($scope, $state, $http, $ionicPopup,$cordovaGeolocation,$cordovaDatePicker){ 
       //$scope.phoneNumbr = /^\+?\d{2}[- ]?\d{4}?\d{4}$/;
	   //$scope.phoneNumbr =/^\d{8}$/;
	   var loginInfo1 = JSON.parse(localStorage.getItem('logininfo'));
	  
	   alert(loginInfo1.user_id);
	   $http.get('http://www.primefield.co/testgocarasia/getmobileno.php?id=' + loginInfo1.user_id).
            success(function (data) {
				 console.log(data);
				$scope.phoneno = data.mobilenumber;
				alert($scope.phoneno);
                $scope.$apply();
				}).
           error(function (data) {

          });
		/*   var uname = document.getElementById("hiddenuname").value;
		  //alert(uname);
		  $scope.name= uname; */
		  
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
        $http.get('http://www.primefield.co/testgocarasia/rate.php?picktype=' + picktype + '&pkgtype=' + pkgtype ).
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
            $http.get('http://www.primefield.co/testgocarasia/book.php?id=' + loginInfo.user_id + '&riderfrom=' + riderfrom + '&riderdest=' + riderdest + '&phoneno=' + phoneno + '&picktype=' + picktype + '&name=' + name + '&pack=' + pack + '&noofpass=' + noofpass + '&fare=' + fare + '&pymttype=' + pymttype).
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
            $http.get('http://www.primefield.co/testgocarasia/book.php?id=' + loginInfo.user_id + '&riderfrom=' + riderfrom + '&riderdest=' + riderdest + '&phoneno=' + phoneno + '&picktype=' + picktype + '&name=' + name + '&pack=' + pack + '&noofpass=' + noofpass + '&fare=' + fare + '&pymttype=' + pymttype).
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