var map;
var places = [];
var infowindows =[];
var markers = [];
var waypts = [];
var tripTable = document.getElementById("trip");
var tableIndex = 0;
var Alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

//waypoints are disabled when public transit is selected - limitation of Google Maps API
var hideWaypts = function() {
  if (document.getElementById('travelMode').value == "TRANSIT") {
    document.getElementById('tripBox').style.display = 'none';
  } else {
    document.getElementById('tripBox').style.display = 'initial';
  }
}

document.getElementById('travelMode').addEventListener('change', hideWaypts);

//Initializes the map and creates variables to call search and calculate route
function initMap() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 49.278947, lng: -122.916525},
    zoom: 11
  });
  directionsDisplay.setMap(map);

  var callCalcRoute = function() {
    calcRoute(directionsService, directionsDisplay);
  }

  document.getElementById('calcRouteButton').addEventListener("click", callCalcRoute);

  var service = new google.maps.places.PlacesService(map);
  var doSearch = function() {
    var dtype = document.getElementById('destinationType').value;
    search(service, dtype);
  };
  
        $("#capilanoCampsite").click(function() {
        $("#address").val("295 Tomahawk Ave, West Vancouver, BC V7P 1C5");

      });

      $("#seymourCampsite").click(function() {
        $("#address").val("Mt Seymour Rd, North Vancouver, BC V7G 1L3");

      });

      $("#dogwoodCampsite").click(function() {
        $("#address").val("15151 112 Ave, Surrey, BC V3R 6G8");

      });

      $("#tyneheadCampsite").click(function() {
        $("#address").val("16275 102 Ave, Surrey, BC V4N 2K7");

      });
      //Parks

      $("#stanleyPark").click(function() {
        $("#address").val("Vancouver, BC V6G 1Z4");

      });
      $("#queenPark").click(function() {
        $("#address").val("4600 Cambie St, Vancouver, BC V5Y 2M9");

      });
      $("#granvillePark").click(function() {
        $("#address").val("3001 Fir St, Vancouver, BC V6G 1Z4");

      });
      $("#vanierPark").click(function() {
        $("#address").val("1000 Chestnut St, Vancouver, BC V6J 3J9");

      });
      $("#callisterPark").click(function() {
        $("#address").val("Hastings-Sunrise, Vancouver, BC");

      });
      $("#amblesidePark").click(function() {
        $("#address").val("1150 Marine Dr, West Vancouver, BC V6T 1Z4");

      });

      //Beach
      $("#spanishBeach").click(function() {
        $("#address").val("4801 NW Marine Drive, Vancouver, BC V6T 1E2");

      });
      $("#englishBeach").click(function() {
        $("#address").val("Vancouver, BC V6E 1V3");

      });
      $("#kitslanoBeach").click(function() {
        $("#address").val("1499 Arbutus St, Vancouver, BC V6J 5N2");

      });
      $("#jerichoBeach").click(function() {
        $("#address").val("3941 Point Grey Rd, Vancouver, BC V6R 4L9");

      });
      $("#thirdBeach").click(function() {
        $("#address").val("Seawall, Vancouver, BC V6G 3E2");

      });
  
  //geocoder
  var marker = new google.maps.Geocoder();
      
  document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(marker, map);
  });
  //
  document.getElementById('destinationType').addEventListener('change', doSearch);

}
//Popular Choice geocoder
function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({
    'address': address
  }, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location,
        title: 'Click for more details'
      });
      
      var infoWindow = new google.maps.InfoWindow({
      content: "<b>Location Name: </b>" + results[0].name + "<br>" +
                    "<p>Rating: " + results[0].rating + "</p>" +
                    "<button id='addDest' type='button' onclick='addDest("+0+")'>Add to Trip</button>"
      });
      
      google.maps.event.addListener(marker, 'click', function() {
      infoWindow.open(map, marker);
      });
    }
    else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });

}
//Finds search results and passes them to callback function
function search(service, dtype) {
  service.nearbySearch({
    location: {lat: 49.278947, lng: -122.916525},
    radius: 50000,
    type: [dtype]
  }, callback);
}

//called by the search funtion. Calls createMarker for each search result.
function callback(results, status) {
  clearMarkers();
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      places[i] = results[i];
      markers[i] = createMarker(i);
    }
  }
}

//creates a marker and an Infowindow that opens when the marker is clicked
function createMarker(i) {
  var marker = new google.maps.Marker({
    map: map,
    position: places[i].geometry.location,
    animation: google.maps.Animation.DROP
  });

  /*
  //Will need to get this working for infowindows to have things like phone number or price
  places.getDetails({
    placeId: places[i].place_id
  },
  function(placeResults, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      places[i] = placeResults;
    }
  });
  */

  infowindows[i] = new google.maps.InfoWindow();

  google.maps.event.addListener(marker, 'click', function() {
    var IWcontent = "<b>Location Name: </b>" + places[i].name + "<br>" +
                    "<p>Rating: " + places[i].rating + "</p>" +
                    "<button id='addDest' type='button' onclick='addDest("+i+")'>Add to Trip</button>";

    infowindows[i].setContent(IWcontent);

    clearIWs();
    infowindows[i].open(map, marker);
  });
  return marker;
}

