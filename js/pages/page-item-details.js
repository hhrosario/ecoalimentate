myApp.onPageBeforeAnimation('page-item-details', function (page)
{
    myApp.params.swipePanel = false;
    $$('#page-item-details .page-content').scrollTop(0);
});

function builderCenterDetail(idItem)
{
	var centerDetailItem;
	centerDetailItem = $.grep(itemList, function(item, i) {
		return item.id.toLowerCase() == idItem;
	});

	$('#titleCenterDetails').text(getCategoryName(parseInt(centerDetailItem[0].categoria_id)));
	$('#img-item-detail').attr("src", getPathIconDetail(parseInt(centerDetailItem[0].categoria_id)))
	$('#nameCenter').text(centerDetailItem[0].mercado);
		
	setFieldsItemDetail(centerDetailItem[0]);
	
	mainView.router.load({pageName: 'page-item-details'});
}

function setFieldsItemDetail(item)
{
	// Domicilio
	if(	item.domicilio != '')
	{
		$('#addressCenterDetailsLink').attr('onclick', 'showMapMarker(' + item.id + ')');
		$('#addressCenterDetails').parents('li').show();
		$('#addressCenterDetails').text(item.domicilio);
	}
	else
	{
		$('#addressCenterDetails').parents('li').hide();
	}	
	
	// Localidad + Provincia
	if(	item.localidad != '' &&
		item.provincia != '')
	{
		$('#addressCityCenterDetails').show();
		$('#addressCityCenterDetails').text(item.localidad + ' - ' + item.provincia);
	}
	else
	{
		$('#addressCityCenterDetails').parents('li').hide();
	}
	
	//item.horarios = '20:30 hs';
	
	// Horarios
	if(	item.horarios != '')
	{
		$('#horarioCenterDetails').parents('li').show();
		$('#horarioCenterDetails').text(item.horarios);
	}
	else
	{
		$('#horarioCenterDetails').parents('li').hide();
	}
	
	//item.producto = 'sdfsdfsdf sdfsdfsdfsdf sdfsdfsdf sdfsdfsdf sdfsdfsdf sdfsdfsdf sdfsdfsdf sdfsdfsdf sdfsdfds ';

	// Producto
	if(	item.productos_json != undefined &&
		item.productos_json != '')
	{
		$('#productoCenterDetails').parents('li').show();
		$('#productoCenterDetails').text(item.productos_json);
	}
	else
	{
		$('#productoCenterDetails').parents('li').hide();
	}
	
	//item.telefono = '3415667788';
	
	// Telefono
	if(	item.telefono != '')
	{
		$('#telefonoCenterDetailsLink').attr('onclick', 'openPhoneCaller(' + item.telefono + ')');
		$('#telefonoCenterDetails').parents('li').show();
		$('#telefonoCenterDetails').text(item.telefono);
	}
	else
	{
		$('#telefonoCenterDetails').parents('li').hide();
	}
	
	//item.email = 'test@gmail.com';
	
	// Email
	if(	item.email != '')
	{
		$('#emailCenterDetailsLink').attr('onclick', 'openMailer(\'Consulta desde App\', \'' + item.email + '\')');
		$('#emailCenterDetails').parents('li').show();
		$('#emailCenterDetails').text(item.email);
	}
	else
	{
		$('#emailCenterDetails').parents('li').hide();
	}
	
	//item.url_web = 'https://www.google.com.ar';
	
	// Email
	if(	item.url_web != '')
	{
		$('#webCenterDetailsLink').attr('onclick', 'openBrowser(\'' + item.url_web + '\')');
		$('#webCenterDetails').parents('li').show();
		$('#webCenterDetails').text(item.url_web);
	}
	else
	{
		$('#webCenterDetails').parents('li').hide();
	}
	
	//item.url_facebook = 'https://www.facebook.com/almacen.ambulante';
	
	// Email
	if(	item.url_facebook != '')
	{
		$('#facebookCenterDetailsLink').attr('onclick', 'openFacebook(\'' + item.url_facebook + '\')');
		$('#facebookCenterDetails').parents('li').show();
		$('#facebookCenterDetails').text(item.url_facebook);
	}
	else
	{
		$('#facebookCenterDetails').parents('li').hide();
	}
}

function showMapMarker(idCenter){
	idCenterShow = idCenter;
	mainView.router.load({pageName: 'page-map-detail'});
	paintMarkerCenter();
}
