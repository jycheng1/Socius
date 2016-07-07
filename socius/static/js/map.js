// Google Map API 

// when page is fully loaded
// $(function() {

	// initialize the map centered at Pittsburgh
	function initialize() {
		var mapProp = {
			center: new google.maps.LatLng(40.4406,-79.9959),
			zoom: 13,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(document.getElementById("map-display"),mapProp);


		var northsideMarker = new google.maps.Marker({
			position: new google.maps.LatLng(40.4580513, -80.01634849999999),
			title: "Northside Food Pantry"
		});

		northsideMarker.setMap(map);

		google.maps.event.addListener(northsideMarker, 'click', function() {
			map.setZoom(15);
			map.setCenter(northsideMarker.getPosition());
		});


		var infowindow = new google.maps.InfoWindow({
		  content:"Northside Food Pantry"
	  	});

		infowindow.open(map,northsideMarker);
	}

	google.maps.event.addDomListener(window, 'load', initialize);

// });


function showInfo() {



};