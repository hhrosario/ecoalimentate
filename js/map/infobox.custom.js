var _infoBox;
var currentMap;

//Bind infoWindow to a Marker
function bindInfoBoxToMarker(map, marker, contentString)
{
	google.maps.event.addListener(marker, 'click', function() 
	{		
		currentMap = map;
		openInfoBox(map, marker, contentString);
    });
}

// Abre la ventana de info cuando se hace click sobre una burbuja
function openInfoBox(map, marker, contentString) {
	map.panTo(marker.position);

	var myOptions = {
			content 				:contentString,
			alignBottom 			:true,
			disableAutoPan 			:false,
			maxWidth 				:0,
			pixelOffset 			:new google.maps.Size(-76, -52), // Desfase del cartel con respecto a la burbuja
			zIndex 					:null,
			closeBoxURL 			:"",
			infoBoxClearance 		:new google.maps.Size(0, 60), // margen superior del cartel con el borde superior del mapa
			isHidden 				:false,
			pane 					:"floatPane",
			enableEventPropagation 	:false
       	};

       	// Si ya hay un infoBox abierto lo cierro
       	if(_infoBox){
       		_infoBox.close();
       	}

       	_infoBox = new InfoBox(myOptions);
       	// Escucho el evento para poder cerrar la ventana de info
       	google.maps.event.addListener(_infoBox, 'domready', function() {
		jQuery('.IFclose', '.infoBox').unbind('click', closeInfoBox);
		jQuery('.IFclose', '.infoBox').bind('click', closeInfoBox);
	});
       	_infoBox.open(map, marker);
}

// Cierra la ventana de info
function closeInfoBox(e)
{
	e.preventDefault();
	_infoBox.close();
}


