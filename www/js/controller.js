
var module = angular.module('myApp', ['ngMaterial', 'ui.router', 'ui.bootstrap', 'ngMessages', 'md.data.table', 'countrySelect']);


module.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    // For any unmatched url, send to /route1
    $urlRouterProvider.otherwise("/landingpage");

    $stateProvider
            .state('landingpage', {
                url: "/landingpage",
                templateUrl: "landingpage.html"
            })
            .state('signin', {
                url: "/signin",
                templateUrl: "signin.html"
            })
            .state('jobseeker-main', {
                url: "/jobseeker/main",
                templateUrl: "jobseeker-main.html"
            })
            .state('jobseeker-video', {
                url: "/jobseeker/video",
                templateUrl: "jobseeker-video.html"
            })
            .state('jobseeker-fillup', {
                url: "/jobseeker/fillup",
                templateUrl: "jobseeker-fillup.html"
            })
            .state('jobseeker-preview', {
                url: "/jobseeker/preview",
                templateUrl: "jobseeker-preview.html"
            })
            .state('jobseeker-profile', {
                url: "/jobseeker/profile",
                templateUrl: "jobseeker-profile.html"
            })
            .state('jobseeker-view', {
                url: '/view',
                templateUrl: 'jobseeker-view.html',
            })
            .state('jobseeker-history', {
                url: '/history',
                templateUrl: 'jobseeker-history.html',
            })
            .state('jobseeker-impressed', {
                url: '/impressed',
                templateUrl: 'jobseeker-impressed.html',
            })
            .state('jobseeker-apply', {
                url: '/apply',
                templateUrl: 'jobseeker-apply.html',
            })
            .state('jobseeker-applyvideo', {
                url: '/apply/video',
                templateUrl: 'jobseeker-applyvideo.html',
            })
            .state('jobseeker-applypreview', {
                url: '/apply/preview',
                templateUrl: 'jobseeker-applypreview.html',
            })
            .state('jobseeker-savedjobs', {
                url: '/savedjobs',
                templateUrl: 'jobseeker-savedjobs.html',
            })
            .state('jobseeker-application', {
                url: '/appliedjobs',
                templateUrl: 'jobseeker-application.html',
            })
            .state('jobseeker-shortlist', {
                url: '/shortlistjobs',
                templateUrl: 'jobseeker-shortlist.html',
            })
            .state('search', {
                url: '/search',
                templateUrl: 'search.html',
            })
            .state('searchResults', {
                url: '/searchresult',
                templateUrl: 'searchResult.html'
            })
            .state('searchData-company', {
                url: '/searchresult/company',
                templateUrl: 'searchData-company.html'
            })
            .state('employer-main', {
                url: "/employer/main",
                templateUrl: "employer-main.html"
            })
            .state('employer-profile', {
                url: "/employer/profile",
                templateUrl: "employer-profile.html"
            })
            .state('employer-stats', {
                url: "/employer/stats",
                templateUrl: "employer-stats.html"
            })
            .state('employer-fillup', {
                url: "/employer/fillup",
                templateUrl: "employer-fillup.html"
            })
            .state('employer-video', {
                url: "/employer/video",
                templateUrl: "employer-video.html"
            })
            .state('employer-preview', {
                url: "/employer/preview",
                templateUrl: "employer-preview.html"
            })
            .state('employer-postjob', {
                url: "/employer/postjob",
                templateUrl: "employer-postjob.html"
            })
            .state('employer-postjobvideo', {
                url: "/employer/postjob/video",
                templateUrl: "employer-postjobvideo.html"
            })
            .state('employer-postjobpreview', {
                url: "/employer/postjob/preview",
                templateUrl: "employer-postjobpreview.html"
            })
            .state('employer-openjob', {
                url: "/employer/openjob",
                templateUrl: "employer-openjob.html"
            })
            .state('employer-openjobdetail', {
                url: "/employer/openjob/detail",
                templateUrl: "employer-openjobdetail.html"
            })
            .state('employer-openjobdetailview', {
                url: "/employer/openjob/detail/view",
                templateUrl: "employer-openjobdetailview.html"
            })
            .state('employer-openjobdetailshortlisted', {
                url: "/employer/openjob/detail/shortlisted",
                templateUrl: "employer-openjobdetailshortlisted.html"
            })
            .state('employer-openjobdetailviewjobseeker', {
                url: "/employer/openjob/detail/view/jobseeker",
                templateUrl: " employer-openjobdetailviewjobseeker.html"
            })
            .state('employer-openjobdetailshortlistedjobseeker', {
                url: "/employer/openjob/detail/shortlisted/jobseeker",
                templateUrl: " employer-openjobdetailshortlistedjobseeker.html"
            })
            .state('employer-openjobdetailapplication', {
                url: "/employer/openjob/detail/application",
                templateUrl: "employer-openjobdetailapplication.html"
            })
            .state('employer-openjobdetailapplicationjobseeker', {
                url: "/employer/openjob/detail/shortlisted/application",
                templateUrl: " employer-openjobdetailapplicationjobseeker.html"
            })
            .state('signup', {
                url: "/signup",
                templateUrl: "signup.html"
            })
            .state('signout', {
                url: "/signin",
                templateUrl: "signin.html"
            });

});

module.controller('timerCtrl', function ($scope, $state, $timeout) {
    $timeout(callAtTimeout, 3000);

    function callAtTimeout() {
        $state.go('signin');
    }

});
//SignIn
module.controller('signinCtrl', function ($scope, $state, $mdDialog) {
    localStorage.clear();
    $scope.signin = function () {
        var type;
        var uemail = $('#email').val();
        var upassword = $('#password').val();

        $.ajax({
            method: "POST",
            dataType: "json",
            data: {email: uemail, password: upassword},
            url: "http://www.primefield.co/jobsearch/signin.php"
        }).then(function (data) {
            localStorage.setItem("logininfo", JSON.stringify(data));
            localStorage.setItem("userID", data.user_id)
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

            else if (data.status === "1") {
                $mdDialog.show(
                        $mdDialog.alert()
                        .parent(angular.element(document.body))
                        .title('Sign In')
                        .content('Wrong Email or Password.')
                        .ok('Close')
                        );
            }

        });

    };
    $scope.wrong = false;
    $scope.showAdvanced = function(ev) {
        $mdDialog.show({
          templateUrl: 'forgotpwd.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true
        })
    };
    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.answer = function(e) {
        //console.log(e)
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(e == undefined && !regex.test(e)){
            $scope.wrong = true;
        }else{
            $mdDialog.hide();
            $mdDialog.show(
                    $mdDialog.alert()
                    .parent(angular.element(document.body))
                    .title('Alert')
                    .content('Password reset link sent your registerd email Successfully')
                    .ok('Close')
                );
            $.ajax({
                method: "post",
                dataType: "json",
                data: {email: e},
                url: "http://www.primefield.co/jobsearch/forgot.php"
            }).then(function (data) {
                //console.log(data);

                $mdDialog.show(
                    $mdDialog.alert()
                    .parent(angular.element(document.body))
                    .title('Alert')
                    .content('Password reset link sent your registerd email')
                    .ok('Close')
                );

            })
            
        }
    };

});

