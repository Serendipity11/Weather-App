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
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let sec = now.getSeconds();
  if (minutes < 10) {
    time.innerHTML = `${hours}:0${minutes}:${sec}`;
  } else if (sec < 10) {
    time.innerHTML = `${hours}:${minutes}:0${sec}`;
  } else if (sec < 10 && minutes < 10) {
    time.innerHTML = `${hours}:0${minutes}:0${sec}`;
  } else {
    time.innerHTML = `${hours}:${minutes}:${sec}`;
  }
  setTimeout(displayTime, 1000);
}
displayTime();

// Default city, weather + week
let apiKey = "9f7b34ce1d4954adbe45333199ef6c7a";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
let units = "imperial";

function defaultWeather() {
  axios
    .get(`${apiUrl}q=new york&appid=${apiKey}&units=${units}`)
    .then(getDefaultWeather);
}
function getDefaultWeather(res) {
  console.log(res);
  sky.innerHTML = res.data.weather[0].main;
  let iconcode = res.data.weather[0].icon;
  locationIcon.src = "http://openweathermap.org/img/w/" + iconcode + ".png";
  temperature.innerHTML = Math.round(res.data.main.temp) + "°F";
  humidity.innerHTML = Math.round(res.data.main.humidity);
  pressure.innerHTML = Math.round(res.data.main.pressure);
  wind.innerHTML = Math.round(res.data.wind.speed);
  fahrenheitTemperature = res.data.main.temp;
  defaultForecast();
}
function defaultForecast() {
  let apiUrl = "https://api.openweathermap.org/data/2.5/forecast?";

  axios
    .get(`${apiUrl}q=new york&appid=${apiKey}&units=${units}`)
    .then(displayDefaultForecast);
}
function displayDefaultForecast(res) {
  console.log(res);
  let firstDate = new Date(res.data.list[4].dt * 1000);
  let firstDay = firstDate.getDay();
  console.log(firstDay, res.data.list[4].dt_txt);

  let secondDate = new Date(res.data.list[12].dt * 1000);
  let secondDay = secondDate.getDay();
  console.log(secondDay, res.data.list[12].dt_txt);

  let thirdDate = new Date(res.data.list[20].dt * 1000);
  let thirdDay = thirdDate.getDay();
  console.log(thirdDay, res.data.list[20].dt_txt);

  let forthDate = new Date(res.data.list[28].dt * 1000);
  let forthDay = forthDate.getDay();
  console.log(forthDay, res.data.list[28].dt_txt);

  let fifthDate = new Date(res.data.list[36].dt * 1000);
  let fifthDay = fifthDate.getDay();
  console.log(fifthDay, res.data.list[36].dt_txt);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  dayOne.innerHTML = days[firstDay];
  dayTwo.innerHTML = days[secondDay];
  dayThree.innerHTML = days[thirdDay];
  dayFour.innerHTML = days[forthDay];
  dayFive.innerHTML = days[fifthDay];

  fahrenheitOneTemp = Math.round(res.data.list[4].main.temp);
  fahrenheitTwoTemp = Math.round(res.data.list[12].main.temp);
  fahrenheitThreeTemp = Math.round(res.data.list[20].main.temp);
  fahrenheitFourTemp = Math.round(res.data.list[28].main.temp);
  fahrenheitFiveTemp = Math.round(res.data.list[36].main.temp);

  oneTemp.innerHTML = Math.round(res.data.list[4].main.temp);
  twoTemp.innerHTML = Math.round(res.data.list[12].main.temp);
  threeTemp.innerHTML = Math.round(res.data.list[20].main.temp);
  fourTemp.innerHTML = Math.round(res.data.list[28].main.temp);
  fiveTemp.innerHTML = Math.round(res.data.list[36].main.temp);

  oneIcon.src =
    "http://openweathermap.org/img/w/" +
    res.data.list[4].weather[0].icon +
    ".png";

  twoIcon.src =
    "http://openweathermap.org/img/w/" +
    res.data.list[12].weather[0].icon +
    ".png";
  threeIcon.src =
    "http://openweathermap.org/img/w/" +
    res.data.list[20].weather[0].icon +
    ".png";
  fourIcon.src =
    "http://openweathermap.org/img/w/" +
    res.data.list[28].weather[0].icon +
    ".png";
  fiveIcon.src =
    "http://openweathermap.org/img/w/" +
    res.data.list[36].weather[0].icon +
    ".png";
}
defaultWeather();

// Search engine
let city = document.querySelector("#city");
let searchInput = document.querySelector("#search");
let cityName = searchInput.value;
let submit = document.querySelector("#search-button");

function searchCity(event) {
  event.preventDefault();
  cityName = searchInput.value;
  console.log(cityName);
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
  fahrenheitTemperature = res.data.main.temp;

  getWeekForecast();
}

// Get week information
let dayOne = document.querySelector("#first-day");
let dayTwo = document.querySelector("#second-day");
let dayThree = document.querySelector("#third-day");
let dayFour = document.querySelector("#forth-day");
let dayFive = document.querySelector("#fifth-day");

let oneTemp = document.querySelector("#first-temp");
let twoTemp = document.querySelector("#second-temp");
let threeTemp = document.querySelector("#third-temp");
let fourTemp = document.querySelector("#forth-temp");
let fiveTemp = document.querySelector("#fifth-temp");

let oneIcon = document.querySelector("#one-icon");
let twoIcon = document.querySelector("#two-icon");
let threeIcon = document.querySelector("#three-icon");
let fourIcon = document.querySelector("#four-icon");
let fiveIcon = document.querySelector("#five-icon");

