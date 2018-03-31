const giphyAPIKey = '5J2DxEwoOGML6C2M2ZCBNbziJTSHovI1';
const initialButtonArr = ['UNC', 'Duke', 'NC State', 'Wake Forest', 'ECU', 'UNCG', 'UNLV'];
const theme = 'mascot';

function displayButtons() {

    for (let i = 0; i < initialButtonArr.length; i++) {
        let newBtn = $('<button>');
        newBtn.text(initialButtonArr[i]);
        newBtn.attr('data-value', initialButtonArr[i]);
        newBtn.addClass('listBtn btn');
        $('#gifButtons').append(newBtn);
    };
};
$(document).ready(function () {
    $('.listBtn').on('click', function () {
        
        let selectedItem = $(this).attr('data-value');
        let searchTerm = selectedItem + ' ' + theme;
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            searchTerm + "&api_key=" + giphyAPIKey + "&limit=10";
            
            $("#gifs").empty();

        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function (response) {
                let results = response.data;
                console.log(results);

                for (var i = 0; i < results.length; i++) {
                
                    var gifDiv = $("<div class='gif'>");
                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var gifImg = $("<img>");
                    gifImg.attr("src", results[i].images.fixed_height.url);
                    // gifImg.text("Rating: " + rating);

                    gifDiv.append(p);
                    gifDiv.append(gifImg);

                    $("#gifs").append(gifDiv);

                  
                }
               
            });
    });
});


// $(document).on('click', '#list', getGif);

displayButtons();
// });