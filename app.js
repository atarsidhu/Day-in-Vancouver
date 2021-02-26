// Google Map variables
let map;
let directionsService;
let directionsDisplay;
const markerIconA =
  "data:image/svg+xml,%3Csvg%20version%3D%221.1%22%20width%3D%2227px%22%20height%3D%2243px%22%20viewBox%3D%220%200%2027%2043%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%3Cdefs%3E%0A%3Cpath%20id%3D%22a%22%20d%3D%22m12.5%200c-6.9039%200-12.5%205.5961-12.5%2012.5%200%201.8859%200.54297%203.7461%201.4414%205.4617%203.425%206.6156%2010.216%2013.566%2010.216%2022.195%200%200.46562%200.37734%200.84297%200.84297%200.84297s0.84297-0.37734%200.84297-0.84297c0-8.6289%206.7906-15.58%2010.216-22.195%200.89844-1.7156%201.4414-3.5758%201.4414-5.4617%200-6.9039-5.5961-12.5-12.5-12.5z%22%2F%3E%0A%3C%2Fdefs%3E%0A%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%0A%3Cg%20transform%3D%22translate(1%201)%22%3E%0A%3Cuse%20fill%3D%22%23EA4335%22%20fill-rule%3D%22evenodd%22%20xlink%3Ahref%3D%22%23a%22%2F%3E%0A%3Cpath%20d%3D%22m12.5-0.5c7.18%200%2013%205.82%2013%2013%200%201.8995-0.52398%203.8328-1.4974%205.6916-0.91575%201.7688-1.0177%201.9307-4.169%206.7789-4.2579%206.5508-5.9907%2010.447-5.9907%2015.187%200%200.74177-0.6012%201.343-1.343%201.343s-1.343-0.6012-1.343-1.343c0-4.7396-1.7327-8.6358-5.9907-15.187-3.1512-4.8482-3.2532-5.01-4.1679-6.7768-0.97449-1.8608-1.4985-3.7942-1.4985-5.6937%200-7.18%205.82-13%2013-13z%22%20stroke%3D%22%23fff%22%2F%3E%0A%3C%2Fg%3E%0A%3Ctext%20text-anchor%3D%22middle%22%20dy%3D%220.3em%22%20x%3D%2214%22%20y%3D%2215%22%20font-family%3D%22Roboto%2C%20Arial%2C%20sans-serif%22%20font-size%3D%2216px%22%20fill%3D%22%23FFF%22%3EA%3C%2Ftext%3E%0A%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A";
const markerIconB =
  "data:image/svg+xml,%3Csvg%20version%3D%221.1%22%20width%3D%2227px%22%20height%3D%2243px%22%20viewBox%3D%220%200%2027%2043%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%3Cdefs%3E%0A%3Cpath%20id%3D%22a%22%20d%3D%22m12.5%200c-6.9039%200-12.5%205.5961-12.5%2012.5%200%201.8859%200.54297%203.7461%201.4414%205.4617%203.425%206.6156%2010.216%2013.566%2010.216%2022.195%200%200.46562%200.37734%200.84297%200.84297%200.84297s0.84297-0.37734%200.84297-0.84297c0-8.6289%206.7906-15.58%2010.216-22.195%200.89844-1.7156%201.4414-3.5758%201.4414-5.4617%200-6.9039-5.5961-12.5-12.5-12.5z%22%2F%3E%0A%3C%2Fdefs%3E%0A%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%0A%3Cg%20transform%3D%22translate(1%201)%22%3E%0A%3Cuse%20fill%3D%22%23EA4335%22%20fill-rule%3D%22evenodd%22%20xlink%3Ahref%3D%22%23a%22%2F%3E%0A%3Cpath%20d%3D%22m12.5-0.5c7.18%200%2013%205.82%2013%2013%200%201.8995-0.52398%203.8328-1.4974%205.6916-0.91575%201.7688-1.0177%201.9307-4.169%206.7789-4.2579%206.5508-5.9907%2010.447-5.9907%2015.187%200%200.74177-0.6012%201.343-1.343%201.343s-1.343-0.6012-1.343-1.343c0-4.7396-1.7327-8.6358-5.9907-15.187-3.1512-4.8482-3.2532-5.01-4.1679-6.7768-0.97449-1.8608-1.4985-3.7942-1.4985-5.6937%200-7.18%205.82-13%2013-13z%22%20stroke%3D%22%23fff%22%2F%3E%0A%3C%2Fg%3E%0A%3Ctext%20text-anchor%3D%22middle%22%20dy%3D%220.3em%22%20x%3D%2214%22%20y%3D%2215%22%20font-family%3D%22Roboto%2C%20Arial%2C%20sans-serif%22%20font-size%3D%2216px%22%20fill%3D%22%23FFF%22%3EB%3C%2Ftext%3E%0A%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A";

let streetAddressAttr = "";
let streetAddressRest = "";

let deletethis = "";

let imageIdx = 0;
let numberOfImages = 0;