function getWeekForecast() {
  cityName = searchInput.value;
  let apiUrl = "https://api.openweathermap.org/data/2.5/forecast?";

  axios
    .get(`${apiUrl}q=${cityName}&appid=${apiKey}&units=${units}`)
    .then(displayWeek);
}

let fahrenheitOneTemp;
let fahrenheitTwoTemp;
let fahrenheitThreeTemp;
let fahrenheitFourTemp;
let fahrenheitFiveTemp;

function displayWeek(res) {
  console.log(res);
  let firstDate = new Date(res.data.list[4].dt * 1000);
  let firstDay = firstDate.getDay();
  console.log(firstDay, res.data.list[4].dt_txt);

  let secondDate = new Date(res.data.list[12].dt * 1000);
  let secondDay = secondDate.getDay();
  console.log(secondDay, res.data.list[12].dt_txt);

  let thirdDate = new Date(res.data.list[20].dt * 1000);
  let thirdDay = thirdDate.getDay();
  console.log(thirdDay, res.data.list[20].dt_txt);

  let forthDate = new Date(res.data.list[28].dt * 1000);
  let forthDay = forthDate.getDay();
  console.log(forthDay, res.data.list[28].dt_txt);

  let fifthDate = new Date(res.data.list[36].dt * 1000);
  let fifthDay = fifthDate.getDay();
  console.log(fifthDay, res.data.list[36].dt_txt);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Satursday",
  ];

  dayOne.innerHTML = days[firstDay];
  dayTwo.innerHTML = days[secondDay];
  dayThree.innerHTML = days[thirdDay];
  dayFour.innerHTML = days[forthDay];
  dayFive.innerHTML = days[fifthDay];

  fahrenheitOneTemp = Math.round(res.data.list[4].main.temp);
  fahrenheitTwoTemp = Math.round(res.data.list[12].main.temp);
  fahrenheitThreeTemp = Math.round(res.data.list[20].main.temp);
  fahrenheitFourTemp = Math.round(res.data.list[28].main.temp);
  fahrenheitFiveTemp = Math.round(res.data.list[36].main.temp);

  oneTemp.innerHTML = Math.round(res.data.list[4].main.temp);
  twoTemp.innerHTML = Math.round(res.data.list[12].main.temp);
  threeTemp.innerHTML = Math.round(res.data.list[20].main.temp);
  fourTemp.innerHTML = Math.round(res.data.list[28].main.temp);
  fiveTemp.innerHTML = Math.round(res.data.list[36].main.temp);

  oneIcon.src =
    "http://openweathermap.org/img/w/" +
    res.data.list[4].weather[0].icon +
    ".png";

  twoIcon.src =
    "http://openweathermap.org/img/w/" +
    res.data.list[12].weather[0].icon +
    ".png";
  threeIcon.src =
    "http://openweathermap.org/img/w/" +
    res.data.list[20].weather[0].icon +
    ".png";
  fourIcon.src =
    "http://openweathermap.org/img/w/" +
    res.data.list[28].weather[0].icon +
    ".png";
  fiveIcon.src =
    "http://openweathermap.org/img/w/" +
    res.data.list[36].weather[0].icon +
    ".png";
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
    .then(getCurrentWeather);
}

function askLocation(event) {
  event.preventDefault();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getLocation);
  } else {
    alert("Unable to locate your current location");
  }
}

function weekForecastCurrent(res) {
  cityName = res.data.name;
  let apiUrl = "https://api.openweathermap.org/data/2.5/forecast?";
  console.log(cityName);
  axios
    .get(`${apiUrl}q=${cityName}&appid=${apiKey}&units=${units}`)
    .then(displayWeek);
}
function getCurrentWeather(res) {
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
  fahrenheitTemperature = res.data.main.temp;

  weekForecastCurrent(res);
}
currentLocation.addEventListener("click", askLocation);

// Display Celcius
let celsius = document.querySelector("#celsius");

function displayCelsius(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperature");
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  temp.innerHTML = Math.round(celsiusTemperature) + "°C";
  oneTemp.innerHTML = Math;

  let celsiusDayOne = ((fahrenheitOneTemp - 32) * 5) / 9;
  let celsiusDayTwo = ((fahrenheitTwoTemp - 32) * 5) / 9;
  let celsiusDayThree = ((fahrenheitThreeTemp - 32) * 5) / 9;
  let celsiusDayFour = ((fahrenheitFourTemp - 32) * 5) / 9;
  let celsiusDayFive = ((fahrenheitFiveTemp - 32) * 5) / 9;

  oneTemp.innerHTML = Math.round(celsiusDayOne);
  twoTemp.innerHTML = Math.round(celsiusDayTwo);
  threeTemp.innerHTML = Math.round(celsiusDayThree);
  fourTemp.innerHTML = Math.round(celsiusDayFour);
  fiveTemp.innerHTML = Math.round(celsiusDayFive);
}

let fahrenheitTemperature;

celsius.addEventListener("click", displayCelsius);

// Display Fahrenheit
let fahrenheit = document.querySelector("#fahrenheit");
function displayFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round(fahrenheitTemperature) + "°F";
  oneTemp.innerHTML = fahrenheitOneTemp;
  twoTemp.innerHTML = fahrenheitTwoTemp;
  threeTemp.innerHTML = fahrenheitThreeTemp;
  fourTemp.innerHTML = fahrenheitFourTemp;
  fiveTemp.innerHTML = fahrenheitFiveTemp;
}

fahrenheit.addEventListener("click", displayFahrenheit);
