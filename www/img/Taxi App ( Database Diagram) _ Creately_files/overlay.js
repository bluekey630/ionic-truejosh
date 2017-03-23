/**
 * If it is needed to reload the page on closing the widget, this variable need to be set to true in another script/page/response
 * NOTE : Do not set it to true here, it will reload the page by default when close the widget
 */ 
var reload_on_close = false;
var overlay_opened = false;

var openedWidgetId;
var params = {};
var userLoggedIn = false;

function displayLogin(){
	document.cookie = 'JSESSIONID=0; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/';
	overlayDivHeight = 385;
	overlayDivWidth = 415;
	login_url = "/modelwindow/login";
	
	loadThisIframe( overlayDivHeight, overlayDivWidth, login_url );
}

function cancelOverlay() {
	
	overlay_opened = false;

	// Overlay is closed only where there is no active tab opened.
	if ( typeof launchedTab === 'undefined' || launchedTab.closed ) {
		//document.getElementById('creately-popup').style.display = 'none';
		//document.getElementById('creately-overlay').style.display = 'none';
		$('#middle-container-creately-popup').fadeOut();
		$('#creately-overlay').fadeOut();
		document.getElementById('middle-container-creately-popup-content').style.display = 'none';
		document.getElementById('creately-popup-working').style.display = 'none';
		document.getElementById('middle-container-creately-popup-border').style.display = 'none';
		document.getElementById('middle-container-creately-popup-content').innerHTML = '';
		document.getElementById('middle-container-creately-popup').style.top = '0px';
		document.getElementById('middle-container-creately-popup').style.left = '0px';
		document.getElementById('creately-popup-close').style.display = 'block';
		//document.getElementById('creately-overlay').style.backgroundColor = '#000000';
		//document.getElementById('creately-overlay').style.opacity = '0.7';
		//document.getElementById('creately-overlay').onclick = cancelOverlay;

		$('#top-container-creately-popup').hide();

		if ( typeof getFlashMovie === 'function' ) {
			var obj = getFlashMovie(swfname);
			
			if ( obj ) {
				params["success"]= true;
				params['demoLoginClosed'] = !userLoggedIn;
				//obj.demoUserLoginComplete(true, true);
				obj.closeWidget(openedWidgetId, params);
			}
		}
		
		if ( reload_on_close ) {
			refresh();
		}
	} else {
		// Show a notification saying that user has opened a new tab and please close it first to close this overlay.
	}
}

function viewport_size(popup_width, popup_height, position) {
	
	topleftcorner = new Array();
	 
	// the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
	if (typeof window.innerWidth != 'undefined') {
		viewportwidth = window.innerWidth;
		viewportheight = window.innerHeight;
	}
	 
	// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
	else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth !='undefined' && document.documentElement.clientWidth != 0) {
		viewportwidth = document.documentElement.clientWidth;
		viewportheight = document.documentElement.clientHeight;
	}
	// older versions of IE
	else {
		viewportwidth = document.getElementsByTagName('body')[0].clientWidth;
		viewportheight = document.getElementsByTagName('body')[0].clientHeight;
	}
	switch(position) {
		case "NORTH":
			topleftcorner[0] = 12;
			topleftcorner[1] = (viewportwidth / 2) - (popup_width / 2);
			break;
		case "SOUTH":
			topleftcorner[0] = viewportheight - popup_height - 25;
			topleftcorner[1] = (viewportwidth / 2) - (popup_width / 2);
			break;
		case "CENTER":
			topleftcorner[0] = (viewportheight / 2) - (popup_height / 2);
			topleftcorner[1] = (viewportwidth / 2) - (popup_width / 2);
			break;
	}
	
	return topleftcorner;
}

function displayLoginAndSignup( diagid , hash ){
	// enable edit feture to the user
	document.cookie = 'JSESSIONID=0; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/';
	overlayDivHeight = 540;
	overlayDivWidth = 1000;
	login_url = '/viewer/edit?'+window.location.search;
	
	loadThisIframe( overlayDivHeight, overlayDivWidth, login_url );
}

function displayLoginForViewer(){
	document.cookie = 'JSESSIONID=0; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/';
	overlayDivHeight = 540;
	overlayDivWidth = 1000;
	login_url = '/viewer/login'+window.location.search;
	loadThisIframe( overlayDivHeight, overlayDivWidth, login_url );
}

var reduseHeightForSignUp = [];	// this for purchase page css overriding issue
reduseHeightForSignUp['account/upgrade/personal']= 430;
reduseHeightForSignUp['account/upgrade/teamplan']= 430;
reduseHeightForSignUp['product/desktop/purchase']= 430;


