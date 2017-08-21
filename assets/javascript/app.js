$(document).ready(function() {

var topics = ["brisket", "dota2", "warriors", "manatee"]


function displayPics() {
var search = $(this).text();
console.log(search) 

var queryURL = "http://api.giphy.com/v1/gifs/search?q="+ search +
"&api_key=944143a3d51640208992a3edc40948fa&lang=en&limit=10"
// + "&rating=" + rating;
$('#topic-pics').empty();
		$.ajax({
		url: queryURL,
		method: "GET"
		}).done(function(response) {
			console.log(response);
			var responseArray = response.data
			// var gifURL = response.data[0].images.downsized_medium.url;
			// var gifShow = $('<img>').attr("src", gifURL)
			// $('#topic-pics').append(gifShow)

			for (var i = 0; i < responseArray.length; i++) {
				var rating = responseArray[i].rating;
				console.log(rating);
				var ratingHTML = $('<p>').text("Rating: " + rating)
				var stillURL = responseArray[i].images.fixed_height_still.url
				var gifShow = $('<img>').attr("src", stillURL)
				$('#topic-pics').append(gifShow)
				gifShow.first().after(ratingHTML)
			}
		})
}

function createButtons() {
	$('#btn-area').empty()
	for (var i = 0; i < topics.length; i++) {
	var topicBtn = $('<button>')
	topicBtn.addClass('topic-btn');
	topicBtn.attr('data-name', topics[i]);
	topicBtn.text(topics[i]);
	topicBtn.appendTo('#btn-area');
}
}

$('#search-btn').click(function(event) {
	event.preventDefault();
	var searchText = $('#search-box').val()
	console.log(searchText)
	console.log(typeof searchText)
	topics.push(searchText)
	createButtons();
})
	$(document).on("click", ".topic-btn", displayPics)

	createButtons();

})


