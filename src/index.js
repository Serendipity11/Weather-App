// Current Day
let now = new Date();
let day = document.querySelector("#day");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];
day.innerHTML = currentDay;

// Current time
let time = document.querySelector("#time");

function displayTime() {
  let hours = now.getHours();
  let minutes = now.getMinutes();
  time.innerHTML = `${hours}:${minutes}`;
}
displayTime();

// Search engine
let city = document.querySelector("#city");
let searchInput = document.querySelector("#search");
let cityName = searchInput.value;
let submit = document.querySelector("#search-button");

function searchCity(event) {
  event.preventDefault();

  cityName = searchInput.value;
  console.log(cityName);
  let apiKey = "9f7b34ce1d4954adbe45333199ef6c7a";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "imperial";
  axios
    .get(`${apiUrl}q=${cityName}&appid=${apiKey}&units=${units}`)
    .then(getWeather);
}
submit.addEventListener("click", searchCity);

let sky = document.querySelector("#clear");
let locationIcon = document.querySelector("#wicon");
let temperature = document.querySelector(".temperature");
let humidity = document.querySelector("#humidity-number");
let pressure = document.querySelector("#pressure-number");
let wind = document.querySelector("#wind-number");

function getWeather(res) {
  console.log(res);
  sky.innerHTML = res.data.weather[0].main;
  let iconcode = res.data.weather[0].icon;
  let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
  locationIcon.src = iconurl;
  temperature.innerHTML = Math.round(res.data.main.temp) + "°F";
  humidity.innerHTML = Math.round(res.data.main.humidity);
  pressure.innerHTML = Math.round(res.data.main.pressure);
  wind.innerHTML = Math.round(res.data.wind.speed);
  city.innerHTML = res.data.name;
}

// Get week information
let dayOne = document.querySelector("#first-day");
let dayTwo = document.querySelector("#second-day");
let dayThree = document.querySelector("#third-day");
let dayFour = document.querySelector("#forth-day");
let dayFive = document.querySelector("#fifth-day");

function getWeekForecast() {
  cityName = searchInput.value;
  let apiKey = "9f7b34ce1d4954adbe45333199ef6c7a";
  let apiUrl = "https://api.openweathermap.org/data/2.5/forecast?";
  let units = "imperial";
  axios
    .get(`${apiUrl}q=${cityName}&appid=${apiKey}&units=${units}&cnt=35`)
    .then(displayWeek);
}

function displayWeek(res) {
  console.log(res);
  let firstDate = new Date(res.data.list[2].dt * 1000);
  let firstDay = firstDate.getDay();
  console.log(firstDay, res.data.list[2].dt_txt);

  let secondDate = new Date(res.data.list[9].dt * 1000);
  let secondDay = secondDate.getDay();
  console.log(secondDay, res.data.list[9].dt_txt);

  let thirdDate = new Date(res.data.list[17].dt * 1000);
  let thirdDay = thirdDate.getDay();
  console.log(thirdDay, res.data.list[17].dt_txt);

  let forthDate = new Date(res.data.list[25].dt * 1000);
  let forthDay = forthDate.getDay();
  console.log(forthDay, res.data.list[25].dt_txt);

  let fifthDate = new Date(res.data.list[33].dt * 1000);
  let fifthDay = fifthDate.getDay();
  console.log(fifthDay, res.data.list[33].dt_txt);

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
}

// Current Location
let currentLocation = document.querySelector(".location");

function getLocation(position) {
  console.log(position);
  let lat = Math.round(position.coords.latitude);
  let lon = Math.round(position.coords.longitude);
  console.log(lat, lon);
  let apiKey = "9f7b34ce1d4954adbe45333199ef6c7a";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;
  axios
    .get(`${apiUrl}&lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`)
    .then(getWeather);
}

function askLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

currentLocation.addEventListener("click", askLocation);

// Convert farenheit to celcius (32°F − 32) × 5/9 = 0°C

let fahrenheit = document.querySelector("#fahrenheit");
let celsius = document.querySelector("#celsius");
let temp = document.querySelector("#temperature");
// let tempNumber = document.querySelector('#temp');
let metric = document.querySelector("#metric");

function convertToCelsius(event) {
  event.preventDefault();

  let tempNumber = document.querySelector("h1 span #temp-number");
  console.log(tempNumber);
  // let currentValue = document.tempNumber.innerHTML;
  // tempNumber.innerHTML = Math.round((currentValue - 32) * 5 / 9);
  // metric.innerHTML = '°C';
}

celsius.addEventListener("click", convertToCelsius);

// Convert celcius to farenheit (0°C × 9/5) + 32 = 32°F
function convertToFahrenheit(event) {
  event.preventDefault();
  let currentValue = tempNumber.innerHTML;
  tempNumber.innerHTML = Math.round((currentValue * 9) / 5 + 32);
  metric.innerHTML = "°F";
}

fahrenheit.addEventListener("click", convertToFahrenheit);
