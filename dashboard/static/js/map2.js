// map.setCenter(results[0].geometry.location)


// given object's id, return that object from a list
function findObjectById(list, id) {
	return list.filter(
		function(list) {
			return (list.pk == id);
		}
	);
}

function showOrgModal(div, org_obj) {
	div.onclick=function(){
		$('#org-modal').modal();

		$('.modal-title').html(org_obj[0].fields.name);
		$('.modal-img').attr('src', 'media/' + org_obj[0].fields.picture);

		$('.modal-requested-item-img').html('req item img');
		$('.modal-requested-item-name').html('Banana');
		$('.modal-request-item-count').html('3');

		$('.modal-requested-item-reasons').html('req item reasons');

		$('.modal-explanation').html('Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.');


	};
}

function showProductModal(div, product_obj, org_obj) {
	div.onclick=function(){
		$('#product-modal').modal();
		$('.modal-title').html(product_obj[0].fields.name);
		$('.modal-subtitle').html(org_obj[0].fields.name);
		// console.log(org_obj[0].fields.name)

		$('.modal-img').attr('src', 'media/' + product_obj[0].fields.picture);

		// $('.modal-requested-item-img').html('req item img');
		// $('.modal-requested-item-name').html('Banana');
		// $('.modal-request-item-count').html('3');

		// $('.modal-requested-item-reasons').html('req item reasons');

		$('.modal-explanation').html('Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.');
	};
}

function sideboxEffect(map, marker, infowindow, div) {

	div.onmouseover = function(){
		infowindow.open(map,marker);
		div.style.opacity = 1;	
	};

	div.onmouseout=function() {
		infowindow.close();
		div.style.opacity = 0.5;
	};
}


function orgMarkerClickEffect(marker) {
	// When a marker is clicked, 
	google.maps.event.addListener(marker, 'click', function(marker) {
		return function() {

			console.log(marker.metadata.id)

			// find the marker's matching side box div 
			var matching_sidebox = $('#side-display').find('#' + marker.metadata.id);

			// $('#side-display').scrollTop(0);
            $('#side-display').animate({
                scrollTop: $('#side-display').scrollTop() + $('#' + matching_sidebox[0].id).position().top
            }, 10);
		}
	}(marker));
}

function productMarkerClickEffect(marker) {
	// When a marker is clicked, 
	google.maps.event.addListener(marker, 'click', function(marker) {
		return function() {

			console.log(marker.metadata.id)

			// find the marker's matching side box div 
			var matching_sidebox = $('#side-display').find('#' + marker.metadata.id);

			// $('#side-display').scrollTop(0);
            $('#side-display').animate({
                scrollTop: $('#side-display').scrollTop() +  $('#product_side_divs').scrollTop() + $('#' + matching_sidebox[0].id).position().top
            }, 10);
		}
	}(marker));
}


