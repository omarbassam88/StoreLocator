var map;


function initMap() {
    var cairo = {
        lat : 30.0444,
        lng : 31.2357
    };

  map = new google.maps.Map(document.getElementById('map'), {
    center: cairo,
    zoom: 8
  });

  var marker = new google.maps.Marker({position: cairo, map: map});
}