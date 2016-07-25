var org_data = {};
org_data['org_name'] = 'Northside Pantry';
org_data['org_address'] = '1601 Brighton Rd, Pittsburgh, PA 15212';
org_data['org_phone'] = '412-323-1170';
org_data['org_site'] = 'http://www.northsidefoodpantry.org';

var org_data2 = {};
org_data2['org_name'] = 'OSN';
org_data2['org_address'] = '903 Watson St, Pittsburgh, PA 15219';
org_data2['org_phone'] = '412-232-5739';
org_data2['org_site'] = 'https://www.pittsburghmercy.org/operation-safety-net/';

var orgList = [org_data, org_data2];

// Google Map API 
// initialize the map centered at Pittsburgh
var map;
function initialize() {
    map = new google.maps.Map(document.getElementById('map-display'), {
		center: new google.maps.LatLng(40.4406,-79.9959),
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.ROADMAP
    });
   // Northside Pantry Marker
	var northsideMarker = new google.maps.Marker({
		map: map,
		position: new google.maps.LatLng(40.4580513, -80.01634849999999),
		title: "Northside Food Pantry"
	});

	var infowindow = new google.maps.InfoWindow({
		content:"Northside Food Pantry"
  	});
	infowindow.open(map,northsideMarker);

	google.maps.event.addListener(northsideMarker, 'click', function(){
		$('#org-modal').modal();
		$('.modal-title').html('Northside Food Pantry');
		$('.modal-org-img').attr('src', '/static/images/NSFP-logo.jpg');
		$('.modal-explanation').html('The Northside Food Pantry, Pittsburgh’s largest with about 1,000 people served each month, is a progressive, nonsectarian nonprofit founded in 1982 over a Thanksgiving meal shared by three pastors of local churches.');
	});

	// OSN Marker
	var osnMarker = new google.maps.Marker({
		map: map,
		position: new google.maps.LatLng(40.43858400000001, -79.99146059999998),
		title: "OSN"
	});

	var infowindow = new google.maps.InfoWindow({
	  content:"OSN"
  	});
	infowindow.open(map,osnMarker);

	google.maps.event.addListener(osnMarker, 'click', function(){
		$('#org-modal').modal();
		$('.modal-title').html('Operation Safety Net');
		$('.modal-org-img').attr('src', '/static/images/OSN.jpg');
		$('.modal-explanation').html('Operation Safety Net, part of the Pittsburgh Mercy Health System and Trinity Health, sponsored by the Sisters of Mercy, touches the lives of hundreds of men and women living on the streets in Pittsburgh annually by providing them with access to health care, hope, and dignity.');
	});

	// put org-boxes when map is loaded
	google.maps.event.addListenerOnce(map, 'idle', function(){
		// Northside pantry
		// <div class = 'org-box'>
		var div = document.createElement('div');
		div.className = 'side-box';

		// <h4> Northside Food Pantry</h4>
		var org_title = document.createElement('h4');
		org_title.innerHTML = 'Northside Food Pantry';
		div.appendChild(org_title);

		// <img src="{% static 'images/NorthsideFoodPantry.jpg'%}" />
		var org_img = document.createElement('img');
		// org_img.setAttribute('src', 'static/images/NorthsideFoodPantry.jpg');
		// org_img.setAttribute('width', '300');
		div.appendChild(org_img);

		// org info 
		// var org_info = document.createElement('p');
		// org_info.innerHTML = '<p>Address: 1601 Brighton Rd, Pittsburgh, PA 15212</p><p>Phone: 412-323-1170</p>'; 
		// div.appendChild(org_info);

		div.style.backgroundImage="url('/static/images/NorthsideFoodPantry.jpg')";
		// div.style.backgroundColor="transparent";

		div.onmouseover=function(){
			div.style.opacity = 1;
		};

		div.onmouseout=function() {
			div.style.opacity = 0.5;
		};

		div.onclick=function(){
			$('#org-modal').modal();
			$('.modal-title').html('Northside Food Pantry');
			$('.modal-org-img').attr('src', '/static/images/NSFP-logo.jpg');
			$('.modal-explanation').html('The Northside Food Pantry, Pittsburgh’s largest with about 1,000 people served each month, is a progressive, nonsectarian nonprofit founded in 1982 over a Thanksgiving meal shared by three pastors of local churches.');
		};

		document.getElementById('side-display').appendChild(div); 


		// OSN
		// <div class = 'org-box'>
		var div2 = document.createElement('div');
		div2.className = 'side-box';

		// <h4> OSN</h4>
		var org_title = document.createElement('h4');
		org_title.innerHTML = 'Operation Safety Net';
		div2.appendChild(org_title);

		// <img src="{% static 'images/NorthsideFoodPantry.jpg'%}" />
		var org_img = document.createElement('img');
		// org_img.setAttribute('src', 'static/images/NorthsideFoodPantry.jpg');
		// org_img.setAttribute('width', '300');
		div2.appendChild(org_img);

		// org info 
		// var org_info = document.createElement('p');
		// org_info.innerHTML = '<p>Address: 903 Watson St, Pittsburgh, PA 15219</p><p>Phone: 412-232-5739</p>'; 
		// div.appendChild(org_info);

		div2.style.backgroundImage="url('/static/images/OSN.jpg')";


		// var bgDiv = document.createElement('div');
		// bgDiv.className = 'side-box bg';
		// bgDiv.style.backgroundImage="url('/static/images/OSN.jpg')";

		// div.appendChild(bgDiv); 

		div2.onmouseover=function(){
			div2.style.opacity = 1;
		};

		div2.onmouseout=function() {
			div2.style.opacity = 0.5;
		};


		div2.onclick=function(){
			$('#org-modal').modal();
			$('.modal-title').html('Operation Safety Net');
			$('.modal-org-img').attr('src', '/static/images/OSN.jpg');
			$('.modal-explanation').html('Operation Safety Net, part of the Pittsburgh Mercy Health System and Trinity Health, sponsored by the Sisters of Mercy, touches the lives of hundreds of men and women living on the streets in Pittsburgh annually by providing them with access to health care, hope, and dignity.');
		};

		document.getElementById('side-display').appendChild(div2); 



		// Banana ex
		// <div class = 'org-box'>
		var div3 = document.createElement('div');
		div3.className = 'side-box';

		// <h4> Banana </h4>
		var org_title = document.createElement('h4');
		org_title.innerHTML = 'Banana x3';

		var item_from = document.createElement('p');
		item_from.innerHTML = 'Northside Food Pantry';
		item_from.style.fontSize='12px';
		div3.appendChild(org_title);
		div3.appendChild(item_from);

		var org_img = document.createElement('img');
		// org_img.setAttribute('src', 'static/images/NorthsideFoodPantry.jpg');
		// org_img.setAttribute('width', '300');
		div3.appendChild(org_img);

		// org info 
		// var org_info = document.createElement('p');
		// org_info.innerHTML = '<p>Address: 1601 Brighton Rd, Pittsburgh, PA 15212</p><p>Phone: 412-323-1170</p>'; 
		// div.appendChild(org_info);

		div3.style.backgroundImage="url('/static/images/banana.jpg')";
		// div.style.backgroundColor="transparent";

		div3.onmouseover=function(){
			div3.style.opacity = 1;
		};

		div3.onmouseout=function() {
			div3.style.opacity = 0.5;
		};

		div3.onclick=function(){
			$('#product-modal').modal();
			$('.modal-title').html('Banana x3');
			$('.modal-product-from').html('Northside Food Pantry');
			$('.modal-org-img').attr('src', '/static/images/banana.jpg');
			// $('.modal-explanation').html();		
		};

		document.getElementById('side-display').appendChild(div3); 


		// Banana 2
		// <div class = 'org-box'>
		var div4 = document.createElement('div');
		div4.className = 'side-box';

		// <h4> Banana </h4>
		var org_title = document.createElement('h4');
		org_title.innerHTML = 'Banana x5';

		var item_from = document.createElement('p');
		item_from.innerHTML = 'Operation Safety Net';
		item_from.style.fontSize='12px';
		div4.appendChild(org_title);
		div4.appendChild(item_from);

		var org_img = document.createElement('img');
		// org_img.setAttribute('src', 'static/images/NorthsideFoodPantry.jpg');
		// org_img.setAttribute('width', '300');
		div4.appendChild(org_img);

		// org info 
		// var org_info = document.createElement('p');
		// org_info.innerHTML = '<p>Address: 1601 Brighton Rd, Pittsburgh, PA 15212</p><p>Phone: 412-323-1170</p>'; 
		// div.appendChild(org_info);

		div4.style.backgroundImage="url('/static/images/banana.jpg')";
		// div.style.backgroundColor="transparent";

		div4.onmouseover=function(){
			div4.style.opacity = 1;
		};

		div4.onmouseout=function() {
			div4.style.opacity = 0.5;
		};

		div4.onclick=function(){
			$('#product-modal').modal();
			$('.modal-title').html('Banana x3');
			$('.modal-product-from').html('Northside Food Pantry');
			$('.modal-org-img').attr('src', '/static/images/banana.jpg');
			// $('.modal-explanation').html();		
		};

		document.getElementById('side-display').appendChild(div4); 


	});








	// // on click, move the thing up to the top 
	// google.maps.event.addListener(northsideMarker, 'click', function() {

	
	// });


}



