let map;
let markerAttr;
let markerRest;
//const markerIcon =
//  "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_red.png";
const markerIconA =
  "data:image/svg+xml,%3Csvg%20version%3D%221.1%22%20width%3D%2227px%22%20height%3D%2243px%22%20viewBox%3D%220%200%2027%2043%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%3Cdefs%3E%0A%3Cpath%20id%3D%22a%22%20d%3D%22m12.5%200c-6.9039%200-12.5%205.5961-12.5%2012.5%200%201.8859%200.54297%203.7461%201.4414%205.4617%203.425%206.6156%2010.216%2013.566%2010.216%2022.195%200%200.46562%200.37734%200.84297%200.84297%200.84297s0.84297-0.37734%200.84297-0.84297c0-8.6289%206.7906-15.58%2010.216-22.195%200.89844-1.7156%201.4414-3.5758%201.4414-5.4617%200-6.9039-5.5961-12.5-12.5-12.5z%22%2F%3E%0A%3C%2Fdefs%3E%0A%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%0A%3Cg%20transform%3D%22translate(1%201)%22%3E%0A%3Cuse%20fill%3D%22%23EA4335%22%20fill-rule%3D%22evenodd%22%20xlink%3Ahref%3D%22%23a%22%2F%3E%0A%3Cpath%20d%3D%22m12.5-0.5c7.18%200%2013%205.82%2013%2013%200%201.8995-0.52398%203.8328-1.4974%205.6916-0.91575%201.7688-1.0177%201.9307-4.169%206.7789-4.2579%206.5508-5.9907%2010.447-5.9907%2015.187%200%200.74177-0.6012%201.343-1.343%201.343s-1.343-0.6012-1.343-1.343c0-4.7396-1.7327-8.6358-5.9907-15.187-3.1512-4.8482-3.2532-5.01-4.1679-6.7768-0.97449-1.8608-1.4985-3.7942-1.4985-5.6937%200-7.18%205.82-13%2013-13z%22%20stroke%3D%22%23fff%22%2F%3E%0A%3C%2Fg%3E%0A%3Ctext%20text-anchor%3D%22middle%22%20dy%3D%220.3em%22%20x%3D%2214%22%20y%3D%2215%22%20font-family%3D%22Roboto%2C%20Arial%2C%20sans-serif%22%20font-size%3D%2216px%22%20fill%3D%22%23FFF%22%3EA%3C%2Ftext%3E%0A%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A";
const markerIconB =
  "data:image/svg+xml,%3Csvg%20version%3D%221.1%22%20width%3D%2227px%22%20height%3D%2243px%22%20viewBox%3D%220%200%2027%2043%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%3Cdefs%3E%0A%3Cpath%20id%3D%22a%22%20d%3D%22m12.5%200c-6.9039%200-12.5%205.5961-12.5%2012.5%200%201.8859%200.54297%203.7461%201.4414%205.4617%203.425%206.6156%2010.216%2013.566%2010.216%2022.195%200%200.46562%200.37734%200.84297%200.84297%200.84297s0.84297-0.37734%200.84297-0.84297c0-8.6289%206.7906-15.58%2010.216-22.195%200.89844-1.7156%201.4414-3.5758%201.4414-5.4617%200-6.9039-5.5961-12.5-12.5-12.5z%22%2F%3E%0A%3C%2Fdefs%3E%0A%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%0A%3Cg%20transform%3D%22translate(1%201)%22%3E%0A%3Cuse%20fill%3D%22%23EA4335%22%20fill-rule%3D%22evenodd%22%20xlink%3Ahref%3D%22%23a%22%2F%3E%0A%3Cpath%20d%3D%22m12.5-0.5c7.18%200%2013%205.82%2013%2013%200%201.8995-0.52398%203.8328-1.4974%205.6916-0.91575%201.7688-1.0177%201.9307-4.169%206.7789-4.2579%206.5508-5.9907%2010.447-5.9907%2015.187%200%200.74177-0.6012%201.343-1.343%201.343s-1.343-0.6012-1.343-1.343c0-4.7396-1.7327-8.6358-5.9907-15.187-3.1512-4.8482-3.2532-5.01-4.1679-6.7768-0.97449-1.8608-1.4985-3.7942-1.4985-5.6937%200-7.18%205.82-13%2013-13z%22%20stroke%3D%22%23fff%22%2F%3E%0A%3C%2Fg%3E%0A%3Ctext%20text-anchor%3D%22middle%22%20dy%3D%220.3em%22%20x%3D%2214%22%20y%3D%2215%22%20font-family%3D%22Roboto%2C%20Arial%2C%20sans-serif%22%20font-size%3D%2216px%22%20fill%3D%22%23FFF%22%3EB%3C%2Ftext%3E%0A%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A";
