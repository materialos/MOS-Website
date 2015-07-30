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
if (/(Sorry, there was an error uploading your file\.)|(Sorry, your file was not uploaded\.)/i.test(txt)) {
	// Upload Failed
	document.getElementById("title").innerHTML = "Ooops!";
	document.getElementById("description").innerHTML = "At least one of your files didn't upload. Check Advanced or click Report to report this bug. Note: GitHub has an issue where you must <a href='https://github.com/login' target='_blank'>log in</a> first before clicking the log URL.";
	// Add Report Button
	report = document.createElement("a");
	report.target = "_blank";
	report.className = "btn-flat waves-effect grey-text text-darken-2";
	report.innerHTML = 'Report';
	report.href = "https://github.com/materialos/Icons/issues/new?title=%5BBug%3A%20Uploader%5D%20Upload%20Failed&body=" + encodeURI("```\n" + txt.replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/<br>/gi, "").replace(/;/g, "%3B") + "\n```");
	document.getElementsByClassName('card-action')[0].childNodes[1].appendChild(report);
} else if (/(fatal:)|(warning:)|(error:)|(Error creating pull request: Unprocessable Entity \(HTTP 422\))|(Permission denied)/i.test(txt)) {
	// Git Failed
	document.getElementById("title").innerHTML = "Ooops!";
	document.getElementById("description").innerHTML = "There was an error while committing, pulling, or submitting your work. Check Advanced or click Report to report this bug. Note: GitHub has an issue where you must <a href='https://github.com/login' target='_blank'>log in</a> first before clicking the log URL.";
	// Add Report Button
	report = document.createElement("a");
	report.target = "_blank";
	report.className = "btn-flat waves-effect grey-text text-darken-2";
	report.innerHTML = 'Report';
	report.href = "https://github.com/materialos/Icons/issues/new?title=%5BBug%3A%20Uploader%5D%20Git%20Failed&body=" + encodeURI("```\n" + txt.replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/<br>/gi, "").replace(/;/g, "%3B") + "\n```");
	document.getElementsByClassName('card-action')[0].childNodes[1].appendChild(report);
} else {
	// Sucsess
	document.getElementById("title").innerHTML = "Horray!";
	document.getElementById("description").innerHTML = "Your files were uploaded and should be ready for discussion on our GitHub. Click the GitHub button to see where the discussion will take place.";
};

// Console Highlighting
// https://github.com/materialos/Icons/commit/6947360
document.getElementById('console').innerHTML = txt.replace(/('[\w,\s,\-,\_,\/,\\,\(,\)]+'|\[[\w,\s,\-,\_,\/,\\,\(,\)]+\])/gi, "<span class='purple-text'>$1</span>").replace(/((The file )(.+)( has been uploaded.))/gi, "<span class='green-text'>$2</span><span class='blue-text'>$3</span><span class='green-text'>$4</span>").replace(/(\d+ file(s)? changed), (\d+ insertion(s)?\(\+\)), (\d+ deletion(s)?\(\-\))/, "<span class='orange-text'>$1 </span><span class='green-text'>$3 </span><span class='red-text'>$5</span>").replace(/(create mode [\w,\s,\-,\_,\/,\\,\(,\),\.]+)/gi, "<span class='green-text'>$1</span>").replace(/(https:\/\/github.com\/materialos\/Icons\/pull\/\d+)/gi, "<a href='$1' target='_blank'>$1</a>").replace(/(HEAD is now at (\d+))/gi, "<a href='https://github.com/materialos/Icons/commit/$2' target='_blank'>$1</a>").replace(/((fatal:|error:|Error creating pull request: Unprocessable Entity \(HTTP 422\)|Permission denied)[\w,\s,\-,\_,\/,\\,\(,\),\.]+)/gi, "<span class='red round-2'>$1</span>").replace(/((warning:)[\w,\s,\-,\_,\/,\\,\(,\),\.]+)/gi, "<span class='yellow darken-2 round-2'>$1</span>");