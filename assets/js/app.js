const giphyAPIKey = '5J2DxEwoOGML6C2M2ZCBNbziJTSHovI1';
const initialButtonArr = ['UNC', 'Duke', 'NC State', 'Wake Forest', 'ECU', 'UNCG'];




// function newButton(text) {

//     let button = '<button type="button" class="btn">' + text + '</button>'

//     var a = $("<button>");
//           // Adds a class of movie to our button
//           a.addClass("");
//           // Added a data-attribute
//           a.attr("data-name", movies[i]);
//           // Provided the initial button text
//           a.text(movies[i]);
//           // Added the button to the buttons-view div
//           $("#buttons-view").append(a);

// $("#animalButtons").append(button)
//     return;

// };
// newButton("aa");
// newButton("bb");

function displayButtons() {

    for (let i = 0; i < initialButtonArr.length; i++) {

        let newBtn = $('button');
        newBtn.text(initialButtonArr[i]);
        newBtn.addClass('list');
        $('#animalButtons').append(newBtn);
    
    };
};



function getGif(e) {

    let searchTerm = $(this).text;
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        searchTerm + "&api_key=" + giphyAPIKey + "&limit=10";

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function (response) {
            let results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='item'>");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var personImage = $("<img>");
                personImage.attr("src", results[i].images.fixed_height.url);

                gifDiv.prepend(p);
                gifDiv.prepend(personImage);

                $("#animalGifs").prepend(gifDiv);
            }
        });
};


$(document).on('click', '#list', getGif );

displayButtons();
// });