let streetAddressAttr = "";
let streetAddressRest = "";
let latLngBounds = [];
let imageIdx = 0;
let numberOfImages = 0;
let directionsService;
let directionsDisplay;
let infoWindow;
let startingPointInput;
let destinationPointInput;
let marker;
let selectedAttr = 0;
let selectedRest = 0;
let waypointBtn;

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

  startingPointInput = document.getElementById("starting-search");
  destinationPointInput = document.getElementById("destination-search");
  configAutoComplete(startingPointInput);
  configAutoComplete(destinationPointInput);
  //map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  infoWindow = new google.maps.InfoWindow();
  // directionsDisplay = new google.maps.DirectionsRenderer({
  //   suppressMarkers: true,
  // });
}

function configAutoComplete(input) {
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
    }

    let searchAddress = place.geometry.location;

    if (startingPointInput.value !== "" && destinationPointInput.value !== "") {
      getDirections(searchAddress, input.id);
    } else {
      if (input.id === "starting-search") {
        if (destinationPointInput.value === "") {
          createMarker(searchAddress, markerIconA);
        } else {
          removeMarker();
        }
      } else {
        if (startingPointInput.value === "") {
          createMarker(searchAddress, markerIconB);
        } else {
          removeMarker();
        }
      }
      getDirections(searchAddress, input.id);
    }
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

let waypointSearch = "";
waypointBtn = document.querySelector(".add-waypoint");
let waypointInput = "";

waypointBtn.addEventListener("click", () => {
  waypointSearch += `
    <input
          type="text"
          id="waypoint-search"
          class="search"
          placeholder="Choose Stop"
        />`;

  document.querySelector(".waypoints").innerHTML = waypointSearch;
  document.querySelector(".popup").className = "popup not-hovering";

  waypointInput = document.getElementById("waypoint-search");
  configAutoComplete(waypointInput);
});

waypointBtn.addEventListener("mouseover", () => {
  document.querySelector(".popup").className = "popup hovering";
});

waypointBtn.addEventListener("mouseout", () => {
  document.querySelector(".popup").className = "popup not-hovering";
});

