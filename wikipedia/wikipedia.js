function setup() {
    let input = Array.prototype.slice.call(document.getElementsByClassName("searchbox__input"))[0];
    let wikiUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&uselang=user&search=";
    let button = Array.prototype.slice.call(document.getElementsByClassName("searchbox__button"))[0];

    /* When input changes, get new searchUrl */
    button.addEventListener("click", generateUrl);

    function generateUrl() {
        let searchUrl = wikiUrl + input.value;
        console.log(searchUrl);
        console.log(input.value);

        loadJSON(searchUrl, getData, 'jsonp');

        function getData(data) {
            console.log(data);
        }
    }
}