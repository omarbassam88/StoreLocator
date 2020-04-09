var map = map;

var markers = [];

var infoWindow;

var infoWindows = [];

// Adding Event Listeners to Store Containers

window.onload = () => {
  displayStores();
  // Add event Listeners to
  var storeContainers = document.querySelectorAll(".store-container");
  for (let i = 0; i < storeContainers.length; i++) {
    storeContainers[i].addEventListener("click", focusStore);
  }
  console.log(storeContainers);
};

function initMap() {
  var cairo = {
    lat: 30.0444,
    lng: 31.2357,
  };

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

  // Adding a  marker to the map
  var marker = new google.maps.Marker({ position: cairo, map: map });
}

function displayStores() {
  var storeHtml = "";

  for (var store of stores) {
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
        <div class="store-number">${stores.indexOf(store) + 1}</div>
      </div>      
    </div>
    `;

    document.querySelector(".stores-list").innerHTML = storeHtml;

    createMarker(store);
  }
}

function createMarker(store) {
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
    label: (stores.indexOf(store) + 1).toString(),
    icon: iconBase + '190201-2016-animal-paw_4x.png'
  });

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
  map.setCenter(pos);
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