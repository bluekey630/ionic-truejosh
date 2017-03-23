function createlyPlayerStart ( params ) {
	
	// Get server with port
	var serverWithPort = window.location.host;
	// Get the protocol
	var serverProtocol = window.location.protocol;
	
	if ( params.host ) {
		serverWithPort = params.host;
	} else {
		//serverWithPort = "all.creately.com"; // For AIO
		serverWithPort = "creately.com"; // For Production
		//serverWithPort = "localhost"; // For localhost
	}
	
	if (serverProtocol == 'file:') {
		serverProtocol = "http:";
	}
	
	// Build the base URL using server and protocl used
	var serverURL = serverProtocol + "//" + serverWithPort + "/player/player.html?" ;
	
	
	if ( Number(params.width) == NaN || Number(params.width) < 320 ) {
		params.width = 320;
	}
	
	if ( Number(params.height) == NaN || Number(params.height) < 200 ) {
		params.height = 200;
	}

//	var playerURL = TESTBaseURL + 'docid='+ params.docid +'&bgcolor='+ escape(params.bgcolor) + '&title=' + escape(params.title) + '&logo=' + params.logo;
	var playerURL = serverURL + 'docid='+ params.docid +'&bgcolor='+ escape(params.bgcolor) + '&title=' + escape(params.title) + '&logo=' + params.logo;
	
	var iframeHtml = '<iframe scrolling="no" frameborder="0" width="'+ params.width 
		+'" height="' + params.height 
		+'" src="'+ playerURL +'">';
	
	var obj = document.getElementById(params.container);
	obj.innerHTML = '<a href="' + serverProtocol + '//' + serverWithPort + '/diagram/'+ params.docid +'" title="'+ params.title +'">' + iframeHtml + '</a>'; 

}
