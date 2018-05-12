//variable to hold array of categories
var emotions = ["happy", "sad", "bored", "angry", "confused", "silly", "giddy", "hungry", "anxious", "scared", "overwhelmed", "disoriented", "fabulous", "fantastic", "frisky", "terrified", "exhausted"];
var limit = 0;
var currentEmotion = "";


//function that creates buttons from the array elements in movies
function buttonMaker() {
    // Delete the content inside the movies-view div prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttonHolder").empty();
    // Loop through the array of movies, then generate buttons for each movie in the array
    for (i=0; i < emotions.length; i++) {
        var a = $("<button>");
        a.addClass("topButton");
        a.attr("name", emotions[i]);
        a.text(emotions[i]);
        $("#buttonHolder").append(a);
    }
  }
//function that displays the appropriate gifs
function displayEmotionInfo() {
        $("#gifParent").css("display", "inherit");
        $("#moreGifs").css("display", "inherit");
        var emotion = $(this).attr("name");
        var apiKey = "otWUS8zWk68tC5ScS8TohXDFHdHJQ9xZ";
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emotion + "&apikey=" + apiKey + "&limit=10";
        limit = 0;
        $.ajax({url: queryURL,
             method: 'GET'})

    .then(function(response){
        $("#gifDisplay").empty();
        console.log(queryURL); 
        for (i=0 ; i < response.data.length ; i++) {
        /*console.log(response.data[i].images.original.url);
        console.log(response.data[i].rating);*/
        var gifURLA = response.data[i].images.fixed_height_still.url;
        var gifURLB = response.data[i].images.fixed_height.url;
        var rating = response.data[i].rating;
        var a = $("<div>")
        a.addClass("resultContainer");
        var b = $("<img>");
        b.addClass("resultGif");
        b.attr("src", gifURLA);
        b.attr("aStatus", "still");
        b.attr("activeGif", gifURLB);
        b.attr("stillGif", gifURLA);
        var c = $("<p>");
        c.addClass("resultText");
        c.text("rating:  " + rating);
        a.append(b);
        a.append(c);
        $("#gifDisplay").append(a);
        }
    })
    currentEmotion=$(this).attr("name");
    limit += 10;
    };
//function that adds more gifs
function displayMoreGifs(event) {
    event.preventDefault();
    limit +=10;
    emotion = currentEmotion;
    var apiKey = "otWUS8zWk68tC5ScS8TohXDFHdHJQ9xZ";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emotion + "&apikey=" + apiKey + "&limit=" + limit + "";
    console.log(queryURL);
    $.ajax({url: queryURL,
         method: 'GET'})

.then(function(response){
    $("#gifDisplay").empty();
    for (i=0 ; i < response.data.length ; i++) {
    var gifURLA = response.data[i].images.fixed_height_still.url;
    var gifURLB = response.data[i].images.fixed_height.url;
    var rating = response.data[i].rating;
    var a = $("<div>")
    a.addClass("resultContainer");
    var b = $("<img>");
    b.addClass("resultGif");
    b.attr("src", gifURLA);
    b.attr("aStatus", "still");
    b.attr("activeGif", gifURLB);
    b.attr("stillGif", gifURLA);
    var c = $("<p>");
    c.addClass("resultText");
    c.text("rating:  " + rating);
    a.append(b);
    a.append(c);
    $("#gifDisplay").append(a);

    }
})
};

//function that animates/pauses gifs
    function gifStateSwitch(){
        var status = $(this).attr("aStatus")
        if (status == "still") {
            $(this).attr("src", $(this).attr("activeGif"));
            $(this).attr("aStatus", "active");
        }
        else {
            $(this).attr("src", $(this).attr("stillGif"));
            $(this).attr("aStatus", "still");
        }
    }
//function that adds button to array from user input
function addButton(event) {
    //prevent page from reloading when the button is clicked
    event.preventDefault();
    // Write code to grab the text the user types into the input field
    var userInput = $("#userInput").val().trim();
    // Write code to add the new movie into the movies array
    for (i=0 ; i < emotions.length ; i++){
        if (userInput == emotions[i]){
            return;
        }
    }
    if (userInput == "");
    else{
    emotions.push(userInput);
    // The renderButtons function is called, rendering the list of movie buttons
    buttonMaker();
  }};
$(document).on("click", ".topButton", displayEmotionInfo);
$(document).on("click", ".resultGif", gifStateSwitch);
$(document).on("click", "#buttonAdd", addButton);
$(document).on("click", "#moreGifs", displayMoreGifs);

  window.onload = function() {
    buttonMaker();
    $("#gifParent").css("display", "none");
    $("#moreGifs").html("need more gifs?!");
    $("#moreGifs").css("display", "none");
}
