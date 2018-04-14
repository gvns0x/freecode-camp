let input = Array.prototype.slice.call(document.getElementsByClassName("searchbox__input"))[0];
let wikiUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&uselang=user&search=";

$(".searchbox__input").change(function() {
    let searchUrl = wikiUrl + input.value;
    console.log(searchUrl);
    console.log(input.value);
})

