var Google = { };
var googleMapsAPIWasLoaded = false;

Google.GoogleMap = function (container)
{
    var _addMarkersToMapDelegate;
    
    this.initialize = function(addMarkersToMapMethod) {
        // "addMarkersToMapMethod" is a custom method
        _addMarkersToMapDelegate = addMarkersToMapMethod;
        callLoadGoogleMap();
    };
   
    
    function callLoadGoogleMap()
    {
    	if(!googleMapsAPIWasLoaded){
    		googleMapsAPIWasLoaded = true;
	    	 var script = document.createElement("script");
	        script.type = "text/javascript";
	        //script.rel = "external";
	        // The reference to the API Google Maps has a callback to inform me that library was loaded
	        	        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyA5q2i-J5KqaHpUmBKNfdVR85g4jSvErXw&callback=drawGoogleMap";
	        window.drawGoogleMap = function()
	        {
				var newscriptInfoBox = document.createElement('script');
				newscriptInfoBox.type = 'text/javascript';
				newscriptInfoBox.async = true;
				newscriptInfoBox.src = 'js/map/infobox.js';
				(document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(newscriptInfoBox);
				         
				var _map = map();
				_addMarkersToMapDelegate(_map);
	        };
	        document.body.appendChild(script);
    	}
    	else{
    		var _map = map();
            _addMarkersToMapDelegate(_map);
    	}
       
    }
          
    var map = function() {
        var mapOptions = {
            //zoom : 14,
            //center : new google.maps.LatLng(-32.9476062, -60.656261),
            mapTypeId : google.maps.MapTypeId.ROADMAP,
            zoomControl: true,
    		zoomControlOptions: {
       	 		position: google.maps.ControlPosition.LEFT_CENTER
    		},
    		streetViewControl: false,
    		mapTypeControl: false
        };
        
        var map = new google.maps.Map($("#" + container + " #map_canvas")[0], mapOptions);
        
        // Map Styles
        var styles = [{"featureType":"all","elementType":"all","stylers":[{"hue":"#ff6800"},{"saturation":"20"},{"lightness":"-8"},{"gamma":"1.00"},{"weight":"1.12"}]}];
        
        map.setOptions({styles: styles});
        
        // Setting Responsive View
        google.maps.event.addDomListener(window, "resize", function() {
	        var center = map.getCenter();
	        google.maps.event.trigger(map, "resize");
	        map.setCenter(center); 
        });
        
        // This part runs when the mapobject is created and rendered
        google.maps.event.addListenerOnce(map, 'tilesloaded', function()
        {
        	//document.getElementById('preloaderMap').style.visibility='hidden';
        	myApp.hidePreloader();
        });
        
        return map;
    };
};

//Bind infoWindow to a Marker
function bindInfoWindowToMarker(map, marker, contentString, infowindow)
{
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(contentString);
            infowindow.open(map, marker);
            //touchControl();
        });
}

