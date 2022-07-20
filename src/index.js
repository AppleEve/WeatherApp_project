function showSelectedTemperature(response) {
  let h1 = document.querySelector("h1");
  let currentTemperature = document.querySelector("#big-nbr");
  let humidityValue = document.querySelector("#humidity-value");
  let windValue = document.querySelector("#wind-value");
  let weatherDescription = document.querySelector("#weather-description");
  let weatherIcon = document.querySelector("#main-image");
  let selectedCity = response.data.name;
  let selectedCountry = response.data.sys.country;
  let currentWeather = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let responceWeatherIcon = response.data.weather[0].icon;
  let responceWeatherDescription = response.data.weather[0].description;
  h1.innerHTML = `${selectedCity}, ${selectedCountry}`;
  currentTemperature.innerHTML = `${currentWeather}`;
  humidityValue.innerHTML = ` ${humidity}%`;
  windValue.innerHTML = ` ${wind} km/h`;
  celsiusTemperature = response.data.main.temp;
  weatherDescription.innerHTML = responceWeatherDescription;
  weatherIcon.setAttribute("src", `img/${responceWeatherIcon}.svg`);
  getForecast(response.data.coord);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "711bf416fd4b68649d4f2e89cc233151";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function setDefaultLocation() {
  let apiKey = "711bf416fd4b68649d4f2e89cc233151";
  let selectedCity = "Nicosia";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showSelectedTemperature);
}

function setLocation(event) {
  event.preventDefault();
  let apiKey = "711bf416fd4b68649d4f2e89cc233151";
  let text = document.querySelector(".text");
  let selectedCity = text.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showSelectedTemperature);
}

function setCurrentLocation(position) {
  let apiKey = "711bf416fd4b68649d4f2e89cc233151";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showSelectedTemperature);
}

function getWeatherForCurrentLocation() {
  navigator.geolocation.getCurrentPosition(setCurrentLocation);
}

function formatForecastDate(dt) {
  let date = new Date(dt * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return day;
}

function displayForecast(response) {
  let weatherForecast = response.data.daily;
  console.log(weatherForecast);
  let dailyForecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  weatherForecast.forEach(function (forecastDay, index) {
    if (index < 7 && index > 0) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
            <div class="forecast-day">${formatForecastDate(
              forecastDay.dt
            )}</div>
            <img class="forecast-images" src= "img/${
              forecastDay.weather[0].icon
            }.svg"  />
            <div class="forecast-temperatures">
              <span class="forecast-temperature-max" id="temp-max">${Math.round(
                forecastDay.temp.max
              )}&#176;C</span
              >
              <div class="forecast-temperature-min" id="temp-min">${Math.round(
                forecastDay.temp.min
              )}&#176;C</div>
            </div>
          </div>`;
    }
  });

  forecastHTML = forecastHTML + "</div>";
  dailyForecast.innerHTML = forecastHTML;
}

let now = new Date();
let minutes = now.getMinutes();
let hours = now.getHours();
let date = now.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let year = now.getFullYear();

if (minutes < 10) {
  minutes = `0${minutes}`;
}
if (hours < 10) {
  hours = `0${hours}`;
}

let currentDateTime = document.querySelector("#current-date-time");
currentDateTime.innerHTML = `  ${day}, ${date} ${month} ${year},    ${hours}:${minutes}`;

let form = document.querySelector("form");
form.addEventListener("submit", setLocation);

let checkWeatherButton = document.querySelector("button");
checkWeatherButton.addEventListener("click", getWeatherForCurrentLocation);

let celsiusTemperature = null;

setDefaultLocation();
