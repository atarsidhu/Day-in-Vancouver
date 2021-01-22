let map;
let markerAttr;
let markerRest;

let restImages = [];
let streetAddressAttr = "";
let streetAddressRest = "";
let type = "";

// Define array where JSON data will be stored
let attractionArray = [];
let restaurantArray = [];

function initMap() {
  let options = {
    zoom: 13,
    center: { lat: 49.2827, lng: -123.1107 },
  };

  // New Map
  map = new google.maps.Map(document.getElementById("map"), options);

  // markerAttr = new google.maps.Marker({
  //   map: map,
  // });

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

    markerAttr.setPosition(place.geometry.location);
    markerAttr.setVisible(true);
  });

  addMarker({ lat: 49.2844863, lng: -123.108996 });
  addMarker2({ lat: 49.2759736, lng: -123.0693516 });

  // Add marker function
  function addMarker(coords) {
    markerAttr = new google.maps.Marker({
      position: coords,
      map: map,
    });
  }

  function addMarker2(coords) {
    markerRest = new google.maps.Marker({
      position: coords,
      map: map,
    });
  }
}

fetch("./web-scrapes/attractions.json")
  .then((response) => response.json())
  .then((data) => {
    // Retreive all the data and store it into an array
    for (let i = 0; i < data.length; i++) {
      attractionArray[i] = data[i];
    }

    // Populate the attractions list
    let nameOfAttraction = "";

    data.forEach(function (attraction) {
      nameOfAttraction += `
        <div class="card-other-attr">
          ${attraction.name}
        </div>
      `;
    });
    document.querySelector(".other-attr").innerHTML = nameOfAttraction;

    // Populate the featured attraction
    document.querySelector(".attr-title").innerHTML = data[0].name;
    document.querySelector(".attr-image").src = data[0]["image-src"];
    document.querySelector(".attr-desc").innerHTML = data[0]["desc-short"];
  })
  .then(() => {
    loadEventListeners();
  });

fetch("./web-scrapes/restaurants.json")
  .then((response) => response.json())
  .then((data) => {
    // Retreive all the data and store it into an array
    // restaurantArray[0] = data[0];
    // let j = 0;
    // for (let i = 1; i < data.length; i++) {
    //   // WHY CANT WE DO FOREACH ARR WHERE NAME == NAME, ADD IMAGE OR SMTN
    //   if (data[i].name === restaurantArray[j].name) {
    //     restImages.push(data[i]["images-src"]);
    //   } else {
    //     j++;
    //     restaurantArray[j] = data[i];
    //   }
    // }

    for (let i = 0; i < data.length; i++) {
      restaurantArray[i] = data[i];
    }

    // Get a list of restaurant names and remove duplicates
    const uniqueNames = [...new Set(data.map((item) => item.name))];

    // Populate the restaurants list
    let nameOfRestaurant = "";
    uniqueNames.forEach(function (restaurant) {
      nameOfRestaurant += `
        <div class="card-other-rest">
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
  })
  .then(() => {
    loadEventListenersRest();
  });

function loadEventListeners() {
  let theDiv = document.getElementsByClassName("card-other-attr");
  let name;

  for (let i = 0; i < theDiv.length; i++) {
    theDiv[i].addEventListener("click", (e) => {
      name = e.target.innerText;
      window.scrollTo(0, 0);

      for (let j = 0; j < attractionArray.length; j++) {
        if (attractionArray[j].name === name) {
          document.querySelector(".attr-title").innerHTML =
            attractionArray[j].name;
          document.querySelector(".attr-image").src =
            attractionArray[j]["image-src"];

          streetAddressAttr = attractionArray[j].address;

          if (attractionArray[j]["desc-long"] == null) {
            document.querySelector(".attr-desc").innerHTML =
              attractionArray[j]["desc-short"];
          } else {
            document.querySelector(".attr-desc").innerHTML =
              attractionArray[j]["desc-long"];
          }
        }
      }
      type = "attr";
      geocode(streetAddressAttr, type);
    });
  }
}

function loadEventListenersRest() {
  let theDiv = document.getElementsByClassName("card-other-rest");
  let name;

  for (let i = 0; i < theDiv.length; i++) {
    theDiv[i].addEventListener("click", (e) => {
      name = e.target.innerText;
      window.scrollTo(0, 0);

      for (let j = 0; j < restaurantArray.length; j++) {
        if (restaurantArray[j].name === name) {
          document.querySelector(".rest-title").innerHTML =
            restaurantArray[j].name;
          document.querySelector(".rest-image").src =
            restaurantArray[j]["images-src"];
          document.querySelector(".rest-cuisine").innerHTML =
            restaurantArray[j]["cuisine"];
          document.querySelector(".rest-rating").innerHTML =
            restaurantArray[j].rating;

          streetAddressRest = restaurantArray[j].address;
        }
      }
      type = "rest";
      geocode(streetAddressRest, type);
    });
  }
}

function geocode(streetAddress, type) {
  axios
    .get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        address: streetAddress,
        key: "AIzaSyDoWBesVxVWPUv4CMbKqyMmNy5-YNZOlxs",
      },
    })
    .then(function (response) {
      let latLng = response.data.results[0].geometry.location;
      updateMarker(latLng, type);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function updateMarker(latLng, type) {
  if (type == "attr") {
    markerAttr.setPosition(latLng);
  } else {
    markerRest.setPosition(latLng);
  }
  map.panTo(latLng);
}
