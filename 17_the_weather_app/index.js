const app = document.querySelector("#app"),
  weatherApiKey = "aac1b318a3af492ab3f510b8067ee931";

let convertCelcToF = function (temp) {
  return ((temp * 9) / 5 + 32).toFixed(2);
};

let sanitizeHTML = function (str) {
  var temp = document.createElement("div");
  temp.textContent = str;
  return temp.innerHTML;
};

function showTemperature(informations) {
  const zone_name = moment.tz.guess();
  const timezone = moment.tz(zone_name).zoneAbbr();
  const date = new Date();
  const getHours = date.toLocaleTimeString();

  const weather = {
    temperature: informations.temp,
    apparentTemperature: informations.app_temp,
    sunrise: informations.sunrise,
    sunset: informations.sunset,
    timezone: informations.timezone,
    descriptionWeather: informations.weather.icon,
    windSpeed: informations.wind_spd,
    windDirection: informations.wind_cdir_full,
    humidity: informations.rh,
    cityName: informations.city_name,
  };

  if (sessionStorage.getItem("language") === "pl") {
    app.innerHTML +=
      '<section class="weather-wrapper">' +
      '<section class="weather-localization">' +
      "<h2>" +
      sanitizeHTML(weather.timezone) +
      "</h2>" +
      "<p class=weather-time>" +
      getHours +
      "</p>" +
      '<section class="weather-actual-temp">' +
      '<p class="weather-box actual-temp">' +
      sanitizeHTML(weather.temperature) +
      degreesCelcSymbol +
      "/ " +
      sanitizeHTML(convertCelcToF(weather.temperature)) +
      degreeesFarenhSymbol +
      "</p>" +
      '<img alt="Weather API Day Thunderstorm with light rain" style="" src="https://www.weatherbit.io/static/img/icons/' +
      sanitizeHTML(weather.descriptionWeather) +
      '.png">' +
      "</section>" +
      "</section>" +
      '<section class="weather-info">' +
      "<h2>" +
      todayWeatherPl +
      "<span id='cityName'>" +
      sanitizeHTML(weather.cityName) +
      "</span>" +
      "</h2>" +
      '<section class="weather-info-box">' +
      '<p class="weather-box">' +
      svgFellTemp +
      feelLikePl +
      sanitizeHTML(weather.apparentTemperature) +
      degreesCelcSymbol +
      "/ " +
      sanitizeHTML(convertCelcToF(weather.apparentTemperature)) +
      degreeesFarenhSymbol +
      "</p>" +
      '<p class="weather-box">' +
      svgSunrise +
      sunrisePL +
      moment
        .utc(sanitizeHTML(weather.sunrise), "HH:mm")
        .local()
        .format("HH:mm") +
      " " +
      timezone +
      "</p>" +
      '<p class="weather-box">' +
      svgWindSpeed +
      windSpeedPl +
      sanitizeHTML(weather.windSpeed) +
      speedSymbol +
      "</p > " +
      '<p class="weather-box">' +
      svgSunset +
      sunsetPl +
      moment
        .utc(sanitizeHTML(weather.sunset), "HH:mm")
        .local()
        .format("HH:mm") +
      " " +
      timezone +
      "</p>" +
      '<p class="weather-box">' +
      svgWindDirection +
      windDirectPl +
      sanitizeHTML(weather.windDirection) +
      "</p>" +
      '<p class="weather-box">' +
      svgHumidity +
      humidityPl +
      sanitizeHTML(weather.humidity) +
      percentageSymbol +
      "</p>" +
      "</section>" +
      "</section>" +
      "</section>";
  } else {
    app.innerHTML +=
      '<section class="weather-wrapper">' +
      '<section class="weather-localization">' +
      "<h2>" +
      sanitizeHTML(weather.timezone) +
      "</h2>" +
      "<p class=weather-time>" +
      getHours +
      "</p>" +
      '<section class="weather-actual-temp">' +
      '<p class="weather-box actual-temp">' +
      sanitizeHTML(weather.temperature) +
      degreesCelcSymbol +
      "/ " +
      sanitizeHTML(convertCelcToF(weather.temperature)) +
      degreeesFarenhSymbol +
      "</p>" +
      '<img alt="Weather API Day Thunderstorm with light rain" style="" src="https://www.weatherbit.io/static/img/icons/' +
      sanitizeHTML(weather.descriptionWeather) +
      '.png">' +
      "</section>" +
      "</section>" +
      '<section class="weather-info">' +
      "<h2>" +
      todayWeatherEn +
      "<span id='cityName'>" +
      sanitizeHTML(weather.cityName) +
      "</span>" +
      "</h2>" +
      '<section class="weather-info-box">' +
      '<p class="weather-box">' +
      svgFellTemp +
      feelLikeEn +
      sanitizeHTML(weather.apparentTemperature) +
      degreesCelcSymbol +
      "/ " +
      sanitizeHTML(convertCelcToF(weather.apparentTemperature)) +
      degreeesFarenhSymbol +
      "</p>" +
      '<p class="weather-box">' +
      svgSunrise +
      sunriseEn +
      moment
        .utc(sanitizeHTML(weather.sunrise), "HH:mm")
        .local()
        .format("HH:mm") +
      " " +
      timezone +
      "</p>" +
      '<p class="weather-box">' +
      svgWindSpeed +
      windSpeedEn +
      sanitizeHTML(weather.windSpeed) +
      speedSymbol +
      "</p > " +
      '<p class="weather-box">' +
      svgSunset +
      sunsetEn +
      moment
        .utc(sanitizeHTML(weather.sunset), "HH:mm")
        .local()
        .format("HH:mm") +
      " " +
      timezone +
      "</p>" +
      '<p class="weather-box">' +
      svgWindDirection +
      windDirectEn +
      sanitizeHTML(weather.windDirection) +
      "</p>" +
      '<p class="weather-box">' +
      svgHumidity +
      humidityEn +
      sanitizeHTML(weather.humidity) +
      percentageSymbol +
      "</p>" +
      "</section>" +
      "</section>" +
      "</section>";
  }
}

