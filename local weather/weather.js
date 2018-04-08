let coordValues = document.getElementsByClassName("input-card__input");
let submitBtn = document.getElementsByClassName("input-card__button");
let inputLabels = Array.prototype.slice.call(document.getElementsByClassName("input-card__label"));
let inputFields = Array.prototype.slice.call(document.getElementsByClassName("input-card__input"));

let weatherArray = [];
let labelArray = [];

for (let j = 0; j < inputLabels.length; j++) {
  labelArray.push(inputLabels[j].innerHTML);
}

inputFields.forEach(function(element, index) {
  element.addEventListener("keypress", function check(evt) {
    let pressedKey = evt.keyCode;
    console.log(pressedKey);
    if(pressedKey < 48 || pressedKey > 57) {
      evt.preventDefault();
        inputLabels[index].classList.add("input-card__label__error");
        inputLabels[index].innerHTML = "Nope, only numbers";

        setTimeout(function labelsBackToNormal() {
          inputLabels[index].classList.remove("input-card__label__error");
          inputLabels[index].innerHTML = labelArray[index];
        }, 5000);
      } else {
        inputLabels[index].classList.remove("input-card__label__error");
        inputLabels[index].innerHTML = labelArray[index];
      }
    })
  });

function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      weatherArray = JSON.parse(this.responseText);
      getWeatherArray(weatherArray);
    }
  };
  xhttp.open("GET", "https://fcc-weather-api.glitch.me/api/current?lon=" + inputFields[0].value + "&lat=" + inputFields[1].value, true);
  xhttp.send();
}

/* Variables to show */

    /* Location */
let city = Array.prototype.slice.call(document.getElementsByClassName("weather-card__location__city"));
let country = Array.prototype.slice.call(document.getElementsByClassName("weather-card__location__country"));

    /* Temperature */
let mainTemp = Array.prototype.slice.call(document.getElementsByClassName("weather-card__location__temp__maintemp"));
let minTemp = Array.prototype.slice.call(document.getElementsByClassName("weather-card__location__temp__othertemp__minvalue"));
let maxTemp = Array.prototype.slice.call(document.getElementsByClassName("weather-card__location__temp__othertemp__maxvalue"));


    /* Weather */
let mainWeather = Array.prototype.slice.call(document.getElementsByClassName("weather-card__weather__main"));
let subWeather = Array.prototype.slice.call(document.getElementsByClassName("weather-card__weather__sub"));

    /* Other data */
let humidity = Array.prototype.slice.call(document.getElementsByClassName("weather-card__otherdata__humidityvalue"));
let wind = Array.prototype.slice.call(document.getElementsByClassName("weather-card__otherdata__windvalue"));

    /* Switch button */
let switchBtn = Array.prototype.slice.call(document.getElementsByClassName("weather-card__location__temp__switch"));

submitBtn[0].addEventListener("click", loadDoc);

let tempFields = ["mainTemp[0].innerHTML", "minTemp[0].innerHTML", "maxTemp[0].innerHTML"];

function getWeatherArray(weatherArray) {
  city[0].innerHTML = weatherArray.name + ", ";
  country[0].innerHTML = weatherArray.sys.country;

  mainTemp[0].innerHTML = weatherArray.main.temp;
  minTemp[0].innerHTML = weatherArray.main.temp_min;
  maxTemp[0].innerHTML = weatherArray.main.temp_max;

  mainWeather[0].innerHTML = weatherArray.weather[0].main;
  subWeather[0].innerHTML = weatherArray.weather[0].description;

  humidity[0].innerHTML = weatherArray.main.humidity;
  wind[0].innerHTML = weatherArray.wind.speed;

  console.log(weatherArray.weather[0].id);

  allTemps = [];
  allTemps.push(weatherArray.main.temp, weatherArray.main.temp_min, weatherArray.main.temp_max);

  function switchToFar() {
    newTemps = allTemps.map(function(element) {
      return element + 2000;
    });
    
    for(let o = 0; o<allTemps.length;o++) {
      tempFields[o] = newTemps[o];
    }
  }

  switchToFar();


}