// function create_org_box() {
// 	// <div class = 'org-box'>
// 	var div = document.createElement('div');
// 	div.className = 'org-box';

// 	// <h4> Northside Food Pantry</h4>
// 	var org_title = document.createElement('h4');
// 	org_title.innerHTML = 'Northside Pantry';
// 	div.appendChild(org_title);

// 	// <img src="{% static 'images/NorthsideFoodPantry.jpg'%}" />
// 	var org_img = document.createElement('img');
// 	// org_img.setAttribute('src', 'static/images/NorthsideFoodPantry.jpg');
// 	// org_img.setAttribute('width', '300');
// 	div.appendChild(org_img);

// 	// org info 
// 	var org_info = document.createElement('p');
// 	org_info.innerHTML = 'Address: 1601 Brighton Rd, Pittsburgh, PA 15212,Phone: 412-323-1170'; 
// 	div.appendChild(org_info);	

// }



 



// Geocoder example
 // var geocoder = new google.maps.Geocoder();
 //    // Northside Pantry
 //    geocoder.geocode({'address': '1601 Brighton Rd, Pittsburgh, PA 15212'}, function(results, status) {
	// 	if (status == google.maps.GeocoderStatus.OK) {
	// 		npMarker = new google.maps.Marker({
	// 			map: map,
	// 			position: results[0].geometry.location,
	// 			title: 'Northside Pantry'
	// 		});
	// 	}
	// 	else {
	// 		alert("Geocode was not successful for the following reason: " + status);
	// 	}
	// });


 //    var allMarkers = [];
 //    var places = [];
	// // Adding a LatLng object for each location
	// for(i = 0; i < orgList.length; i++) {
	// 	var geocoder = new google.maps.Geocoder();
	// 	orgName = orgList[i].org_name;
	// 	geocoder.geocode({'address': orgList[i].org_address}, function(results, status) {
	// 		if (status == google.maps.GeocoderStatus.OK) {
	// 			allMarkers[i] = new google.maps.Marker({
	// 				map: map,
	// 				position: results[0].geometry.location,
	// 				title: orgName
	// 			});
	
	// 			places.push(results[0].geometry.location);
	// 		} 
	// 		else {
	// 			alert("Geocode was not successful for the following reason: " + status);
	// 		}
	// 	});
	// }

