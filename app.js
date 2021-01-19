function initMap() {
  var options = {
    zoom: 13,
    center: { lat: 49.2827, lng: -123.1207 },
  };

  // New Map
  var map = new google.maps.Map(document.getElementById("map"), options);

  var marker = new google.maps.Marker({
    map: map,
  });

  var input = document.getElementById("search");
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var autoComplete = new google.maps.places.Autocomplete(input);
  autoComplete.bindTo("bounds", map);

  autoComplete.addListener("place_changed", function () {
    var place = autoComplete.getPlace();

    if (!place.geometry) {
      window.alert("Undefined");
      return;
    }

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.viewport);
      //map.setZoom(17);
    }

    marker.setPosition(place.geometry.location);
    //marker.setVisible(true);
  });

  /*
            // Add Marker
            var marker = new google.maps.Marker({
                position: {lat: 49.3043,lng: -123.1443},
                map: map
            });

            // Popup above marker
            var infoWindow = new google.maps.InfoWindow({
                content:'<h4>Stanley Park</h4>'
            });

            marker.addListener('click', function(){
                infoWindow.open(map, marker);
            })
    */

  //addMarker({ lat: 49.3043, lng: -123.1443 });
  //addMarker({ lat: 49.28877, lng: -123.11767 });

  // Add marker function
  function addMarker(coords) {
    marker = new google.maps.Marker({
      position: coords,
      map: map,
    });
  }
}

fetch("./web-scrapes/attractions.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    document.querySelector(".attr-title").innerHTML = data[0].name;
  });
