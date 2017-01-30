// Dave Durkee
// 11.20.2016

var gifArray = ["sloth", "panda","pug"];

$(document).ready(function(){
  // javascript, jQuery
  var xhr = $.get("https://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=dc6zaTOxFJmzC&limit=5");
  xhr.done(function(data) { console.log("success got data", data); });

    $("#button_begin").click(function(){
        //do this
        var test = "testing";
        console.log("Am i working: ", test);
    });


    
    renderButtons();
    onclickforButtons();

    //render buttons
    function renderButtons() {

      console.log("renderButtons");
      // Deleting the gif buttons prior to adding new gif buttons
      $("#col-md-12_1").empty();
      // Looping through the array of gifs
      for (var i = 0; i < gifArray.length; i++) {
        console.log(gifArray)
        // Then dynamicaly generating buttons for each gif in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class
        a.addClass("gif");
        // Adding a data-attribute with a value of the gif at index i
        a.attr("data-name", gifArray[i]);
        // Providing the button's text with a value of the gif at index i
        a.text(gifArray[i]);
        // Adding the button to the HTML
        $("#col-md-12_1").append(a);
      } //for gitArray
    }



    //get user input for a new category of animal
    $("#add-gif").on("click", function(event) {
      console.log("#add-gif");
      //allow enter or click
      event.preventDefault();

      // This line will grab the text from the input box
      var gif = $("#gif-input").val().trim();
      
      // The gif from the textbox is then added to our array
      gifArray.push(gif);
      // calling renderButtons which handles the processing of our gif array
      $("#gif-input").val('');
      renderButtons();
      onclickforButtons();
    }); // get user input
    
    
    function onclickforButtons() {
      // Event listener for gif-buttons $(this).attr("data-name");
      $(".gif").on("click", function() {
        console.log(".gif");
        var myAnimal = $(this).attr("data-name");
        // Storing our giphy API URL for a random cat image
        //  var queryURL = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + animal;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + myAnimal + "&api_key=dc6zaTOxFJmzC";

        // Perfoming an AJAX GET request to our queryURL
        $.ajax({
          url: queryURL,
          method: "GET"
        }) //ajax
      
        // After the data from the AJAX request comes back
        .done(function(response) {
          //display 10 images and ratings
          $("#gif-area").empty();
          for (var i=0; i<10; i++){
            // Saving the image_original_url property
            
            var imageUrlStill = response.data[i].images.fixed_height_still.url;
            var imageUrlAnimated = response.data[i].images.fixed_height.url;
            var imageRating = response.data[i].rating.toUpperCase();
            
            var imageDiv = $("<div>");
            imageDiv.attr("class","imgdiv");
            // create an img tag
            var animalImage = $("<img>");
            // Setting the animalImage src attribute to imageUrlStill
            
            //ratingArea.text(imageRating);
            animalImage.attr("src", imageUrlStill);
            animalImage.attr("data-still", imageUrlStill);
            animalImage.attr("data-animate", imageUrlAnimated);
            animalImage.attr("data-state", "still");
            animalImage.attr("class", "gifImage");
            animalImage.attr("alt", "animal");
            
            var figcaption = $("<figcaption>"); // Rating: " + imageRating + "</figcaption>";
            figcaption.attr("class", "figcap");
            figcaption.html("Rating: " + imageRating );

//KEY PART !!!!
            imageDiv.append(animalImage);
            imageDiv.append(figcaption);

            // Prepending the Caption Image to the images div
            $("#gif-area").prepend(imageDiv);
            //$("#gif-area").prepend(animalImage + "<figcaption> " + imageRating + " </figcaption>");
          //  $("#gif-area").prepend("Rating: " + ratingArea.text());
          //  $("#gif-area").prepend("Rating: " + imageRating);
          } //for 10 images
          
          //event listener for animate class = gifImage
            $(".gifImage").on("click", function() {
            var state = $(this).attr("data-state");
            console.log("state :" + state);
              if (state === "still") {
                $(this).attr("src", $(this).data("animate"));
                $(this).attr("data-state", "animate");
              }
              else {
                // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                // Then, set the image's data-state to animate
                $(this).attr("src", $(this).data("still"));
                $(this).attr("data-state", "still");
              }
            }); //gif listener

        }); // end .done

      }); //event listener for gif buttons
          
    }; // end onclickforButtons




}); // end (document).ready(function()



//<!-- ---------------------------------- Event LOOPs begin --------------------------------------- -->
	document.onkeyup = function(event) {
    //

  } // end of document.onkeyup

//<!-- ---------------------------------- Event LOOPs end --------------------------------------- -->