function addDest(i) {
  //Doesn't allow more than 8 waypoints to be added - the limit imposed by Google Maps API
  if (tableIndex < 8) {
    //Doesn't allow the same destination to be added more than once
    for (var j = 0; j < tableIndex; j++) {
      if (tripTable.rows[j].cells[1].innerHTML == places[i].name) {
        window.alert(places[i].name + ' has already been added to the trip.');
        return;
      }
    }
    //add the destination location to the waypts list
    waypts.push({
      location: places[i].geometry.location,
      stopover: true
    });
    //add the destination name to the trip table
    var row = tripTable.insertRow(tableIndex++);
    var cell0 = row.insertCell(0);
    cell0.innerHTML = '';
    //cell0.style.padding = '5px';
    var cell1 = row.insertCell(1);
    cell1.innerHTML = places[i].name;
    cell1.style.padding = '5px';
    var cell2 = row.insertCell(2);
    cell2.innerHTML = '<input type="button" value="Delete" onclick="removeDest(this)">'
    cell2.style.padding = '5px';
  }else{
    window.alert('Maximum Number of Destinations added!');
  }
}

function removeDest(r) {
  var i = r.parentNode.parentNode.rowIndex;
  //remove the place from the waypts array
  waypts.splice(i, 1);
  //remove the place from the trip table
  tripTable.deleteRow(i);
  tableIndex--;
}

function clearMarkers() {
  for (var i = 0; i < markers.length; i++) {
      if (markers[i]) {
          markers[i].setMap(null);
      }
  }
  markers = [];
}

//closes any opened Infowindows. Called when route is being displayed.
function clearIWs() {
  for (var i = 0; i < infowindows.length; i++) {
    infowindows[i].close();
  }
}

function calcRoute(directionsService, directionsDisplay) {
  clearMarkers();
  document.getElementById("destinationType").value = "";

  if (document.getElementById('travelMode').value == "TRANSIT") {
    directionsService.route({
      origin: document.getElementById("start").value,
      destination: document.getElementById("end").value,
      travelMode: google.maps.TravelMode[document.getElementById("travelMode").value]
    },
    function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        document.getElementById('errorBox').innerHTML = '';
        directionsDisplay.setDirections(response);
      } else {
        document.getElementById('errorBox').innerHTML = 'Error: ' + status;
      }
    })
  }else{
    directionsService.route({
      origin: document.getElementById("start").value,
      destination: document.getElementById("end").value,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode[document.getElementById("travelMode").value]
    },
    function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        document.getElementById('errorBox').innerHTML = '';
        orderTripTable(response);
        directionsDisplay.setDirections(response);
      } else {
        document.getElementById('errorBox').innerHTML = 'Error: ' + status;
      }
    })
  }
}

//function to display the order of the destinations, including start and end, after route has been calculated
function orderTripTable(response) {
  for (var j = 0; j < tripTable.rows.length; j++) {
    var OrderCell = tripTable.rows[response.routes[0].waypoint_order[j]].cells[0];
    OrderCell.innerHTML = Alpha[j+1];
    OrderCell.style.fontWeight = 'bold';
  }
  document.getElementById('startPos').style.display = 'initial';
  document.getElementById('endPos').style.display = 'initial';
  document.getElementById('endPos').innerHTML = Alpha[response.geocoded_waypoints.length - 1] + ' ';
}

    /* YIWEN'S CODE
    var map, places, infoWindow;
    var markers = [];
    var autocomplete;
    var countryRestrict = {
        'country': 'vancouver'
    };
    var MARKER_PATH = 'https://maps.gstatic.com/intl/en_us/mapfiles/marker_green';
    var hostnameRegexp = new RegExp('^https?://.+?/');

    var countries = {
        'vancouver': {
            center: {
                lat: 49.2827,
                lng: -123.1207
            },
            zoom: 12
        },

        'ca': {
            center: {
                lat: 62,
                lng: -110.0
            },
            zoom: 3
        },

    };

    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: countries['vancouver'].zoom,
            center: countries['vancouver'].center,
            mapTypeControl: false,
            panControl: false,
            zoomControl: false,
            streetViewControl: false
        });

        infoWindow = new google.maps.InfoWindow({
            content: document.getElementById('info-content')
        });


        autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */
/*            (
                document.getElementById('autocomplete')), {
                types: ['(cities)'],
                componentRestrictions: countryRestrict
            });
        places = new google.maps.places.PlacesService(map);

        autocomplete.addListener('place_changed', onPlaceChanged);

        // Add a DOM event listener to react when the user selects a country.
        document.getElementById('country').addEventListener(
            'change', setAutocompleteCountry);
    }


    function onPlaceChanged() {
        var place = autocomplete.getPlace();
        if (place.geometry) {
            map.panTo(place.geometry.location);
            map.setZoom(12);
            search();
        }
        else {
            document.getElementById('autocomplete').placeholder = 'Enter a city';
        }
    }


    function search() {
        var search = {
            bounds: map.getBounds(),
            types: ['university']
        };

        places.nearbySearch(search, function(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                clearResults();
                clearMarkers();

                for (var i = 0; i < results.length; i++) {
                    var markerLetter = String.fromCharCode('A'.charCodeAt(0) + i);
                    var markerIcon = MARKER_PATH + markerLetter + '.png';

                    markers[i] = new google.maps.Marker({
                        position: results[i].geometry.location,
                        animation: google.maps.Animation.DROP,
                        icon: markerIcon
                    });

                    markers[i].placeResult = results[i];
                    google.maps.event.addListener(markers[i], 'click', showInfoWindow);
                    setTimeout(dropMarker(i), i * 100);
                    addResult(results[i], i);
                }
            }
        });
    }

    function clearMarkers() {
        for (var i = 0; i < markers.length; i++) {
            if (markers[i]) {
                markers[i].setMap(null);
            }
        }
        markers = [];
    }


    function setAutocompleteCountry() {
        var country = document.getElementById('country').value;
        if (country == 'all') {
            autocomplete.setComponentRestrictions([]);
            map.setCenter({
                lat: 15,
                lng: 0
            });
            map.setZoom(2);
        }
        else {
            autocomplete.setComponentRestrictions({
                'country': country
            });
            map.setCenter(countries[country].center);
            map.setZoom(countries[country].zoom);
        }
        clearResults();
        clearMarkers();
    }

    function dropMarker(i) {
        return function() {
            markers[i].setMap(map);
        };
    }

    function addResult(result, i) {
        var results = document.getElementById('results');
        var markerLetter = String.fromCharCode('A'.charCodeAt(0) + i);
        var markerIcon = MARKER_PATH + markerLetter + '.png';

        var tr = document.createElement('tr');
        tr.style.backgroundColor = (i % 2 === 0 ? '#F0F0F0' : '#FFFFFF');
        tr.onclick = function() {
            google.maps.event.trigger(markers[i], 'click');
        };

        var iconTd = document.createElement('td');
        var nameTd = document.createElement('td');
        var icon = document.createElement('img');
        icon.src = markerIcon;
        icon.setAttribute('class', 'placeIcon');
        icon.setAttribute('className', 'placeIcon');
        var name = document.createTextNode(result.name);
        iconTd.appendChild(icon);
        nameTd.appendChild(name);
        tr.appendChild(iconTd);
        tr.appendChild(nameTd);
        results.appendChild(tr);
    }

    function clearResults() {
        var results = document.getElementById('results');
        while (results.childNodes[0]) {
            results.removeChild(results.childNodes[0]);
        }
    }


    function showInfoWindow() {
        var marker = this;
        places.getDetails({
                placeId: marker.placeResult.place_id
            },
            function(place, status) {
                if (status !== google.maps.places.PlacesServiceStatus.OK) {
                    return;
                }
                infoWindow.open(map, marker);
                buildIWContent(place);
            });
    }


    function buildIWContent(place) {
        document.getElementById('iw-icon').innerHTML = '<img class="hotelIcon" ' +
            'src="' + place.icon + '"/>';
        document.getElementById('iw-url').innerHTML = '<b><a href="' + place.url +
            '">' + place.name + '</a></b>';
        document.getElementById('iw-address').textContent = place.vicinity;

        if (place.formatted_phone_number) {
            document.getElementById('iw-phone-row').style.display = '';
            document.getElementById('iw-phone').textContent =
                place.formatted_phone_number;
        }
        else {
            document.getElementById('iw-phone-row').style.display = 'none';
        }


        if (place.rating) {
            var ratingHtml = '';
            for (var i = 0; i < 5; i++) {
                if (place.rating < (i + 0.5)) {
                    ratingHtml += '&#10025;';
                }
                else {
                    ratingHtml += '&#10029;';
                }
                document.getElementById('iw-rating-row').style.display = '';
                document.getElementById('iw-rating').innerHTML = ratingHtml;
            }
        }
        else {
            document.getElementById('iw-rating-row').style.display = 'none';
        }


        if (place.website) {
            var fullUrl = place.website;
            var website = hostnameRegexp.exec(place.website);
            if (website === null) {
                website = 'http://' + place.website + '/';
                fullUrl = website;
            }
            document.getElementById('iw-website-row').style.display = '';
            document.getElementById('iw-website').textContent = website;
        }
        else {
            document.getElementById('iw-website-row').style.display = 'none';
        }
    }
*/