function displayLoginWidjets(){
	overlayDivHeight = 437;
	overlayDivWidth = 490;
	scorolling = 'auto';
	//content = '/login/widget'+window.location.search;
	//var content = document.getElementById('signin-mainbox').innerHTML;
	var content = document.getElementById('signin').innerHTML;

	loadThisContent( overlayDivHeight, overlayDivWidth, content, scorolling, false, 'middle-container-');
	
	// grt remember me from cookie
	var remember = $.cookie("remember");
	if ( remember == "true" ) {
		/*var username = $.cookie("username");
		var password = $.cookie("password");
		// autofill the fields
		$("#usr_lg_mail").attr("value", username);
		$("#usr_lg_pass").attr("value", password);*/
		$('#remember').attr('checked',1);
	}
	resetWidgetHeight();
	// Set the focus to Email field
	$('#usr_lg_mail').focus();
}

function displaySignUpWidjets(){
	overlayDivHeight = 514;
	overlayDivWidth = 490;
	scorolling = 'auto';
	//content = '/signup/widget'+window.location.search;
	var content = document.getElementById('signup').innerHTML;
	
	var currentUrl = parent.location;
	var parentPage = $.trim(currentUrl.pathname.substring(1));
	if( typeof reduseHeightForSignUp[parentPage]!="undefined" && reduseHeightForSignUp[parentPage] ){
		overlayDivHeight = reduseHeightForSignUp[parentPage];
	}
	loadThisContent( overlayDivHeight, overlayDivWidth, content, scorolling, false, 'middle-container-');
	
	resetWidgetHeight();
	// Set the focus to Name field
	$('#usr_reg_name').focus();
}
/**
 * Set the pop-pu widget height according to the content and the browser heights.
 */
function resetWidgetHeight ( ) {
	// Get the popup border element and set its height
	var pop_up_border = document.getElementById('creately-popup-border');
	var pop_up = document.getElementById('creately-popup');
	//var popup_body =  document.getElementById('signup_body1');
	var popup_body =  document.getElementById('creately-popup-content');
	// signup_body1 is for sign-up widget, its popup_body.clientHeight is zero when login widget is loaded, so get the login widget body
	if ( !popup_body || popup_body.clientHeight == 0) {
		popup_body = document.getElementById('login-body');
	}
	
	if ( pop_up_border && pop_up ) {
		
		if ( pop_up_border.scrollHeight != pop_up_border.clientHeight || ( popup_body && pop_up_border.clientHeight != popup_body.clientHeight ) ) {
			var expan = 0;
			var widow_height = getWindowHeight();
			var pop_up_top = pop_up.style.top;
			var height = "";
			
			if ( pop_up_border.scrollHeight == pop_up_border.clientHeight && popup_body && popup_body.clientHeight != pop_up_border.clientHeight
					&& ( popup_body.scrollHeight == 0 || popup_body.scrollHeight == popup_body.clientHeight )) {
				height = popup_body.clientHeight;
				expan = 0;
			} else {
				height = pop_up_border.style.height;
				
				if (pop_up_border.scrollHeight != pop_up_border.clientHeight) {
					expan = parseInt(pop_up_border.scrollHeight) - parseInt(pop_up_border.clientHeight);
				}
			}
			
			if ( height && isNaN(height) && endsWith(height, "px") ) {
				height = height.substr(0, height.length -2 );
			}
			
			if ( pop_up_top && isNaN(pop_up_top) && endsWith(pop_up_top, "px") ) {
				pop_up_top = pop_up_top.substr(0, pop_up_top.length -2 );
			}
			height = parseInt(height);
			pop_up_top = parseInt(pop_up_top);
			
			// HACK FOR IE BROWSERS BOTTOM_MARGIN
			if( typeof( window.innerWidth ) == 'number' ) {
				height = height + expan;
			} else {
				// Add the bottom-margin to IE browsers
				height = height + expan + 3;
			}
			// Check the broser available height before setting the height of the popup.
			if ( widow_height < ( height + 8 ) ) {
				// This setting is done to show close button not hidden if the content hieght is not larger than the available browser height.
				pop_up_border.style.height = ( widow_height - 8 ) + 'px';
				pop_up.style.top = '8px';
			} else {
				pop_up_border.style.height = height + 'px';
				pop_up.style.top = ((widow_height - height )/2 ) + 'px';
			}
		}
	}
}

