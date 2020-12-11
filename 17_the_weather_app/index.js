const app = document.querySelector("#app"),
  weatherApiKey = "aac1b318a3af492ab3f510b8067ee931";

function showTemperature(weather) {
  let far = ((weather.temperature * 9) / 5 + 32).toFixed(2);
  const zone_name = moment.tz.guess();
  const timezone = moment.tz(zone_name).zoneAbbr();
  const date = new Date();
  const getHours = date.toLocaleTimeString();

  if (sessionStorage.getItem("language") === "pl") {
    app.innerHTML +=
      '<section class="weather-wrapper">' +
      '<section class="weather-localization">' +
      "<h2>" +
      weather.timezone +
      "</h2>" +
      "<p class=weather-time>" +
      getHours +
      "</p>" +
      '<section class="weather-actual-temp">' +
      '<p class="weather-box actual-temp">' +
      weather.temperature +
      degreesCelcSymbol +
      "/ " +
      far +
      degreeesFarenhSymbol +
      "</p>" +
      '<img alt="Weather API Day Thunderstorm with light rain" style="" src="https://www.weatherbit.io/static/img/icons/' +
      weather.descriptionWeather +
      '.png">' +
      "</section>" +
      "</section>" +
      '<section class="weather-info">' +
      '<p class="weather-box">' +
      svgFellTemp +
      feelLikePl +
      weather.apparentTemperature +
      degreesCelcSymbol +
      "/ " +
      far +
      degreeesFarenhSymbol +
      "</p>" +
      '<p class="weather-box">' +
      svgSunrise +
      sunrisePL +
      moment.utc(weather.sunrise, "HH:mm").local().format("HH:mm") +
      " " +
      timezone +
      "</p>" +
      '<p class="weather-box">' +
      svgWindSpeed +
      windSpeedPl +
      weather.windSpeed +
      speedSymbol +
      "</p > " +
      '<p class="weather-box">' +
      svgSunset +
      sunsetPl +
      moment.utc(weather.sunset, "HH:mm").local().format("HH:mm") +
      " " +
      timezone +
      "</p>" +
      '<p class="weather-box">' +
      svgWindDirection +
      windDirectPl +
      weather.windDirection +
      "</p>" +
      '<p class="weather-box">' +
      svgHumidity +
      humidityPl +
      weather.humidity +
      "</p>" +
      "</section>";
    ("</section>");
  } else {
    app.innerHTML +=
      '<section class="weather-wrapper">' +
      '<section class="weather-localization">' +
      "<h2>" +
      weather.timezone +
      "</h2>" +
      "<p class=weather-time>" +
      getHours +
      "</p>" +
      '<section class="weather-actual-temp">' +
      '<p class="weather-box actual-temp">' +
      weather.temperature +
      degreesCelcSymbol +
      "/ " +
      far +
      degreeesFarenhSymbol +
      "</p>" +
      '<img alt="Weather API Day Thunderstorm with light rain" style="" src="https://www.weatherbit.io/static/img/icons/' +
      weather.descriptionWeather +
      '.png">' +
      "</section>" +
      "</section>" +
      '<section class="weather-info">' +
      '<p class="weather-box">' +
      svgFellTemp +
      feelLikeEn +
      weather.apparentTemperature +
      degreesCelcSymbol +
      "/ " +
      far +
      degreeesFarenhSymbol +
      "</p>" +
      '<p class="weather-box">' +
      svgSunrise +
      sunriseEn +
      moment.utc(weather.sunrise, "HH:mm").local().format("HH:mm") +
      " " +
      timezone +
      "</p>" +
      '<p class="weather-box">' +
      svgWindSpeed +
      windSpeedEn +
      weather.windSpeed +
      speedSymbol +
      "</p > " +
      '<p class="weather-box">' +
      svgSunset +
      sunsetEn +
      moment.utc(weather.sunset, "HH:mm").local().format("HH:mm") +
      " " +
      timezone +
      "</p>" +
      '<p class="weather-box">' +
      svgWindDirection +
      windDirectEn +
      weather.windDirection +
      "</p>" +
      '<p class="weather-box">' +
      svgHumidity +
      humidityEn +
      weather.humidity +
      "</p>" +
      "</section>";
    ("</section>");
  }
}

function showForecast(arrayForecasts) {
  const weatherWrapp = document.querySelector(".weather-wrapper");

  weatherWrapp.innerHTML +=
    '<section class="forecast-wrapper">' +
    arrayForecasts
      .map(function (forecast) {
        const dayAverageTemp = forecast.temp;
        const dayDate = forecast.valid_date;
        const dayMaxTemp = forecast.high_temp;
        const dayMinTemp = forecast.low_temp;
        const dayHumidity = forecast.rh;
        const dayWeather = forecast.weather.icon;
        let far = ((forecast.temp * 9) / 5 + 32).toFixed(2);

        var html =
          '<div class="forecast-grid">' +
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
          far +
          degreeesFarenhSymbol +
          "</p>" +
          '<p class="forecast-box forecast-info">' +
          svgLowTemp +
          dayMinTemp +
          degreesCelcSymbol +
          "/ " +
          far +
          degreeesFarenhSymbol +
          "</p>" +
          '<p class="forecast-box forecast-info">' +
          svgHighTemp +
          dayMaxTemp +
          degreesCelcSymbol +
          "/ " +
          far +
          degreeesFarenhSymbol +
          "</p>" +
          '<p class="weather-box forecast-info">' +
          svgHumidity +
          dayHumidity +
          "</p>" +
          "</div>";

        return html;
      })
      .join("") +
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
      let userCity = data.city;
      let userCountry = data.country;

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
      };
      showTemperature(weather);
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
