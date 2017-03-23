document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    // Now safe to use device APIs
    alert('hi')
    initPaymentUI();
}

function initPaymentUI() {alert("paymet ") ; 
   var clientIDs = {
  //  "PayPalEnvironmentProduction":"AdnVNEGZWs6won6Zxj3LHcM4pkF0XlEeV7Ku5SjBlTgO0c8rJD4aguhPV6WVBcj23N_Usz-VzoZ-3fdf",
    "PayPalEnvironmentProduction":"APP-85245172Y1936483K",
    //  "PayPalEnvironmentProduction": "AbZH0gjYYnHIIVt3dNMKWbdLVRZpM-jqHbn8UCMWM02rAOALBvjfWyV5vYCcwg3HOiVYfhPugeGTU3u6",
     //"PayPalEnvironmentSandbox": "AbZH0gjYYnHIIVt3dNMKWbdLVRZpM-jqHbn8UCMWM02rAOALBvjfWyV5vYCcwg3HOiVYfhPugeGTU3u6"
   //"PayPalEnvironmentSandbox":"AVR-iGCzq_hPTo3YSugCwmOJbUNbE7WfAbDWyeEAXEyLFVRI-2hRXVEUcLJ_PJWHXV1JT8aMjD_FT8wE"
     "PayPalEnvironmentSandbox":"APP-80W284485P519543T"
    };
   PayPalMobile.init(clientIDs, onPayPalMobileInit);

 }

function onPayPalMobileInit() {
     // must be called
     // use PayPalEnvironmentNoNetwork mode to get look and feel of the flow
     PayPalMobile.prepareToRender("PayPalEnvironmentProduction", configuration(), onPrepareRender);
   }

function configuration() {
     // for more options see `paypal-mobile-js-helper.js`
     var config = new PayPalConfiguration({merchantName: "My test shop", merchantPrivacyPolicyURL: "https://mytestshop.com/policy", merchantUserAgreementURL: "https://mytestshop.com/agreement"});
     return config;
   }

function testbtn(e,cr) {
      //alert(e)
       // single payment
       //alert('hi')
       PayPalMobile.renderSinglePaymentUI(createPayment(e,cr), onSuccesfulPayment, onUserCanceled);
     };   

function onPrepareRender() {
     // buttons defined in index.html
     //  <button id="buyNowBtn"> Buy Now !</button>
     //  <button id="buyInFutureBtn"> Pay in Future !</button>
     //  <button id="profileSharingBtn"> ProfileSharing !</button>
     var buyNowBtn = document.getElementById("buyNowBtn");
     var buyInFutureBtn = document.getElementById("buyInFutureBtn");
     var profileSharingBtn = document.getElementById("profileSharingBtn");

     buyNowBtn.onclick = function(e) {
       // single payment
       PayPalMobile.renderSinglePaymentUI(createPayment(), onSuccesfulPayment, onUserCanceled);
     };

     buyInFutureBtn.onclick = function(e) {
       // future payment
       PayPalMobile.renderFuturePaymentUI(onAuthorizationCallback, onUserCanceled);
     };

     profileSharingBtn.onclick = function(e) {
       // profile sharing
       PayPalMobile.renderProfileSharingUI(["profile", "email", "phone", "address", "futurepayments", "paypalattributes"],onAuthorizationCallback, onUserCanceled);
     };
   } 

function onUserCanceled(result) {
     alert(result);
   } 

function createPayment(e,cr) {
      var amount = parseInt(e);
      var cr = ''+cr+' Job Postings'
     // for simplicity use predefined amount
     // optional payment details for more information check [helper js file](https://github.com/paypal/PayPal-Cordova-Plugin/blob/master/www/paypal-mobile-js-helper.js)
     var paymentDetails = new PayPalPaymentDetails(amount, "0.00", "0.00");
     var payment = new PayPalPayment(amount, "USD", cr, "Sale", paymentDetails);
     //alert(payment)
     return payment;
   }  

function onSuccesfulPayment(payment) {
      //alert("payment success: " + JSON.stringify(payment, null, 4));

     if(localStorage.getItem('tranID') != null || localStorage.getItem('tranID') != undefined || localStorage.getItem('tranID') != ''){
        localStorage.removeItem('tranID');
        localStorage.removeItem('createDate');
        localStorage.removeItem('Pstatus');
     }
     localStorage.setItem('tranID',payment.response.id);
     localStorage.setItem('createDate',payment.response.create_time);
     localStorage.setItem('Pstatus',payment.response.state);
     //alert(localStorage.getItem('tranID'));
     //alert(localStorage.getItem('createDate'));
     //alert(localStorage.getItem('Pstatus'));
     window.location.href = '#/thankyou';
   }         
