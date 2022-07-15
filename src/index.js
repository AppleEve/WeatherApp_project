function showSelectedTemperature(response) {
  let h1 = document.querySelector("h1");
  let currentTemperature = document.querySelector("#big-nbr");
  let humidityValue = document.querySelector("#humidity-value");
  let windValue = document.querySelector("#wind-value");
  let selectedCity = response.data.name;
  let selectedCountry = response.data.sys.country;
  let currentWeather = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  h1.innerHTML = `${selectedCity}, ${selectedCountry}`;
  currentTemperature.innerHTML = `${currentWeather}`;
  humidityValue.innerHTML = ` ${humidity}%`;
  windValue.innerHTML = ` ${wind} km/h`;
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
function showLocalTemperature(response) {
  console.log(response);
  let h1 = document.querySelector("h1");
  let currentTemperature = document.querySelector("#big-nbr");
  let humidityValue = document.querySelector("#humidity-value");
  let windValue = document.querySelector("#wind-value");
  let currentCity = response.data.name;
  let currentCountry = response.data.sys.country;
  let currentWeather = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  h1.innerHTML = `${currentCity}, ${currentCountry}`;
  currentTemperature.innerHTML = `${currentWeather}`;
  humidityValue.innerHTML = ` ${humidity}%`;
  windValue.innerHTML = ` ${wind} mps`;
}

function setCurrentLocation(position) {
  let apiKey = "711bf416fd4b68649d4f2e89cc233151";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showLocalTemperature);
}

function getWeatherForCurrentLocation() {
  navigator.geolocation.getCurrentPosition(setCurrentLocation);
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

setDefaultLocation();
