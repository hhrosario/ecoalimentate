var loadMapDetailWasLoaded = false;

myApp.onPageBeforeAnimation('page-map-detail', function (page)
{
	loadMapDetail();
	if(_infoBox)
   	{
   		_infoBox.close();
   	}
	myApp.params.swipePanel = false;
});

function loadMapDetail()
{	
	if (!loadMapDetailWasLoaded)
	{
		myApp.showPreloader('Inicializando Mapa ...');
		var map = new Google.GoogleMap ('page-map-detail');
		map.initialize(addMarkersToMapDetail);
	}
}

// Global variable
var mapDetailInitialized;
var contentDetailMarkersArray = [];

//Generate Markers
function addMarkersToMapDetail(map){

	mapDetailInitialized = map;
       
    // Build and paint all center markers
    buildItemDetailMarkers();
	
	//Build and paint User Marker
	paintPositionDetailGPSUser();
	
	//Paint Center Marker
    paintMarkerCenter();
    loadMapDetailWasLoaded = true;
}


function buildItemDetailMarkers(){
	
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
			map: mapDetailInitialized,
			icon: iconStyle,
			isUserMarker: false,
			id: value.id
		});
			
		contentDetailMarkersArray.push(marker);
		marker.setVisible(false);
					        
		// Generate content for InfoBox
		var strBuilderAllDetailCenter = [];
		buildInfoBoxDetail(strBuilderAllDetailCenter, value);
		      
		// Set infoWindow for each Marker
		bindInfoBoxToMarker(mapDetailInitialized, marker, strBuilderAllDetailCenter.join(""));
 });
}

var userMarkerDetail;

function paintPositionDetailGPSUser(){
	if(lastGPSPosition != null){
		
	  var iconStyle = {
			    url: 'img/marker/marker-user.png', // url
			    scaledSize: new google.maps.Size(38, 50), // scaled size
			    origin: new google.maps.Point(0,0), // origin
			    anchor: new google.maps.Point(0, 0) // anchor
			};
		
		//var actualLatitudeAndLongitude = new google.maps.LatLng(-32.948668, -60.640249);
		var actualLatitudeAndLongitude = new google.maps.LatLng(lastGPSPosition.coords.latitude, lastGPSPosition.coords.longitude);
		userMarkerDetail = new google.maps.Marker({
			position: actualLatitudeAndLongitude,
			map: mapDetailInitialized,
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
		
		bindInfoBoxToMarker(mapDetailInitialized, userMarkerDetail, strBuilderContent.join(""));
	}
	else{
		/*alert('No se ha podido obtener su ubicación. Por favor active el GPS');*/
	}
	
}

function buildInfoBoxDetail(strBuilderContent ,value)
{	
	strBuilderContent.push('<div class="IFcontainer">');
	strBuilderContent.push('<a href="#" class="IFclose"></a>');
	strBuilderContent.push('<div class="div_img_fixed_wrapper_imageWidth_150">');
	strBuilderContent.push('<img class="IFheader" src="' + getPathIconList(parseInt(value.categoria_id)) + '" />');
	strBuilderContent.push('</div>');
	strBuilderContent.push('<div id="IFtitleBox">' + value.mercado + '</div>');
	strBuilderContent.push('<div class="IFcorner"></div>');
	strBuilderContent.push('<div id="divInfoBoxAddressDetail">'+ value.domicilio + '</div>' );
	strBuilderContent.push('</div>');
}


function showCenterDetail(idItem){
	var lastPage = myApp.getCurrentView().activePage.fromPage.name;
	if (lastPage == 'page-item-details'){
		myApp.mainView.router.back();
	}
	else{
		builderCenterDetail(idItem);
	}
}

// ID del Centro de Donación actual
var idCenterShow = null;

//ID del Centro de Donación anterior
var idCenterShowBefore = null;

//Paint only one Marker center by id
function paintMarkerCenter(){
    
    //Hide all markers
    hideMarkersDetailContent();
	
	for(var i=0;i<contentDetailMarkersArray.length;i++)
	{
		if(	contentDetailMarkersArray[i].id == idCenterShow)
		{
			if(idCenterShowBefore != idCenterShow)
			{
				idCenterShowBefore = contentDetailMarkersArray[i].id;
				contentDetailMarkersArray[i].setVisible(true);
				mapDetailInitialized.setCenter(contentDetailMarkersArray[i].position);
				mapDetailInitialized.setZoom(16);
			}
			else
			{
				contentDetailMarkersArray[i].setVisible(true);
				myApp.hidePreloader();
			}
		}
	}
}

function hideMarkersDetailContent(){
	
	for(var i=0;i<contentDetailMarkersArray.length;i++){
		contentDetailMarkersArray[i].setVisible(false);
	}
}
