var errorList = [];
errorList["ulm"] = "Your email address field is required.";
errorList["ulp"] = "Your password field is required.";
errorList["ul"] = "Sorry, unrecognized username or password.";
errorList["eml"] = "Please enter a valid email address.";
errorList["edb"] = "The provided email address is already in the system.";
errorList["tos"] = "You must accept the Terms of Services.";
errorList["emt"] = "Please double-check or fill in the marked fields below.";
errorList["ena"] = "Email domain not allowed.";
// define the division relavant to error mesages , to hilight the border
var inputIdList = [];
inputIdList["ulm"] = "#usr_lg_mail";
inputIdList["ulp"] = "#usr_lg_pass";
inputIdList["ul"] = "#usr_lg_mail";
inputIdList["fn"] = "#usr_reg_name";
//inputIdList["ln"] = "#usr_sg_l_name";
inputIdList["eml"] = "#usr_reg_email";
inputIdList["edb"] = "#usr_reg_email";
inputIdList["ena"] = "#usr_reg_email";
inputIdList["ef"] = "#usr_reg_email";
inputIdList["pw"] = "#usr_reg_pass";
//inputIdList["pwc"] = "#usr_sg_pass_c";
//inputIdList["pwm"] = "#usr_sg_pass_c";
//inputIdList["tos"] = "#usr_sg_tac";
//inputIdList["phn"] = "#usr_sg_phone";
window.errorList = errorList;

var content_selector_login_success = '#sucess';// Set this outside, in the place where this file is inluded to overide this value to have a different value.
// Indicator to detect if the widget is opened from APP
var openedFromApp = false;

function displayLoginForGoogleApps(){
	
	// If the div is hidden
	if ($('#signin-email').is(":hidden")) {
		// Clear error messages and remove error classes
		$( "#signin-email .gapp-login-error" ).html("");
		// Remove the red border
		$( "#signin-email .gapp-login-email" ).removeClass('errortext');
	}
	$( "#signin-email" ).show ("slow",resetWidgetHeight);
	//setTimeout('scrollDown(\'creately-popup-border\')', 500);
}
function displaySignUpForGoogleApps(){
	// If the div is hidden
	if ($('#google-apps-sign-up-form-div').is(":hidden")) {
		$( "#google-apps-sign-up-form-div .gapp-signup-error" ).html("");
		// Remove the red border
		$( "#google-apps-sign-up-form-div .gapp-signup-email" ).removeClass('errortext');
	}
	$( "#google-apps-sign-up-form-div" ).show ("slow",resetWidgetHeight);
	
	//setTimeout('scrollDown(\'creately-popup-border\')', 500);
	// Reset the popup height according to thecontent height
	//setTimeout('resetWidgetHeight()', 600);
}

function scrollDown( divid ){
	var objDiv = document.getElementById(divid);
	objDiv.scrollTop = objDiv.scrollHeight;
}

function loginAsDifferentUser(user_type, action) {
	
	if( user_type== 'google_apps' ){
		//if( trim( $( "." + action + "-email").val ( ) ) != ''){
			changeIframeSource(user_type, action);
		/*} else {
			// Add error to the error container
			$( "." + action + "-error").html (errorList["eml"]);
			// Highlight the input field for error
			$( "." + action + "-email").addClass('errortext');
		}*/
	} else {
		//window.parent.changeIframeSource(user_type);
		changeIframeSource(user_type);
	}
	// Resize the widget height
	resetWidgetHeight();
}

function hideGoogleAccountLogin(){
	$( "#signin-email" ).hide ("slow",resetWidgetHeight);
}

function hideGoogleAccountSignUp(){
	$( "#google-apps-sign-up-form-div" ).hide ("slow",resetWidgetHeight);
	// Reset the popup height according to thecontent height
	//setTimeout('resetWidgetHeight()', 600);
}

