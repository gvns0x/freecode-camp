let coordValues = document.getElementsByClassName("input-card__input");
let submitBtn = document.getElementsByClassName("input-card__button");
let inputLabels = Array.prototype.slice.call(document.getElementsByClassName("input-card__label"));
let inputFields = Array.prototype.slice.call(document.getElementsByClassName("input-card__input"));
let bodyElement = Array.prototype.slice.call(document.getElementsByTagName("body"));

let weatherArray = [];
let labelArray = [];

for (let j = 0; j < inputLabels.length; j++) {
  labelArray.push(inputLabels[j].innerHTML);
}

inputFields.forEach(function (element, index) {
  element.addEventListener("keypress", function check(evt) {
    let pressedKey = evt.keyCode;
    console.log(pressedKey);
    if (pressedKey < 48 || pressedKey > 57) {
      evt.preventDefault();
      inputLabels[index].classList.add("input-card__label__error");
      inputLabels[index].innerHTML = "Nope, only numbers";

      setTimeout(function labelsBackToNormal() {
        inputLabels[index].classList.remove("input-card__label__error");
        inputLabels[index].innerHTML = labelArray[index];
      }, 3000);
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
  xhttp.open("GET", "https://fcc-weather-api.glitch.me/api/current?lat=" + inputFields[0].value + "&lon=" + inputFields[1].value, true);
  xhttp.send();
}

/* Variables to show */

/* Main variables */
let weatherContent = Array.prototype.slice.call(document.getElementsByClassName("weather-card__content"));
let weatherEmpty = Array.prototype.slice.call(document.getElementsByClassName("weather-card__empty"));

/* Location */
let city = Array.prototype.slice.call(document.getElementsByClassName("weather-card__location__city"));
let country = Array.prototype.slice.call(document.getElementsByClassName("weather-card__location__country"));
let coordLon = Array.prototype.slice.call(document.getElementsByClassName("weather-card__location__coords__lon"));
let coordLat = Array.prototype.slice.call(document.getElementsByClassName("weather-card__location__coords__lat"));

/* Temperature */
let mainTemp = Array.prototype.slice.call(document.getElementsByClassName("weather-card__location__temp__maintemp"));
let minTemp = Array.prototype.slice.call(document.getElementsByClassName("weather-card__location__temp__othertemp__minvalue"));
let maxTemp = Array.prototype.slice.call(document.getElementsByClassName("weather-card__location__temp__othertemp__maxvalue"));
let unitTemp = Array.prototype.slice.call(document.getElementsByClassName("weather-card__location__temp__unit"));


/* Weather */
let mainWeather = Array.prototype.slice.call(document.getElementsByClassName("weather-card__weather__main"));
let subWeather = Array.prototype.slice.call(document.getElementsByClassName("weather-card__weather__sub"));

/* Other data */
let humidity = Array.prototype.slice.call(document.getElementsByClassName("weather-card__otherdata__humidityvalue"));
let wind = Array.prototype.slice.call(document.getElementsByClassName("weather-card__otherdata__windvalue"));

/* Switch button */
let switchBtn = Array.prototype.slice.call(document.getElementsByClassName("weather-card__location__temp__switch"));

submitBtn[0].addEventListener("click", loadDoc);

// let tempFields = ["mainTemp[0].innerHTML", "minTemp[0].innerHTML", "maxTemp[0].innerHTML"];

/* If this var is even, show in Celsius - otherwise, Fahrenheit */
let counter = 0;

function isEven(n) {
  return n % 2 == 0;
}

function inFahrenheit(t) {
  return ((t * (9 / 5)) + 32).toFixed(2);
}

function returnTemperatures() {
  if (isEven(counter)) {
    mainTemp[0].innerHTML = weatherArray.main.temp;
    minTemp[0].innerHTML = weatherArray.main.temp_min;
    maxTemp[0].innerHTML = weatherArray.main.temp_max;
    unitTemp[0].innerHTML = "ºC";
  } else {
    mainTemp[0].innerHTML = inFahrenheit(weatherArray.main.temp);
    minTemp[0].innerHTML = inFahrenheit(weatherArray.main.temp_min);
    maxTemp[0].innerHTML = inFahrenheit(weatherArray.main.temp_max);
    unitTemp[0].innerHTML = "ºF";
  }

  showResults();
  changeImg();
}

function getWeatherArray(weatherArray) {

  returnTemperatures();

  city[0].innerHTML = weatherArray.name + ", ";
  country[0].innerHTML = weatherArray.sys.country;

  mainWeather[0].innerHTML = weatherArray.weather[0].main;
  subWeather[0].innerHTML = weatherArray.weather[0].description;

  humidity[0].innerHTML = weatherArray.main.humidity;
  wind[0].innerHTML = weatherArray.wind.speed;

  coordLon[0].innerHTML = weatherArray.coord.lon;
  coordLat[0].innerHTML = weatherArray.coord.lat + "/ ";

  console.log(weatherArray.weather[0].id);
}



function changeUnit() {
  counter = counter + 1;
  returnTemperatures();
  return counter;
}

/* Clicking on the switch button will add +1 to counter */
switchBtn[0].addEventListener("click", changeUnit);
switchBtn[0].addEventListener("click", switchStyle);

/* Changing switch button styles */
let buttonText = ["see in ºF", "see in ºC"];

function switchStyle() {
  if(isEven(counter)) {
    switchBtn[0].innerHTML = buttonText[0];
    switchBtn[0].style.background = "rgb(255, 200, 97)";
  } else {
    switchBtn[0].innerHTML = buttonText[1];
    switchBtn[0].style.background = "rgb(255, 167, 167)";
  }
}

function showResults(et) {
  inputFields.forEach(function(val,index) {
    weatherContent[0].classList.add("isVisible");
    weatherEmpty[0].classList.add("isHidden");
    if(inputFields[index].value == "") {
      console.log("Some fields is empty");
      weatherContent[0].classList.remove("isVisible");
    weatherEmpty[0].classList.remove("isHidden");
    }
  })
}

/* Array of weather possibilities */
let weatherOptions = ["Rain", "Clouds", "Clear"];
let weatherImgs = ["rain", "clouds", "clear"];

function changeImg() {
  let weatherNow = weatherArray.weather[0].main;
  weatherOptions.forEach(function(v,index) {
    if(weatherNow == weatherOptions[index]) {
      bodyElement[0].style.backgroundImage = "url(imgs/" + weatherImgs[index] + ".jpg)";
    }
  })
}