txt = document.getElementById('console').innerHTML.replace("\n", "");
pr = /https:\/\/github.com\/materialos\/Icons\/pull\/\d+/i.exec(txt)[0];
document.getElementById("pr-action").href = pr;