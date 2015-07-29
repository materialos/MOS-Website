// Ini
txt = document.getElementById('console').innerHTML.replace("\n", "");
pr = /https:\/\/github.com\/materialos\/Icons\/pull\/\d+/i.exec(txt)[0];
document.getElementById("pr-action").href = pr;

// Toggle Console
function toggleadvanced () {
	if (typeof togad === 'undefined' || togad == "hidden") {
		document.getElementsByClassName('console')[0].style.display = "block";
		document.getElementById('toggleadvanced').innerHTML = "Hide Advanced";
		togad = "visible";
	} else {
		document.getElementsByClassName('console')[0].style.display = "none";
		document.getElementById('toggleadvanced').innerHTML = "Show Advanced";
		togad = "hidden";
	};
}

// Title and Description
if () {
	// Upload Failed
	document.getElementById("title").innerHTML = "I find your lack of uploads disturbing.";
	document.getElementById("description").innerHTML = "At least one of your files didn't upload. Check Advanced or click Report to report this bug.<br>P.S. The title is a Star Wars reference.";
	// Add Report Button
	<a class="btn-flat waves-effect grey-text text-darken-2" target="_blank" id="pr-action">GitHub</a>
	document.getElementsByClassName('card-action')[0].childNodes[1].appendNode()
} else if () {
	// Git Failed
} else {
	// Sucsess
	document.getElementById("title").innerHTML = "Horray!";
	document.getElementById("description").innerHTML = "Your files were uploaded and should be ready for discussion on our GitHub. Click the GitHub button to see where the discussion will take place.";
};

// Console Highlighting
