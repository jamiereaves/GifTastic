//variable to hold array of categories
var emotions = ["happy", "sad", "bored", "angry", "confused", "silly", "giddy", "hungry", "anxious", "scared", "overwhelmed", "disoriented", "fabulous", "fantastic", "frisky", "terrified", "exhausted", "sleepy", "freaky", "optimistic", "energetic"];
//variable to hold initial values of limit and currentEmotion
var limit = 0;
var currentEmotion = "";


//function that creates buttons from the array elements in movies
function buttonMaker() {
    // Delete the content inside the movies-view div prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttonHolder").empty();
    // Loop through the array of movies, then generate buttons for each movie in the array
    for (i=0; i < emotions.length; i++) {
        //create button, store in variable, add class, add text, append to the button holder
        var a = $("<button>");
        a.addClass("topButton");
        a.attr("name", emotions[i]);
        a.text(emotions[i]);
        $("#buttonHolder").append(a);
    }
  }
//function that displays the appropriate gifs
function displayEmotionInfo() {
        //display gif parent element and the button for more gifs
        $("#gifParent").css("display", "inherit");
        $("#moreGifs").css("display", "inherit");
        //create a variable to hold the emotion we want
        var emotion = $(this).attr("name");
        //variables to hold the api key and query url
        var apiKey = "otWUS8zWk68tC5ScS8TohXDFHdHJQ9xZ";
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emotion + "&apikey=" + apiKey + "&limit=10";
        //reset limit each time a new emotion is clicked
        limit = 0;
        //use get method on api url
        $.ajax({url: queryURL,
             method: 'GET'})
    //promise function 
    .then(function(response){
        //reset display of gifs
        $("#gifDisplay").empty();
        //for each element of the array the api returned
        for (i=0 ; i < response.data.length ; i++) {
        //create a variable to hold the url's for the still and animated gifs and the rating of the gif
        var gifURLA = response.data[i].images.fixed_height_still.url;
        var gifURLB = response.data[i].images.fixed_height.url;
        var rating = response.data[i].rating;
        //variable to hold the container for the gif and rating, add class 
        var a = $("<div>")
        a.addClass("resultContainer");
        //variable to hold the gif, add class, add attributes to hold the status(still/animated),
        //active and still links, and set the source of the gif to initially display a still image
        var b = $("<img>");
        b.addClass("resultGif");
        b.attr("src", gifURLA);
        b.attr("aStatus", "still");
        b.attr("activeGif", gifURLB);
        b.attr("stillGif", gifURLA);
        //variable to hold the rating, add class, add the text
        var c = $("<p>");
        c.addClass("resultText");
        c.text("rating:  " + rating);
        //append image and rating to gif/rating holder
        a.append(b);
        a.append(c);
        //append the gif/rating holder to the gifDisplay
        $("#gifDisplay").append(a);
        }
    })
    //store the current emotion so more thematic gifs can be displayed later, increase the limit
    //so more gifs will be displayed upon request
    currentEmotion=$(this).attr("name");
    limit += 10;
    };
//function that adds more gifs
function displayMoreGifs(event) {
    //prevent the page from reloading when the button is pushed
    event.preventDefault();
    //add to limit so that more gifs will be displayed next time
    limit +=10;
    //set the emotion for this function to the appropriate stored emotion so more gifs
    // of the appropriate emotion are displayed
    emotion = currentEmotion;
    //variables to hold the api key and query url the limit of this query will be 10 more than the previous query
    var apiKey = "otWUS8zWk68tC5ScS8TohXDFHdHJQ9xZ";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emotion + "&apikey=" + apiKey + "&limit=" + limit + "";
    $.ajax({url: queryURL,
         method: 'GET'})
//use get method on api url
.then(function(response){
    //reset display of gifs
    $("#gifDisplay").empty();
    //for each element of the array the api returned
    for (i=0 ; i < response.data.length ; i++) {
    //create a variable to hold the url's for the still and animated gifs and the rating of the gif    
    var gifURLA = response.data[i].images.fixed_height_still.url;
    var gifURLB = response.data[i].images.fixed_height.url;
    var rating = response.data[i].rating;
    //variable to hold the container for the gif and rating, add class
    var a = $("<div>")
    a.addClass("resultContainer");
    //variable to hold the gif, add class, add attributes to hold the status(still/animated),
    //active and still links, and set the source of the gif to initially display a still image
    var b = $("<img>");
    b.addClass("resultGif");
    b.attr("src", gifURLA);
    b.attr("aStatus", "still");
    b.attr("activeGif", gifURLB);
    b.attr("stillGif", gifURLA);
    //variable to hold the rating, add class, add the text
    var c = $("<p>");
    c.addClass("resultText");
    c.text("rating:  " + rating);
    //append image and rating to gif/rating holder
    a.append(b);
    a.append(c);
    //append the gif/rating holder to the gifDisplay
    $("#gifDisplay").append(a);
    }
})
};

//function that animates/pauses gifs
    function gifStateSwitch(){
        //variable to hold the still/active status
        var status = $(this).attr("aStatus")
        //if the status is still
        if (status == "still") {
            //change the source of the gif to the active link
            $(this).attr("src", $(this).attr("activeGif"));
            //change the status to active
            $(this).attr("aStatus", "active");
        }
        //otherwise
        else {
            //change the source of the gif to the still link
            $(this).attr("src", $(this).attr("stillGif"));
            //change the status to still
            $(this).attr("aStatus", "still");
        }
    }
//function that adds button to array from user input
function addButton(event) {
    //prevent page from reloading when the button is clicked
    event.preventDefault();
    // Write code to grab the text the user types into the input field
    var userInput = $("#userInput").val().trim().toLowerCase();
    //check if the emotion has already been added to the array, if so-return
    for (i=0 ; i < emotions.length ; i++){
        if (userInput == emotions[i]){
            return;
        }
    }
    //check if the user has attempted to add an empty string
    if (userInput == ""){
        return;
        }   
    //otherwise add the new emotion to the array
    else{
    emotions.push(userInput);
    // The renderButtons function is called, rendering the list of movie buttons
    buttonMaker();
  }};
//call functions when the appropriate buttons are clicked
$(document).on("click", ".topButton", displayEmotionInfo);
$(document).on("click", ".resultGif", gifStateSwitch);
$(document).on("click", "#buttonAdd", addButton);
$(document).on("click", "#moreGifs", displayMoreGifs);
//when window loads, set up the initial button array , hide the more gifs button and gif display and set
//the more gif button text
window.onload = function() {
    buttonMaker();
    $("#gifParent").css("display", "none");
    $("#moreGifs").html("need more gifs?!");
    $("#moreGifs").css("display", "none");
}
