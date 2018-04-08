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
  xhttp.open("GET", "https://fcc-weather-api.glitch.me/api/current?lon=55&lat=12", true);
  xhttp.send();
}

loadDoc();

function getWeatherArray(weatherArray) {
  console.log(weatherArray.coord);
}