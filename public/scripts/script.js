'use strict';

var shiaQuiz = {};

// An array containing objects with information for each of the answers
shiaQuiz.shiaLabeouf = [{
	name: 'Even Stevens Shia LaBeouf!',
	imagePath: 'styles/images/evenstevensShia.jpg',
	quote: "You can't buy back your respect; you can't buy back your career. You only get one, so I don't want to mess that up."
}, {
	name: 'Transformers Shia LaBeouf!',
	imagePath: 'styles/images/transformersShia.jpg',
	quote: "I want my audience to know me for my work, not because of who I'm dating or what drugs I'm on or what club I went to."
}, {
	name: 'Just Do It Shia LaBeouf!',
	imagePath: 'styles/images/justdoitShia.png',
	quote: "Don\'t let your dreams be dreams. Yesterday you said tomorrow. So just do it. Make your dreams come true. Just do it!"
}, {
	name: 'Paperbag Head Shia LaBeouf!',
	imagePath: 'styles/images/paperbagShia.jpg',
	quote: "I'm an actor, but I'm an artist."
}, {
	name: 'Actual Cannibal Shia LaBeouf!',
	imagePath: 'styles/images/cannibalShia.jpg',
	quote: "Running for your life, From Shia Labeouf. He’s brandishing a knife. It's Shia Labeouf. Lurking in the shadows… Hollywood superstar Shia Labeouf. Living in the woods, Shia Labeouf. Killing for sport, Shia Labeouf. Eating all the bodies Actual, cannibal Shia Labeouf!"
}];

// On click of the start button start the quiz
shiaQuiz.startQuiz = function () {
	$('#startButton').on('click', function () {
		$('.startContainer').addClass('hidden');
		$('.quizContainer').removeClass('hidden');
		shiaQuiz.quizFields();
	});
};

// When the form is submitted gather the score of the inputs
shiaQuiz.quizFields = function () {
	$('form').on('submit', function (e) {
		e.preventDefault();
		$('.answers').empty();
		var questionOne = parseInt($('input[name=questionOne]:checked').val());
		console.log(questionOne);
		var questionTwo = parseInt($('input[name=questionTwo]:checked').val());
		var questionThree = parseInt($('input[name=questionThree]:checked').val());
		var questionFour = parseInt($('input[name=questionFour]:checked').val());
		var questionFive = parseInt($('input[name=questionFive]:checked').val());

		var quizScore = questionOne + questionTwo + questionThree + questionFour + questionFive;
		console.log(quizScore);
		// Only show the answers if ALL the inputs have been filled out, if one is missing call the inputAlert function
		if (isNaN(quizScore)) {
			shiaQuiz.inputAlert();
		} else {
			// Hide the quiz form and pass on the added input score
			$('.quiz').addClass('hidden');
			shiaQuiz.findShia(quizScore);
		}
	});
};

// check the quiz score to find where on the scale the users inputs land then call the displayAnswer function and pass on the number of the corisponding shiaLabeouf object in the shiaLabeouf array
shiaQuiz.findShia = function (quizScore) {
	var answers = void 0;
	if (quizScore > 80) {
		answers = shiaQuiz.shiaLabeouf[4];
	} else if (quizScore > 60 && quizScore < 80) {
		answers = shiaQuiz.shiaLabeouf[3];
	} else if (quizScore > 40 && quizScore < 60) {
		answers = shiaQuiz.shiaLabeouf[2];
	} else if (quizScore > 20 && quizScore < 40) {
		answers = shiaQuiz.shiaLabeouf[1];
	} else {
		answers = shiaQuiz.shiaLabeouf[0];
	}
	shiaQuiz.displayAnswer(answers);
};

// Display the users Shia
shiaQuiz.displayAnswer = function (theShiaLabeouf) {
	var shiaTitle = $('<h2>').text(theShiaLabeouf.name);
	var shiaImage = $('<img>').attr('src', theShiaLabeouf.imagePath);
	var shiaDescription = $('<p>').text(theShiaLabeouf.quote);
	var restartButton = $('<button>').addClass('restart').text('Do It... Again?');
	var answerDiv = $('<div>').addClass('shiaSurpriseAnswer').append(shiaTitle, shiaImage, shiaDescription, restartButton);
	$('.answers').prepend(answerDiv);
	$('.answers').removeClass('hidden');
	shiaQuiz.restart();
};

shiaQuiz.inputAlert = function () {
	var shiaAlert = $('<h3>').text("You didn't do it!");
	var closeBox = $('<button>').addClass('closeButton').text('X');
	var modalBox = $('<div>').addClass('modal').append(shiaAlert, closeBox);
	$('.quizContainer').append(modalBox);
	$('.closeButton').on('click', function () {
		$('.modal').remove();
	});
};

// On click of the restart button hide then clear the answers
shiaQuiz.restart = function () {
	$('.restart').on('click', function () {
		// TweenLite.to('.answers', 1.5, {height:100, onComplete:callAnswer});
		// let callAnswer = () => {
		// 	console.log('did it');
		$('.answers').addClass('hidden');
		// };
		$('.answers').empty();
		// find the selected inputs and deselect them
		$('form').find(':radio').removeAttr('checked');
		// Show the quiz questions
		$('.quiz').removeClass('hidden');
	});
};

// The init gets called when the document is loaded, the init then calls the startQuiz function
shiaQuiz.init = function () {
	return shiaQuiz.startQuiz();
};

$(document).ready(shiaQuiz.init);