detectBrowser();
var map;
var markers;
var infoWindows;

function init() {
	var myLatlng = new google.maps.LatLng(-27.467, 153.033);
	var mapOptions = {
	  zoom: 8,
	  center: myLatlng,
	  mapTypeId: google.maps.MapTypeId.HYBRID
	};

	map = new google.maps.Map(document.getElementById("map"), mapOptions);

	var geoJson = geoJsonData();

	var markerCoords = geoJson.features.map(
		function(feature) {
			var flattened = feature.geometry
								   .coordinates
								   .reduce(
								   		function(acc, item) { 
											return acc.concat(item);
									});
			var center =  getCenter(flattened);
			console.log(center);
			return center;
		});

	markers = markerCoords.map(
		function(item) {
			return addMarker(item, map);
		});

	infoWindows = markers.map(function(marker){
		var infoWindow = new google.maps.InfoWindow({
    		content: '<p>Data For Location:' + marker.getPosition() + '</p>' +
    				 '<p>Please Call Us On +61 7 3366 3525 to Purchase</p>'

  		});

  		google.maps.event.addListener(marker, 'click', function() {
 			infoWindow.open(map, marker);
  		});

  		return infoWindow;
	});
	 

	map.data.addGeoJson(geoJson);
}

function detectBrowser() {
  var useragent = navigator.userAgent;
  var mapdiv = document.getElementById("map");

  if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
    mapdiv.style.width = '100%';
    mapdiv.style.height = '100%';
  } else {
    mapdiv.style.width = '600px';
    mapdiv.style.height = '800px';
  }
}

function geoJsonData() {
 return	{
 	"type":"FeatureCollection",
 	"features":[
 		{
 			"type":"Feature",
 			"properties":{},
 			"geometry":{
 				"type":"Polygon",
 				"coordinates":[
 					[
 						[152.99577713012695,-27.456340536133588],[152.99663543701172,-27.456264373179106],
 						[152.99663543701172,-27.456949837875676],[152.99577713012695,-27.456949837875676],
 						[152.99577713012695,-27.456340536133588]
 					]
 				]
 			}
 		},
 		{
 			"type":"Feature",
 			"properties":{},
 			"geometry":{
 				"type":"Polygon",
 				"coordinates":[
 					[
 						[153.00487518310547,-27.455807394347467],[153.00573348999023,-27.455731231024743],
 						[153.00573348999023,-27.456264373179106],[153.00504684448242,-27.45664518742547],
 						[153.00453186035156,-27.45664518742547],[153.0043601989746,-27.456112047112313],
 						[153.00487518310547,-27.455807394347467]
 					]
 				]
 			}
 		},
 		{
 			"type":"Feature",
 			"properties":{},
 			"geometry":{
 				"type":"Polygon",
 				"coordinates":[
 					[
 						[152.99551963806152,-27.46380425046764],[152.99500465393066,-27.463575776913796],
 						[152.99526214599607,-27.462966511788544],[152.9959487915039,-27.463194986605128],
 						[152.99620628356934,-27.46380425046764],[152.99551963806152,-27.46380425046764]
 					]
 				]
 			}
 		}
 		]
 	};
}

function getCenter(polygonCoords) {
	var xs = polygonCoords.map(function(item) { return item[1];});
	var ys = polygonCoords.map(function(item) { return item[0];});
	
	var maxX = Math.max.apply(null, xs); 
	var minX = Math.min.apply(null, xs);
	var maxY = Math.max.apply(null, ys);
	var minY = Math.min.apply(null, ys);

	return {
		lat: minX + ((maxX - minX) / 2), 
		lng: minY + ((maxY - minY) / 2)
	};
}

function addMarker(coords, map) {
  	var marker = new google.maps.Marker({
    	position: coords,
    	map: map
  	});

  	return marker;
}

google.maps.event.addDomListener(window, 'load', init);