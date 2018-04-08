let coordValues = document.getElementsByClassName("input-card__input");
let submitBtn = document.getElementsByClassName("input-card__button");
let inputLabels = Array.prototype.slice.call(document.getElementsByClassName("input-card__label"));
let inputFields = Array.prototype.slice.call(document.getElementsByClassName("input-card__input"));

let weatherArray = [];
let labelArray = [];

for(let j=0;j<inputLabel.length;j++) {
  labelArray.push(inputLabel[j].innerHTML);
}

inputLabel

function check(evt) {
  var code = evt.charCode;
  if (code != 0) {
    if(code < 97 || code > 122) {
      evt.preventDefault();
      inputLabels[0].innerHTML = "NOO";
    }
  }
}

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