//SignUp
module.controller('signupCtrl', function ($scope, $http, $mdDialog, $state) {
    $scope.radiobutton = {group1: "Employer", group2: "JobSeeker"};
    var nselected = $scope.radiobutton.group1;
    $scope.onTypeChange = function () {
        nselected = $scope.radiobutton.group1;
    };

    $scope.go = function () {
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var uid = "";
        for (var i = 0; i < 20; i++)
            uid += possible.charAt(Math.floor(Math.random() * possible.length));

        var uemail = $('#nemail').val();
        var upass = $('#npass').val();
        var ucpass = $('#ncpass').val();
        var type = nselected;
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

        if (uemail == '' && upass == '' && ucpass == '' && type == '') {
            $mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element(document.body))
                .title('Alert')
                .content('All fields are required.')
                .ok('Close')
            );
        }else  if(uemail == ''){
            $mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element(document.body))
                .title('Alert')
                .content('Please enter the email address')
                .ok('Close')
            );

        }
        else  if(upass == ''){
            $mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element(document.body))
                .title('Alert')
                .content('Please enter the password')
                .ok('Close')
            );

        }else  if(ucpass == ''){
            $mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element(document.body))
                .title('Alert')
                .content('Please enter the confirm password')
                .ok('Close')
            );
        }else  if(type == ''){
            $mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element(document.body))
                .title('Alert')
                .content('Please select the profile type')
                .ok('Close')
            );
        }else  if(ucpass != upass){
            $mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element(document.body))
                .title('Alert')
                .content('Password and confirm password are not matched!')
                .ok('Close')
            );
        }else  if(!re.test(uemail)){
            $mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element(document.body))
                .title('Alert')
                .content('Enter the valid email address')
                .ok('Close')
            );
        }else {



            $http.get('http://www.primefield.co/jobsearch/signup.php?id=' + uid + '&email=' + uemail + '&password=' + upass + '&cpassword=' + ucpass + '&type=' + type).
                    success(function (data) {
                        //console.log(data);
                        if (data.status === "0") {

                            $mdDialog.show(
                                    $mdDialog.alert()
                                    .parent(angular.element(document.body))
                                    .title('Sign Up')
                                    .content('You have Successfully Signed Up. Thank You.')
                                    .ok('Close')
                                    );

                            $state.go('signin');


                        }

                        if (data.status === "1") {
                            $mdDialog.show(
                                    $mdDialog.alert()
                                    .parent(angular.element(document.body))
                                    .title('Sign Up')
                                    .content('Email in used.')
                                    .ok('Close')
                                    );
                        }

                        if (data.status === "2") {
                            $mdDialog.show(
                                    $mdDialog.alert()
                                    .parent(angular.element(document.body))
                                    .title('Sign Up')
                                    .content('Password is wrong.')
                                    .ok('Close')
                                    );
                        }

                    }).
                    error(function (data) {

                    });
        }    
    };

});

//JobSeeker-fillup

module.controller('JSCollapseCtrl', function ($scope, $state, myService, $mdDialog) {
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
        $scope.personalinfo = {image: "img/dummy.png", country: country, firstname: firstname, lastname: lastname, email: email, phone: phone, status: status, date: new Date(dob.substring(0, 4), (dob.substring(5, 7) - 1), dob.substring(8, 10))};

    }
    else {
        //console.log("Personal info Storage not exist");
        var email = loginInfo.email;
        $scope.personalinfo = {image: "img/dummy.png", country: "", firstname: "", lastname: "", email: email, phone: "", status: ""};
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
        $state.go('jobseeker-video');
    };

    $scope.myAlert = function(msg){
        $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.body))
            .title('ALert')
            .content(''+msg)
            .ok('Close')
        );
    }

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

            personalinfo = {image: image, firstname: firstname, lastname: lastname, country: country, email: email, phone: phone, status: status, dob: dob, gender: gender};

            // console.log(personalinfo);
            localStorage.setItem('personalinfo', JSON.stringify(personalinfo));
        }    
    };
    var eduArray = [];
    $scope.disCount = 1;
    $scope.maxEdu = false;
    $scope.educationsave = function () {

        var educationinfo = {};
        var school = $('#educationinfo-school').val();
        var year = $('#educationinfo-year').val();
        var degree = $('#educationinfo-degree').val();
        var country = $('#educationinfo-country').val();
        var specialization = $('#educationinfo-specialization').val();
        var activities = $('#educationinfo-activities').val();

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

            educationinfo = {school: school, degree: degree, specialization: specialization, year: year, country: country, activities: activities};
            eduArray.push(educationinfo);
            //console.log(educationinfo);
            localStorage.setItem('educationinfo', JSON.stringify(eduArray));
            $scope.educounter = eduArray.length + 1;
            if($scope.disCount === 3){
                $scope.maxEdu = true;
            }
        }    
    };

    $scope.educationAdd = function () {
        if($scope.disCount === 3){
            $scope.maxEdu = true;
        }
        $('#educationinfo-school').val("");
        $('#educationinfo-year').val("");
        $('#educationinfo-degree').val("");
        $('#educationinfo-specialization').val("");
        $('#educationinfo-country').val("");
        $('#educationinfo-activities').val("");

        $scope.educounter = eduArray.length;
        if($scope.disCount == 1 || $scope.disCount == 2){
            $scope.disCount = 1+$scope.disCount;
        }    
    };
    var expArray = [];
    $scope.disCountExp = 1;
    $scope.maxExp = false;
    $scope.experiencesave = function () {
        if($scope.disCountExp === 3){
            $scope.maxExp = true;
        }
        var experienceinfo = {};
        var companyname = $('#experienceinfo-company').val();
        var title = $('#experienceinfo-title').val();
        var location = $('#experienceinfo-location').val();
        var timestart = $('#experienceinfo-timestart').val();
        var timeend = $('#experienceinfo-timeend').val();
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
            //console.log(experienceinfo);
            localStorage.setItem('experienceinfo', JSON.stringify(expArray));

            $scope.expcounter = expArray.length;
        }    
    };

    $scope.experienceAdd = function () {
        if($scope.disCountExp === 3){
            $scope.maxExp = true;
        }
        $('#experienceinfo-company').val("");
        $('#experienceinfo-title').val("");
        $('#experienceinfo-location').val("");
        $('#experienceinfo-timestart').val("");
        $('#experienceinfo-timeend').val("");
        $('#experienceinfo-description').val("");
        $('#experienceinfo-country').val("");
        $('#experienceinfo-highlights').val("");

        $scope.expcounter = expArray.length;
        if($scope.disCountExp == 1 || $scope.disCountExp == 2){
            $scope.disCountExp = 1+$scope.disCountExp;
        } 
    };

    $scope.linksave = function () {
        var linkinfo = {};

        var facebook = $('#linkinfo-facebook').val();
        var skype = $('#linkinfo-skype').val();
        var twitter = $('#linkinfo-twitter').val();
        var linkedin = $('#linkinfo-linkedin').val();

        if(facebook == '' &&  skype == '' && twitter == '' && linkedin == ''){
           $scope.myAlert('Please fill the all fields'); 
        }else if(facebook == ''){
            $scope.myAlert('Please enter your Facebook');
        }else if(skype == ''){
            $scope.myAlert('Please enter your skype Id');
        }else if(twitter == ''){
            $scope.myAlert('Please enter your Twitter Id');
        }else if(linkedin == ''){
            $scope.myAlert('Please enter Your linkedin');
        }else{

            linkinfo = {facebook: facebook, twitter: twitter, linkedin: linkedin, skype: skype};

            //console.log(linkinfo);
            localStorage.setItem('linkinfo', JSON.stringify(linkinfo));
        }
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
        }    
    };
});
//Jobseeker-video
module.controller('JSVideoCtrl', function ($scope, $state, $http, myService) {
//    console.log(myService.jobseeker_signup);
//    console.log(myService.jobseeker_personalinfo);
//    console.log(myService.jobseeker_educationinfo);
//    console.log(myService.jobseeker_experienceinfo);
//    console.log(myService.jobseeker_linkinfo);
//    console.log(myService.jobseeker_miscinfo);
});

