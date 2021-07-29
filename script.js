// API key for my OWM account
const APIkey = 'c9299c81fa72cf0649fc417ca5d0c2b7'
searchCity = '';
const fiveDayForecast = {}
var futureWeatherHTML = '';
var storedCity = '';
var lastSearchedCityArr = JSON.parse(localStorage.getItem("stored city")) || []

// use search input to display today's date, current conditions (temp, humidity, wind speed, UV-index)
function getCurrentWeather () {
    let searchCity = $('#search-city').val();
    searchCity = $('#search-city').val();
    var URL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&units=imperial" + "&APPID=" + APIkey;
 fetch(URL)
 .then((data) => {
     return data.json()})
 .then(data => {
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
    console.log(data);
    $('#current-weather').html(currentWeatherHTML);
    var currentLat = data.coord.lat;
    var currentLong = data.coord.lon;
    getFiveDayForecast(currentLat,currentLong, searchCity);
    var uvURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + currentLat + "&lon=" + currentLong + "&APPID=" + APIkey;
    fetch(uvURL)
    .then((data) => {
        return data.json();
    })
    .then ((data) => {
        console.log(data);
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

    if (lastSearchedCityArr.indexOf(searchCity) === -1) {
        lastSearchedCityArr.push(searchCity);
        localStorage.setItem("stored city", JSON.stringify(lastSearchedCityArr));
        console.log(lastSearchedCityArr);
        showStoredCities();
    } 
 })

}

function showStoredCities() {
    $(".btn-vertical").empty();
    for (var i=0; i < lastSearchedCityArr.length; i++) {
        var listItem = $('<button>');
        listItem.attr("city", lastSearchedCityArr[i]);
        listItem.text(lastSearchedCityArr[i]);
        $(".btn-vertical").append(listItem);
    }
}

// 5 day forecast with the same data as before
function getFiveDayForecast (lat, lon, cityName) {
    let searchCity = $('#search-city').val();
    searchCity = $('#search-city').val();
        var URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&appid=${APIkey}&units=imperial`;
        fetch(URL)
        .then((dataf) => {
            return dataf.json()
        })
        .then(dataf => {
            console.log(dataf);
            futureWeatherHTML = '';
            $('#five-day-forecast').empty();
            for (let i = 0; i < 5; i++) {
            var icon = "https://openweathermap.org/img/w/" + dataf.daily[i].weather[0].icon + ".png";
            futureWeatherHTML += `
            <div class="weather-card card m-2 p0">
            <ul class="list-unstyled p-3">
                <li>${cityName} ${new Date((Date.now()) - ((i+1)*86400*1000)).toLocaleDateString()}</li>
                <li><img src="${icon}"></li>
                <li>Temperature: ${Math.round(dataf.daily[i].temp.day)}&#8457;</li>
                <li>Humidity: ${dataf.daily[i].humidity}%</li> 
            </ul>`;}
            $('#five-day-forecast').html(futureWeatherHTML);
        })
    };

// search city button event listener
$('#search-button').on("click", (event) => {
    event.preventDefault();
    currentCity = $('#search-city').val();
    getCurrentWeather(event);
});

$('.clear-btn').on("click", (event) => {
    event.preventDefault();
    localStorage.clear();
    location.reload();
});

showStoredCities();
