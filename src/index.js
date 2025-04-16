function displayDetails(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);

  let cityElement = document.querySelector("#current-city");

  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#current-icon");

  temperatureElement.innerHTML = temperature;
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
}

function handelSearch(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayDetails);
}

// Display the forcast
function displayForecast() {
  //create an array of days
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];

  //create a varible (empty first)
  let forecastHTml = "";

  //loop through each day one at a time
  //put all the forecast HTML that we have to inject eventually
  days.forEach(function (day) {
    forecastHTml =
      forecastHTml +
      ` 
      <div class="weather-forecast-day-info">
            <div class="weather-forecast-date">${day}</div>
            <div class="weather-forecast-icon">☀️</div>
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature">20°</div>
              <div class="weather-forecast-temperature">9°</div>
            </div>
          </div> 
     `;
  });

  //when the loop is over
  //inject the html inside innerHTML
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTml;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handelSearch);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
displayForecast();
