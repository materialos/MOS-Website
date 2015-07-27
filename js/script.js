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

// Nav
// function nav (num) {

// }

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
// $(document).ready(function(){
// 	$('ul.tabs').tabs();
// });

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