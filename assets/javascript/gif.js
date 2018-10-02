$(document).ready(function () {

    var topic = ["Bret Hart", "The Undertaker", "Mr. Perfect", "Hulk Hogan", "Razor Ramon", "Yokozuna", "Macho Man Randy Savage", "Ultimate Warrior", "Andre the Giant", "Ric Flair", "Rowdy Roddy Piper", "Jake the Snake", "Ted Dibiase", "Owen Hart", "Shawn Michaels", "The Rock", "Mick Foley", "Stone Cold Steve Austin", "Triple H", "Dudley Boyz", "Hardy Boyz", "Lita",];

    function renderButtons() {

      $("#wrestlersDiv").empty();


        for (var i = 0; i < topic.length; i++) {

            var button = $("<button>");
            button.attr("data-name", topic[i]);
            button.addClass("m-2 btn btn-danger")
            button.text(topic[i]);
            $("#wrestlersDiv").append(button);

        }

        $("button").on("click", function () {

            var person = $(this).attr("data-name");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            person + "&api_key=LYSZOPxCwnzmKOUxxzBarD2JSZyGdN9I&limit=10";        
            
            $.ajax({
                url: queryURL,
                method: "GET"
            })

            .then(function gifGet(response) {
    
                var results = response.data;
                
                $("#gifsDiv").empty();
                
                for (var i = 0; i < results.length; i++) {

                    var rating = results[i].rating.toUpperCase();
                    var p = $("<p>").text("RATING: " + rating);
                    var personImage = $("<img>");
                    var gifDiv = $("<div>");
                    personImage.attr("src", results[i].images.fixed_height_still.url);
                    personImage.attr("data-still", results[i].images.fixed_height_still.url);
                    personImage.attr("data-animate", results[i].images.fixed_height.url);
                    personImage.attr("data-state","still")
                    personImage.addClass("gif")
                    gifDiv.addClass("col-12 col-lg-6")
                    gifDiv.append(personImage);
                    gifDiv.append(p);

                    $("#gifsDiv").prepend(gifDiv);
                }
            

                $(".gif").on("click", function() {
                    var state = $(this).attr("data-state");
                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
                });

            });
            
        });

    }

    $("#addWrestler").on("click", function(event) {
        event.preventDefault(); 
        
        var input = $("#wrestlersInput").val().trim();

        if (input === "") {
            return;
        }
        else{
        topic.push(input);
        }

        renderButtons();
    });

   

    renderButtons();

})