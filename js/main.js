
// IIFE for scope
(function () {
	// Get challenge element
	var challenge = document.getElementById('challenge');

	// Wrap each character of the challenge word with a span (instead of having to do it in the HTML)
	// (Using jQuery here because it's easy, would be nice not to depend on it.)
	$(challenge).html(function (i, html) {
		return html.replace(/(.)/g, '<span>$1</span>');
	});

	// Get all the spans we just created
	var spans = challenge.getElementsByTagName('span');

	// Get the input field
	var input = document.getElementById('input');

	var dictionary = ['letter', 'play', 'player', 'lay', 'pay', 'treat', 'tree', 'plate'];
	var found = [];
	var results = document.getElementById('results');

	var resetSpans = function () {
		for (var i = 0; i < spans.length; i++) {
			spans[i].classList.remove('matched');
		}
	}

	// Our main gameplay function
	var checkSolution = function () {
		// Get each input letter
		var inputLetters = input.value.split('');

		// Let's keep track of the unmatched input letters
		var unmatched = [];

		// Clear out the state
		resetSpans();

		// I prefer regular for-loops wherever possible, instead of Array.forEach and jQuery.each().
		// (Avoids closures and other complexities.)

		// Compare each input letter to each letter of challenge 
		for (var i = 0; i < inputLetters.length; i++) {
			var inputLetter = inputLetters[i];
			var matched = false;

			for (var j = 0; j < spans.length; j++) {
				var span = spans[j];

				// Find the first matching, non-matched letter in the challenge
				if (span.textContent.toLowerCase() === inputLetter.toLowerCase() && !span.classList.contains('matched')) {
					// Success!
					span.classList.add('matched');
					matched = true;
					break;
				}
			}

			if (!matched) {
				unmatched.push(inputLetter);
			}
		}


		if (unmatched.length > 0) {
			// If there are unmatched letters, no reason to continue
			return;
		}

		// Is it in the dictionary, and also not something we've found before?
		if (!found.includes(input.value) && dictionary.includes(input.value.toLowerCase())) {
			// Add the new word to the found list
			found.push(input.value);

			// Reset the spans and the input field
			resetSpans();
			input.value = ''
		}

		// Clear out the results element
		// http://stackoverflow.com/a/3955238
		while (results.firstChild) {
			results.removeChild(results.firstChild);
		}

		var t = document.createTextNode(found.join(' '));
		results.appendChild(t);
	}

	// Attach listener to field
	input.addEventListener('keyup', checkSolution);
})();
