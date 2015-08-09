// Set Upload Fields From URL
if (/\?/.test(document.URL)) {
	params = decodeURI(document.URL).match(/\?repo=(Icons|Illustrations|Concepts)&author=(.+)/i);
	repoParam = params[1];
	authorParam = params[2];

	document.getElementById('repo').value = repoParam.toLowerCase();
	document.getElementById('author').value = authorParam;

	$('#upload').openModal();
};


// Upload Preview Function
function loadFile(event){
	document.getElementById('output').innerHTML = "";
	for (var i = event.target.files.length - 1; i >= 0; i--) {
		output = document.createElement("img");
		name = event.target.files[i].name;
		if (/.ai$/i.test(name)) {
			output.src = "/img/ai.png";
		} else if (/.psd$/i.test(name)) {
			output.src = "/img/ps.png";
		} else {
			output.src = URL.createObjectURL(event.target.files[i]);
		};
		output.title = name;
		document.getElementById('output').appendChild(output);
	};
};

// Referal Generator
function refer() {
	var repo = document.getElementById('repo').value;
	var author = document.getElementById('author').value;
	return encodeURI(document.URL + "?repo=" + repo + "&author=" + author);
}

// Suggest Author Functions
function authorSuggest (value) {
	toastDestroy();
	changedSince = true; // Entered from change of input
	authorSet = false;
	newAuthorToast = false;
	authors = "Alex Mueller (Lollydrop), Anas Khan, Brian Medina, Christopher Bravata, Corbin Crutchley (crutchcorn), Daniel Ciao (plusCubed), Daniel Hickman, Eduardo Pratti (KMZ Icons), Gabriel Zegarra (Gaigzean), Greg Ives (Grives), Jahir Fiquitiva & Corbin Crutchley (crutchcorn), Jireh Mark Morilla, Micheal Cook (Cookicons), Niko Pennanen, Oscar E, Patryk Goworowski, Sky Konig, Vukasin Andelkovic, Wayne Kosimoto & Corbin Crutchley (crutchcorn), Wayne Kosimoto, Zachary Pierson (zangent), createme";
	valuear = value.split(" ");
	sug = [];
	sugged = [];
	for (var i = valuear.length - 1; i >= 0; i--) {
		if (! valuear[i] == "" || ! valuear[i] == " ") {
			authorregex = new RegExp(valuear[i].replace(/\(/, "\\(").replace(/\)/, "\\)"), "i");
			authorregexmatch = new RegExp("(.*)(, |^)([\\s\\w\\(\\)]*" + valuear[i].replace(/\(/, "\\(").replace(/\)/, "\\)") + "[\\s\\w\\(\\)]*)(?!(?!,),)(.*)", "i");
			if (authorregex.test(authors)) {
				sug.push(authors.replace(authorregexmatch, "$3"));
			};
		} else {
			toastDestroy();
			Materialize.toast('<span>Please Enter an Author</span>', 10000);
			return;
		};
	};
	matched = false;
	for (var i = sug.length - 1; i >= 0; i--) {
		if (sug[i].length == authors.length) {
			// No Match for that Word
		} else if (sug[i] == value) {
			// Suggestion is the Same as Inputed
			setAuthor(sug[i]); // Make sure capitalization is the same
			matched = true;
			return;
		} else {
			// Matched
			matched = true;
			changedSince = false; // New Toast or change
			if (sugged.indexOf(sug[i])) {
				sugged.push(sug[i]);
				Materialize.toast('<span onclick="setAuthor(\'' + sug[i] + '\');">Do you mean: ' + sug[i] + '</span>', 10000,'',function(){if (authorSet == false && newAuthorToast == false && changedSince == false) {toastDestroy(); Materialize.toast('<span>You are creating a new author</span>', 10000); newAuthorToast = true;};});
			};
		};
	};
	if (matched == false) {
		toastDestroy();
		Materialize.toast('<span>You are creating a new author</span>', 10000);
		newAuthorToast = true;
	};
}
function setAuthor (author) {
	document.getElementById('author').value = author;
	changedSince = false; // New Toast or change
	toastDestroy();
	authorSet = true;
}

// Waypoints for Icons Card
var inview = new Waypoint.Inview({
  element: $('#icons-card')[0],
  enter: function(direction) {
	// Materialize.toast('Icons: Enter triggered with direction ' + direction, 4000);
  },
  entered: function(direction) {
	element = document.getElementById('icons-card');
	element.classList.remove("not-animated-yet");
	element.classList.remove("fadeInUp-2");
	element.offsetWidth = element.offsetWidth;
	element.classList.add("fadeInUp-2");
	this.destroy();
	// Materialize.toast('Icons: Entered triggered with direction ' + direction, 4000);
  },
  exit: function(direction) {
	// Materialize.toast('Icons: Exit triggered with direction ' + direction, 4000);
  },
  exited: function(direction) {
	// Materialize.toast('Icons: Exited triggered with direction ' + direction, 4000);
  }
})

// MaterializeCSS Setup
$(document).ready(function(){
	$('.modal-trigger').leanModal();
});
$(document).ready(function() {
	$('select').material_select();
});

// Destroy MaterializeCSS Toasts
function toastDestroy () {
	var toasts = document.getElementsByClassName('toast');
	for (var i = toasts.length - 1; i >= 0; i--) {
		Vel(toasts[i], {"opacity": 0, marginTop: '-40px'}, { duration: 375,
			easing: 'easeOutExpo',
			queue: false,
			complete: function(){
				// Callback aborted
				// Removal handled by materialize
			}
		});
	};
}

// Progress Bar
function progressBar () {
	spinner = document.createElement("div");
	spinner.className = "progress";
	spinner.innerHTML = '<div class="indeterminate"></div>';
	document.body.appendChild(spinner);
}

// Upload Function
function upload () {
	progressBar();
	document.getElementById('uploadForm').submit();
}

/* Material Ease Animation (CSS and JS)
Copyright: Kupletsky Sergey
URL: http://codepen.io/zavoloklom/pen/Jbrho */
(function($) {
	var speed = 900;
	var container = $('.display-animation');
	container.each(function() {
		var elements = $(this).children();
		elements.each(function() {
			var elementOffset = $(this).offset(); 
			var offset = elementOffset.left*0.8 + elementOffset.top;
			var delay = parseFloat(offset/speed).toFixed(2);
			$(this)
				.css("-webkit-transition-delay", delay+'s')
				.css("-o-transition-delay", delay+'s')
				.css("transition-delay", delay+'s')
				.addClass('animated');
		});
	});
})(jQuery);