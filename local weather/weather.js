let weatherArray = [];

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        weatherArray = JSON.parse(this.responseText);
        getWeatherArray(weatherArray);
      }
    };
    xhttp.open("GET", "https://fcc-weather-api.glitch.me/api/current?lon=55&lat=12", true);
    xhttp.send();
}

loadDoc();

function getWeatherArray(weatherArray) {
    console.log(weatherArray.coord);
}