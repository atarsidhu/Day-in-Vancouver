let map;
let markerAttr;
let markerRest;
const markerIcon =
  "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_red.png";
let streetAddressAttr = "";
let streetAddressRest = "";
let latLngBounds = [];
let imageIdx = 0;
let numberOfImages = 0;
let directionsService;
let directionsRenderer;

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

  //addMarker({ lat: 49.2844863, lng: -123.108996 });
  //addMarker2({ lat: 49.2759736, lng: -123.0693516 });
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

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
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
    images += `<img src="${restaurantArray[num]["images-src"][i]}" alt="" class="rest-image" />`;
  }

  let carousel = document.querySelector(".carousel__images");
  carousel.innerHTML = images;

  for (let i = 1; i < numberOfImages; i++) {
    carousel.children[i].style.display = "none";
  }

  let dot = "";
  for (let i = 0; i < numberOfImages; i++) {
    dot += `<span class="dot"></span>`;
  }

  let dots = document.querySelector(".dots");
  dots.innerHTML = dot;
  dots.firstChild.className = "dot active";
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
      //geocode(streetAddressAttr, markerAttr, name);
      //console.log(streetAddressAttr);
      getDirections(streetAddressAttr);
    });
  }
}

function loadEventListenersRest() {
  const theDiv = document.getElementsByClassName("card-other-rest");
  const carouselButtons = document.getElementsByClassName("btn");
  let restImages = document.getElementsByClassName("rest-image");
  let dots = document.getElementsByClassName("dot");
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
      //geocode(streetAddressRest, markerRest, name);
      getDirections(streetAddressRest);
    });
  }

  Array.from(carouselButtons).forEach((button) => {
    button.addEventListener("click", (e) => {
      if (e.target.id === "prev") {
        if (imageIdx !== 0) {
          restImages[imageIdx].style.display = "none";
          dots[imageIdx].className = "dot";
          imageIdx--;
          restImages[imageIdx].style.display = "block";
          dots[imageIdx].className = "dot active";
        }
      } else {
        if (imageIdx !== numberOfImages - 1) {
          restImages[imageIdx].style.display = "none";
          dots[imageIdx].className = "dot";
          imageIdx++;
          restImages[imageIdx].style.display = "block";
          dots[imageIdx].className = "dot active";
        }
      }
    });
  });
}

// function geocode(streetAddress, markerType, name) {
//   axios
//     .get("https://maps.googleapis.com/maps/api/geocode/json", {
//       params: {
//         address: streetAddress,
//         key: "AIzaSyDoWBesVxVWPUv4CMbKqyMmNy5-YNZOlxs",
//       },
//     })
//     .then(function (response) {
//       //let latLng = response.data.results[0].geometry.location;
//       //updateMarker(latLng, markerType, name);
//       // let placeID = response.data.results[0].place_id;
//       // distanceMatrix(placeID);
//       //console.log(response.data.results[0].geometry.location);
//       //console.log(streetAddress);

//       //getDirections(streetAddress);
//       // Check to see if name is an attraction name or restaurant name
//       for (let i = 0; i < attractionArray.length; i++) {
//         if (name === attractionArray[i].name) {
//           let placeIdAttr = response.data.results[0].place_id;
//           getDirections(placeIdAttr);
//           break;
//         }
//         if (name === restaurantArray[i].name) {
//           let placeIdRest = response.data.results[0].place_id;
//           getDirections(placeIdRest);
//           break;
//         }
//       }
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }
let start = "305 Water St, Vancouver, British Columbia V6B 1B8 Canada";
let end = "952 Commercial Dr, Vancouver, British Columbia V5L 3W7 Canada";

