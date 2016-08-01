function builderItemsList(categoryId){
	
	var container = getContainer(categoryId);
	var pathIconList = getPathIconList(categoryId);
	var list = getList(categoryId);
	
	if(list.length == 0)
	{
		showEmptyMessage(categoryId);
		return;
	}
	
	container.html('');
	var strBuilderItemsContentList = [];
	strBuilderItemsContentList.push('<ul>');
	
	
	$.each( list, function( i, item ){
		strBuilderItemsContentList.push('<li>');
		strBuilderItemsContentList.push('<a href="#" onclick="builderCenterDetail('+ item.id + 
										')" class="item-link  item-content">');
		strBuilderItemsContentList.push('<div class="item-media">');
		strBuilderItemsContentList.push('<img src="' + pathIconList + '" class="imgItemList">');
		strBuilderItemsContentList.push('</div>');
		strBuilderItemsContentList.push('<div class="item-inner">');		
		strBuilderItemsContentList.push('<div class="item-title-row">');
		strBuilderItemsContentList.push('<div class="item-title div-title-item-list">'+ item.mercado +'</div>');
		strBuilderItemsContentList.push('</div>');
		strBuilderItemsContentList.push('<div class="item-subtitle addressCenterSubtitle">'+ item.domicilio +'</div>');					
		strBuilderItemsContentList.push('</div>');
		strBuilderItemsContentList.push('</div>');
		strBuilderItemsContentList.push('</li>');
		
	});
	
	strBuilderItemsContentList.push('</ul>');
	container.append(strBuilderItemsContentList.join(""));
}

function getContainer(categoryId)
{
	switch(categoryId) 
	{
	    case 1:
	        return $('#list-local');
	        break;
	    case 2:
	    	return $('#list-feria');
	        break;
	    case 3:
	    	return $('#list-mercado');
	        break;
	    case 4:
	    	return $('#list-productores');
	        break;
	}
}

function getPathIconList(categoryId)
{
	switch(categoryId) 
	{
	    case 1:
	        return 'img/list/icon-list-local.png';
	        break;
	    case 2:
	    	return 'img/list/icon-list-feria.png';
	        break;
	    case 3:
	    	return 'img/list/icon-list-mercado.png';
	        break;
	    case 4:
	    	return 'img/list/icon-list-productor.png';
	        break;
	}
}

function getPathIconDetail(categoryId)
{
	switch(categoryId) 
	{
	    case 1:
	        return 'img/detail/icon-detail-local.png';
	        break;
	    case 2:
	    	return 'img/detail/icon-detail-feria.png';
	        break;
	    case 3:
	    	return 'img/detail/icon-detail-mercado.png';
	        break;
	    case 4:
	    	return 'img/detail/icon-detail-productor.png';
	        break;
	}
}

function getPathIconMarkerMap(categoryId)
{
	switch(categoryId) 
	{
	    case 1:
	        return 'marker-local.png';
	        break;
	    case 2:
	    	return 'marker-feria.png';
	        break;
	    case 3:
	    	return 'marker-mercado.png';
	        break;
	    case 4:
	    	return 'marker-productor.png';
	        break;
	    default:
	        return 'marker-default.png';
	    	break;
	    	
	}
}

function getList(categoryId)
{
	switch(categoryId) 
	{
	    case 1:
	        return localList;
	        break;
	    case 2:
	    	return feriaList;
	        break;
	    case 3:
	    	return mercadoList;
	        break;
	    case 4:
	    	return productorList;
	        break;
	}
}

function getCategoryName(categoryId)
{
	switch(categoryId) 
	{
	    case 1:
	        return 'Local';
	        break;
	    case 2:
	    	return 'Feria';
	        break;
	    case 3:
	    	return 'Mercado';
	        break;
	    case 4:
	    	return 'Productor';
	        break;
	}
}

function showEmptyMessage(categoryId)
{
	var container = getContainer(categoryId);
	container.html('');
	
	var strBuilderEmptySearch = [];
	strBuilderEmptySearch.push('<div class="content-block-inner divEmptySearchResult">');
	strBuilderEmptySearch.push('<img class="imgIconNotFound" src="img/iconNotFound.png">');
	strBuilderEmptySearch.push('No se ha encontrado ' + getCategoryName(categoryId));
	strBuilderEmptySearch.push('</div>');
	
	container.append(strBuilderEmptySearch.join(""));
}


function showInternetConnectionError()
{		
	showInternetConnectionErrorbyCategory(1);
	showInternetConnectionErrorbyCategory(2);
	showInternetConnectionErrorbyCategory(3);
	showInternetConnectionErrorbyCategory(4);
	showInternetConnectionErrorbyCategory(5);

}

function showInternetConnectionErrorbyCategory(categoryId)
{		
	var container = getContainer(categoryId);
	container.html('');
	
	var strBuilderEmptySearch = [];
	strBuilderEmptySearch.push('<div class="content-block content-block-information">');
	strBuilderEmptySearch.push('<div id="divConnectionErrorHeader">Error de conexión</div>');
	strBuilderEmptySearch.push('<div id="divConnectionErrorText">Por favor revise su conexión a internet y presione el ícono de Refrescar</div>');
	strBuilderEmptySearch.push('<div onclick="populateListByCategory()" class="link" id="div-connection-upload-container">');
	strBuilderEmptySearch.push('<img id="imgConnectionUpload" class="blinkControl" src="img/icon-upload.png" />');
	strBuilderEmptySearch.push('</div>');
	strBuilderEmptySearch.push('</div>');
	
	container.append(strBuilderEmptySearch.join(""));
}
