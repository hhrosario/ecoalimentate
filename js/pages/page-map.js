var loadMapWasLoaded = false;

myApp.onPageBeforeAnimation('page-map', function (page) 
{
	$('.navbar').css("background", "#F8931F");
	myApp.params.swipePanel = false;
})

function displayMapPage()
{
	mainView.router.load({pageName: 'page-map'});
	loadMap();
}

function loadMap() {

	if (!loadMapWasLoaded)
	{
		myApp.showPreloader('Inicializando Mapa ...');
		var map = new Google.GoogleMap ('page-map');
		map.initialize(addMarkersToMap);
	}
}

// Create InfoWindow for each marker
var infowindow;

// Global variable
var mapInitialized;
var contentMarkersArray = [];

//Generate Markers
function addMarkersToMap(map){

	mapInitialized = map;
    
    // Create Viewport
    var mapBounds = new google.maps.LatLngBounds();
    
    // Set InfoWindow for each marker
    infowindow  = new google.maps.InfoWindow();
    
    // Build and paint all center markers
    buildMarkers(mapBounds);
	
	//Build and paint User Marker
	paintPositionGPSUser();
	
    // Fit map to Viewport
    mapInitialized.fitBounds(mapBounds);
    
    // Workarround para setear el zoom
    google.maps.event.addListenerOnce(mapInitialized, 'tilesloaded', function()
    {
    	 myApp.hidePreloader();
    	 loadMapWasLoaded = true;
    });
}


function buildMarkers(mapBounds){
	
	$.each(itemList, function(index, value) {
	
		var iconStyle = {
					url: 'img/marker/' + getPathIconMarkerMap(parseInt(value.categoria_id)), // url
				    scaledSize: new google.maps.Size(37, 50), // scaled size
				    origin: new google.maps.Point(0,0), // origin
				    anchor: new google.maps.Point(0, 0) // anchor
				};
		
		var latitudeAndLongitude = new google.maps.LatLng(value.latitud, value.longitud);
		var marker = new google.maps.Marker({
			position: latitudeAndLongitude,
			map: mapInitialized,
			icon: iconStyle,
			isUserMarker: false,
			id: value.id
		});
			  	
		contentMarkersArray.push(marker);
		
		// Add position to ViewPort
		mapBounds.extend(latitudeAndLongitude);
			        
		// Generate content for InfoBox
		var strBuilderAllCenter = [];
		buildInfoBox(strBuilderAllCenter, value);
		      
		// Set infoWindow for each Marker
		bindInfoBoxToMarker(mapInitialized, marker, strBuilderAllCenter.join(""));
 });
}

var userMarkerGlobal;

function paintPositionGPSUser(){
	if(lastGPSPosition != null){
		
	  var iconStyle = {
			    url: 'img/marker/marker-user.png', // url
			    scaledSize: new google.maps.Size(38, 50), // scaled size
			    origin: new google.maps.Point(0,0), // origin
			    anchor: new google.maps.Point(0, 0) // anchor
			};
	  
		//var actualLatitudeAndLongitude = new google.maps.LatLng(-32.948668, -60.640249);
		var actualLatitudeAndLongitude = new google.maps.LatLng(lastGPSPosition.coords.latitude, lastGPSPosition.coords.longitude);
		userMarkerGlobal = new google.maps.Marker({
			position: actualLatitudeAndLongitude,
			map: mapInitialized,
			icon: iconStyle,
			zIndex: 1000,
			isUserMarker: true
		});
				
		// Generate content for InfoBox
		var strBuilderContent = [];
		strBuilderContent.push('<div class="IFcontainer">');
		strBuilderContent.push('<a href="#" class="IFclose"></a>');
		strBuilderContent.push('<div id="IFtitleBox" class="divUserCurrentPosition">Ud. Está Aquí</div>');
		strBuilderContent.push('<div class="IFcorner"></div>');
		strBuilderContent.push('</div>');
		
		bindInfoBoxToMarker(mapInitialized, userMarkerGlobal, strBuilderContent.join(""));
	}
	else{
		/*alert('No se ha podido obtener su ubicación. Por favor active el GPS');*/
	}
	
}

function buildInfoBox(strBuilderContent ,value)
{	
	strBuilderContent.push('<div class="IFcontainer">');
	strBuilderContent.push('<a href="#" class="IFclose"></a>');
	strBuilderContent.push('<div class="div_img_fixed_wrapper_imageWidth_150">');
	strBuilderContent.push('<img class="IFheader" src="' + getPathIconList(parseInt(value.categoria_id)) + '" />');
	strBuilderContent.push('</div>');
	strBuilderContent.push('<div id="IFtitleBox">' + value.mercado + '</div>');
	strBuilderContent.push('<div id="divInfoBoxAddressDetail">'+ value.domicilio + '</div>' );
	strBuilderContent.push('<div class="IFcorner"></div>');
	strBuilderContent.push('<div class="divBtnDetail"><button class="btnDetail btnDetailOrange" onclick="builderCenterDetail(' 
							+ value.id + ')">' + 'Detalle' + '</button></div>');
	strBuilderContent.push('</div>');
}

function paintAllMarkers(){
	hideMarkersContent();
	showMarkersContent();
}


function showMarkersContent(){
	for(var i=0;i<contentMarkersArray.length;i++){
		contentMarkersArray[i].setVisible(true);
	} 
}

function hideMarkersContent(){
	
	for(var i=0;i<contentMarkersArray.length;i++){
		contentMarkersArray[i].setVisible(false);
	}
}