//Jobseeker-preview
module.controller('JSPreviewCtrl', function ($scope, $state, $http, myService) {
    var path = 'http://www.primefield.co/jobsearch/pictureurl/' + localStorage.getItem("userID") + '.jpg';
    var Vpath = 'http://www.primefield.co/jobsearch/videos/' + localStorage.getItem("userID") + '.jpg';
    angular.element(document).ready(function () {
        $('#p-img').attr('src',  path);
        $('#p-video').attr('src',  Vpath);
    });

 
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

        $.ajax({
            method: "POST",
            dataType: "json",
            data: {personal: personalinfo, education: educationinfo, experience: experienceinfo, social: linkinfo, misc: miscinfo, userid: user_id},
            url: "http://www.primefield.co/jobsearch/savepreview.php"
        }).then(function (data) {
            //console.log(data);
            $state.go('jobseeker-main');
        });

    };
    $scope.eduRemove = function (r) {
        myService.jobseeker_signup[0].educationinfo.splice(r, 1);
        localStorage.setItem('educationinfo', JSON.stringify(myService.jobseeker_signup[0].educationinfo));
    };
    $scope.expRemove = function (r) {
        myService.jobseeker_signup[0].experienceinfo.splice(r, 1);
        localStorage.setItem('experienceinfo', JSON.stringify(myService.jobseeker_signup[0].experienceinfo));
    };
    if (myService.jobseeker_personalinfo !== undefined) {
        //console.log(myService)
        $scope.personalinfo = myService.jobseeker_personalinfo;
        $scope.radiobutton = {group1: $scope.personalinfo.gender};
        $scope.personalinfo.date = new Date($scope.personalinfo.dob.substring(0, 4), ($scope.personalinfo.dob.substring(5, 7) - 1), $scope.personalinfo.dob.substring(8, 10));

    }

    if (myService.jobseeker_linkinfo !== undefined) {
        $scope.linkinfo = myService.jobseeker_linkinfo;
    }

    if (myService.jobseeker_miscinfo !== undefined) {
        $scope.miscinfo = myService.jobseeker_miscinfo;
    }

    if (myService.jobseeker_educationinfo.length > 0) {
        $scope.educationinfo = myService.jobseeker_educationinfo[0].educationinfo;

    }

    if (myService.jobseeker_experienceinfo.length > 0) {
        $scope.experienceinfo = myService.jobseeker_experienceinfo[0].experienceinfo;


    }

    var nselected;
    $scope.onTypeChange = function () {
        nselected = $scope.radiobutton.group1;
    };
    $('#personalinfo-save').hide();
    $('#personalinfo-edit').show();
    $scope.personaledit = function () {
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
    };
    $('#educationinfo-save').hide();
    $('#educationinfo-edit').show();
    $scope.educationedit = function () {
        $('#educationinfo-edit').hide();
        $('#educationinfo-save').show();
        $('#educationinfo-school').prop('disabled', false);
        $('#educationinfo-grade').prop('disabled', false);
        $('#educationinfo-degree').prop('disabled', false);
        $('#educationinfo-startyear').prop('disabled', false);
        $('#educationinfo-endyear').prop('disabled', false);
        $('#educationinfo-activities').prop('disabled', false);
    };
    $scope.educationsave = function () {
        $('#educationinfo-save').hide();
        $('#educationinfo-edit').show();
        $('#educationinfo-school').prop('disabled', true);
        $('#educationinfo-grade').prop('disabled', true);
        $('#educationinfo-degree').prop('disabled', true);
        $('#educationinfo-startyear').prop('disabled', true);
        $('#educationinfo-endyear').prop('disabled', true);
        $('#educationinfo-activities').prop('disabled', true);
    };
    $('#experienceinfo-save').hide();
    $('#experienceinfo-edit').show();
    $scope.experienceedit = function () {
        $('#experienceinfo-edit').hide();
        $('#experienceinfo-save').show();
        $('#experienceinfo-company').prop('disabled', false);
        $('#experienceinfo-title').prop('disabled', false);
        $('#experienceinfo-location').prop('disabled', false);
        $('#experienceinfo-timestart').prop('disabled', false);
        $('#experienceinfo-timeend').prop('disabled', false);
        $('#experienceinfo-description').prop('disabled', false);
    };
    $scope.experiencesave = function () {
        $('#experienceinfo-save').hide();
        $('#experienceinfo-edit').show();
        $('#experienceinfo-company').prop('disabled', true);
        $('#experienceinfo-title').prop('disabled', true);
        $('#experienceinfo-location').prop('disabled', true);
        $('#experienceinfo-timestart').prop('disabled', true);
        $('#experienceinfo-timeend').prop('disabled', true);
        $('#experienceinfo-description').prop('disabled', true);
    };
    $('#linkinfo-save').hide();
    $('#linkinfo-edit').show();
    $scope.linkedit = function () {
        $('#linkinfo-edit').hide();
        $('#linkinfo-save').show();
        $('#linkinfo-facebook').prop('disabled', false);
        $('#linkinfo-twitter').prop('disabled', false);
        $('#linkinfo-linkedin').prop('disabled', false);
    };
    $scope.linksave = function () {
        $('#linkinfo-save').hide();
        $('#linkinfo-edit').show();
        $('#linkinfo-facebook').prop('disabled', true);
        $('#linkinfo-twitter').prop('disabled', true);
        $('#linkinfo-linkedin').prop('disabled', true);
    };
    $('#miscinfo-save').hide();
    $('#miscinfo-edit').show();
    $scope.miscedit = function () {
        $('#miscinfo-edit').hide();
        $('#miscinfo-save').show();
        $('#miscinfo-description').prop('disabled', false);
    };
    $scope.miscsave = function () {
        $('#miscinfo-save').hide();
        $('#miscinfo-edit').show();
        $('#miscinfo-description').prop('disabled', true);
    };


});


//JShortlistJobCtrl shortlist btn in jobseeker main page
module.controller('JShortlistJobCtrl', function ($scope, $state, $http, myService, $mdDialog) {
    var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
    var user_id = loginInfo.user_id;
    $.ajax({
        method: "POST",
        dataType: "json",
        data: {userid: user_id},
        url: "http://www.primefield.co/jobsearch/viewshortlistjob.php"
    }).then(function (data) {
        $scope.Shortlistjob = data.applyjob;
        $scope.$apply();
    });
    $scope.goToSelectedJob = function (index) {
        //console.log($scope.postjob[index]);
        myService.jobseeker_shortlistjob = {};
        myService.jobseeker_shortlistjob = $scope.Shortlistjob[index];
        //console.log(myService.employer_postjob);
        $state.go('employer-openjobdetail');
    };
})

