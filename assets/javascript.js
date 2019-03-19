var topics = ["Captain America", "Iron Man", "The Incredible Hulk", "Thor"]

function displayGifs() {

    $("#gifs-appear-here").empty();

    var topic = $(this).attr("data-guy");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=F4fGkWxvKlltU0whS0rWe4WUd72HL7d8";

    $.ajax({
        url: queryURL,
        method: "GET",
    })

        .then(function (response) {

            var results = response.data

            for (var i = 0; i < 10; i++) {

                var topicDiv = $("<div class='topic'>")

                var title = results[i].title;
                var named = $("<h2>").text(title);

                var rating = results[i].rating;
                var rated = $("<p>").text("Rating: " + rating);

                // I gave each gif these attributes, but the images won't change from still to animated
                // Function is at the bottom
                var image = $("<img>");
                image.addClass("gif");
                image.attr("src", results[i].images.fixed_height_still.url);
                image.attr("data-state", "still")
                image.attr("data-still", results[i].images.fixed_height_still.url);
                image.attr("data-animate", results[i].images.fixed_height.url);

                topicDiv.append(named);
                topicDiv.append(rated);
                topicDiv.append(image);

                $("#gifs-appear-here").prepend(topicDiv);

                console.log(response);
            }

        })
};

function makeButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < topics.length; i++) {
        var t = $("<button>");
        t.addClass("topic-button");
        t.attr("data-guy", topics[i]);
        t.text(topics[i]);
        $("#buttons-view").append(t);
    }
};

$("#add-topic").on("click", function (event) {
    event.preventDefault();

    var topic = $("#topic-input").val().trim();
    topics.push(topic);
    makeButtons();
});

$(".gif").on("click", function () {

    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

$(document).on("click", ".topic-button", displayGifs);

makeButtons();
