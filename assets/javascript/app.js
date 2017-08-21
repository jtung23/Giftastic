$(document).ready(function() {

var topics = ["brisket", "dota", "warriors", "manatee"]


function displayPics() {
var search = $(this).text();
console.log(search)
var rating = "g"

var queryURL = "http://api.giphy.com/v1/gifs/search?q="+ search +
"&api_key=944143a3d51640208992a3edc40948fa&lang=en&limit=10"
+ "&rating=" + rating;

		$.ajax({
		url: queryURL,
		method: "GET"
		}).done(function(response) {
			console.log(response);
			var gifURL = response.data[0].bitly_gif_url
			console.log(gifURL)
			var gifShow = $('<img>').attr("src", gifURL)
			$('#topic-pics').html(gifShow)
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


