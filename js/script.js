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

// MaterializeCSS Setup
$(document).ready(function(){
	$('.modal-trigger').leanModal();
});

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