function loadEventListeners() {
  const theDiv = document.getElementsByClassName("card-other-attr");
  let name;

  for (let i = 0; i < theDiv.length; i++) {
    theDiv[i].addEventListener("click", (e) => {
      name = e.target.innerText;
      window.scrollTo(0, 0);
      startingPointInput.value = name;

      // Change background of selected attr
      theDiv[selectedAttr].className = "card-other-attr";
      selectedAttr = i;
      e.target.className = "card-other-attr selected";

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

      getDirections(streetAddressAttr, name);
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
      destinationPointInput.value = name;

      // Change background of selected rest
      theDiv[selectedRest].className = "card-other-rest";
      selectedRest = i;
      e.target.className = "card-other-rest selected";

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

      getDirections(streetAddressRest, name);
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

let startingAddress = "";
let destinationAddress = "";
let waypointAddress = "";
let startingName = "";
let destinationName = "";
let waypointName = "";
let leg = "";

function getDirections(streetAddress, name) {
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

  for (let i = 0; i < attractionArray.length; i++) {
    if (streetAddress === attractionArray[i].address) {
      startingName = name;
      startingAddress = streetAddress;
      break;
    }
    if (streetAddress === restaurantArray[i].address) {
      destinationName = name;
      destinationAddress = streetAddress;
      break;
    }
    //If choosing a place from input fields
    if (i == 28) {
      if (name === "starting-search") {
        startingName = startingPointInput.value;
        startingAddress = streetAddress;
        console.log(startingName + " " + startingAddress);
      }
      if (name === "destination-search") {
        destinationName = destinationPointInput.value;
        destinationAddress = streetAddress;
        console.log(destinationName + " " + destinationAddress);
      }
      if (name === "waypoint-search") {
        waypointName = waypointInput.value;
        waypointAddress = streetAddress;
        console.log(waypointName + " " + waypointAddress);
      }
    }
  }

  let request = "";

  if (startingAddress !== "" && destinationAddress !== "") {
    directionsDisplay.setMap(map);

    if (waypointAddress !== "") {
      let waypoint = [{ location: waypointAddress }];

      request = {
        origin: startingAddress,
        destination: destinationAddress,
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: waypoint,
      };
    } else {
      request = {
        origin: startingAddress,
        destination: destinationAddress,
        travelMode: google.maps.TravelMode.DRIVING,
      };
    }

    directionsService.route(request, function (response, status) {
      if (status === "OK") {
        directionsDisplay.setDirections(response);
        leg = response.routes[0].legs[0];
        //infoWindow.close();

        let content = `<div class="info-window">
        <h3 class="info-title">${startingName}</h3>
        </div>`;
        infoWindow.setContent(content);
        infoWindow.setPosition(leg.start_location);

        leg.start_address = startingName;
        leg.end_address = destinationName;

        if (waypointAddress !== "") {
          response.routes[0].legs[1].end_address = waypointInput;
        }

        console.log(response);
      }
    });

    let panel = document.querySelector(".map-panel");
    directionsDisplay.setPanel(panel);
    //map.controls[google.maps.ControlPosition.LEFT_CENTER].push(panel);
  }
}

function removeMarker() {
  marker.setMap(null);
}

function createMarker(position, icon) {
  marker = new google.maps.Marker({
    position: position,
    map: map,
    icon: icon,
  });

  // marker.setLabel({
  //   color: "black",
  //   fontWeight: "bold",
  //   text: name,
  // });

  // marker.setIcon({
  //   labelOrigin: new google.maps.Point(11, 48),
  //   url: icon,
  //   size: new google.maps.Size(30, 40),
  //   origin: new google.maps.Point(0, 0),
  //   anchor: new google.maps.Point(11, 40),
  // });
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

//   //map.panTo(latLng);
//   //map.setZoom(14);

//   // let myStyle = [
//   //   {
//   //     featureType: "administrative",
//   //     elementType: "labels",
//   //     stylers: [{ visibility: "off" }],
//   //   },
//   //   {
//   //     featureType: "poi",
//   //     elementType: "labels",
//   //     stylers: [{ visibility: "off" }],
//   //   },
//   //   {
//   //     featureType: "road",
//   //     elementType: "labels",
//   //     stylers: [{ visibility: "on" }],
//   //   },
//   //   {
//   //     featureType: "transit",
//   //     elementType: "labels.icon",
//   //     stylers: [{ visibility: "off" }],
//   //   },
//   // ];

//   // map.setMapTypeId("mystyle");
//   // map.mapTypes.set(
//   //   "mystyle",
//   //   new google.maps.StyledMapType(myStyle, { name: "My Style" })
//   // );

//   // // Check to see if name is an attraction name or restaurant name
//   // for (let i = 0; i < attractionArray.length; i++) {
//   //   if (name === attractionArray[i].name) {
//   //     latLngBounds[0] = latLng;
//   //     console.log("Attr: " + name);
//   //     break;
//   //   }
//   //   if (name === restaurantArray[i].name) {
//   //     latLngBounds[1] = latLng;
//   //     console.log("Rest: " + name);
//   //     break;
//   //   }
//   // }

//   // let bounds = new google.maps.LatLngBounds();
//   // for (let i = 0; i < latLngBounds.length; i++) {
//   //   bounds.extend(latLngBounds[i]);
//   // }
//   // map.fitBounds(bounds);
// }

/*
TODO:
- Scroll for each section attr/rest. When scrolling down, shrink the featured. Then expand when back up
- Attr pics?
- Rest hours. Display as a small popup?
- Use the Matrix API to calc the distance between the current attr/rest and the others. Display distances 
  beside name in others section
  
- Markers can be two attr/rest. Doesnt have to be 1 of each. Add additional markers?
- Flip directions/ Make rest be marker A
- Styling
*/
