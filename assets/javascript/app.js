$(document).ready(function() {
// when click on button next to image,can save url in box on right to use later.
var topics = ["brisket", "dota2", "warriors", "manatee"];
var offset = Math.floor(Math.random() * 25);


// /////////////////////////////////////////////////////////////////////////////

function displayPics() {
var search = $(this).text();
var limit = $('#num_rec option:selected').text() 
	
var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ search +
"&api_key=944143a3d51640208992a3edc40948fa&lang=en&limit=" + limit + "&offset=" + offset;
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
				gifShow.attr('data-still', stillURL);
				gifShow.attr('data-animate', responseArray[i].images.fixed_height.url);
				gifShow.attr('data-state', 'still');
				gifShow.addClass("gif");
				$('#topic-pics').append(gifShow);
				gifShow.first().after(ratingHTML);
				ratingHTML.append('<button id="save-btn">Save');
			}

			$('.gif').on('click', function() {
				var state = $(this).attr('data-state');
		    	var dataAnimate = $(this).data('animate')
		    	var dataStill = $(this).data('still')
		    	console.log(state)

		    if (state === "still") {
		    	$(this).attr('src', dataAnimate);
		    	$(this).attr("data-state", "animate")
		    	console.log('still if statement')
		    	console.log($(this).attr("data-state"))
		    }
		    else {
		    	console.log('animated but wont click')
		    	$(this).attr('src', dataStill);
		    	$(this).attr("data-state", "still")
		    }
			})  

			$('#save-btn').on('click', function() {
				console.log('clicked');
				var prevImg = $('#save-btn').prev('div');
				console.log(prevImg);
				// on click
				// save to saved-gifs html
				// save saved gif src links as object to database
			})                   
		})
}

// ///////////////////////////////////////////////////////////////////////////////////



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
	console.log(typeof $('#num-rec').text());
	topics.push(searchText);
	createButtons();
})


	$(document).on("click", ".topic-btn", displayPics);	

	createButtons();

})