/**
 * Check if the given String ends with given suffix string.
 * @param str - String
 * @param suffix - suffix to be searched
 * @returns {Boolean} - true if the given suffix string is suffixed in str.
 */
function endsWith(str, suffix) {
	return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function loadThisContent( overlayDivHeight, overlayDivWidth, html_content, scorolling, hide_close, containerPrefix ){
	
	if( containerPrefix == null ){
		containerPrefix = '';
	}

	document.cookie = 'JSESSIONID=0; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/';
	//document.getElementById(containerPrefix + 'creately-popup-content').style.display = 'none';
	$('#' + containerPrefix + 'creately-popup-content').hide();

	//document.getElementById('creately-popup-close').style.display = 'block';
	$('#creately-popup-close').show();

	///document.getElementById(containerPrefix + 'creately-popup-border').style.display = 'block';
	$('#' + containerPrefix + 'creately-popup-border').show();

	//document.getElementById(containerPrefix + 'creately-popup-border').style.width = overlayDivWidth + 'px';
	$('#' + containerPrefix + 'creately-popup-border').css({width:overlayDivWidth + 'px'});

	//document.getElementById(containerPrefix + 'creately-popup-border').style.height = overlayDivHeight + 'px';
	//$('#' + containerPrefix + 'creately-popup-border').css({height:overlayDivHeight + 'px'});

	document.getElementById('creately-popup-working').style.width = overlayDivWidth + 'px';
	document.getElementById('creately-popup-working').style.height = overlayDivHeight + 'px';
	
	//document.getElementById(containerPrefix + 'creately-popup-content').style.width = overlayDivWidth + 'px';
	$('#' + containerPrefix + 'creately-popup-content').css({width:overlayDivWidth + 'px'});

	document.getElementById('creately-popup-working').innerHTML = '<div id="pContent"><p>Loading Creately login form .... <img src="/custom_inc/images/loading.gif" /></p></div>';
	document.getElementById('creately-popup-working').style.display = 'block';
	
	topleftcorner = viewport_size(overlayDivWidth, overlayDivHeight, 'CENTER');
	//document.getElementById('creately-popup').style.left = topleftcorner[1] + 'px'; //left
	//document.getElementById('creately-popup-content').innerHTML = document.getElementById(content).innerHTML;

	//document.getElementById(containerPrefix + 'creately-popup-content').innerHTML = html_content;
	$('#' + containerPrefix + 'creately-popup-content').html(html_content);

	document.getElementById('creately-popup-working').style.display = 'none';
	/* document.getElementById('creately-popup-content').style.backgroundColor = '#FFFFFF'; */

	//document.getElementById(containerPrefix + 'creately-popup-content').style.display = 'block';
	$('#' + containerPrefix + 'creately-popup-content').show();

	document.getElementById('creately-overlay').onclick = '';
	//document.getElementById('creately-overlay').style.display = 'block';
	$('#creately-overlay').fadeIn();
	//document.getElementById('creately-popup').style.display = 'block';
	
	if( containerPrefix == 'top-container-' ){
		//document.getElementById(containerPrefix + 'creately-popup').style.top = 0; //top
		$('#' + containerPrefix + 'creately-popup').css({top:0});
	}
	else{
		//document.getElementById(containerPrefix + 'creately-popup').style.top = topleftcorner[0] + 'px'; //top 
		var topContainerCreatelyPopupHeight = $( '#top-container-creately-popup' ).height();

		if ( topleftcorner[0] < topContainerCreatelyPopupHeight+5 ) {
			topleftcorner[0]= topContainerCreatelyPopupHeight+5;
		}
		
		$('#' + containerPrefix + 'creately-popup').css({top:topleftcorner[0] + 'px'});
	}
	
	if(!overlay_opened){
		
		if( containerPrefix == 'middle-container-' ){
			$('#' + containerPrefix +'creately-popup').show().css({ left:0, opacity:0 }).animate({ left:topleftcorner[1] + 'px', opacity: 1 });
			overlay_opened = true;
		}
		else{
			$('#' + containerPrefix +'creately-popup').show().css({ left:topleftcorner[1] + 'px', opacity:0 }).animate({ opacity:1 }, 300);
		}
		
	}
	else{
		$('#' + containerPrefix +'creately-popup').show().css({ left:topleftcorner[1] + 'px', opacity:0 }).animate({ opacity:1 }, 300);
	}

	if(hide_close){
		$('#creately-popup-close').hide();
	}

	if(userLoggedIn){
		$('#signup-bottom p').html('');
	}
}

function loadThisIframe( overlayDivHeight, overlayDivWidth, login_url ){
	
	document.getElementById('creately-popup-content').style.display = 'none';
	document.getElementById('creately-popup-close').style.display = 'block';
	
	document.getElementById('creately-popup-border').style.display = 'block';
	document.getElementById('creately-popup-working').style.width = overlayDivWidth + 'px';
	document.getElementById('creately-popup-working').style.height = overlayDivHeight + 'px';
	document.getElementById('creately-popup-working').innerHTML = '<div id="pContent"><p>Loading Creately login form .... <img src="/custom_inc/images/loading.gif" /></p></div>';
	document.getElementById('creately-popup-working').style.display = 'block';
	
	topleftcorner = viewport_size(overlayDivWidth, overlayDivHeight, 'CENTER');
	document.getElementById('creately-popup').style.top = topleftcorner[0] + 'px'; //top 
	//document.getElementById('creately-popup').style.left = topleftcorner[1] + 'px'; //left

	document.getElementById('creately-popup-content').style.width = overlayDivWidth + 'px';
	document.getElementById('creately-popup-content').style.height = overlayDivHeight + 'px';
	document.getElementById('creately-popup-content').innerHTML = '<iframe src="' + login_url + '" width="' + overlayDivWidth + 'px" height="' + overlayDivHeight + 'px" style="height: ' + overlayDivHeight + 'px; width: ' + overlayDivWidth + 'px;" allowtransparency="true" scrolling="no" frameborder="0"><p>Your browser does not support iframes.</p></iframe>';
	document.getElementById('creately-popup-working').style.display = 'none';
	/**document.getElementById('creately-popup-content').style.backgroundColor = '#FFFFFF'; */
	document.getElementById('creately-popup-content').style.display = 'inline';
	
	document.getElementById('creately-overlay').onclick = '';
	document.getElementById('creately-overlay').style.display = 'block';
	//document.getElementById('creately-popup').style.display = 'block';

	if(!overlay_opened){
		$('#creately-popup').show().css({ left:0 }).animate({ left:topleftcorner[1] + 'px' });
		overlay_opened = true;
	}
	else{
		$('#creately-popup').show().css({ left:topleftcorner[1] + 'px', opacity:0 }).animate({ opacity:1 }, 300);
	}
}

/**
 * Get the browser window height
 * @returns {Number}
 */
function getWindowHeight() {

	var myHeight = 0;

	if( typeof( window.innerWidth ) == 'number' ) {
		//Non-IE
		myHeight = window.innerHeight;
	} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
		//IE 6+ in 'standards compliant mode'
		myHeight = document.documentElement.clientHeight;
	} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
		//IE 4 compatible
		myHeight = document.body.clientHeight;
	}

	return myHeight;
}