function showForecast(arrayForecasts) {
  const weatherWrapp = document.querySelector(".weather-wrapper");
  const daycityName = document.querySelector("#cityName").textContent;
  let forecastTitle = "";

  if (sessionStorage.getItem("language") === "pl") {
    forecastTitle = forecastNextDaysPl;
  } else {
    forecastTitle = forecastNextDaysEn;
  }

  weatherWrapp.innerHTML +=
    '<section class="forecast-wrapper">' +
    "<h2>" +
    forecastTitle +
    daycityName +
    "</h2>" +
    '<section class="forecast-wrapper-boxes">' +
    arrayForecasts
      .map(function (forecast) {
        const dayAverageTemp = sanitizeHTML(forecast.temp);
        const dayDate = sanitizeHTML(forecast.valid_date);
        const dayMaxTemp = sanitizeHTML(forecast.high_temp);
        const dayMinTemp = sanitizeHTML(forecast.low_temp);
        const dayHumidity = sanitizeHTML(forecast.rh);
        const dayWeather = sanitizeHTML(forecast.weather.icon);

        var html =
          '<section class="forecast-grid">' +
          '<p class="forecast-box forecast-date">' +
          dayDate +
          "</p>" +
          '<img alt="Weather API Day Thunderstorm with light rain" class="forecast-icon" src="https://www.weatherbit.io/static/img/icons/' +
          dayWeather +
          '.png">' +
          '<p class="forecast-box forecast-info">' +
          svgFellTemp +
          dayAverageTemp +
          degreesCelcSymbol +
          "/ " +
          convertCelcToF(dayAverageTemp) +
          degreeesFarenhSymbol +
          "</p>" +
          '<p class="forecast-box forecast-info">' +
          svgLowTemp +
          dayMinTemp +
          degreesCelcSymbol +
          "/ " +
          convertCelcToF(dayMinTemp) +
          degreeesFarenhSymbol +
          "</p>" +
          '<p class="forecast-box forecast-info">' +
          svgHighTemp +
          dayMaxTemp +
          degreesCelcSymbol +
          "/ " +
          convertCelcToF(dayMaxTemp) +
          degreeesFarenhSymbol +
          "</p>" +
          '<p class="forecast-box forecast-info">' +
          svgHumidity +
          dayHumidity +
          percentageSymbol +
          "</p>" +
          "</section>";

        return html;
      })
      .join("") +
    "</section>" +
    "</section>";
}

function getForecast(userCity, userCountry, langApi) {
  return fetch(
    "https://api.weatherbit.io/v2.0/forecast/daily?city=" +
      userCity +
      "," +
      userCountry +
      "&key=" +
      weatherApiKey +
      "&lang=" +
      langApi
  )
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then(function (data) {
      const arrayForecasts = data.data;
      showForecast(arrayForecasts);
    });
}

function getData(langApi) {
  return fetch("https://ipapi.co/json/")
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then(function (data) {
      let userCity = sanitizeHTML(data.city);
      let userCountry = sanitizeHTML(data.country);

      setTimeout(function () {
        getForecast(userCity, userCountry);
      }, 500);

      return fetch(
        "https://api.weatherbit.io/v2.0/current?city=" +
          userCity +
          "," +
          userCountry +
          "&key=" +
          weatherApiKey +
          "&lang=" +
          langApi
      );
    })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then(function (data) {
      const informations = data.data[0];

      showTemperature(informations);
    })
    .catch(function (err) {
      app.innerHTML = "<p>Sorry, something bad happened</p>";
    });
}

document.addEventListener("click", function (e) {
  const languageSection = document.querySelector("#lang");

  if (e.target.matches("#pl")) {
    let langApi = "pl";
    sessionStorage.setItem("language", langApi);
    getData(langApi);
    languageSection.style.display = "none";
  } else if (e.target.matches("#en")) {
    let langApi = "en";
    sessionStorage.setItem("language", langApi);
    getData(langApi);
    languageSection.style.display = "none";
  }
});
