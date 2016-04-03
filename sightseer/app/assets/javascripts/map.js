var map;
var places = [];
var infowindows =[];
var markers = [];
var waypts = [];
var wayptsT = [];
var tripTable = document.getElementById("trip");
var tableIndex = 0;

//waypoints are hidden from user when public transit is selected DELETE ONCE TRIP IS IMPLEMENTED
/*var hideWaypts = function() {
  if (document.getElementById('travelMode').value == "TRANSIT") {
    document.getElementById('waypointsBox').style.display = 'none';
  } else {
    document.getElementById('waypointsBox').style.display = 'initial';
  }
}
document.getElementById('travelMode').addEventListener('change', hideWaypts);*/



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

  /*var makeRoute = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };*/

  //document.getElementById('submit').addEventListener("click", makeRoute);

  var service = new google.maps.places.PlacesService(map);
  var doSearch = function() {
    var dtype = document.getElementById('destinationType').value;
    search(service, dtype);
  };

  document.getElementById('destinationType').addEventListener('change', doSearch);

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
    position: places[i].geometry.location
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
    infowindows[i].setContent("<b>Location Name: </b>" + places[i].name + "<br>" + "<p>Rating: " + places[i].rating + "</p>" + "<button id='addDest' type='button' onclick='addDest("+i+")'>Add to Trip</button>");

    clearIWs();
    infowindows[i].open(map, marker);
  });
  return marker;
}

function addDest(i) {
  //add the destination location to the wayptsT list
  wayptsT.push({
    location: places[i].geometry.location,
    stopover: true
  });
  //add the destination name to the trip table
  var row = tripTable.insertRow(tableIndex++);
  var cell0 = row.insertCell(0);
  var cell1 = row.insertCell(1);
  cell0.innerHTML = places[i].name;
  cell1.innerHTML = '<input type="button" value="Delete" onclick="removeDest(this)">';
}

function removeDest(r) {
  var i = r.parentNode.parentNode.rowIndex;
  //remove the place from the wayptsT array
  wayptsT.splice(i, 1);
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

  directionsService.route({
    origin: document.getElementById("start").value,
    destination: document.getElementById("end").value,
    waypoints: wayptsT,
    optimizeWaypoints: true,
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
}

/*function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  var wayptsAll = document.getElementsByName('waypoint');

  //Waypoints are disabled if user is using public transit
  //Adds selected waypoints to waypts
  if (document.getElementById('travelMode').value !== "TRANSIT") {
    for (var i = 0; i < wayptsAll.length; i++) {
      if (wayptsAll[i].checked) {
        waypts.push({
          location: wayptsAll[i].value,
          stopover: true
        });
      }
    }
  }


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
      directionsDisplay.setDirections(response);
    } else {
      document.getElementById('errorBox').innerHTML = 'Error: ' + status;
    }
  })
}*/
