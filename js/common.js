// Enumeradores
var COMMERCE_TYPE = {
        Local: "1",
        Feria: "2",
        MercadoEconomiaSocial: "3",
        Productores: "4",
        Delivery: "5"
};

// Initialize your app
var myApp = new Framework7({
    modalTitle: 'EcoAlimentate',
    fastClicks: true,
    swipePanel: false,
    swipeBackPage: false,
    swipePanel: 'left',
    reloadPages: false,
    init: false
});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true,
    domCache: true
});

var xhReq = new XMLHttpRequest();

var itemList = [];
var localList = [];
var feriaList = [];
var mercadoList = [];
var productorList = [];
var watchId = null;
var lastGPSPosition = null;

jQuery(document).ready(function ()
{
	// Sangre
	xhReq.open("GET", "pages/page-local.html", false);
	xhReq.send(null);
	document.getElementById("page-local").innerHTML=xhReq.responseText;
	
	
	// Feria
	xhReq.open("GET", "pages/page-feria.html", false);
	xhReq.send(null);
	document.getElementById("page-feria").innerHTML=xhReq.responseText;
	
	// Mercado
	xhReq.open("GET", "pages/page-mercado.html", false);
	xhReq.send(null);
	document.getElementById("page-mercado").innerHTML=xhReq.responseText;
	
	// Productores
	xhReq.open("GET", "pages/page-productores.html", false);
	xhReq.send(null);
	document.getElementById("page-productores").innerHTML=xhReq.responseText;
		
	// Mapa General
	xhReq.open("GET", "pages/page-map.html", false);
	xhReq.send(null);
	document.getElementById("page-map").innerHTML=xhReq.responseText;
	
	// Mapa Detalle
	xhReq.open("GET", "pages/page-map-detail.html", false);
	xhReq.send(null);
	document.getElementById("page-map-detail").innerHTML=xhReq.responseText;
	
	// Acerca de ...
	xhReq.open("GET", "pages/page-about.html", false);
	xhReq.send(null);
	document.getElementById("page-about").innerHTML=xhReq.responseText;
	
	// Detalle de un Item
	xhReq.open("GET", "pages/page-item-details.html", false);
	xhReq.send(null);
	document.getElementById("page-item-details").innerHTML=xhReq.responseText;	
		
	populateListByCategory();
});

function populateListByCategory()
{	
	myApp.showPreloader('Conectando ...');
	$.ajax({
			// URL del Web Service
			url: 'http://hackshackersros.com/proy/ecoalimentate/admin/index.php/mercado/mercados_json',
			type: 'GET',
			dataType: 'jsonp',
			jsonp: 'callback',
			timeout: 12000,
			success: function(response)
			{				
			    itemList = response.items;
				localList = $.grep(response.items, function (item, i) { return item.categoria_id == 1; });
				feriaList = $.grep(response.items, function (item, i) { return item.categoria_id == 2; });
				mercadoList = $.grep(response.items, function (item, i) { return item.categoria_id == 3; });
				productorList = $.grep(response.items, function (item, i) { return item.categoria_id == 4; });
				
				builderItemsList(1);
				builderItemsList(2);
				builderItemsList(3);
				builderItemsList(4);
				
				myApp.hidePreloader();
			},
			error: function (data, status, error){
			    showInternetConnectionError();
		        myApp.hidePreloader();
		   }
	});
}

var pageFrom = null;


myApp.init();



function openBrowser(url){
	window.open(url, '_system');
}

function openPhoneCaller(phoneNumber)
{
	
	window.open('tel:' + phoneNumber, '_system');
}

function openMailer(subject, mail)
{
	var shareByMail = 'mailto:'+ mail + '?subject='+ subject;
	window.open(shareByMail, '_system'); 
}

function playVideo(urlVideo){
	window.open(urlVideo, '_system', 'location=yes');
}

function openFacebook(urlFacebook)
{
    window.open(urlFacebook, '_system');
}

function refreshPosition()
{ 	
	refreshPositionByCategory(1);
	refreshPositionByCategory(2);
	refreshPositionByCategory(3);
	refreshPositionByCategory(4);
}

function refreshPositionByCategory(categoryId){ 	
	
	var list = getList(categoryId);
	
	try{
		$.each(list, function (index, value){
				var starting = new Geolocation();
				starting.position.latitude=value.latitud;
				starting.position.longitude=value.longitud;
				value.distance = calculateDistance(lastGPSPosition.coords, starting.position);
			});
		list.sort(sortByDistance);
		builderItemsList(categoryId);
	}
	catch(error){
	}
}

function sortByDistance(a, b){
	return(a.distance - b.distance);
}

//Aplica separador de miles mediante "." y separador de decimales mediante ","
function thousandsSeparatorFormat(numberToFormat)
{
	var result = '';
	var sign = '';
	var number = numberToFormat.toString().split('.')[0];
	
	if(number.indexOf('-') != -1)
	{
		var sign = '-';
		number = number.replace('-', '');
	}
		
	while( number.length > 3 )
	{
		 result = '.' + number.substr(number.length - 3) + result;
		 number = number.substring(0, number.length - 3);
	}
	
	result = sign + number + result;
	return result;
}

function showMessage(message)
{
	myApp.alert(message);	
}

function vibrate()
{
	navigator.notification.vibrate(70);  	
}
