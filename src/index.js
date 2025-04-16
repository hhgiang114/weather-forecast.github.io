function displayDetails(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#current-icon");

  let timeElement = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);

  timeElement.innerHTML = formatDate(date);

  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "5e09t7e3918eccf10f64a90eo086bf29";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayDetails);
}

function handelSearch(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");

  searchCity(searchInputElement.value);
}

function getForecast(city) {
  let apiKey = "5e09t7e3918eccf10f64a90eo086bf29";
  //let city = searchInputElement.value;

  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios(apiUrl).then(displayForecast);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let formattedDay = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${formattedDay} ${hours}:${minutes}`;
}

//For days in the forecast
function formatDayForecast(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

// Display the forcast
function displayForecast(response) {
  console.log(response.data);
  //create a varible (empty first)
  let forecastHTml = "";

  //loop through each day one at a time
  //put all the forecast HTML that we have to inject eventually
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTml += ` 
      <div class="weather-forecast-day-info">
            <div class="weather-forecast-date">${formatDayForecast(
              day.time
            )}</div>       
            <img src="${
              day.condition.icon_url
            }" class="weather-forecast-icon" />
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature">${Math.round(
                day.temperature.maximum
              )}</div>
              <div class="weather-forecast-temperature">${Math.round(
                day.temperature.minimum
              )}</div>
            </div>
          </div> 
     `;
    }
  });

  //when the loop is over
  //inject the html inside innerHTML
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handelSearch);

// let currentDateELement = document.querySelector("#current-date");
// let currentDate = new Date();
searchCity("Paris");
//displayForecast();
