"use strict";

document.addEventListener("DOMContentLoaded", function() {
	document.body.classList.add("js");

	// Create Menu-Button
	var menuButton = document.createElement("button"),
	menuButtonImg = document.createElement("img");
	menuButtonImg.setAttribute("alt", "Menü");
	menuButtonImg.setAttribute("src", "/wp-content/themes/kerwa/images/menu.svg");
	menuButton.appendChild(menuButtonImg);
	document.getElementById("main-nav").appendChild(menuButton);

	// Toggle Menu
	menuButton.addEventListener("click", function () {
	    document.getElementById("main-nav").classList.toggle("active");
	}, false);

	// Open external Anchors in new Tab
	var externalAnchors = document.querySelectorAll("a[href^=\"http://\"], a[href^=\"https://\"], a.extern");
	for(var i = 0; i < externalAnchors.length; i++) {
		var externalAnchor = externalAnchors[i];
		if(externalAnchor.host !== location.host) {
			externalAnchor.setAttribute("target", "_blank");
			externalAnchor.classList.add("extern");
		}
	}
}, false);

