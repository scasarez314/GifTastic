//inital array for the deault buttons 
var gifArray = ["Jupiter", "Mars"]


function showMeTheGifButtons() {
    $("#arrayButtons").empty();
    for (var i = 0; i < gifArray.length; i++) {
        //var to call the button
        var newButton = $("<button class='m-1 text-info btn btn-outline-primary btn-sm col-lg-1 col-md-4 col-xs-4'>");
        newButton.addClass("gif");
        newButton.attr("gif-name", gifArray[i]);
        newButton.text(gifArray[i]);
        $("#arrayButtons").append(newButton);
    }

}
showMeTheGifButtons();


$("#gifSubmit").on("click", function (event) {
    event.preventDefault();
    //takes the text from the search box.
    var newGifSearch = $("#gifySearchBox").val().trim();
    //when 'Enter' is hit clear the toolbar.
    $("#gifySearchBox").val("");
    //pushes the text from the search box to the gifArray.
    gifArray.push(newGifSearch);
    //Then turn it into a button.
    showMeTheGifButtons();

})

function showGifPicture() {

    var APIkey = "WXE2Mr5EcRkieLtYMSGwDEtWe65I64tm";
    var gifButtonClicked = $(this).attr("gif-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifButtonClicked + "&api_key=" + APIkey + "&limit=10";



    console.log()


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)

        $("#gifPictureHolder").empty();
        //running a loop through the response array 
        for (let i = 0; i < response.data.length; i++) {

            var responseImage = $("<img class='mx-3 my-3 col-lg-3 col-md-4 col-xs-3 '>")
            responseImage.attr("src", response.data[i].images.downsized_still.url)
            responseImage.attr("data-still", response.data[i].images.downsized_still.url);
            responseImage.attr("data-animate", response.data[i].images.downsized_medium.url);
            responseImage.attr("data-state", "still");
            responseImage.addClass("gifClass");
            // responseImage.addclass()

            //calling the rating of the Gif.
            $("#gifPictureHolder").prepend("<p>Rating: " + response.data[i].rating + "</p>")
            //calling the picture of the Gif.
            $("#gifPictureHolder").prepend(responseImage)
        }

    })

}
showGifPicture();

//This is the onclick for the array buttons.
$(document).on("click", ".gif", showGifPicture)



$(document).on("click", ".gifClass", function () {


    // this will declare the gifs inital state. 
    var imageState = $(this).attr("data-state");

    //pull the url for the still image and + dataname
    var still = $(this).attr("data-still");
    // // ^^^same just the moving image + dataname 
    var animate = $(this).attr("data-animate");

    // this is the if statement that will toggle back and fourth.
    if (imageState === "still") {
        $(this).attr("src", animate);
        $(this).attr("data-state", "animate");


    } else {
        $(this).attr("src", still);
        $(this).attr("data-state", "still");


    }


});
