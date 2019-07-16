//inital array for the deault buttons 
var gifArray = ["Jupiter", "Earth", "Mars"]


function showMeTheGifButtons() {
    $("#arrayButtons").empty();
    for (var i = 0; i < gifArray.length; i++) {
        var newButton = $("<button>");
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
    //pushes the text from the search box to the gifArray.
    gifArray.push(newGifSearch);
    //Then turn it into a button.
    showMeTheGifButtons();

})

function showGifPicture() {

    var APIkey = "WXE2Mr5EcRkieLtYMSGwDEtWe65I64tm";
    var gifButtonClicked = $(this).attr("gif-name");
    var queryURL = "http:api.giphy.com/v1/gifs/search?q=" + gifButtonClicked + "&api_key=" + APIkey + "&limit=10";



    console.log(gifButtonClicked)


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        //running a loop through the response array 
        for (let i = 0; i < response.length; i++) {
            //calling the rating of the Gif.
            $("#gifPictureHolder").text("<p>Rating:" + response.data[0].rating + "</p>")
        }

    })

}
showGifPicture();

//This is the onclick for the array buttons.
$(".gif").on("click", showGifPicture)
