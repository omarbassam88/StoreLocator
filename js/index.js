var map = map;

var markers = [];

var infoWindows = [];

// Adding Event Listeners to Store Containers

window.onload = () => {
  searchStores();

};




function initMap() {

  var losAngeles = {
    lat: 34.06338,
    lng: -118.35808,
  };

  // Adding Map to the viewport
  map = new google.maps.Map(document.getElementById("map"), {
    center: losAngeles,
    zoom: 13,
    styles: 
    [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#49868C"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "poi",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#D9B166"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dadada"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "transit",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#c9c9c9"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      }
    ],
  });

}

function displayStores(stores_list) {
  var storeHtml = "";
  var bounds = new google.maps.LatLngBounds();


  for (var store of stores_list) {
    storeHtml += `
    <div class="store-container" id="${stores.indexOf(store)}" >
      <div class="store-info">          
        <div class="store-address">
          <span>${store.addressLines[0]}</span>  
          <span>${store.addressLines[1]}</span> 
        </div>
        <div class="store-phone-number">
        <span>${store.phoneNumber}</span> 
        </div>
      </div> 
      <div class="store-number-container">
        <div class="store-number">${stores_list.indexOf(store) + 1}</div>
      </div>      
    </div>
    `;

    // Adding Store Containers to the DOM
    document.querySelector(".stores-list").innerHTML = storeHtml;

    createMarker(store,stores_list.indexOf(store));

    bounds.extend(new google.maps.LatLng(store.coordinates.latitude, store.coordinates.longitude));
  }

    // Add event Listeners to Store Containers
    var storeContainers = document.querySelectorAll(".store-container");
    for (let i = 0; i < storeContainers.length; i++) {
      storeContainers[i].addEventListener("click", focusStore);
    }

  map.fitBounds(bounds);
}

function createMarker(store, index) {
  // Getting Store information
  var name = store.name;
  var address = store.addressLines[0];
  var x = store.coordinates.latitude;
  var y = store.coordinates.longitude;

  // Add marker to the map
  var iconBase = 'https://www.gstatic.com/earth/images/stockicons/';

  var marker = new google.maps.Marker({
    position: {
      lat: x,
      lng: y,
    },
    map: map,
    label: (index + 1).toString(),
    icon: iconBase + '190201-2016-animal-paw_4x.png'
  });

  markers.push(marker);

  // Create Info Window html
  var html = `<div class="infoWindow">
              <b>${name}</b>
              <br><p>${address}</p>
              </div>
              `;
  var infowindow = new google.maps.InfoWindow({
    content: html,
  });

  // Adds info Window to the Marker
  marker.addListener("click", function () {
    showInfoWindow(store);
  });
}

function closeAllInfoWindows() {
  for (var i = 0; i < infoWindows.length; i++) {
    infoWindows[i].close();
  }
}

function focusStore() {
  let id = this.getAttribute("id");
  console.log(id)
  showInfoWindow(stores[id])
}


function showInfoWindow(store) {
  var pos = {
    lat: store["coordinates"]["latitude"],
    lng: store["coordinates"]["longitude"],
  };
  var marker = new google.maps.Marker({
    position: pos,
    map: map,
    opacity: 0,
  });
  map.setZoom(15);
  map.panTo(pos);
  var html = `<div class="infoWindow">
  <h2><b>${store.name}</b></h2>
  <p>${store.openStatusText}</p>
  <hr>

  <div class="info-address-container">
    <i class="fa fa-paper-plane" aria-hidden="true"></i>
    <a target="_blank" href="https://www.google.com/maps/dir/?api=1&origin=34.06338,
    -118.35808&destination=${store.coordinates.latitude},${store.coordinates.longitude}">${store.addressLines[0]}</a>
  </div>
  <div class="info-address-container">
  <i class="fa fa-phone-alt" aria-hidden="true"></i>
  <p>${store.phoneNumber}</p>
</div>
  </div>
  `;
  var infowindow = new google.maps.InfoWindow({
    content: html,
  });

  closeAllInfoWindows();
  infowindow.open(map, marker);
  infoWindows.push(infowindow);
}

function searchStores() {
  clearMarkers();
  // get zipcode from Search input
  var zipCode= document.querySelector('#zip-code-input').value.substring(0,5);


  // filter the stores by zip Code
  var stores_filter = stores.filter(store => store.address.postalCode.includes(zipCode) );


  // display Filtered list
  displayStores(stores_filter);

}

function clearMarkers() {
  setMapOnAll(null);
}


function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}