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
     return data.json()})
 .then(data => {
     console.log(data);
    var icon = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    var currentTime = moment().format("l");
    let currentWeatherHTML = `
    <h3>${data.name} ${currentTime}<img src="${icon}"></h3>
    <ul class="list-unstyled">
        <li>Temperature: ${Math.round(data.main.temp)}&#8457;</li>
        <li>Humidity: ${data.main.humidity}%</li>
        <li>Wind Speed: ${data.wind.speed} mph</li>
        <li id="uvIndex">UV Index:</li>
    </ul>`;
    // Append the results to the DOM
    $('#current-weather').html(currentWeatherHTML);
    var currentLat = data.coord.lat;
    var currentLong = data.coord.lon;
    var uvURL = "api.openweathermap.org/data/2.5/uvi?lat=" + currentLat + "&lon=" + currentLong + "&APPID=" + APIkey;
    uvURL = "https://cors-anywhere.herokuapp.com/" + uvURL;
    fetch(uvURL)
    .then((data) => {
        return data.json();
    })
    .then ((data) => {
        var uvIndex = data.value;
        $('#uvIndex').html(`UV Index: <span id="uvSeverity"> ${uvIndex} </span>`);
        if (uvIndex < 3) {
            $('#uvSeverity').attr("class", "low");
        }
        else if (uvIndex > 3 && uvIndex < 8) {
            $('#uvSeverity').attr("class", "moderate");
        }
        else if (uvIndex > 6 && uvIndex < 8) {
            $('#uvSeverity').attr("class", "high");
        }
        else if (uvIndex > 8 && uvIndex < 10) {
            $('#uvSeverity').attr("class", "very-high");
        }
        else if (uvIndex > 10) {
            $('#uvSeverity').attr("class", "extreme");
        }
    }
    )
 })

}

// 5 day forecast with the same data as before
function getFiveDayForecast () {
    let searchCity = $('#search-city').val();
    searchCity = $('#search-city').val();
    var URL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&units=imperial" + "&APPID=" + APIkey;
 fetch(URL)
 .then((data) => {
     return data.json()})
 .then(data => {
    var icon = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    var futureTime = moment().format("l");
    
    for (i = 0; i < data.list.length; i++) {
        var dayData = data.list[i];
        let iconURL = "https://openweathermap.org/img/w/" + dayData.weather[0].icon + ".png";
        if (data.list === true) {
        futureWeatherHTML +=
        `<h3>${dayData.name} ${futureTime}<img src="${icon}"></h3>
        <ul class="list-unstyled">
            <li>Temperature: ${Math.round(dayData.main.temp)}&#8457;</li>
            <li><img src="${iconURL}"></li>
            <li>Humidity: ${dayData.main.humidity}%</li>
            <li>Wind Speed: ${dayData.wind.speed} mph</li>
            <li id="uvIndex">UV Index:</li>
        </ul>`;
        }
        }
        $('#five-day-forecast').html(futureWeatherHTML);
    })
}


// search city button event listener
$('#search-button').on("click", (event) => {
    event.preventDefault();
    currentCity = $('#search-city').val();
    getCurrentWeather(event);
});


// // store seached cities
// function storeCity (){

// }

// // clear searched cities
// function clearCity (){

// }
