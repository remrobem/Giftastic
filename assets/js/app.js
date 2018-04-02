const giphyAPIKey = '5J2DxEwoOGML6C2M2ZCBNbziJTSHovI1';
const theme = 'mascots';

let buttonArr = ['MLB', 'NBA', 'NHL', 'NFL', 'RACING', 'EATING', 'DANCING', 'KIDS'];

function displayButtons() {

    $('#gifButtons').empty();

    for (let i = 0; i < buttonArr.length; i++) {
        let newBtn = $('<button>');
        newBtn.text(buttonArr[i]);
        newBtn.attr('data-value', buttonArr[i]);
        newBtn.attr('data-index', i);
        newBtn.addClass('listBtn btn');
        $('#gifButtons').append(newBtn);
    };
};

function displayGifs() {

    let selectedItem = $(this).attr('data-value');
    let searchTerm = theme + ' ' + selectedItem;
    searchTerm = searchTerm.replace(/ /g, '+');
    console.log(searchTerm);
    let queryURL = 'https://api.giphy.com/v1/gifs/search?q=' +
        searchTerm + '&api_key=' + giphyAPIKey + '&limit=15';

    $('#gifs').empty();

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        let results = response.data;
        console.log(results);

        for (var i = 0; i < results.length; i++) {
            if (['g', 'pg', 'pg-13'].includes(results[i].rating)) {
                
                var rating = results[i].rating;
                var gifImg = $('<img>');
                var gifDiv = $('<div></div>');
                var p = $("<p>").text("Rating: " + results[i].rating);
                
                gifDiv.attr('class', 'floatBox');                
                gifImg.attr('class', 'gif');
                gifImg.attr('src', results[i].images.fixed_height_still.url);
                gifImg.attr('data-state', 'still');
                gifImg.attr('data-still', results[i].images.fixed_height_still.url);
                gifImg.attr('data-animate', results[i].images.fixed_height.url);          
                         
                gifDiv.append(p);
                gifDiv.append(gifImg);
                $('#gifs').prepend(gifDiv);


                
              
            };
        };
    });
};

function animation() {

    var state = $(this).attr('data-state');
    console.log(state);
    if (state === 'still') {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
    };
};

function addButton(event) {

    event.preventDefault();
    item = $('#gifInput').val().trim();
    item = item.toUpperCase();
    buttonArr.push(item);
    // Set creates a new object with unique values from the buttonArr but it is not an array
    // Using [...] converts it into an array
    uniqueArr = [...(new Set(buttonArr))];
    // if the unique array is less than the original button array, then user attempted to existing value
    if (uniqueArr.length !== buttonArr.length) {
        buttonArr = uniqueArr;
        alert(`Entry ${item} requested already exists`);
    } else {
        // clear the usique array
        uniqueArr = [];
        displayButtons();
        buttonAdded = (buttonArr.length - 1).toString();
        //simulate click of the new button
        $('.listBtn[data-index="' + buttonAdded + '"]').trigger('click');
    };

    $('#gifInput').val('');


};



$(document).ready(function () {

    displayButtons();

    $(document).on('click', '.listBtn', displayGifs);

    $(document).on('click', '.gif', animation); 

    $(document).on('click', '#addButton', addButton); 
});