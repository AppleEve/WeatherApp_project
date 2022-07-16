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
  let responceWeatherDescription = response.data.weather[0].description;
  h1.innerHTML = `${selectedCity}, ${selectedCountry}`;
  currentTemperature.innerHTML = `${currentWeather}`;
  humidityValue.innerHTML = ` ${humidity}%`;
  windValue.innerHTML = ` ${wind} km/h`;
  celsiusTemperature = response.data.main.temp;
  weatherDescription.innerHTML = responceWeatherDescription;
  weatherIcon.setAttribute(
    "src",
    `${weatherIcons[`${responceWeatherDescription}`].day}`
  );
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
  let weatherDescription = document.querySelector("#weather-description");
  let weatherIcon = document.querySelector("#main-image");
  let currentCity = response.data.name;
  let currentCountry = response.data.sys.country;
  let currentWeather = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let responceWeatherDescription = response.data.weather[0].description;
  h1.innerHTML = `${currentCity}, ${currentCountry}`;
  currentTemperature.innerHTML = `${currentWeather}`;
  humidityValue.innerHTML = ` ${humidity}%`;
  windValue.innerHTML = ` ${wind} km/h`;
  celsiusTemperature = response.data.main.temp;
  weatherDescription.innerHTML = responceWeatherDescription;
  weatherIcon.setAttribute(
    "src",
    `${weatherIcons[`${responceWeatherDescription}`].day}`
  );
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

function convertCtoF(event) {
  event.preventDefault();
  let temperatureInC = document.querySelector("#big-nbr");
  let fahrenheitScale = document.querySelector("#fahrenheit-scale");
  let celsiusScale = document.querySelector("#celsius-scale");
  temperatureInC.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
  fahrenheitScale.classList.remove("non-active-scale");
  celsiusScale.classList.remove("active-scale");
  fahrenheitScale.classList.add("active-scale");
  celsiusScale.classList.add("non-active-scale");
}

function convertFtoC(event) {
  event.preventDefault();
  let temperatureInC = document.querySelector("#big-nbr");
  let fahrenheitScale = document.querySelector("#fahrenheit-scale");
  let celsiusScale = document.querySelector("#celsius-scale");
  temperatureInC.innerHTML = Math.round(celsiusTemperature);
  fahrenheitScale.classList.remove("active-scale");
  celsiusScale.classList.remove("non-active-scale");
  fahrenheitScale.classList.add("non-active-scale");
  celsiusScale.classList.add("active-scale");
}

let weatherIcons = {
  "clear sky": { day: "img/clear-day.svg", night: "img/clear-night.svg" },
  "few clouds": {
    day: "img/partly-cloudy-day.svg",
    night: "img/partly-cloudy-night.svg",
  },
  "scattered clouds": { day: "img/cloudy.svg", night: "img/cloudy.svg" },
  "broken clouds": {
    day: "img/overcast-day.svg",
    night: "img/overcast-night.svg",
  },
  "shower rain": { day: "img/clear-day.svg", night: "img/clear-night.svg" },
  rain: {
    day: "img/partly-cloudy-rain-day.svg",
    night: "img/partly-cloudy-rain-night.svg",
  },
  thunderstorm: {
    day: "img/thunderstorms.svg",
    night: "img/thunderstorms.svg",
  },
  snow: { day: "img/snow.svg", night: "img/partly-cloudy-snow-night.svg" },
  mist: { day: "img/fog.svg", night: "img/fog.svg" },
};

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

let fButton = document.querySelector("#fahrenheit-scale");
fButton.addEventListener("click", convertCtoF);

let celsiusTemperature = null;

let cButton = document.querySelector("#celsius-scale");
cButton.addEventListener("click", convertFtoC);

setDefaultLocation();
