function initMap() {
  let options = {
    zoom: 13,
    center: { lat: 49.2827, lng: -123.1207 },
  };

  // New Map
  let map = new google.maps.Map(document.getElementById("map"), options);

  let marker = new google.maps.Marker({
    map: map,
  });

  let input = document.getElementById("search");
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  let autoComplete = new google.maps.places.Autocomplete(input);
  autoComplete.bindTo("bounds", map);

  autoComplete.addListener("place_changed", function () {
    let place = autoComplete.getPlace();

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
            let marker = new google.maps.Marker({
                position: {lat: 49.3043,lng: -123.1443},
                map: map
            });

            // Popup above marker
            let infoWindow = new google.maps.InfoWindow({
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
    console.log(data[0].name);
    //document.querySelector(".attr-title").innerHTML = data[0].name;

    // Populate the attractions list
    let nameOfAttraction = "";
    data.forEach(function (attraction) {
      nameOfAttraction += `
        <div class="card-other">
          ${attraction.name}
        </div>
      `;
    });
    // document.getElementsByClassName("card-wrapper-other").innerHTML = nameOfAttraction;
    document.querySelector(".other-attr").innerHTML = nameOfAttraction;

    // Populate the featured attraction
    document.querySelector(".attr-title").innerHTML = data[0].name;
    document.querySelector(".attr-image").src = data[0]["image-src"];
    document.querySelector(".attr-desc").innerHTML = data[0]["desc-short"];
    //document.querySelector(".attr-address").innerHTML = data[0].address;
  });

fetch("./web-scrapes/restaurants.json")
  .then((response) => response.json())
  .then((data) => {
    const uniqueNames = [...new Set(data.map((item) => item.name))];
    console.log(uniqueNames);

    // Populate the restaurants list
    let nameOfRestaurant = "";
    uniqueNames.forEach(function (restaurant) {
      nameOfRestaurant += `
        <div class="card-other">
          ${restaurant}
        </div>
      `;
    });
    document.querySelector(".other-rest").innerHTML = nameOfRestaurant;

    // Populate the featured restaurant
    document.querySelector(".rest-title").innerHTML = data[0].name;
    document.querySelector(".rest-image").src = data[0]["images-src"];
    document.querySelector(".rest-cuisine").innerHTML = data[0].cuisine;
    document.querySelector(".rest-menu").href = data[0]["menu-href"];
    document.querySelector(".rest-rating").innerHTML = data[0].rating;
  });

function displayCard() {
  // document.querySelectorAll(".acc__btn").forEach((button) => {
  //   button.addEventListener("click", () => {
  //     const accordianContent = button.nextElementSibling;
  //     button.classList.toggle("acc__btn--active");
  //     if (button.classList.contains("acc__btn--active")) {
  //       accordianContent.style.maxHeight = accordianContent.scrollHeight + "px";
  //     } else {
  //       accordianContent.style.maxHeight = 0;
  //     }
  //   });
  // });

  let acc = document.getElementsByClassName("acc__btn");
  let i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      const accordianContent = this.nextElementSibling;
      this.classList.toggle("acc__btn--active");
      if (this.classList.contains("acc__btn--active")) {
        accordianContent.style.maxHeight = accordianContent.scrollHeight + "px";
      } else {
        accordianContent.style.maxHeight = 0;
      }
    });
  }

  console.log(acc.length);
}

displayCard();
