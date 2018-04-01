const giphyAPIKey = '5J2DxEwoOGML6C2M2ZCBNbziJTSHovI1';
const theme = 'mascot';

let buttonArr = ['UNC', 'Duke', 'NC State', 'Wake Forest', 'ECU', 'UNCG', 'UNLV'];

function displayButtons() {

    $('#gifButtons').empty();

    for (let i = 0; i < buttonArr.length; i++) {
        let newBtn = $('<button>');
        newBtn.text(buttonArr[i]);
        newBtn.attr('data-value', buttonArr[i]);
        newBtn.addClass('listBtn btn');
        $('#gifButtons').append(newBtn);
    };
};

// $('.listBtn').on('click', function () {

function displayGifs() {

    let selectedItem = $(this).attr('data-value');
    let searchTerm = selectedItem + ' ' + theme;
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        searchTerm + "&api_key=" + giphyAPIKey + "&limit=10";

    $("#gifs").empty();

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        let results = response.data;       
        console.log(results);

        for (var i = 0; i < results.length; i++) {
            if (['g', 'pg-13'].includes(results[i].rating)) {
                var gifDiv = $("<div class='gif'>");
                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var gifImg = $("<img>");
                gifImg.attr("src", results[i].images.fixed_height.url);
                // gifImg.text("Rating: " + rating);

                gifDiv.append(p);
                gifDiv.append(gifImg);

                $("#gifs").append(gifDiv);
            };
        };
    });
};

// });

$("#addList").on("click", function (event) {
    event.preventDefault();
    let item = $("#gifInput").val().trim();
    buttonArr.push(item);
    displayButtons();
});

// $('.listBtn').on('click', function () {

$(document).on('click', '.listBtn', displayGifs);


$(document).ready(function () {

    displayButtons();

});
// });