function setup() {
    let input = Array.prototype.slice.call(document.getElementsByClassName("searchbox__search__main__input"))[0];
    let wikiUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&uselang=user&search=";
    let button = Array.prototype.slice.call(document.getElementsByClassName("searchbox__search__main__button"))[0];

    /* When input changes, get new searchUrl */
    button.addEventListener("click", generateUrl);

    function generateUrl() {
        let searchUrl = wikiUrl + input.value;
        console.log(searchUrl);
        console.log(input.value);

        loadJSON(searchUrl, getData, 'jsonp');

        function getData(data) {
            let searchTitles = data["1"];
            let searchDescriptions = data["2"];
            let searchLinks = data["3"];
            console.log(data);


            $(".searchbox__results").append("<h1 class='searchbox__results__intro'>There are " + (searchLinks.length - 1) + " results for " + searchTitles[0] + "</h1>");

            for (let i = 0; i < searchTitles.length - 1; i++) {
                let descLength = 150;
                $(".searchbox__results").append("<a href='" + searchLinks[i + 1] + "' target='_blank'> <div class='searchbox__results__item'> <h2 class='searchbox__results__title'>"
                + searchTitles[i+1] +
                "</h2><p class='searchbox__results__description'>" + smallDesc() + "</div></a>");

                /* If the description is bigger or == to descLength, add "..." at the end */
                function smallDesc() {
                    let brief = searchDescriptions[i + 1].slice(0,descLength);
                    if(searchDescriptions[i+1].length < descLength) {
                        return searchDescriptions[i + 1];
                    } else {
                        return brief + "...";
                    }
                    console.log(brief.length);
                }
                smallDesc();
            }
        }
    }
}