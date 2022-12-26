// Current day and time

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#current-day");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#selected-city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
}

let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", search);

// Celcius and Fahrenheit

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = 48;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = 9;
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

// Search Engine

let form = document.querySelector(".search-form");
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "f8edd982a4a7077051d3a896edb21fe6";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayConditions);
}

function displayConditions(response) {
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windELement = document.querySelector("#windspeed");
  humidityElement.innerHTML = response.data.main.humidity + `%`;
  windELement.innerHTML = Math.round(response.data.wind.speed) + ` km/h`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  document.querySelector("#selected-city").innerHTML = response.data.name;
  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp
  );
}

// Current location
function getCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "f8edd982a4a7077051d3a896edb21fe6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayConditions);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

let getCurrentCity = document.querySelector("#get-current-city");
getCurrentCity.addEventListener("click", getPosition);

searchCity("Kyiv");
