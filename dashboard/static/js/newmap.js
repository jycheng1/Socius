// $(window).load(function() {
// });

// $(document).ready(function() {
// 	console.log('map enter');
	

// 	$.ajax({
// 		url: ,
// 		type: ,
// 		dataType: ,
// 		data: { 

// 		}, 

// 		success: 

// 		error: 
// 	});

// });

// function fx(callback) {
// 	// do stuff
// 	callback();
// }



// Google Map API 
// initialize the map centered at Pittsburgh
var map;
	var markers = [];

var product_positions = [40.459682814784514, -80.00989392399788, 40.45524190247083, -80.02259686589241, 40.444660899319274,-79.99564602971077];

function initialize() {
    map = new google.maps.Map(document.getElementById('map-display'), {
		center: new google.maps.LatLng(40.4406,-79.9959),
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.ROADMAP
    });

	// Geocoder example
	var geocoder = new google.maps.Geocoder();

	// dictionary: address --> org 
	var org_dic  = {};

	// array of side-box divs
	var div_arr = [];

	// for each org
	for(var i = 0; i < orgs.length; i++) {

		// parse USA to match geocode's foramtted_address format (err possible)
		org_dic[orgs[i].fields.address + ', USA'] = orgs[i];

		geocoder.geocode({'address':  orgs[i].fields.address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				marker = new google.maps.Marker({
					map: map,
					position: results[0].geometry.location
				});

				// console.log(org_dic[results[0].formatted_address]);

				// console.log(results[0].formatted_address.fields)
				markers.push(marker);
				// console.log('inner ' + markers);
				var infowindow = new google.maps.InfoWindow({
					content: org_dic[results[0].formatted_address].fields.name
			  	});
					// infowindow.open(map,marker);

				var div = document.createElement('div');
				div.id = org_dic[results[0].formatted_address].pk;
				div_arr.push(div);

				// when window is loaded, create a side box for org and its products
				google.maps.event.addListenerOnce(map, 'idle', function(marker, infowindow){
					div.className = 'side-box';

					// <h4> Northside Food Pantry</h4>
					var org_title = document.createElement('h4');
					org_title.innerHTML = org_dic[results[0].formatted_address].fields.name;
					org_title.style.color = 'white';
					div.appendChild(org_title);

					// Option 1 : have img as background
					div.style.backgroundImage = "url("+ 'media/' + org_dic[results[0].formatted_address].fields.picture +")";


					// Option 2 : have img box 
					// var org_img = document.createElement('img');
					// console.log('socius/media/' + org_dic[results[0].formatted_address].fields.picture);
					// org_img.setAttribute('src', 'media/' + org_dic[results[0].formatted_address].fields.picture);
					// org_img.setAttribute('width', '70');
					// div.appendChild(org_img);

					// var learn_more = document.createElement('p');
					// learn_more.innerHTML = 'Learn More'
					// div.appendChild(learn_more);

					// on mouse over, highlight the org box & 
					// show info window on the corresponding marker
					div.onmouseover = function(){
						infowindow.open(map,marker);
						div.style.opacity = 1;	
					};

					div.onmouseout=function() {
						infowindow.close();
						div.style.opacity = 0.5;
						// org_title.style.opacity = 1;
					};

					div.onclick=function(){
						$('#org-modal').modal();
						$('.modal-title').html(org_dic[results[0].formatted_address].fields.name);
						$('.modal-org-img').attr('src', 'media/' + org_dic[results[0].formatted_address].fields.picture);
						$('.modal-requested-item-img').html('req item img');
						$('.modal-requested-item-name').html('req item name & how many');
						$('.modal-requested-item-reasons').html('req item reasons');

						// $('.modal-explanation').html('The Northside Food Pantry, Pittsburgh’s largest with about 1,000 people served each month, is a progressive, nonsectarian nonprofit founded in 1982 over a Thanksgiving meal shared by three pastors of local churches.');
					};

				

					document.getElementById('side-display').appendChild(div); 

					// for(var k = 0; k < products.length; k++) {
					// 	if(products[k].fields.organization == org_dic[results[0].formatted_address].pk) {
					// 		var productdiv = document.createElement('div');
					// 		productdiv.className = 'side-box';

					// 		var product_title = document.createElement('h4');
					// 		product_title.innerHTML = products[k].fields.name;
					// 		productdiv.appendChild(product_title);		

					// 		productdiv.style.backgroundImage = "url("+ 'media/' + products[k].fields.picture +")";

					// 		var pos = new google.maps.LatLng(product_positions[k], product_positions[k+1]);

					// 		// marker = new google.maps.Marker({
					// 		// 	map: map,
					// 		// 	position: pos
					// 		// });

					// 		// markers.push(marker);

					// 		// var infowindow = new google.maps.InfoWindow({
					// 		// 	content: org_dic[results[0].formatted_address].fields.name
					// 	 //  	});


					// 		(function (productdiv) {

					// 			productdiv.onmouseover = function(){
					// 				// infowindow.open(map,marker);
					// 				productdiv.style.opacity = 1;	
					// 			};

					// 			productdiv.onmouseout=function() {
					// 				// infowindow.close();
					// 				productdiv.style.opacity = 0.5;
					// 				// org_title.style.opacity = 1;
					// 			};

					// 			// productdiv.onclick=function(){
					// 			// $('#org-modal').modal();
					// 			// $('.modal-title').html(products[k].fields.name);
					// 			// $('.modal-org-img').attr('src', 'media/' + products[k].fields.picture);
					// 			// $('.modal-requested-item-img').html('req item img');
					// 			// $('.modal-requested-item-name').html('req item name & how many');
					// 			// $('.modal-requested-item-reasons').html('req item reasons');

					// 			// };

					// 		})(productdiv);

					// 		// productdiv.onmouseover = function(){
					// 		// 	// infowindow.open(map,marker);
					// 		// 	productdiv.style.opacity = 1;	
					// 		// };

					// 		// productdiv.onmouseout=function() {
					// 		// 	// infowindow.close();
					// 		// 	productdiv.style.opacity = 0.5;
					// 		// 	// org_title.style.opacity = 1;
					// 		// };


					// 		document.getElementById('side-display').appendChild(productdiv); 
					// 	}
					// }

				}(marker, infowindow));


				// When mouse-over a marker
				google.maps.event.addListener(marker, 'mouseover', function(marker, infowindow) {
					return function() {
						infowindow.open(map,marker);
					}
				}(marker, infowindow));

				// When mouse-out a marker
				google.maps.event.addListener(marker, 'mouseout', function(marker, infowindow) {
					return function() {
						infowindow.close();
					}
				}(marker, infowindow));


				// When a marker is clicked, move the corresponding div to the top of the list
				google.maps.event.addListener(marker, 'click', function(marker) {
					return function() {
						// remove later
						console.log(org_dic[results[0].formatted_address].fields.name);

						for(var j = 0; j < div_arr.length; j++) {
							var each_div = div_arr[j];

							if(each_div.id == org_dic[results[0].formatted_address].pk) {
								var side_display_div = document.getElementById('side-display');
								side_display_div.removeChild(each_div);
								side_display_div.insertBefore(each_div, side_display_div.childNodes[0]);
							}
						}
					}
				}(marker));
			}
			else {
				alert("Geocode was not successful for the following reason: " + status);
			}
		});
    }


   	// console.log('outer ', markers);

	// google.maps.event.addListener(map, 'bounds_changed', function() {
	// 	if( map.getBounds().contains(markers[i].getPosition()) ){

	// 	}
	// });





 //   // Northside Pantry Marker
	// var northsideMarker = new google.maps.Marker({
	// 	map: map,
	// 	position: new google.maps.LatLng(40.4580513, -80.01634849999999),
	// 	title: "Northside Food Pantry"
	// });

	// var infowindow = new google.maps.InfoWindow({
	// 	content:"Northside Food Pantry"
 //  	});
	// infowindow.open(map,northsideMarker);

	// google.maps.event.addListener(northsideMarker, 'click', function(){
	// 	$('#org-modal').modal();
	// 	$('.modal-title').html('Northside Food Pantry');
	// 	$('.modal-org-img').attr('src', '/static/images/NSFP-logo.jpg');
	// 	$('.modal-explanation').html('The Northside Food Pantry, Pittsburgh’s largest with about 1,000 people served each month, is a progressive, nonsectarian nonprofit founded in 1982 over a Thanksgiving meal shared by three pastors of local churches.');
	// });

	// // OSN Marker
	// var osnMarker = new google.maps.Marker({
	// 	map: map,
	// 	position: new google.maps.LatLng(40.43858400000001, -79.99146059999998),
	// 	title: "OSN"
	// });

	// var infowindow = new google.maps.InfoWindow({
	//   content:"OSN"
 //  	});
	// infowindow.open(map,osnMarker);

	// google.maps.event.addListener(osnMarker, 'click', function(){
	// 	$('#org-modal').modal();
	// 	$('.modal-title').html('Operation Safety Net');
	// 	$('.modal-org-img').attr('src', '/static/images/OSN.jpg');
	// 	$('.modal-explanation').html('Operation Safety Net, part of the Pittsburgh Mercy Health System and Trinity Health, sponsored by the Sisters of Mercy, touches the lives of hundreds of men and women living on the streets in Pittsburgh annually by providing them with access to health care, hope, and dignity.');
	// });

	// // put org-boxes when map is loaded
	// google.maps.event.addListenerOnce(map, 'idle', function(){
	// 	// Northside pantry
	// 	// <div class = 'org-box'>
	// 	var div = document.createElement('div');
	// 	div.className = 'side-box';

	// 	// <h4> Northside Food Pantry</h4>
	// 	var org_title = document.createElement('h4');
	// 	org_title.innerHTML = 'Northside Food Pantry';
	// 	div.appendChild(org_title);

	// 	// <img src="{% static 'images/NorthsideFoodPantry.jpg'%}" />
	// 	var org_img = document.createElement('img');
	// 	// org_img.setAttribute('src', 'static/images/NorthsideFoodPantry.jpg');
	// 	// org_img.setAttribute('width', '300');
	// 	div.appendChild(org_img);

	// 	// org info 
	// 	// var org_info = document.createElement('p');
	// 	// org_info.innerHTML = '<p>Address: 1601 Brighton Rd, Pittsburgh, PA 15212</p><p>Phone: 412-323-1170</p>'; 
	// 	// div.appendChild(org_info);

	// 	div.style.backgroundImage="url('/static/images/NorthsideFoodPantry.jpg')";
	// 	// div.style.backgroundColor="transparent";

	// 	div.onmouseover=function(){
	// 		div.style.opacity = 1;
	// 	};

	// 	div.onmouseout=function() {
	// 		div.style.opacity = 0.5;
	// 	};

	// 	div.onclick=function(){
	// 		$('#org-modal').modal();
	// 		$('.modal-title').html('Northside Food Pantry');
	// 		$('.modal-org-img').attr('src', '/static/images/NSFP-logo.jpg');
	// 		$('.modal-explanation').html('The Northside Food Pantry, Pittsburgh’s largest with about 1,000 people served each month, is a progressive, nonsectarian nonprofit founded in 1982 over a Thanksgiving meal shared by three pastors of local churches.');
	// 	};

	// 	document.getElementById('side-display').appendChild(div); 



	// });








	// // on click, move the thing up to the top 
	// google.maps.event.addListener(northsideMarker, 'click', function() {

	
	// });


}