function initialize() {
	var map;
	var markers = []; 

	// load script for infobox 
	$.getScript("/static/js/infobox.js", function(){
	});

	// map initialize (centered at pittsburgh)
	map = new google.maps.Map(document.getElementById('map-display'), {
		center: new google.maps.LatLng(40.4406,-79.9959),
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	// After createMarkers fx is done, 
	createMarkers(map, markers, function() {

		// when the map loads
		google.maps.event.addListenerOnce(map, 'idle', function() {

			// $('#org-modal').modal();
			// $('.modal-title').html('Name');
			// $('.modal-org-img').attr('src', 'media/img');

			// $('.modal-requested-item-img').html('req item img');
			// $('.modal-requested-item-name').html('Banana');
			// $('.modal-request-item-count').html('3');

			// $('.modal-requested-item-reasons').html('req item reasons');
			

			// $('.modal-explanation').html('Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.');


			google.maps.event.trigger(map, 'bounds_changed');
		});

		// detect if the map screen changes 
		google.maps.event.addListener(map, 'bounds_changed', function() {
	 		var count = 0;

			$('#side-display').empty();
	 		var org_side_divs = document.createElement('div');
	 		org_side_divs.id = 'org_side_divs';
	 		var product_side_divs = document.createElement('div');
	 		product_side_divs.id = 'product_side_divs'

	 		console.log('total markers = ' + markers.length);

	 		// create div for each marker 
	  		for (var i = 0; i < markers.length; i++) {
		  		if(map.getBounds().contains(markers[i].getPosition())) {
		  			count++;

		  			// for org markers 
		  			if(markers[i].metadata.id.substring(0,1) == 'o') {

		  				// get each marker's corresponding info-window
		  				org_infowindow = markers[i].metadata.infowindow;

		  				var org_id = markers[i].metadata.id.substring(1);
		  				var org_obj = findObjectById(orgs, org_id);
		  				// console.log(org_obj[0].fields);

		  				var div = document.createElement('div');
						div.id = markers[i].metadata.id;
		  				div.className = 'side-box';

		  				// Org box title
						var org_title = document.createElement('h4');
						org_title.innerHTML = org_obj[0].fields.name;
						// org_title.style.color = 'white';
						div.appendChild(org_title);


						// Option 1 : have img as background
						div.style.backgroundImage = "url("+ 'media/' + org_obj[0].fields.picture +")";

						console.log('media/' + org_obj[0].fields.picture);

						// Option 2 : have img box 
						// var org_img = document.createElement('img');
						// org_img.setAttribute('src', 'media/' + org_obj[0].fields.picture);
						// org_img.setAttribute('width', '80');
						// org_img.setAttribute('height', '80');

						// div.appendChild(org_img);

						// var learn_more = document.createElement('p');
						// learn_more.innerHTML = 'Learn More'
						// div.appendChild(learn_more);

						sideboxEffect(map, markers[i], org_infowindow, div);
						showOrgModal(div, org_obj);

						// orgDivEffect(map, markers[i], org_infowindow, div, org_obj);
						orgMarkerClickEffect(markers[i]);

						org_side_divs.appendChild(div);
		  			}

		  			// for product markers 
		  			else {

		  				// get each marker's corresponding info-window
		  				product_infowindow = markers[i].metadata.infowindow;

		  				// get product object from the list using its id 
		  				var product_id = markers[i].metadata.id.substring(1);
		  				var product_obj = findObjectById(products, product_id);

	  					var div = document.createElement('div');
						div.id = markers[i].metadata.id;
		  				div.className = 'side-box';

		  				// Product box title
						var product_title = document.createElement('h4');
						product_title.innerHTML = product_obj[0].fields.name;
						// org_title.style.color = 'white';
						div.appendChild(product_title);

						var product_quantity = document.createElement('p');
						product_quantity.innerHTML = product_obj[0].fields.quantity;
						div.appendChild(product_quantity);


						// console.log('hi ' + product_obj[0].fields.organization)

						var product_org = document.createElement('h6');
						// get the corresponding org object of the product
		  				var org_obj = findObjectById(orgs, product_obj[0].fields.organization);

		  				product_org.innerHTML = org_obj[0].fields.name;
		  				div.appendChild(product_org);


						// Option 1 : have img as background
						div.style.backgroundImage = "url("+ 'media/' + product_obj[0].fields.picture +")";

						sideboxEffect(map, markers[i], product_infowindow, div);
						showProductModal(div, product_obj, org_obj);


						// productDivEffect(map, markers[i], product_infowindow, div, product_obj)
						productMarkerClickEffect(markers[i]);


						product_side_divs.appendChild(div);
		  			}
	  			}  			
	  		}
	  		// org side boxes are always at the top
			document.getElementById('side-display').appendChild(org_side_divs); 
			document.getElementById('side-display').appendChild(product_side_divs); 

			console.log('marker inbound count = ' + count);
 		});
	});
}
	


// Create markers for organizations and products ('callback' ensures this gets called first)
function createMarkers(map, markers, callback) {

	var product_positions_x = [40.459682814784514, 40.45524190247083, 40.444660899319274, 40.452172, 40.467193, 40.457462, 40.44146];
	var product_positions_y = [-80.00989392399788, -80.02259686589241, -79.99564602971077, -80.000811, -80.007849, -79.995232, -79.997377];

	console.log('create markers fx entered');


	// Geocoder 
	var geocoder = new google.maps.Geocoder();

	// console.log(orgs[i].fields);
	// options: fields, model, pk 
	// phone_number,picture,site_url,name,address

	// loop through organizations 
	for(var i = 0; i < orgs.length; i++) {
		(function(i) {
	 		geocoder.geocode({'address':  orgs[i].fields.address}, function(results, status) {
	 			if (status == google.maps.GeocoderStatus.OK) {

	 				var marker_img = {
	 					url : '/static/images/house.png',
	 					scaledSize : new google.maps.Size(30,30)
	 				}

	 				// create marker for each org 
					var marker = new google.maps.Marker({
						map: map,
						icon: marker_img,
						position: results[0].geometry.location	
					});

					markers.push(marker);

					var iwContent = "<div class='iw-container'><div class='iw-title'>" + orgs[i].fields.name + "</div></div>";

					// style infowindow as infobox
					var infowindow = new InfoBox({
					    content: iwContent, 
					    disableAutoPan: false,
					    maxWidth: 150,
					    pixelOffset: new google.maps.Size(-75, -70),
					    zIndex: null,
					    boxStyle: {
					                // background: "url('http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/examples/tipbox.gif') no-repeat",
					                opacity: 0.75,
					                width: "150px",
					        },
					    closeBoxMargin: "12px 4px 2px 2px",
					    closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
					    infoBoxClearance: new google.maps.Size(1, 1)
					});

					// add org id (o1, o2, ...) and infowindow to its marker  
					marker.metadata = {id: 'o' + orgs[i].pk, infowindow: infowindow};


					// products of the current org 
					var curr_products = org_products_dic[orgs[i].pk];
					// console.log('111111' + curr_products)

					for(var j = 0; j < curr_products.length; j++) {
						var product_pos = new google.maps.LatLng(product_positions_x[j], product_positions_y[j]);


		 				var product_marker_img = {
		 					url : 'media/' + curr_products[j].fields.picture, 
		 					// url : '/static/images/pink-balloon.png',
// 
		 					scaledSize : new google.maps.Size(40,40)
		 				}

						var product_marker = new google.maps.Marker({
							map: map,
							icon: product_marker_img,
							position: product_pos
						});
					
						markers.push(product_marker);
					
						var iwContent = "<div class='iw-container'><div class='iw-title'>" + curr_products[j].fields.name + "</div></div>";

						// style infowindow as infobox
						var product_infowindow = new InfoBox({
						    content: iwContent, 
						    disableAutoPan: false,
						    maxWidth: 150,
						    pixelOffset: new google.maps.Size(-75, -80),
						    zIndex: null,
						    boxStyle: {
						                // background: "url('http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/examples/tipbox.gif') no-repeat",
						                opacity: 0.75,
						                width: "150px"
						        },
						    closeBoxMargin: "12px 4px 2px 2px",
						    closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
						    infoBoxClearance: new google.maps.Size(1, 1)
						});



						// // create info window for each marker
						// var product_infowindow = new google.maps.InfoWindow({
						// 	content: products[j].fields.name
					 //  	});

						// add product id (p1, p2, ...) and infowindow to its marker 
						product_marker.metadata = {id: 'p' + curr_products[j].pk, infowindow: product_infowindow};

						// When mouse-over a marker
						google.maps.event.addListener(product_marker, 'mouseover', function(product_marker, product_infowindow) {
							return function() {
								product_infowindow.open(map,product_marker);
								var matching_sidebox = $('#side-display').find('#' + product_marker.metadata.id);
								matching_sidebox[0].style.opacity = 1;	
							}
						}(product_marker, product_infowindow));

						// When mouse-out a marker
						google.maps.event.addListener(product_marker, 'mouseout', function(product_marker, product_infowindow) {
							return function() {
								product_infowindow.close();
								var matching_sidebox = $('#side-display').find('#' + product_marker.metadata.id);
								matching_sidebox[0].style.opacity = 0.5;	
							}
						}(product_marker, product_infowindow));
			
					}


						


					// When mouse-over a marker
					google.maps.event.addListener(marker, 'mouseover', function(marker, infowindow) {
						return function() {
							infowindow.open(map,marker);
							var matching_sidebox = $('#side-display').find('#' + marker.metadata.id);
							matching_sidebox[0].style.opacity = 1;	
						}
					}(marker, infowindow));

					// When mouse-out a marker
					google.maps.event.addListener(marker, 'mouseout', function(marker, infowindow) {
						return function() {
							infowindow.close();
							var matching_sidebox = $('#side-display').find('#' + marker.metadata.id);
							matching_sidebox[0].style.opacity = 0.5;	
						}
					}(marker, infowindow));
	 			}

	 			else {
					alert("Geocode was not successful for the following reason: " + status);
	 			}
	 		});
		})(i);

	}

	callback();
}