//Jobseeker-impressed
module.controller('JSImpressedCtrl', function ($scope, $http, myService) {
    var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
    var user_id = loginInfo.user_id;
    $.ajax({
        method: "POST",
        dataType: "json",
        data: {userid: user_id},
        url: "http://www.primefield.co/jobsearch/viewimpressedjob.php"
    }).then(function (data) {
        $scope.Impressedjob = data.applyjob;
        $scope.$apply();
    });
    $scope.goToSelectedJob = function (index) {
        //console.log($scope.postjob[index]);
        myService.jobseeker_impressedjob = {};
        myService.jobseeker_impressedjob = $scope.Impressedjob[index];
        //console.log(myService.employer_postjob);
        $state.go('employer-openjobdetail');
    };
});

//Jobseeker-profile
module.controller('JSProfileCtrl', function ($scope, $state, $http, myService, $mdDialog) {
    var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
    var user_id = loginInfo.user_id;

    var path = 'http://www.primefield.co/jobsearch/pictureurl/' + localStorage.getItem("userID") + '.jpg';
    var Vpath = 'http://www.primefield.co/jobsearch/videos/' + localStorage.getItem("userID") + '.jpg';
    angular.element(document).ready(function () {
        $('#p-img').attr('src',  path);
        $('#p-video').attr('src',  Vpath);
    });

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
        var eCount = $scope.educationinfo.length;
        $scope.eShow = eCount;
        $('#eCount').text(eCount);
        

        for (var i = 0; i < $scope.educationinfo.length; i++) {
            $scope.startyear = new Date($scope.educationinfo[i].startyear);
            $scope.endyear = new Date($scope.educationinfo[i].endyear);
        }

        $scope.experienceinfo = data.experience;
        var epCount = $scope.experienceinfo.length;
        $scope.epShow = epCount;
        $('#epCount').text(epCount)

        for (var i = 0; i < $scope.experienceinfo.length; i++) {
            $scope.timestart = new Date($scope.experienceinfo[i].timestart);
            $scope.timeend = new Date($scope.experienceinfo[i].timeend);
        }

        $scope.link = data.social;

        $scope.misc = data.miscellaneous;
    });
    var nselected;
    $scope.onTypeChange = function () {
        nselected = $scope.radiobutton.group1;
    };

    $scope.personalinfoupdate = function () {
        console.log($scope.personalinfo)
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
        console.log($scope.educationinfo[index]);
        $.ajax({
            method: "POST",
            dataType: "json",
            data: {eduid: eduid, education: $scope.educationinfo[index], action: "update"},
            url: "http://www.primefield.co/jobsearch/updateeducationemployee.php"
        }).then(function (data) {
            //console.log(data);
        });
    };

    $scope.educationinfodelete1 = function (eduid) {
        //console.log(eduid);
        if(confirm('Would you like to delete it') == true){
            $.ajax({
                method: "POST",
                dataType: "json",
                data: {eduid: eduid, action: "delete"},
                url: "http://www.primefield.co/jobsearch/updateeducationemployee.php"
            }).then(function (data) {
                //console.log(data);
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

    $scope.experienceinfoupdate = function (index, exid) {
        var st = $('#experienceinfo-timestart').val();
        $scope.experienceinfo[index].timestart = st;
        var ee = $('#experienceinfo-timeend').val();
        $scope.experienceinfo[index].timeend = ee;
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

    $scope.experienceinfodelete1 = function (exid) {
        if(confirm('Would you like to delete it') == true){
            $.ajax({
                method: "POST",
                dataType: "json",
                data: {exid: exid, action: "delete"},
                url: "http://www.primefield.co/jobsearch/updateexperienceemployee.php"
            }).then(function (data) {
                //console.log(data);
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

    $scope.edit = function (ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'dialog1.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
        }).then(function (answer) {
            $scope.alert = 'You said the information was "' + answer + '".';
        }, function () {
            $scope.alert = 'You cancelled the dialog.';
        });
    };

    var eduArray = [];
    $scope.EenableBtn = false;
    $scope.educationsave = function () {
        //console.log('dd')
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
            //console.log(educationinfo);
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
                    console.log(data);
                    $scope.EenableBtn = true;
                    $state.go($state.current, {}, {reload: true});
                });
            }
        }    
    };

    $scope.educationAdd = function () {
        //console.log('aa')
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
        var timestart = $('#experienceinfo-timestart').val();
        var timeend = $('#experienceinfo-timeend').val();
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
            //console.log(expArray);
            localStorage.setItem('experienceinfo', JSON.stringify(expArray));

            $scope.expcounter = expArray.length;
            //console.log($('#epCount').text());
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
                    //console.log(data);
                    $scope.EPenableBtn = true;
                    $state.go($state.current, {}, {reload: true});
                });

            }
        }    
    };

    $scope.myAlert = function(msg){
        $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.body))
            .title('ALert')
            .content(''+msg)
            .ok('Close')
        );
    }

    $scope.experienceAdd = function () {
        var companyname = $('#experienceinfo-company').val();
        var title = $('#experienceinfo-title').val();
        var location = $('#experienceinfo-location').val();
        var timestart = $('#experienceinfo-timestart').val();
        var timeend = $('#experienceinfo-timeend').val();
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
function DialogController($scope, $mdDialog) {
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.answer = function (answer) {
        $mdDialog.hide(answer);
    };
}

//Service
module.service('myService', function () {
    this.jobseeker_signup = [];
    this.jobseeker_personalinfo = {};
    this.jobseeker_educationinfo = [];
    this.jobseeker_experienceinfo = [];
    this.jobseeker_linkinfo = {};
    this.jobseeker_miscinfo = {};

    this.employer_company = {};
    this.employer_postjob = {};
    this.employer_view = {};
});
//Employer-fillup
module.controller('EFillupCtrl', function ($scope, $state, $http, myService) {

    if (localStorage.getItem('companyinfo') !== null) {
        var companyinfo = JSON.parse(localStorage.getItem('companyinfo'));

        $scope.company = companyinfo;
    }
    $scope.company = {};
    $scope.company.phonecountry = '';
    $scope.item = [{id: 1, industry: "Education"}, {id: 2, industry: "Information Technology"}, {id: 3, industry: "Business"}];
    $scope.status = {isopen: false
    };
    $scope.industry = "Industry";

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

    $scope.go = function () {
        var company = {};

        var image = $('#company-image').attr('src');
        var country = $('#company-country').val();
        var companyname = $('#company-companyname').val();
        var address = $('#company-address').val();
        var code = $('#company-phonecountry').val();
        var phone = $('#company-phone').val();
        var email = $('#company-email').val();
        var website = $('#company-website').val();
        var overview = $('#company-overview').val();
        var industry = localStorage.getItem("industry")
       

        company = {
            image: image, country: country, companyname: companyname, address: address, phone: phone, email: email, website: website, overview: overview, countrycode : code, industry: industry
        };
        console.log(company)
        myService.employer_company = company;

        localStorage.setItem('companyinfo', JSON.stringify(company));
        $state.go('employer-video');
    };
});

//Employer-stats
module.controller('Estatsctrl', function ($scope, $state, $mdDialog) {
    $scope.stats = [
        {
          'name': 'Total jobs posted',
          'type': '80'
        },
        {
          'name': 'Total live jobs',
          'type': '40'
        },
        {
          'name': 'Views',
          'type': '10'
        },
        {
          'name': 'Applicants',
          'type': '20'
        },
        {
          'name': 'Shortlisted',
          'type': '10'
        }
      ];
})

//Employer-preview
module.controller('EPreviewCtrl', function ($scope, $state, $http, myService) {
    var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
    var user_id = loginInfo.user_id;
    $scope.item = [{id: 1, industry: "Education"}, {id: 2, industry: "Information Technology"}, {id: 3, industry: "Business"}];
    $scope.status = {isopen: false
    };
    $scope.industry = "Industry";

    $scope.industrySelect = function (r) {
        //console.log(r);
        $scope.industry = r;
        localStorage.setItem("industry", r);
    };
    console.log(myService.employer_company);
    $scope.company = myService.employer_company;
    $scope.industry = localStorage.getItem("industry");
    $('#industry-button').prop('disabled', true);

    $('#company-edit').show();
    $('#company-save').hide();

    var path = 'http://www.primefield.co/jobsearch/pictureurl/' + localStorage.getItem("userID") + '.jpg';
    var Vpath = 'http://www.primefield.co/jobsearch/videos/' + localStorage.getItem("userID") + '.jpg';
    angular.element(document).ready(function () {
        $('#p-img').attr('src',  path);
        $('#p-video').attr('src',  Vpath);
    });

    $scope.companyedit = function () {
        $('#company-edit').hide();
        $('#company-save').show();

        $('#company-country').prop('disabled', false);
        $('#company-companyname').prop('disabled', false);
        $('#company-address').prop('disabled', false);
        $('#company-phone').prop('disabled', false);
        $('#company-email').prop('disabled', false);
        $('#company-website').prop('disabled', false);
        $('#company-overview').prop('disabled', false);
        $('#industry-button').prop('disabled', false);

    };
    $scope.companysave = function () {
        $('#company-edit').show();
        $('#company-save').hide();

        $('#company-country').prop('disabled', true);
        $('#company-companyname').prop('disabled', true);
        $('#company-address').prop('disabled', true);
        $('#company-phone').prop('disabled', true);
        $('#company-email').prop('disabled', true);
        $('#company-website').prop('disabled', true);
        $('#company-overview').prop('disabled', true);
        $('#industry-button').prop('disabled', true);
    };

    $scope.go = function () {
        //console.log($scope.company);
        //console.log(user_id);
        $.ajax({
            method: "POST",
            dataType: "json",
            data: {userid: user_id, company: $scope.company},
            url: "http://www.primefield.co/jobsearch/saveemployerpreview.php"
        }).then(function (data) {
            console.log(data);
            $state.go('employer-main');
        });


    };
});

//jobseeker-main
module.controller('JMainCtrl', function ($scope, $state, $http, myService) {
    //console.log(myService.employer_company);
    //$scope.company = myService.employer_company;
    var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
    angular.element(document).ready(function () {
        
    
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
    var path = 'http://www.primefield.co/jobsearch/pictureurl/' + localStorage.getItem("userID") + '.jpg';
    var Vpath = 'http://www.primefield.co/jobsearch/videos/' + localStorage.getItem("userID") + '.jpg';
        angular.element(document).ready(function () {
        $('#main-img').attr('src',  path);
        $('#main-video').attr('src',  Vpath);
        $('#main-video').attr('onclick', 'openFile(\'http://www.primefield.co/jobsearch/videos/' + localStorage.getItem("userID") + '.3gp\')');
    });
    // $.ajax({
    //     method: "POST",
    //     dataType: "json",
    //     data: {userid: user_id},
    //     url: "http://www.primefield.co/jobsearch/viewemployerprofile.php"
    // }).then(function (data) {
    //     //console.log(data);
    //     myService.employer_company = data.company;
    // });

});
//Employer-main
module.controller('EMainCtrl', function ($scope, $state, $http, myService) {
    //console.log(myService.employer_company);
    //$scope.company = myService.employer_company;
    var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
    var user_id = loginInfo.user_id;

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
    });

    var path = 'http://www.primefield.co/jobsearch/pictureurl/' + localStorage.getItem("userID") + '.jpg';
    var Vpath = 'http://www.primefield.co/jobsearch/videos/' + localStorage.getItem("userID") + '.jpg';
    angular.element(document).ready(function () {
        $('#p-img').attr('src',  path);
        $('#p-video').attr('src',  Vpath);
    });

});
//Employer-profile
module.controller('EProfileCtrl', function ($scope, $state, $http, myService, $mdDialog) {
    //console.log(myService.employer_company);
    //$scope.company = myService.employer_company;
    var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
    var user_id = loginInfo.user_id;
    $scope.company = {};
    $scope.company.phonecountry = '';
    var path = 'http://www.primefield.co/jobsearch/pictureurl/' + localStorage.getItem("userID") + '.jpg';
    var Vpath = 'http://www.primefield.co/jobsearch/videos/' + localStorage.getItem("userID") + '.jpg';
    angular.element(document).ready(function () {
        $('#p-img').attr('src',  path);
        $('#p-video').attr('src',  Vpath);
    });
    $scope.item = [{id: 1, industry: "Education"}, {id: 2, industry: "Information Technology"}, {id: 3, industry: "Business"}];
    $scope.status = {isopen: false
    };
    $scope.industry = "Industry";

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


    $.ajax({
        method: "POST",
        dataType: "json",
        data: {userid: user_id},
        url: "http://www.primefield.co/jobsearch/viewemployerprofile.php"
    }).then(function (data) {
        console.log(data);
        $('.md-char-counter').hide();
        $scope.$apply(function() {
          $scope.company = data.company;
          $scope.industry = data.company.industry;
          $scope.company.phonecountry = data.company.countrycode;
        }); 
    });

    $scope.myAlert = function(msg){
        $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.body))
            .title('ALert')
            .content(''+msg)
            .ok('Close')
        );
    }

    $scope.go = function () {
        
        if(localStorage.getItem("industry") != null){
            $scope.company.industry = localStorage.getItem("industry")
        }
        $scope.company.countrycode = $('#company-phonecountry').val();
        //console.log($scope.company)
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
            $.ajax({
                method: "POST",
                dataType: "json",
                data: {userid: user_id, company: $scope.company},
                url: "http://www.primefield.co/jobsearch/updatecompany.php"
            }).then(function (data) {
                //console.log(data);
                $state.go('employer-main');

            });
        }    
    };
});
//Employer-postjob
module.controller('EPostJobCtrl', function ($scope, $state, $http, myService, $mdDialog) {
    $scope.item = [{id: 1, industry: "Education"}, {id: 2, industry: "Information Technology"}, {id: 3, industry: "Business"}];
    $scope.status = {isopen: false
    };
    $scope.industry = "Industry";

    $scope.industrySelect = function (r) {
        //console.log(r);
        $scope.industry = r;
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
        $scope.deadline = new Date(postjobinfo.deadline.substring(0, 4), (postjobinfo.deadline.substring(5, 7) - 1), postjobinfo.deadline.substring(8, 10));
        $scope.postjob = postjobinfo;
    }
    $scope.myAlert = function(msg){
        $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.body))
            .title('ALert')
            .content(''+msg)
            .ok('Close')
        );
    }
    $scope.go = function () {

        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var jid = "job";
        for (var i = 0; i < 20; i++)
            jid += possible.charAt(Math.floor(Math.random() * possible.length));

        localStorage.setItem('jobID',jid)

        var industry = localStorage.getItem('industry');
        var title = $('#postjob-title').val();
        var currency = localStorage.getItem('currency');
        var salary = $('#postjob-salary').val();
        var deadline = $('#postjob-deadline').val();
        var experience = $('#postjob-exp').val();
        var requirement = $('#postjob-requirement').val();
        var educational = $('#postjob-educational').val();
        var goodtohave = $('#postjob-goodtohave').val();
        var joblocation = $('#postjob-location').val();
        
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
            //console.log(postjob)

            myService.employer_postjob = postjob;

            localStorage.setItem('postjobinfo', JSON.stringify(postjob));

            $mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element(document.body))
                .title('success')
                .content('Thank you for posting a job.')
                .ok('Close')
            );

            $state.go('employer-postjobvideo');
        }    
    };
});
//Employer-video
module.controller('EVideoCtrl', function ($scope, $state, $http, myService, $mdDialog) {
    //console.log(myService.employer_postjob);
    $scope.gallery = function(){
        console.log('click gallery btn')
    }
    $scope.showSmsg = function(){
        $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.body))
            .title('Success')
            .content('Thank you for apply the job. Your are applied the job Successfully')
            .ok('Close')
        );
        $state.go('jobseeker-main');
    }
});
//Employer-postjobpreview
module.controller('EPostJobPreviewCtrl', function ($scope, $state, $http, myService) {
    var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
    var user_id = loginInfo.user_id;

    var path = 'http://www.primefield.co/jobsearch/pictureurl/' + localStorage.getItem("userID") + '.jpg';
    var Vpath = 'http://www.primefield.co/jobsearch/videos/' + localStorage.getItem("userID") + '.jpg';
    angular.element(document).ready(function () {
        $('#p-img').attr('src',  path);
        $('#p-video').attr('src',  Vpath);
        $('#p-video').attr('onclick', 'openFile(\'http://www.primefield.co/jobsearch/videos/' + localStorage.getItem("userID") + '.3gp\')');
    });

    $.ajax({
        method: "POST",
        dataType: "json",
        data: {userid: user_id},
        url: "http://www.primefield.co/jobsearch/viewemployerprofile.php"
    }).then(function (data) {
        //console.log(data);
        $scope.company = data.company;
    });

    $scope.item = [{id: 1, industry: "Education"}, {id: 2, industry: "Information Technology"}, {id: 3, industry: "Business"}];
    $scope.status = {
        isopen: false
    };

    $scope.industry = localStorage.getItem("industry");
    $scope.industrySelect = function (r) {
        //console.log(r);
        $scope.industry = r;
    };

    $scope.hidetihs = true;
    $scope.disablethis = true;

    $scope.hidejob = true;
    $scope.disabledjob = true;

    $scope.company = JSON.parse(localStorage.getItem('companyinfo'));
    $scope.postjob = myService.employer_postjob;
    $scope.deadline = new Date($scope.postjob.deadline.substring(0, 4), ($scope.postjob.deadline.substring(5, 7) - 1), $scope.postjob.deadline.substring(8, 10));


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

        $.ajax({
            method: "POST",
            dataType: "json",
            data: {userid: user_id, postjob: $scope.postjob},
            url: "http://www.primefield.co/jobsearch/savepostjobpreview.php"
        }).then(function (data) {
            //console.log(data);
            $scope.postjob = {};
            localStorage.removeItem("postjobinfo");
            $state.go('employer-main');
        });
    };
});
//Employer-openjob
module.controller('EOpenJobCtrl', function ($scope, $state, myService) {
    var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
    var user_id = loginInfo.user_id;
    //console.log(user_id);
    $.ajax({
        method: "POST",
        dataType: "json",
        data: {userid: user_id},
        url: "http://www.primefield.co/jobsearch/viewpostjob.php"
    }).then(function (data) {
        console.log(data);
        for (var j = 0; j < data.postjob.length; j++) {
            data.postjob[j].viewcount = 0;
            data.postjob[j].shortlistedcount = 2;
            data.postjob[j].applicationcount = 0;
        }
        for (var i = 0; i < data.view.length; i++) {
            for (var j = 0; j < data.postjob.length; j++) {
                if (data.view[i].jobid === data.postjob[j].jobid) {
                    data.postjob[j].viewcount = data.view[i].viewcount;
                }
            }
        }

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
//Employer-openjobdetail
module.controller('EOpenJobDetailCtrl', function ($scope, $state, $http, myService) {
    $scope.disablethis = true;
    $scope.disabledjob = true;
    $scope.company = myService.employer_company;
    $scope.postjob = myService.employer_postjob;
    $scope.deadline = new Date($scope.postjob.deadline);
    $scope.item = [{id: 1, industry: "Education"}, {id: 2, industry: "Information Technology"}, {id: 3, industry: "Business"}];
    $scope.status = {
        isopen: false
    };
    $scope.industry = $scope.postjob.industry;
    $scope.industrySelect = function (r) {
        //console.log(r);
        $scope.industry = r;
    };

    $scope.view = function () {

        $state.go('employer-openjobdetailview');
        //console.log();
    };
    $scope.application = function () {
        $state.go('employer-openjobdetailapplication');
        //console.log();
    };

    $scope.shortlisted = function () {
        $state.go('employer-openjobdetailshortlisted');
        //console.log();
    };
});
//Employer-openjobdetailview
module.controller('EOpenJobDetailViewCtrl', function ($scope, $state, $http, myService) {
    var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
    var user_id = loginInfo.user_id;
    $scope.postjob = myService.employer_postjob;
    //console.log($scope.postjob.jobid);
    $.ajax({
        method: "POST",
        dataType: "json",
        data: {jobid: $scope.postjob.jobid},
        url: "http://www.primefield.co/jobsearch/viewpersonalinfo.php"
    }).then(function (data) {
        $scope.user = data.personal;
        $scope.$apply();
    });

    $scope.goToSelectedUser = function (index) {
        myService.user = {};
        myService.user = $scope.user[index];
        $state.go('employer-openjobdetailviewjobseeker');
    };

});
//Employer-openjobdetailviewjobseeker
module.controller('EJSProfileCtrl', function ($scope, $state, $http, myService, $mdDialog) {
    $scope.isdisabled = true;
    var user_id = myService.user.userid;
    //console.log(user_id);
    $.ajax({
        method: "POST", 
        dataType: "json",
        data: {userid: user_id},
        url: "http://www.primefield.co/jobsearch/viewemployeeprofile.php"
    }).then(function (data) {
        $scope.isdisabled = false;
        $scope.personalinfo = data.personal;
        $scope.radiobutton = {group1: $scope.personalinfo.gender};
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
        var st = $('#experienceinfo-timestart').val();
        $scope.experienceinfo[index].timestart = st;
        var ee = $('#experienceinfo-timeend').val();
        $scope.experienceinfo[index].timeend = ee;
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
module.controller('EOpenJobDetailShortlistedJobseekerCtrl', function ($scope, $state, $http, myService, $mdDialog, $window) {

    var user_id = myService.user.userid;
    ///$scope.isdisabled = false;
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
    };

    $scope.removeShortlist = function ($event) {


        confirm = $mdDialog.confirm()
                .title('Confirmation')
                .content('Are you sure you want to remove this applicant from shortlist?')
                .ariaLabel('Remove')
                .ok('Remove')
                .cancel('Cancel');
        $mdDialog.show(confirm).then(function () {
            $scope.hide = !$scope.hide;
            $scope.isdisabled = !$scope.isdisabled;

        });
    };

    $scope.phone = function (tel) {
        window.location.href = 'tel:'+ tel;
        //alert(tel);
    };

    $scope.email = function(email, subject, body) {
        var link = "mailto:"+ email
                 + "?subject=New%20email " + escape(subject)
                 + "&body=" + escape(body); 

        window.location.href = link;
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
        var st = $('#experienceinfo-timestart').val();
        $scope.experienceinfo[index].timestart = st;
        var ee = $('#experienceinfo-timeend').val();
        $scope.experienceinfo[index].timeend = ee;
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
//Employer-openjobdetailshortlisted
module.controller('EOpenJobDetailShortlistedCtrl', function ($scope, $state, $http, myService) {
    var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
    var user_id = loginInfo.user_id;
    $scope.postjob = myService.employer_postjob;
    //console.log($scope.postjob.jobid);
    $.ajax({
        method: "POST",
        dataType: "json",
        data: {jobid: $scope.postjob.jobid},
        url: "http://www.primefield.co/jobsearch/viewpersonalinfo.php"
    }).then(function (data) {
        $scope.user = data.personal;
        $scope.$apply();
    });

    $scope.goToSelectedUser = function (index) {
        myService.user = {};
        myService.user = $scope.user[index];
        $state.go('employer-openjobdetailshortlistedjobseeker');
    };

});
//Employer-openjobdetailapplication
module.controller('EOpenJobDetailApplicationCtrl', function ($scope, $state, $http, myService) {
    var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
    var user_id = loginInfo.user_id;
    $scope.postjob = myService.employer_postjob;
    //console.log($scope.postjob.jobid);
    $.ajax({
        method: "POST",
        dataType: "json",
        data: {jobid: $scope.postjob.jobid},
        url: "http://www.primefield.co/jobsearch/viewpersonalinfo.php"
    }).then(function (data) {
        $scope.user = data.personal;
        $scope.$apply();
    });

    $scope.goToSelectedUser = function (index) {
        myService.user = {};
        myService.user = $scope.user[index];
        $state.go('employer-openjobdetailapplicationjobseeker');
    };

});
//EOpenJobDetailApplicationJobseekerCtrl
module.controller('EOpenJobDetailApplicationJobseekerCtrl', function ($scope, $state, $http, myService, $mdDialog) {
    $scope.isdisabled = true;
    var user_id = myService.user.userid;
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
        var st = $('#experienceinfo-timestart').val();
        $scope.experienceinfo[index].timestart = st;
        var ee = $('#experienceinfo-timeend').val();
        $scope.experienceinfo[index].timeend = ee;
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
//Jobseeker-view
module.controller('JSViewCtrl', function ($scope, $http, myService) {
    $scope.postedjoblist = {};
    var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
    var user_id = loginInfo.user_id;

    $scope.goToSelectedJob = function (id, event) {

    };
});
//Jobseeker-history
module.controller('JSHistoryCtrl', function ($scope, $http, myService) {
    var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
    var user_id = loginInfo.user_id;
});

//savedjobsctrl jobseeker savedjobs
module.controller('savedjobsctrl', function ($scope, $state, $http, myService, $mdDialog, myserv) {
    //console.log(JSON.stringify(localStorage.getItem('sJobs')))
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
        $scope.$apply();
    });
    //$scope.sJobsinfo = JSON.parse(localStorage.getItem('sJobs'));
    //console.log($scope.sJobsinfo);
})

//JAppyJobCtrl application btn in jobseeker main page
module.controller('JAppyJobCtrl', function ($scope, $state, $http, myService, $mdDialog, myserv) {
    var loginInfo = JSON.parse(localStorage.getItem('logininfo'));
    var user_id = loginInfo.user_id;
    $.ajax({
        method: "POST",
        dataType: "json",
        data: {userid: localStorage.getItem('userID')},
        url: "http://www.primefield.co/jobsearch/getappliedjobs.php"
    }).then(function (data) {
        console.log(data)
        $scope.Applyjob = data.applyjob;
        $scope.$apply();
    });
    $scope.goToSelectedJob = function (index) {
        console.log(index.userid);
        $http({
            url: 'http://primefield.co/jobsearch/getcompanydetail.php', 
            method: "GET",
            params: {userid: index.userid}
         }).then(function(r){
            //console.log(r.data[0]);
            myService.employer_company = r.data[0];
            myService.employer_postjob = index;
            $state.go('employer-openjobdetail');
            //console.log($scope.company); 
        })
    };
})

//SearchDataCompanyCtrl
module.controller('SearchDataCompanyCtrl', function ($scope, $state, $http, myService, $mdDialog, myserv) {

    //console.log(myserv.currentjob)
    $scope.company = myserv.companydata;
    //console.log($scope.company); 
    $scope.postjob = myserv.currentjob;
    console.log($scope.postjob)
    $http({
        url: 'http://primefield.co/jobsearch/getcompanydetail.php', 
        method: "GET",
        params: {userid: $scope.postjob.userid}
     }).then(function(r){
        //console.log(r.data[0]);
        $scope.company = r.data[0];
        //console.log($scope.company); 
    })
    
    
    
    $scope.postjob.deadline = new Date(myserv.currentjob.deadline);
    $scope.industry = myserv.currentjob.industry;
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
            console.log(data);
        });
    };

    $scope.removeImpress = function ($event) {


        confirm = $mdDialog.confirm()
                .title('Confirmation')
                .content('Are you sure you want to remove Impressed?')
                .ariaLabel('Remove')
                .ok('Remove')
                .cancel('Cancel');
        $mdDialog.show(confirm).then(function () {
            $scope.hide = !$scope.hide;
            // console.log(localStorage.getItem("userID"));
            // console.log($scope.postjob.jobid);
            $.ajax({
                method: "POST",
                dataType: "json",
                data: {uid:localStorage.getItem("userID"), jobid:$scope.postjob.jobid},
                url: "http://www.primefield.co/jobsearch/unimpressed.php"
            }).then(function (data) {
                console.log(data);
            });
            $scope.isdisabled = !$scope.isdisabled;
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
            console.log(data);
        }); 
    };

    $scope.apply = function () {
        $scope.applyhide = !$scope.applyhide;
        console.log(localStorage.getItem("userID"));
        console.log($scope.postjob.jobid);
        // $http({
        //     url: 'http://primefield.co/jobsearch/apply.php', 
        //     method: "POST",
        //     params: {userid: localStorage.getItem("userID"),jobid:$scope.postjob.jobid}
        //  }).then(function(r){
        //     console.log(r.data[0]); 
        // })

        $.ajax({
            method: "POST",
            dataType: "json",
            data: {userid: localStorage.getItem("userID"), jobid:$scope.postjob.jobid},
            url: "http://www.primefield.co/jobsearch/apply.php"
        }).then(function (data) {
            console.log(data);
        }); 

        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Success')
            .content('We wish you good luck in your job application!')
            .ariaLabel('wish')
            .ok('Close')
        );
        $state.go('jobseeker-apply');
    };
    $scope.removeApply = function ($event) {
        confirm = $mdDialog.confirm()
                .title('Confirmation')
                .content('Are you sure you want to remove Application?')
                .ariaLabel('Remove')
                .ok('Remove')
                .cancel('Cancel');
        $mdDialog.show(confirm).then(function () {
            $scope.applyhide = !$scope.applyhide;
            //$scope.isdisabled = !$scope.isdisabled;

        });
    };

    angular.element(document).ready(function () {
        $('.md-char-counter').hide();
    })

});

module.controller('SearchCtrl', SearchCtrl);

function SearchCtrl($timeout, $q, $http, $scope, $state, myserv) {
    var tempSearchData = window.localStorage.getItem('tempSearchData');
    var self = this;
    self.simulateQuery = false;
    self.isDisabled = false;
    self.jobs = myserv.jobs;

    $http.get('http://primefield.co/jobsearch/viewjobdetails.php')
    .success(function (data) {
        //console.log(data)
        self.jobs = data;
        myserv.jobs = data;
    });

    $scope.filters = myserv.filters;
    $scope.selected = [];

    // set history search field from localStorage
    if (tempSearchData != 'undefined') {
        $scope.ctrl.searchText = tempSearchData;
        //$scope.searchField = tempSearchData;
    }
    // get all the categories of jobs if not exists in service
    if (myserv.filters.length == 0) {
        $http.get('http://primefield.co/jobsearch/getcategory.php')
                .success(function (r) {
                    angular.forEach(r, function (value, key) {
                        myserv.filters.push(value.category);
                    });
                });
    }
    // get all the jobs from database if not exists in service
    if (myserv.jobs.length == 0) {
        $http.get('http://primefield.co/jobsearch/getalljob.php')
                .success(function (data) {
                    self.jobs = data;
                    myserv.jobs = data;
                });
    }

    self.querySearch = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange = searchTextChange;

    // declare all controller functions
    function querySearch(query) {
        var results = query ? self.jobs.filter(createFilterFor(query)) : self.jobs,
                deferred;
        if (self.simulateQuery) {
            deferred = $q.defer();
            $timeout(function () {
                deferred.resolve(results);
            }, Math.random() * 1000, false);
            return deferred.promise;
        } else {
            return results;
        }
    }
    function searchTextChange(text) {
        //$log.info('Text changed to ' + text);
        window.localStorage.setItem('tempSearchData', text);
    }
    function selectedItemChange(item) {
        //$log.info('Item changed to ' + JSON.stringify(item)); 
        window.localStorage.setItem('tempSearchData', item.companyName);
    }
    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(item) {
            //console.log(item);
            return (angular.lowercase(item.title).indexOf(lowercaseQuery) > -1);
            //return (angular.lowercase(item.companyname).indexOf(lowercaseQuery) > -1);
        };
//        if(item.job_position.indexOf(angular.lowercase(query)) > -1){
//        //found
//            return true;
//        }
    }

    $scope.ctrl.salary = 0;
    $scope.expYearsFrom = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    $scope.expYearsTo = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 19, 20];

    /*
     * functions to validate the dropdown menus for 
     * From and To of Years Experience
     */
    $scope.checkYearsFrom = function (x) {
        if (x > $scope.ctrl.selectedYearsTo) {
            $scope.ctrl.selectedYearsTo = x;
        }
    }
    $scope.checkYearsTo = function (x) {
        if (x < $scope.ctrl.selectedYearsFrom) {
            $scope.ctrl.selectedYearsFrom = x;
        }
    }

    /*
     * ng-click functions
     */
    $scope.toggleIndustryFilter = function (item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) {
            list.splice(idx, 1);
        }
        else {
            list.push(item);
        }
    };

    $scope.getJobsFilter = function () {
        var filterResults = [];
        var filterResults2 = [];
        var searchText = $scope.ctrl.searchText;
        if ($scope.selected.length > 0) {
            for (var i = 0; i < self.jobs.length; i++) {
                if ($scope.selected.indexOf(self.jobs[i].industry) > -1) {
                    filterResults.push(self.jobs[i]);
                }
            }
        } else {
            filterResults = self.jobs;
        }

        if (searchText != undefined) {
            window.localStorage.setItem('tempSearchData', searchText);
            for (var i = 0; i < filterResults.length; i++) {
                if (filterResults[i].title.indexOf(searchText) > -1) {
                    filterResults2.push(filterResults[i]);
                }
            }
            //window.localStorage.setItem('jobsFilter', JSON.stringify(filterResults2));
            myserv.jobsFilter = filterResults2;
        } else {
            //window.localStorage.setItem('jobsFilter', JSON.stringify(filterResults));
            myserv.jobsFilter = filterResults;
        }

        //console.log(myserv.jobsFilter);

        if ($scope.ctrl.salary > 0) {
            var i = myserv.jobsFilter.length;
            while (i--) {
                if (myserv.jobsFilter[i].salary < $scope.ctrl.salary) {
                    myserv.jobsFilter.splice(i, 1);
                }
            }
        }

        if (($scope.ctrl.selectedYearsFrom != undefined) && ($scope.ctrl.selectedYearsTo != undefined)) {
            var i = myserv.jobsFilter.length;
            while (i--) {
                if ((myserv.jobsFilter[i].experience < $scope.ctrl.selectedYearsFrom) || (myserv.jobsFilter[i].experience > $scope.ctrl.selectedYearsTo)) {
                    myserv.jobsFilter.splice(i, 1);
                }
            }
        }

        $state.go('searchResults');
    };

}

module.controller('searchResult', searchResult);
function searchResult($scope, $q, $timeout, $state, myserv) {
    $scope.myserv = myserv;
    $scope.query = {
        filter: '',
        order: 'title',
        limit: 5,
        page: 1
    };

    $scope.orderBy = function (order) {
        $scope.query.order = order;
    };

    $scope.goToJob = function (job) {
        //console.log(job);
        myserv.currentjob = {};
        myserv.currentjob = job;
        $state.go('searchData-company');
    };

    //myserv.jobsFilter = JSON.parse(window.localStorage.getItem('jobsFilter'));
}

module.service('myserv', function ($http) {
    //this.jobsFilter = '';
    this.filters = [];

    this.jobs = [{companyname: 'Primefield', salary: '3000', title: 'Administrator', experience: '0', deadline: '06-19-2016', requirement: 'Degree', description: '5 years Primefield', industry: 'Information Technology'},
        {companyname: 'Exoon', salary: '2000', title: 'Executive', experience: '1', deadline: '08-19-2016', requirement: 'Degree', description: '5 years Exoon', industry: 'Education'},
        {companyname: 'HMan', salary: '1400', title: 'Sales', experience: '1', deadline: '09-19-2016', requirement: 'Diploma', description: '5 years HMan', industry: 'Business'},
        {companyname: 'Jquiery', salary: '1500', title: 'Programmer', experience: '1', deadline: '08-20-2016', requirement: 'O Level', description: '5 years Jquiery', industry: 'Information Technology'},
        {companyname: 'Anhgular', salary: '6000', title: 'Language', experience: '2', deadline: '08-01-2016', requirement: 'N Level', description: '5 years Anhgular', industry: 'Information Technology'},
        {companyname: 'PSOhkhet', salary: '5000', title: 'Powerful Executive', experience: '2', deadline: '08-10-2016', requirement: 'Higher Nitec', description: '5 years PSOhkhet', industry: 'Information Technology'},
        {companyname: 'PrimefieldGroup', salary: '3000', title: 'Administrator', experience: '1', deadline: '10-29-2016', requirement: 'Masters', description: '5 years PrimefieldGroup', industry: 'Information Technology'}];

    this.companydata = {country: 'Singapore', companyname: 'Exoon', address: '88 Genting Lane',
        phone: '88811133', email: 'helloworld@primefield.com', website: 'maxxximum.primefield.com',
        overview: 'Ok can.'};

    this.currentjob = {};
});