function changeIframeSource(user_type, action)
{  	
	var loc = new String(window.location.protocol);
	var protocol = "p";
	if (loc.indexOf("https:")!= -1){
		protocol = "s";
	}
	// protocol is used to redirect the sucess page https or http
	if(user_type == 'facebook'){
		popUp('/openid/facebook/login?pt='+protocol);
	} else if (user_type == 'google_apps'){
		/*var email = trim( $( "." + action + "-email" ).val ( ) );
		if(isValidEmailAddress(email)){
			popUp('/google/oauth2signup?from=google&domain='+ trim(email)+'&pt='+protocol);
		} else {
			var error = '* Please enter a valid email address.';
			//$("#login-page-error").html(error);
			//$("#signup-page-error").html(error);
			// Show the error for g-app login
			$("." + action + "-error").html(error);
			// Highlight the input field
			$( "." + action + "-email").addClass('errortext');
		}*/
		if(action == 'gapp-login'){
			var from_source = 'GOOGLE';
		}
		popUp('/google/oauth2signup?from=google&pt='+protocol+'&fa='+openedFromApp+'&from_source='+from_source);
	} else if (user_type == 'google_mail') {
		popUp('/openid/google/login?pt='+protocol+'&fa='+openedFromApp);
	} else if (user_type == 'twitter') {
		popUp('/openid/twitter/login?pt='+protocol+'&fa='+openedFromApp);
	}

}


function popUp(URL) {
	day = new Date();
	id = day.getTime();
	var w = 800;
	var h = 500;
	var left = (screen.width/2)-(w/2);
	var top = (screen.height/2)-(h/2);
	eval("page" + id + " = window.open(URL, 'createlypopupwindow', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width="+w+",height="+h+",top="+top+", left="+left+"');");
}
function redirect(redirect){
	if(document.body!=null){
		document.body.style.display = "none";
	}
	
	if ( redirect == null || redirect=='') {
		this.refresh();
	} else {
		//alert(window.location.protocol + "//" + window.location.host+"/"+redirect+"?destination=''");
		window.location.href= window.location.protocol + "//" + window.location.host+"/"+redirect;
	}
	//var currentUrl = parent.location;
	//parent.location.href= currentUrl.protocol + "//" + currentUrl.host + "/creately-login?destination=" + location + escape (currentUrl.search );
	/*
	var currentUrl = "";
		var protocall = "http:";
		try{
			// only work for https
			currentUrl = parent.location;
			protocall = currentUrl.protocol;
		} catch(err) {
			currentUrl = window.location;
		}
		
		if( protocall == "https:" ){
			parent.location.href= currentUrl.protocol + "//" + currentUrl.host + "/creately-login?destination=" + location + escape (currentUrl.search );
		} else {
			window.location.href = currentUrl.protocol + "//" + currentUrl.host + "/redirect-http?destination=" + location + escape (currentUrl.search );
			//window.location.href = "http://all.creately.com/redirect-http";
		}
		*/
}