let startingPointInput = document.getElementById("starting-search");
let destinationPointInput = document.getElementById("destination-search");
let markerArr = [];
let selectedAttr = 0;
let selectedRest = 0;
let isFieldSwitched;

// Waypoint variable declarations
let waypointBtn = document.querySelector(".add-waypoint");
let waypointArr = [];
let waypointSearch = "";
let waypointInput = "";
let waypointID = 0;

let switchBtn = document.querySelector(".btn-switch");
let startingAddress = "";
let destinationAddress = "";
let startingName = "";
let destinationName = "";
let leg = "";

// Define array where JSON data will be stored
let attractionArray = [];
let restaurantArray = [];

/**
 * Initialize Google map
 */
function initMap() {
  // Set options
  let options = {
    zoom: 13,
    center: { lat: 49.2827, lng: -123.1107 },
  };

  // Create Map
  map = new google.maps.Map(document.getElementById("map"), options);

  // Configure search fields
  configAutoComplete(startingPointInput);
  configAutoComplete(destinationPointInput);

  // Initialize Google map required variables
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
}

/**
 * Configure auto complete for search fields
 * @param {input} input - Input field to configure for auto completion
 */
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

    // Variable declarations
    let name = input.value;
    let searchAddress = place.geometry.location;
    let singleWaypoint = {
      id: input.id,
      name: "",
      address: "",
    };

    // If user uses starting search field, create/remove markers
    if (input.className.includes("search-start")) {
      if (destinationPointInput.value === "") {
        createMarker(searchAddress, markerIconA);
      } else {
        removeMarkers();
      }

      streetAddressAttr = searchAddress;
    }
    // If user uses destination search field, create/remove marker
    else if (input.className.includes("search-destination")) {
      if (startingPointInput.value === "") {
        createMarker(searchAddress, markerIconB);
        streetAddressRest = searchAddress;
      } else {
        removeMarkers();
      }

      streetAddressRest = searchAddress;
    }
    // If it's a waypoint
    else {
      // if n'th waypoint exists (We are modifying an existing singleWaypoint)
      if (
        waypointArr.find((singleWaypoint) => singleWaypoint.id === input.id)
      ) {
        for (let i in waypointArr) {
          if (waypointArr[i].id === input.id) {
            waypointArr[i].name = name;
            waypointArr[i].address = searchAddress;
          }
        }
      } else {
        singleWaypoint.name = name;
        singleWaypoint.address = searchAddress;
        waypointArr.push(singleWaypoint);
      }
    }

    getDirections(searchAddress, input.className);
  });
}

/**
 * Fetch attraction data from webscrapes
 */
