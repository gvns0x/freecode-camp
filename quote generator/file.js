    var quoteString = "";
    var authorString = "";

    /* Prev number starts at -1 and randNum is not actually number, but starts at 0 */
    var prevNum = -1;
    var randNum = 0;
    
    $(".main-button").on("click", function () {
        $.getJSON("http://juauz.com/code/file.json", function (json) {
            var jsonKey = Object.keys(json);

            $.each(json, function(ye, val) {
                var keys = Object.keys(val);
                var keysLength = keys.length;

                /* prevNum is now equal to the randNum */
                prevNum = randNum;

                /* to make them different, randNum is now generated as a random number */
                randNum = Math.floor(Math.random()*(keysLength));

                /* to make sure the next number is ALWAYS DIFFERENT from the previous one, I use a while loop. If they're equal, keep generating a new number */
                while(prevNum == randNum) {
                    randNum = Math.floor(Math.random()*(keysLength));
                }
                
                var valKey = keys[randNum];
                var valQ = val[valKey];
                var valQuote = val[valKey]["quote"];
                var valAuthor = val[valKey]["author"];
                
                quoteString = valQuote;
                authorString = valAuthor;

                $(".quote").addClass("show");
                $(".author").addClass("show");

                console.log("The random number is " + randNum);
            })

            $(".quote").html(quoteString);
            $(".author").html(authorString);
        })
    })