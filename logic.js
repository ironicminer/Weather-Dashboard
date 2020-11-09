//openweather api key
let apiKey = "c0823128cbf8487c457530048730b089";
//date
let date = new Date();

//for current weather
function getCurrentWeather(location) {
  let currentURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    location +
    "&appid=" +
    apiKey;
  $.ajax({
    url: currentURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    //convert temp to F
    let temp = (response.main.temp - 273.15) * 1.8 + 32;
    temp = Math.floor(temp);
    //empty div for new weather
    $(".output-weather").empty();

    const card = $("<div>").addClass("card");
    const cardBody = $("<div>").addClass("card-body");
    const city = $("<h3>").addClass("card-title").text(response.name);
    const temperature = $("<p>")
      .addClass("card-text temp")
      .text("Temp: " + temp + "F");
    const image = $("<img>").attr(
      "src",
      "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
    );
    const humidity = $("<p>").text(
      "Humididty: " + response.main.humidity + "%"
    );
    const wind = $("<p>").text("Wind: " + response.wind.speed + "MPH");
    city.append(image);
    cardBody.append(city, temperature, wind, humidity);
    card.append(cardBody);
    $(".output-weather").append(card);
    let liItem = $("<li>").text(response.name);
    $(".card-body3").append(liItem);
  });
}
//forecast function
function getForecast(location) {
  let forecastURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    location +
    "&appid=" +
    apiKey;
  $.ajax({
    url: forecastURL,
    method: "GET",
  }).then(function (response) {
    let results = response.list;
    $(".output-forecast").empty();
    console.log(response);
    for (let i = 0; i < results.length; i++) {
      if (results[i].dt_txt.indexOf("12:00:00") !== -1) {
        // get the temperature and convert to fahrenheit
        let temp = (results[i].main.temp - 273.15) * 1.8 + 32;
        let tempF = Math.floor(temp);

        const card = $("<div>").addClass(
          "card col-md-2 ml-4 bg-primary text-white"
        );
        const cardBody = $("<div>").addClass("card-body p-3 forecastBody");
        const cityDate = $("<h4>")
          .addClass("card-title")
          .text(results[i].dt_txt);
        const temperature = $("<p>")
          .addClass("card-text forecastTemp")
          .text("Temperature: " + tempF + " °F");
        const humidity = $("<p>")
          .addClass("card-text forecastHumidity")
          .text("Humidity: " + results[i].main.humidity + "%");

        const image = $("<img>").attr(
          "src",
          "https://openweathermap.org/img/w/" +
            results[i].weather[0].icon +
            ".png"
        );
        //add last searched city to page
        cardBody.append(cityDate, image, temperature, humidity);
        card.append(cardBody);
        $(".output-forecast").append(card);
      }
    }
  });
}
//search button click function
$("#search-btn").click(function () {
  let cityInput = $(".input").val().trim();
  getCurrentWeather(cityInput);
  getForecast(cityInput);

  $(".input").val("");
});
