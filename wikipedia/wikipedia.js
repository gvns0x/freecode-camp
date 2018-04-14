let input = Array.prototype.slice.call(document.getElementsByClassName("searchbox__input"))[0];
let wikiUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&uselang=user&search=";

let searchUrl = wikiUrl + input.value;

$(".searchbox__input").on("changed keyup", function() {
    console.log(searchUrl);
    console.log(input.value);
})

