function setupScrolling( objectID )
{
    	
	var containerObj = document.getElementById(objectID);
	
	if ( containerObj ) {
        var eventListenerObject = containerObj;
        var isWebkit = false;

        if (navigator && navigator.vendor)
        {
            isWebkit = navigator.vendor.match("Apple") || navigator.vendor.match("Google");
        }
        
        // some events will need to point to the containing object tag
        if (isWebkit && containerObj.parentNode.tagName.toLowerCase() == "object")
        {
            eventListenerObject = containerObj.parentNode;
        }
        
        var scrollHandler = function(event) {
            var xDelta = 0;
            var yDelta = 0;
            
            // IE special case
            if (!event)
                event = window.event;
            
            // IE/Webkit/Opera
            if (event.wheelDelta)
            {
                // horizontal scrolling is supported in Webkit
                if (event.wheelDeltaX)
                {
                    // Webkit can scroll two directions simultaneously
                    xDelta = event.wheelDeltaX;
                    yDelta = event.wheelDeltaY;
                }
                else
                {
                    // fallback to standard scrolling interface
                    yDelta = event.wheelDelta;
                }
    
                // you'll have to play with these,
                // browsers on Windows and OS X handle them differently
                xDelta /= 120;
                yDelta /= 120;
    
                // Opera special case
                if (window.opera)
                {
                    yDelta = -yDelta;
                    // Opera doesn't support hscroll; vscroll is also buggy
                }
            }
            // Firefox (Mozilla)
            else if (event.detail)
            {
                yDelta = -event.detail/1.5;
                // hscroll supported in FF3.1+
                if (event.axis)
                {
                    if (event.axis == event.HORIZONTAL_AXIS)
                    {
                        // FF can only scroll one dirction at a time
                        xDelta = yDelta;
                        yDelta = 0;
                    }
                }
            }
    
            try
            {
                scrollEvent(xDelta, yDelta);
            }
            catch(e) {};

            if (event.preventDefault)
                event.preventDefault();
            event.returnValue = false;            
        };
        
        if (window.addEventListener && eventListenerObject)
        {
            // not IE
            eventListenerObject.addEventListener('mouseover', function(e)
            {
                if (isWebkit)
                {
                    window.onmousewheel = scrollHandler;
                }
                else
                {
                    window.addEventListener("DOMMouseScroll", scrollHandler, false);
                }
            }, false);
        }
        else
        {
            // IE
            containerObj.onmouseover = function(e)
            {
                document.onmousewheel = scrollHandler;
            };
        }
    } else {
    	alert('No scroll');
    }
}