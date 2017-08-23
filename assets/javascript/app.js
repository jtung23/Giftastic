$(document).ready(function() {
// when click on button next to image,can save url in box on right to use later.
var topics = ["brisket", "dota2", "warriors", "manatee"];
var offset = Math.floor(Math.random() * 20);
console.log(offset);


function displayPics() {
var search = $(this).text();
console.log(search); 

var queryURL = "http://api.giphy.com/v1/gifs/search?q="+ search +
"&api_key=944143a3d51640208992a3edc40948fa&lang=en&limit=10&offset=" + offset;
// + "&rating=" + rating;
$('#topic-pics').empty();
		$.ajax({
		url: queryURL,
		method: "GET"
		}).done(function(response) {
			console.log(response);
			var responseArray = response.data;



			for (var i = 0; i < responseArray.length; i++) {
				var rating = responseArray[i].rating;
				console.log(rating);
				var ratingHTML = $('<p>').text("Rating: " + rating);
				var stillURL = responseArray[i].images.fixed_height_still.url;
				var gifShow = $('<img>').attr("src", stillURL);
				gifShow.attr('data-still', responseArray[i].images.fixed_height_still.url);
				gifShow.attr('data-animate', responseArray[i].images.fixed_height.url);
				gifShow.attr('data-state', 'still');
				gifShow.addClass("gif");
				$('#topic-pics').append(gifShow);
				gifShow.first().after(ratingHTML);

			}
		})
}

function gifAnimate() {
    var state = $(this).data('state');
    var dataAnimate = $(this).data('animate')
    var dataStill = $(this).data('still')
    console.log(state)

    if (state = "still") {
    	$(this).attr('src', dataAnimate);
    	$(this).attr("data-state", "animate")
    	console.log('still if statement')
    }
    else {
    	console.log('animated but wont click')
    	$(this).attr('src', dataStill);
    	$(this).attr("data-state", "still")
    }
	}

function createButtons() {
	$('#btn-area').empty()
	for (var i = 0; i < topics.length; i++) {
	var topicBtn = $('<button>');
	topicBtn.addClass('topic-btn');
	topicBtn.attr('data-name', topics[i]);
	topicBtn.text(topics[i]);
	topicBtn.appendTo('#btn-area');
}
}

$('#search-btn').click(function(event) {
	event.preventDefault();
	var searchText = $('#search-box').val();
	console.log(searchText);
	console.log(typeof searchText);
	topics.push(searchText);
	createButtons();
})


	$(document).on("click", ".topic-btn", displayPics);	

	$(document).on('click', '.gif', gifAnimate);

	createButtons();

})


