$(document).ready(function () {

    // Array containing pre-selected buttons
    var topic = ["Bret Hart", "The Undertaker", "Hulk Hogan", "Razor Ramon", "Yokozuna", "Randy Savage", "Ultimate Warrior", "Andre the Giant", "Shawn Michaels", "The Rock", "Mick Foley", "Stone Cold Steve Austin", "Chyna", "Triple H", "Lita"];

    // Function creates buttons on page load
    function renderButtons() {

        // Prevents repetition of buttons when user creates new button
        $("#wrestlersDiv").empty();

        // For loop that iterates buttons using elements from array above
        for (var i = 0; i < topic.length; i++) {

            var button = $("<button>");
            button.attr("data-name", topic[i]);
            button.addClass("m-2 btn btn-danger")
            button.text(topic[i]);
            $("#wrestlersDiv").append(button);

        }

        // Event listener connects with API to grab information related to the topic/name of button
        $("button").on("click", function () {

            var person = $(this).attr("data-name");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            person + "&api_key=LYSZOPxCwnzmKOUxxzBarD2JSZyGdN9I&limit=10";        
            
            $.ajax({
                url: queryURL,
                method: "GET"
            })

            .then(function gifGet(response) {
                
                // Data object from response is initialized in data
                var results = response.data;
                
                $("#gifsDiv").empty();
                
                // For creates the div which whill hold the results of the AJAX function for as many results as were requested
                for (var i = 0; i < results.length; i++) {

                    // Stores rating and title information from each result into perspective variables
                    var rating = results[i].rating.toUpperCase();
                    var title = results[i].title.toUpperCase();

                    // Creates a <p> and adds text/html as classes in one line
                    var p = $("<p>").html('RATING: ' + rating).addClass("text-black-70");
                    var t = $("<p>").html(title).addClass("text-black-70 mb-0");

                    // Creates <img> and <div> while also adding classes 
                    var personImage = $("<img>").addClass("gif");
                    var gifDiv = $("<div>").addClass("col-12 col-lg-6");

                    // Attaches several attributes that will later be used in an even listener
                    personImage.attr("src", results[i].images.fixed_height_still.url).attr("data-still", results[i].images.fixed_height_still.url).attr("data-animate", results[i].images.fixed_height.url).attr("data-state","still");
                    
                    // Various variables are appended to gifDiv variable and prepended to DOM
                    gifDiv.append(personImage).append(t).append(p);                    
                    $("#gifsDiv").prepend(gifDiv);
                }
            
                // Event listener that changes the source url from the still to animated version and back again
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

    // Event listener that creates the a new button based on user input
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