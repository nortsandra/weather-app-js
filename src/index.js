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

// City search

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#selected-city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
}

let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", search);

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
  ``;
  let humidityElement = document.querySelector("#humidity");
  let windELement = document.querySelector("#windspeed");
  humidityElement.innerHTML = response.data.main.humidity + `%`;
  windELement.innerHTML = Math.round(response.data.wind.speed) + ` km/h`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  document.querySelector("#selected-city").innerHTML = response.data.name;
  document.querySelector(".temperature-number").innerHTML = Math.round(
    response.data.main.temp
  );
  document
    .querySelector("#main-icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  getForecast(response.data.coord);
}

// Forecast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function getForecast(coordinates) {
  let apiKey = "f8edd982a4a7077051d3a896edb21fe6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHtml = `<div class="row bottom-line pb-2">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        ` <div class="pl-3 pr-3">
        <div class="weather-forecast-date weather-details">${formatDay(
          forecastDay.dt
        )}</div>
          <img src="https://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" width="52px">
          <div class="weather-forecast-temperatures">
            <span class="temp-min">${Math.round(forecastDay.temp.min)}°</span>
            <span class="temp-max">${Math.round(forecastDay.temp.max)}°</span>
          </div>
        </div>
      `;
    }
  });
  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
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
