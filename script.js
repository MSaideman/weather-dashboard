// API key for my OWM account
const APIkey = 'c9299c81fa72cf0649fc417ca5d0c2b7'
searchCity = '';

// use search input to display today's date, current conditions (temp, humidity, wind speed, UV-index)
function getCurrentWeather () {
    let searchCity = $('#search-city').val();
    searchCity = $('#search-city').val();
    var URL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&units=imperial" + "&APPID=" + APIkey;

 fetch(URL)
 .then((data) => {
     data.json()})

 .then(data => {
    var icon = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    currentTime = data.dt;
    let currentWeatherHTML = `
    <h3>${data.name} ${currentTime.format("(MM/DD/YY)")}<img src="${icon}"></h3>
    <ul class="list-unstyled">
        <li>Temperature: ${data.main.temp}&#8457;</li>
        <li>Humidity: ${data.main.humidity}%</li>
        <li>Wind Speed: ${data.wind.speed} mph</li>
        <li>UV Index: ${data.main.uvi}</li>
    </ul>`;
    // Append the results to the DOM
    $('#current-weather').html(currentWeatherHTML);
 })

}

// 5 day forecast with the same data as before
function getFiveDayForecast () {

}


// search city button event listener
$('#search-button').on("click", (event) => {
    event.preventDefault();
    currentCity = $('#search-city').val();
    getCurrentWeather(event);
});


// store seached cities
function storeCity (){

}

// clear searched cities
function clearCity (){

}
