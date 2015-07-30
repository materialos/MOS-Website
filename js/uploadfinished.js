// Ini
txt = document.getElementById('console').innerHTML.replace("\n", "").replace(/^\s+/g, "").replace(/\s+$/g, "");
repo = txt.match(/To git@github.com:autocontribute\/(\w+)\.git/i)[1];
branch = txt.match(/Switched to a new branch '([\w\s\(\)\-\_,]+)'/i)[1];

// PR Button
if (/https:\/\/github.com\/materialos\/\w+\/pull\/\d+/i.test(txt)) {
	pr = /https:\/\/github.com\/materialos\/\w+\/pull\/\d+/i.exec(txt)[0];
	// Add PR Button
	prbutton = document.createElement("a");
	prbutton.target = "_blank";
	prbutton.className = "btn-flat waves-effect grey-text text-darken-2";
	prbutton.innerHTML = 'GitHub';
	prbutton.href = pr;
	document.getElementsByClassName('card-action')[0].childNodes[1].appendChild(prbutton);
};

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

// Card Info
if (/(Sorry, there was an error uploading your file\.)|(Sorry, your file was not uploaded\.)/i.test(txt)) {
	// Upload Failed
	document.getElementById("title").innerHTML = "Ooops!";
	document.getElementById("description").innerHTML = "At least one of your files didn't upload. Check Advanced or click Report to report this bug. Note: GitHub has an issue where you must <a href='https://github.com/login' target='_blank'>log in</a> first before clicking the log URL.";
	// Add Report Button
	report = document.createElement("a");
	report.target = "_blank";
	report.className = "btn-flat waves-effect grey-text text-darken-2";
	report.innerHTML = 'Report';
	report.href = "https://github.com/materialos/MOS-Website/issues/new?title=%5BBug%3A%20Uploader%5D%20Upload%20Failed&body=" + encodeURI("```\n" + txt.replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/<br>/gi, "").replace(/;/g, "%3B") + "\n```");
	document.getElementsByClassName('card-action')[0].childNodes[1].appendChild(report);
} else if (/(fatal:(?!\sremote upstream already exists\.))|(warning:)|(error:)|(Error creating pull request: Unprocessable Entity \(HTTP 422\))|(Permission denied)/i.test(txt)) {
	// Git Failed
	document.getElementById("title").innerHTML = "Ooops!";
	document.getElementById("description").innerHTML = "There was an error while committing, pulling, or submitting your work. Check Advanced or click Report to report this bug. Note: GitHub has an issue where you must <a href='https://github.com/login' target='_blank'>log in</a> first before clicking the log URL.";
	// Add Report Button
	report = document.createElement("a");
	report.target = "_blank";
	report.className = "btn-flat waves-effect grey-text text-darken-2";
	report.innerHTML = 'Report';
	report.href = "https://github.com/materialos/MOS-Website/issues/new?title=%5BBug%3A%20Uploader%5D%20Git%20Failed&body=" + encodeURI("```\n" + txt.replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/<br>/gi, "").replace(/;/g, "%3B") + "\n```");
	document.getElementsByClassName('card-action')[0].childNodes[1].appendChild(report);
} else if (/sh: 1: \.\/gitcreatepr\.sh: not found/i.test(txt)) {
	// Line Endings or Permission Failure
	document.getElementById("title").innerHTML = "Ooops!";
	document.getElementById("description").innerHTML = "There was an error with the line endings or permissions of the script. Check Advanced or click Report to report this bug. Note: GitHub has an issue where you must <a href='https://github.com/login' target='_blank'>log in</a> first before clicking the log URL.";
	// Add Report Button
	report = document.createElement("a");
	report.target = "_blank";
	report.className = "btn-flat waves-effect grey-text text-darken-2";
	report.innerHTML = 'Report';
	report.href = "https://github.com/materialos/MOS-Website/issues/new?title=%5BBug%3A%20Uploader%5D%20Script%20Failed&body=" + encodeURI("*It's probably because of @crutchcorn not changing his damn line endings.*\n" + "```\n" + txt.replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/<br>/gi, "").replace(/;/g, "%3B") + "\n```");
	document.getElementsByClassName('card-action')[0].childNodes[1].appendChild(report);
} else {
	// Sucsess
	document.getElementById("title").innerHTML = "Horray!";
	document.getElementById("description").innerHTML = "Your files were uploaded and should be ready for discussion on our GitHub. Click the GitHub button to see where the discussion will take place.";
};

// Console Highlighting
branchregex = new RegExp(branch + "(?!\\s+\\w+)", "gi");
branchcommit = new RegExp("(\\[(?=" + branch + ")([\\w\\s\\(\\)\-\\_\\]+)\\s+(\\w+)\\])", "i");
stringregex = new RegExp("('(?!" + branch + ")[\\w\\s\\-\\_/,\\(\\)]+')", "gi");
document.getElementById('console').innerHTML = txt.replace(stringregex, "<span class='purple-text'>$1</span>").replace(/(\* \[new branch\])/gi, "<span class='green-text'>$1</span>").replace(/((The file )(.+)( has been uploaded.))/gi, "<span class='green-text'>$2</span><span class='blue-text'>$3</span><span class='green-text'>$4</span>").replace(/(\d+ file(s)? changed), (\d+ insertion(s)?\(\+\)), (\d+ deletion(s)?\(\-\))/, "<span class='orange-text'>$1 </span><span class='green-text'>$3 </span><span class='red-text'>$5</span>").replace(/(create mode [\w\s\-\_\/,\(\)\.]+)/gi, "<span class='green-text'>$1</span>").replace(/(https:\/\/github.com\/materialos\/\w+\/pull\/\d+)/gi, "<a href='$1' class='blue white-text round-2' target='_blank'>$1</a>").replace(/(HEAD is now at (\w+)([\w\s\(\)\-\_,]+))/gi, "<a href='https://github.com/materialos/" + repo + "/commit/$2' class='blue white-text round-2' target='_blank'>$1</a>").replace(/((fatal:(?!\sremote upstream already exists\.)|error:|Error creating pull request: Unprocessable Entity \(HTTP 422\)|Permission denied|sh: 1: \.\/gitcreatepr\.sh: not found)[\w\s\-\_\/\(\)\.]+)/gi, "<span class='red round-2'>$1</span>").replace(/((warning:|fatal: remote upstream already exists)[\w\s\-\_\/\(\),\.]+)/gi, "<span class='yellow darken-2 round-2'>$1</span>").replace(branchregex, "<a href='https://github.com/autocontribute/Concepts/tree/" + branch + "' target='_blank' class='blue white-text round-2'>" + branch + "</a>").replace(branchcommit, "<a href='https://github.com/materialos/" + repo + "/commit/$3' class='blue white-text round-2' target='_blank'>$1</a>");