fetch("./web-scrapes/attractions.json")
  .then((response) => response.json())
  .then((data) => {
    // Iterate through the data and store the contents into an array
    for (let i = 0; i < data.length; i++) {
      attractionArray[i] = data[i];
    }

    // Populate the attractions list
    let nameOfAttraction = "";

    // Create list of non-featured attractions
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

/**
 * Fetch restaurant data from webscrapes
 */
fetch("./web-scrapes/restaurants.json")
  .then((response) => response.json())
  .then((data) => {
    // Iterate through the data and store the contents into an array
    for (let i = 0; i < data.length; i++) {
      restaurantArray[i] = data[i];
    }

    // Create list of non-featured restaurants
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

/**
 * Populate the restaurant images in the imageCarousel
 * @param {number} num - Index number of image to be shown
 */
function loadImages(num) {
  imageIdx = 0;
  numberOfImages = restaurantArray[num]["images-src"].length;

  let images = "";
  for (let i = 0; i < numberOfImages; i++) {
    images += `<img src="${restaurantArray[num]["images-src"][i]}" alt="" class="rest-image" />`;
  }

  let carousel = document.querySelector(".carousel__images");
  carousel.innerHTML = images;

  // Hide all images except the first
  for (let i = 1; i < numberOfImages; i++) {
    carousel.children[i].style.display = "none";
  }

  // Create the dots under the images
  let dot = "";
  for (let i = 0; i < numberOfImages; i++) {
    dot += `<span class="dot"></span>`;
  }

  let dots = document.querySelector(".dots");
  dots.innerHTML = dot;
  dots.firstChild.className = "dot active";
}

/**
 * If waypoint button is clicked, add a waypoint search bar
 */
waypointBtn.addEventListener("click", () => {
  waypointID++;

  // Only allow a maximum of 5 waypoints
  if (waypointID <= 5) {
    waypointSearch = `
      <input
            type="text"
            id="waypoint-${waypointID}"
            class="search search-waypoint"
            placeholder="Choose Stop"
          />`;

    document
      .querySelector(".waypoints")
      .insertAdjacentHTML("beforeend", waypointSearch);
    document.querySelector(".popup-stop").className = "popup-stop not-hovering";

    waypointInput = document.getElementsByClassName("search-waypoint");

    configAutoComplete(waypointInput[waypointID - 1]);
  } else {
    alert("Maximum stops reached");
  }
});

// Mouseover popups
waypointBtn.addEventListener("mouseover", () => {
  document.querySelector(".popup-stop").className = "popup-stop hovering";
});

waypointBtn.addEventListener("mouseout", () => {
  document.querySelector(".popup-stop").className = "popup-stop not-hovering";
});

/**
 * If switch button is clicked, switch the text in the search fields
 */
switchBtn.addEventListener("click", () => {
  let temp = "";
  isFieldSwitched = true;

  // Switch text in input fields
  temp = startingPointInput.value;
  startingPointInput.value = destinationPointInput.value;
  destinationPointInput.value = temp;

  getDirections("", "");
});

// Mouseover popups
switchBtn.addEventListener("mouseover", () => {
  document.querySelector(".popup-switch").className = "popup-switch hovering";
});

switchBtn.addEventListener("mouseout", () => {
  document.querySelector(".popup-switch").className =
    "popup-switch not-hovering";
});

/**
 * Create click event listners for each list member and change the featured attraction
 */
function loadEventListeners() {
  const otherAttr = document.getElementsByClassName("card-other-attr");
  let name;

  for (let i = 0; i < otherAttr.length; i++) {
    otherAttr[i].addEventListener("click", (e) => {
      name = e.target.innerText;
      window.scrollTo(0, 0);
      startingPointInput.value = name;

      // Change background of selected attr
      otherAttr[selectedAttr].className = "card-other-attr";
      selectedAttr = i;
      e.target.className = "card-other-attr selected";

      // Change the featured attraction
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
      removeMarkers();
    });
  }
}

/**
 * Create click event listners for each list member and change the featured restaurant
 */
function loadEventListenersRest() {
  const otherRest = document.getElementsByClassName("card-other-rest");
  const carouselButtons = document.getElementsByClassName("btn");
  let restImages = document.getElementsByClassName("rest-image");
  let dots = document.getElementsByClassName("dot");
  let name;

  for (let i = 0; i < otherRest.length; i++) {
    otherRest[i].addEventListener("click", (e) => {
      name = e.target.innerText;
      window.scrollTo(0, 0);
      destinationPointInput.value = name;

      // Change background of selected rest
      otherRest[selectedRest].className = "card-other-rest";
      selectedRest = i;
      e.target.className = "card-other-rest selected";

      // Change the featured restaurant
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
      removeMarkers();
    });
  }

  // Image carousel
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

/**
 * Get directions from selected places
 * @param {string} streetAddress - Address of the place.
 * @param {string} className - Name of the class. To determine which input is being used.
 */
function getDirections(streetAddress, className) {
  // Find out where the place if coming from: List or Search bar
  for (let i = 0; i < attractionArray.length; i++) {
    // If place is selected from list
    if (streetAddress === attractionArray[i].address) {
      startingName = attractionArray[i].name;
      startingAddress = streetAddress;
      break;
    }
    if (streetAddress === restaurantArray[i].address) {
      destinationName = restaurantArray[i].name;
      destinationAddress = streetAddress;
      break;
    }

    // If place is searched for in search bar
    if (i == 28) {
      if (className.includes("search-start")) {
        startingName = startingPointInput.value;
        startingAddress = streetAddress;
      }
      if (className.includes("search-destination")) {
        destinationName = destinationPointInput.value;
        destinationAddress = streetAddress;
      }
    }
  }

  // If directions need to be switched
  if (isFieldSwitched) {
    let temp = "";

    temp = startingAddress;
    startingAddress = destinationAddress;
    destinationAddress = temp;

    startingName = startingPointInput.value;
    destinationName = destinationPointInput.value;

    isFieldSwitched = false;
  }

  let request = "";

  // If both fields are not empty
  if (startingAddress !== "" && destinationAddress !== "") {
    directionsDisplay.setMap(map);

    if (waypointArr.length > 0) {
      let waypointAddresses = [];
      for (let i = 0; i < waypointArr.length; i++) {
        waypointAddresses.push({ location: waypointArr[i].address });
      }

      request = {
        origin: startingAddress,
        destination: destinationAddress,
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: waypointAddresses,
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

        leg.start_address = startingName;
        leg.end_address = destinationName;

        // Change names of direction points
        if (waypointArr.length > 0) {
          let route = response.routes[0];
          for (let i = 0; i < waypointArr.length; i++) {
            route.legs[i].end_address = waypointArr[i].name;
          }

          route.legs[waypointArr.length].end_address = destinationName;
        }
      }
    });

    let panel = document.querySelector(".map-panel");
    directionsDisplay.setPanel(panel);
  }
}

/**
 * Remove all markers from the map
 */
function removeMarkers() {
  for (let i = 0; i < markerArr.length; i++) {
    markerArr[i].setMap(null);
  }
}

/**
 * Create a marker and place it in the correct position
 * @param {location} position - Poisition of marker.
 * @param {string} icon - Icon of marker
 */
function createMarker(position, icon) {
  let marker = new google.maps.Marker({
    position: position,
    map: map,
    icon: icon,
  });

  markerArr.push(marker);
}
