let map;
let markerAttr;
let markerRest;
const markerIcon =
  "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_red.png";
let restImages = [];
let streetAddressAttr = "";
let streetAddressRest = "";
let latLngBounds = [];
let imageIdx = 0;

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
  latLngBounds = [
    new google.maps.LatLng(49.2844863, -123.108996),
    new google.maps.LatLng(49.2759736, -123.0693516),
  ];

  // Add marker function
  function addMarker(coords) {
    markerAttr = new google.maps.Marker({
      position: coords,
      map: map,
    });

    setMarkerIcon(markerAttr, "Steam Clock");
  }

  function addMarker2(coords) {
    markerRest = new google.maps.Marker({
      position: coords,
      map: map,
    });

    setMarkerIcon(markerRest, "Absinthe Bistro");
  }
}

function setMarkerIcon(markerType, name) {
  markerType.setLabel({
    color: "red",
    fontWeight: "bold",
    text: name,
  });
  markerType.setIcon({
    labelOrigin: new google.maps.Point(11, 48),
    url: markerIcon,
    size: new google.maps.Size(30, 40),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(11, 40),
  });
}

fetch("./web-scrapes/attractions.json")
  .then((response) => response.json())
  .then((data) => {
    // Iterate through the data and store the contents into an array
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
/////////////////////////////////////
let numberOfImages = 0;
let imageArray = [];
////////////////////////////////////

fetch("./web-scrapes/restaurants.json")
  .then((response) => response.json())
  .then((data) => {
    // Iterate through the data and store the contents into an array
    for (let i = 0; i < data.length; i++) {
      restaurantArray[i] = data[i];
    }

    // Populate the restaurants list
    let nameOfRestaurant = "";
    data.forEach(function (restaurant) {
      nameOfRestaurant += `
        <div class="card-other-rest">
          ${restaurant.name}
        </div>
      `;
    });
    document.querySelector(".other-rest").innerHTML = nameOfRestaurant;

    // Populate the featured restaurant
    document.querySelector(".rest-title").innerHTML = data[0].name;
    document.querySelector(".rest-image").src = data[0]["images-src"][0];
    document.querySelector(".rest-cuisine").innerHTML = data[0].cuisine;
    document.querySelector(".rest-menu").href = data[0]["menu-href"];
    document.querySelector(".rest-rating").innerHTML = data[0].rating;

    loadImages(0);
  })
  .then(() => {
    loadEventListenersRest();
  });

function loadImages(num) {
  imageIdx = 0;
  numberOfImages = restaurantArray[num]["images-src"].length;

  let images = "";
  for (let i = 0; i < numberOfImages; i++) {
    images += `
        <div class="carousel__images">
          <img src="${restaurantArray[num]["images-src"][i]}" alt="" class="rest-image" />
        </div>`;
  }

  document.querySelector(".carousel").innerHTML = images;
  let test = document.querySelector(".carousel");

  for (let i = 1; i < numberOfImages; i++) {
    test.children[i].style.display = "none";
  }
}

function loadEventListeners() {
  const theDiv = document.getElementsByClassName("card-other-attr");
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
      geocode(streetAddressAttr, markerAttr, name);
    });
  }
}

function loadEventListenersRest() {
  const theDiv = document.getElementsByClassName("card-other-rest");
  const carouselButtons = document.getElementsByClassName("carousel__button");
  let carouselImages = document.getElementsByClassName("carousel__images");
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
            restaurantArray[j]["images-src"][0];
          document.querySelector(".rest-cuisine").innerHTML =
            restaurantArray[j]["cuisine"];
          document.querySelector(".rest-rating").innerHTML =
            restaurantArray[j].rating;
          document.querySelector(".rest-menu").href =
            restaurantArray[j]["menu-href"];

          streetAddressRest = restaurantArray[j].address;

          numberOfImages = restaurantArray[j]["images-src"].length;

          loadImages(j);
        }
      }
      geocode(streetAddressRest, markerRest, name);
    });
  }

  Array.from(carouselButtons).forEach((button) => {
    button.addEventListener("click", (e) => {
      if (e.target.id === "prev") {
        if (imageIdx !== 0) {
          carouselImages[imageIdx].style.display = "none";
          imageIdx--;
          carouselImages[imageIdx].style.display = "block";
        }
      } else {
        if (imageIdx !== numberOfImages - 1) {
          carouselImages[imageIdx].style.display = "none";
          imageIdx++;
          carouselImages[imageIdx].style.display = "block";
        }
      }
    });
  });
}

function geocode(streetAddress, markerType, name) {
  axios
    .get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        address: streetAddress,
        key: "AIzaSyDoWBesVxVWPUv4CMbKqyMmNy5-YNZOlxs",
      },
    })
    .then(function (response) {
      let latLng = response.data.results[0].geometry.location;
      updateMarker(latLng, markerType, name);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function updateMarker(latLng, markerType, name) {
  let infoWindow = new google.maps.InfoWindow({
    content: `<h4>${name}</h4>`,
  });

  markerType.setPosition(latLng);

  setMarkerIcon(markerType, name);

  // markerType.addListener("mouseover", () => {
  //   infoWindow.open(map, markerType);
  // });
  // markerType.addListener("mouseout", () => {
  //   infoWindow.close();
  // });

  map.panTo(latLng);
  //map.setZoom(14);

  let myStyle = [
    {
      featureType: "administrative",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road",
      elementType: "labels",
      stylers: [{ visibility: "on" }],
    },
    {
      featureType: "transit",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
  ];

  map.setMapTypeId("mystyle");
  map.mapTypes.set(
    "mystyle",
    new google.maps.StyledMapType(myStyle, { name: "My Style" })
  );

  // Check to see if name is an attraction name or restaurant name
  for (let i = 0; i < attractionArray.length; i++) {
    if (name === attractionArray[i].name) {
      latLngBounds[0] = latLng;
      console.log("Attr: " + name);
      break;
    }
    if (name === restaurantArray[i].name) {
      latLngBounds[1] = latLng;
      console.log("Rest: " + name);
      break;
    }
  }

  let bounds = new google.maps.LatLngBounds();
  for (let i = 0; i < latLngBounds.length; i++) {
    bounds.extend(latLngBounds[i]);
  }
  map.fitBounds(bounds);
}