/**
 * Get the borser window width
 */
function getWindowWidth() {

	var myWidth = 0;

	if( typeof( window.innerWidth ) == 'number' ) {
		// Non-IE
		myWidth = window.innerWidth;
	} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
		// IE 6+ in 'standards compliant mode'
		myWidth = document.documentElement.clientWidth;
	} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
		// IE 4 compatible
		myWidth = document.body.clientWidth;
	}

	return myWidth;
}

function refresh(){
	//cancelOverlay();	
	window.location.reload();
}

/**
 * Reposition popup window
 */
var reposition;
function repositionPopup(popUp){

	var overlayDivWidth	= $('#'+ popUp).width();
	var overlayDivHeight = $('#'+ popUp).height();
	topleftcorner = viewport_size(overlayDivWidth, overlayDivHeight, 'CENTER');

	if(popUp == 'middle-container-creately-popup'){

		var topContainerCreatelyPopupHeight = $('#top-container-creately-popup').height();

		if ( topleftcorner[0] < topContainerCreatelyPopupHeight+5 ) {
			topleftcorner[0] = topContainerCreatelyPopupHeight+5;
		}

		$('#'+ popUp).animate({top:topleftcorner[0] + 'px', left:topleftcorner[1] + 'px'}, 300);

	} else{

		$('#'+ popUp).animate({top: 0, left:topleftcorner[1] + 'px'}, 300);
	}
}

window.onresize = function() {

	if(overlay_opened){

	    clearTimeout(reposition);

	    reposition = setTimeout(function() {
	        repositionPopup('middle-container-creately-popup');
	        repositionPopup('top-container-creately-popup');
	    }, 100);
	}
};

/**
 * Track chrome alert events
 */
function trackChromeAlert( category, action, label ) {
	// Check ga availability
	if(window.ga){
		ga('send', 'event', category, action, label);
	}
}