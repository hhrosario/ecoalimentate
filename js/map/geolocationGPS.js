
function Geolocation() {}

Geolocation.prototype = 
{
    position: {
        latitude: null,
        longitude: null,
        altitude: null,
        accuracy: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null
    }
};


function toRad(value) 
{
  var RADIANT_CONSTANT = 0.0174532925199433;
  return (value * RADIANT_CONSTANT);
}

function calculateDistance(starting, ending) 
{
	//var KM_RATIO = 6371;
	var MTS_RATIO = 6378137; // Earth�s mean radius in meter
	  try 
	  {      
	    var dLat = toRad(ending.latitude - starting.latitude);
	    var dLon = toRad(ending.longitude - starting.longitude);
	    var lat1Rad = toRad(starting.latitude);
	    var lat2Rad = toRad(ending.latitude);
	    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
	            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
	    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	    var d = MTS_RATIO * c;
	    return Math.round(d);
	  } 
	  catch(e) 
	  {
	    return -1;
	  }
}