function isValidEmailAddress(emailAddress) {
	var pattern = new RegExp(
			/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
	return pattern.test(emailAddress);
}

function fogotPassword(){
	if(document.body!=null){
		document.body.style.display = "none";
	}
	var currentUrl = parent.location;
	parent.location.href= currentUrl.protocol + "//" + currentUrl.host + "/forgotten-password?" + escape (currentUrl.search );
}

function MM_swapImgRestore() { //v3.0
	var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_preloadImages() { //v3.0
	var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
	var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
	if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
	var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
	d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
	if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
	for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
	if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
	var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
	if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function getErrors( errors, inputs ){
	// display the user login errors
	var formatedErrors = "";
	var addedErrors = {};
	//errorList added by form module
	var trimedErrors = $.trim( errors );
	if ( trimedErrors != null || trimedErrors !=""){
		var mySplitResult = trimedErrors.split("-");
		if( mySplitResult.length > 1 ){
			formatedErrors = formatedErrors + "<ul class=\"error\">";
			for(var i = 0; i < ( mySplitResult.length-1 ) ; i++){
				
				if(errorList[mySplitResult[i]]){
					
					if ( typeof addedErrors[mySplitResult[i]] == 'undefined') {
						formatedErrors = formatedErrors + "<li>" + errorList[mySplitResult[i]] + "</li>";
						addedErrors[mySplitResult[i]] = true;
					}
					
					//$( inputIdList[mySplitResult[i]] ).css('border', '1px solid #C52020');
				} else {
					formatedErrors = formatedErrors + "<li>" + mySplitResult[i] + "</li>";
				}
			}
			formatedErrors = formatedErrors + "</ul>";
		}
		
	}
	var trimedInputIDs = $.trim( inputs );
	if ( trimedInputIDs != null || trimedInputIDs !=""){
		var mySplitIDs = trimedInputIDs.split("-");
		
		if( mySplitIDs.length > 1 ){
			
			for(var i = 0; i < ( mySplitIDs.length-1 ) ; i++){
				$( inputIdList[mySplitIDs[i]] ).addClass('errortext');
				$( inputIdList[mySplitIDs[i]] ).prev('span').addClass('errortext');
			}
		}
	}
	 return formatedErrors;
}

function clearErrors(){
	for (i in inputIdList )
	{
		$( inputIdList[i] ).removeClass('errortext');
		$( inputIdList[i] ).prev('span').removeClass('errortext');
	}
}

function RF(){
	
	var path = window.location.pathname.substring(1);
	// fix for badge not display issue when signup or login
	if( path =='desktop' || path =='desktop/' ){
		var sURL = unescape(window.location.pathname);
		window.location.replace( sURL );
	} else {
		window.location.reload();
	}
	//window.location.href=window.location.href;
}

// Set the current wondow location to plans page.
function returnToPlans (return_add) {
	var redirectPath = "/plans";
	
	if ( return_add ) {
		redirectPath = return_add;
	}
	window.location.href = window.location.protocol + "//" + window.location.host + redirectPath;

}

// function to submit the login page when hit ENTER key
function liginForEnter(field,e) {
	var keycode;
	if (window.event) keycode = window.event.keyCode;
	else if (e) keycode = e.which;
	else return true;
	if (keycode == 13) {
		// check all input valid
		var us = $.trim( $("#usr_lg_mail").val() );
		var pw = $.trim( $("#usr_lg_pass").val() );
		if( us!='' && pw !='' ) {
			submitLoginForm();
			return false;
		}
		return true;
	} else {
		return true;
	}
}

//  function to submit the signup page when hit ENTER key
function signupForEnter(field,e) {
	var keycode;
	if (window.event) keycode = window.event.keyCode;
	else if (e) keycode = e.which;
	else return true;
	if (keycode == 13) {
		// check all input valid
		var fn = $.trim( $("#usr_reg_name").val() );
		var e = $.trim( $("#usr_reg_email").val() );
		var pw = $.trim( $("#usr_reg_pass").val() );
		
		if( fn!='' && e !='' && pw !='' ) {
			submitSignupForm();
			return false;
		}
		return true;
	} else {
		return true;
	}
}

//function to open googleapps login window when hit ENTER key
function gAppEnter(field, action_type, e)
{
	var keycode;
	if (window.event) keycode = window.event.keyCode;
	else if (e) keycode = e.which;
	else return true;
	if (keycode == 13)
	   {
		// check all input valid
		var email = $.trim( $( "#google_apps_user_email" ).val ( ) );
		if( email!='')
			{
				loginAsDifferentUser('google_apps', action_type);
				return false;
			}
		return true;
		}
	else
		return true;
	
}

// form submit function
function submitLoginForm()
{
	if ( validateLoginForm()){
		$("#signin_request_process").css('visibility', 'visible');
		$('.hdn-from-app').val(openedFromApp);
		$('#loginform').submit();
	}
	// Reset the popup height according to thecontent height
	resetWidgetHeight();
}

function validateLoginForm(){
	
	$("#login-page-error").html(""); // clear all errors
	var us = $.trim( $("#usr_lg_mail").val() );
	var pw = $.trim( $("#usr_lg_pass").val() );
	
	if ($('#remember').attr('checked')) {
		/*var username = trim( $('#usr_lg_mail').attr("value") );
		var password = trim( $('#usr_lg_pass').attr("value") );
		// set cookies to expire in 14 days
		$.cookie('username', username, { expires: 14 });
		$.cookie('password', password, { expires: 14 });*/
		$.cookie('remember', true, { expires: 14 });
	} else {
		// reset cookies
		/*$.cookie('username', null);
		$.cookie('password', null);*/
		$.cookie('remember', null);
	}
	
	clearErrors(); // clear the red border of input fields
	
	var result = '';
	var idlist = '';
	var valid = true;
	if ( us == '' ){
		result = 'ulm-';
		idlist = 'ulm-';
		valid = false;
	} else if (!isValidEmailAddress(us)) {
		result = 'eml-';
		idlist = 'ulm-';
		valid = false;
	}
	
	if ( pw == '' ){
		result = result+'ulp-';
		idlist = idlist + 'ulp-';
		valid = false;
	}
	
	if(!valid){
		errors( result, idlist );
	} 
	return valid;
}

//signup form submit function
function submitSignupForm()
{
	if ( validateSignupForm()){
		$("#signup_request_process").css('visibility', 'visible');
		$('.hdn-from-app').val(openedFromApp);
		$('#signupform').submit();
	}
	// Reset the popup height according to thecontent height
	resetWidgetHeight();
}


// client side validation of signup form
function validateSignupForm(){
	
	$("#signup-page-error").html(""); // clear signup page errors
	clearErrors(); // clear the red border of input fields
	
	var tos = 0;
	/*if ($('#usr_sg_tac').prop('checked')) {
		tc = 1 ;
	}*/
	
	var result = '';
	var errorsToShown = '';
	var valid = true;
	var is_empty_added = false;
	var usrEmail = $.trim( $("#usr_reg_email").val());
	
	if ( $.trim( $("#usr_reg_name").val()) == ''){ result = result+'fn-';valid = false; if (!is_empty_added){errorsToShown = errorsToShown+'emt-';is_empty_added=true;} }
	//if ( trim( $("#usr_sg_l_name").val()) == ''){ result = result+'ln-';valid = false; if (!is_empty_added){errorsToShown = errorsToShown+'emt-';is_empty_added=true;} }
	if ( usrEmail == ''){ result = result+'eml-';valid = false; if (!is_empty_added){errorsToShown = errorsToShown+'emt-';is_empty_added=true;} } else if (!isValidEmailAddress(usrEmail)) { result = result+'eml-';errorsToShown = errorsToShown+'eml-';valid = false;}
	if ( $.trim( $("#usr_reg_pass").val()) == ''){ result = result+'pw-';valid = false; if (!is_empty_added){errorsToShown = errorsToShown+'emt-';is_empty_added=true;} }
	//if ( trim( $("#usr_sg_pass_c").val()) == ''){ result = result+'pwc-';valid = false; if (!is_empty_added){errorsToShown = errorsToShown+'emt-';is_empty_added=true;} }
	//if ( !($('#usr_sg_tac').prop('checked')) ){ result = result+'tos-';valid = false;errorsToShown = errorsToShown+'tos-'; }
	if(!valid){
		signupErrors(errorsToShown, result );
	}
	
	return valid;
}

function errors( msg, ids )
{
	$("#signin_request_process").css('visibility', 'hidden');
	var errors = getErrors( msg, ids );
	$("#login-page-error").html(errors);
}

function signupErrors( msg, ids )
{  
	$("#signup_request_process").css('visibility', 'hidden');
	var errors = getErrors( msg, ids );
	$("#signup-page-error").html(errors);
 
}

function displayLoginSuccess( login_success_content ) {
	
	if ( login_success_content == 1 ) {
		returnToPlans();
	} else {
		var content = $(content_selector_login_success).html();
		overlayDivHeight = 360;
		overlayDivWidth = 560;
		loadThisContent(overlayDivHeight, overlayDivWidth, content, false, false, 'middle-container-');
		updateDisplayForChromeWebStore();
		resetWidgetHeight();
	}
}

/**
 * Show hide install chrome option for relevant users with relevant browser
 */
function updateDisplayForChromeWebStore() {
	
	if ( typeof(chrome) != 'undefined' && chrome ) {
		
		if ( !chrome.app.isInstalled) {
			document.getElementById('install_chrome').style.display = 'block';
			$('.chrome-out').addClass('chrome-in');
			// Track chrome extension load in Success Widget
			trackChromeAlert('Chrome Alert', 'load', 'Success Widget');
		}
	}
}

// Hide install to chrome option when the app is installed to Chrome Web Store.
function installToCromeSucessCallback() {
	// Hide the option
	document.getElementById('install_chrome').style.display = 'none';
	// Update CSS for UI/Option changes
	$('.chrome-out').removeClass('chrome-in');
	// Reset the login-success window/pop-up size
	resetWidgetHeight();
	// Track chrome extension installation in Success Widget
	trackChromeAlert('Chrome Alert', 'installed', 'Success Widget');
}

// add aditional JS
/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Create a cookie with the given name and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String name The name of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given name.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function(name, value, options) {
	if (typeof value != 'undefined') { // name and value given, set cookie
		options = options || {};
		if (value === null) {
			value = '';
			options.expires = -1;
		}
		var expires = '';
		if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
			var date;
			if (typeof options.expires == 'number') {
				date = new Date();
				date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
			} else {
				date = options.expires;
			}
			expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
		}
		// CAUTION: Needed to parenthesize options.path and options.domain
		// in the following expressions, otherwise they evaluate to undefined
		// in the packed version for some reason...
		var path = options.path ? '; path=' + (options.path) : '';
		var domain = options.domain ? '; domain=' + (options.domain) : '';
		var secure = options.secure ? '; secure' : '';
		document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	} else { // only name given, get cookie
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				// Does this cookie string begin with the name we want?
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
};

// end cookie plugin