function getDirections(streetAddress) {
  // let proxyURL = "https://cors-anywhere.herokuapp.com/";
  // let url =
  //   "https://maps.googleapis.com/maps/api/directions/json?origin=place_id:ChIJDWe3Lp1xhlQRFVVrQy7psuA&destination=place_id:ChIJOVXSPT5xhlQRZVWgqcWl4bY&key=AIzaSyDoWBesVxVWPUv4CMbKqyMmNy5-YNZOlxs";
  // fetch(proxyURL + url)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  let name = "";

  for (let i = 0; i < attractionArray.length; i++) {
    if (streetAddress === attractionArray[i].address) {
      //let placeIdAttr = response.data.results[0].place_id;
      name = attractionArray[i].name;
      start = streetAddress;
      break;
    }
    if (streetAddress === restaurantArray[i].address) {
      //let placeIdRest = response.data.results[0].place_id;
      end = streetAddress;
      break;
    }
  }

  directionsRenderer.setMap(map);

  let request = {
    origin: start,
    destination: end,
    travelMode: google.maps.TravelMode.DRIVING,
  };

  directionsService.route(request, function (response, status) {
    if (status === "OK") {
      directionsRenderer.setDirections(response);
      console.log(response);

      // markerType.setLabel({
      //   color: "red",
      //   fontWeight: "bold",
      //   text: name,
      // });
      // markerType.setIcon({
      //   labelOrigin: new google.maps.Point(11, 48),
      //   url: markerIcon,
      //   size: new google.maps.Size(30, 40),
      //   origin: new google.maps.Point(0, 0),
      //   anchor: new google.maps.Point(11, 40),
      // });

      // let marker = new google.maps.Marker({
      //   position: start,
      //   map: map,
      //   label: name
      // });
    }
  });

  let panel = document.querySelector(".map-panel");
  directionsRenderer.setPanel(panel);
  //map.controls[google.maps.ControlPosition.LEFT_CENTER].push(panel);
}

// function updateMarker(latLng, markerType, name) {
//   let infoWindow = new google.maps.InfoWindow({
//     content: `<h4>${name}</h4>`,
//   });

//   markerType.setPosition(latLng);

//   setMarkerIcon(markerType, name);

//   // markerType.addListener("mouseover", () => {
//   //   infoWindow.open(map, markerType);
//   // });
//   // markerType.addListener("mouseout", () => {
//   //   infoWindow.close();
//   // });

//   map.panTo(latLng);
//   //map.setZoom(14);

//   let myStyle = [
//     {
//       featureType: "administrative",
//       elementType: "labels",
//       stylers: [{ visibility: "off" }],
//     },
//     {
//       featureType: "poi",
//       elementType: "labels",
//       stylers: [{ visibility: "off" }],
//     },
//     {
//       featureType: "road",
//       elementType: "labels",
//       stylers: [{ visibility: "on" }],
//     },
//     {
//       featureType: "transit",
//       elementType: "labels.icon",
//       stylers: [{ visibility: "off" }],
//     },
//   ];

//   map.setMapTypeId("mystyle");
//   map.mapTypes.set(
//     "mystyle",
//     new google.maps.StyledMapType(myStyle, { name: "My Style" })
//   );

//   // Check to see if name is an attraction name or restaurant name
//   for (let i = 0; i < attractionArray.length; i++) {
//     if (name === attractionArray[i].name) {
//       latLngBounds[0] = latLng;
//       console.log("Attr: " + name);
//       break;
//     }
//     if (name === restaurantArray[i].name) {
//       latLngBounds[1] = latLng;
//       console.log("Rest: " + name);
//       break;
//     }
//   }

//   let bounds = new google.maps.LatLngBounds();
//   for (let i = 0; i < latLngBounds.length; i++) {
//     bounds.extend(latLngBounds[i]);
//   }
//   map.fitBounds(bounds);
// }

/*
TODO:
- Scroll for each section attr/rest. When scrolling down, shrink the featured. Then expand when back up
- Marker work
- Attr pics?
- Rest hours. Display as a small popup?
- Written directions under map
- Use the Matrix API to calc the distance between the current attr/rest and the others. Display distances 
	beside name in others section
- Bring search bar back. Ask user if searched item is rest/attr
*/
