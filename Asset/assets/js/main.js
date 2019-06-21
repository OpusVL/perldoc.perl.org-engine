'use strict';

function navHeight() {
	document.querySelector('.wrapper').style.paddingTop =
		document.querySelector('nav').offsetHeight + 'px';
}

var currentURL;
var searchFiltered;
var userInput = document.getElementById('searchinput');
var pathname = window.location.pathname;
var menuItems;
var latestVersions;
var currVersion;
var searchResults = document.getElementById('search-results');
var matchArr;
var userInputVal;
var searchItems = function() {
	searchResults.innerHTML = '';
	var userMatched = searchFiltered.filter(function(el) {
		var names = el.name.replace(/::/gi, ' ');
		names = names.replace('_', ' ');
		matchArr = names.toLowerCase().split(' ');
		userInputVal = userInput.value
			.trim()
			.toLowerCase()
			.split(' ');
		var intersection = userInputVal.filter(function(ele) {
			return matchArr.indexOf(ele) > -1;
		});
		return intersection.length != 0;
	});
	console.log(userMatched);
	if (userMatched.length === 1) {
		return (window.location.href = userMatched[0].url);
	}
	userMatched.forEach(function(element) {
		// if there is an exact matching result but multiple possiblities, just go to the match ???
		// not sure this is what search is supposed to be about
		// console.log(userInputVal.join(' '), matchArr.join(' '));
		// var elementName = element.name.replace(/::/gi, ' ');
		// elementName = elementName.replace('_', ' ');
		// elementName = elementName.toLowerCase().split(' ');
		// if (userInputVal.join(' ') === elementName.join(' ')) {
		// 	return (window.location.href = element.url);
		// } else {
		var matcheAnswerElement = document.createElement('a');
		matcheAnswerElement.className = 'dropdown-item';
		matcheAnswerElement.href = element.url;
		matcheAnswerElement.innerHTML = element.name.replace(/::/gi, ' ');
		searchResults.appendChild(matcheAnswerElement);
		searchResults.classList.add('show');
		searchResults.parentNode.classList.add('show');
		searchResults.childNodes[0].focus();
		// }
	});
};
window.addEventListener('DOMContentLoaded', function() {
	navHeight();

	var checkMenuItems = function() {
		fetch('/versions.json')
			.then(function(res) {
				return res.json();
			})
			.then(function(data) {
				menuItems = Object.assign({}, data.versions);
				latestVersions = Object.assign({}, data.latest);
				currVersion = Object.assign({}, data.me);
			})
			.then(function() {
				currentURL = '/' + pathname.split('/')[1] + '/search.json';
				fetch(currentURL)
					.then(function(resp) {
						return resp.json();
					})
					.then(function(jsonD) {
						searchFiltered = jsonD;
					});
			});
	};
	checkMenuItems();

	setTimeout(function() {
		var allversions = document.getElementById('dropdown-menu-links');
		var menuItemsArray = Object.keys(menuItems).map(function(key) {
			return [
				Number(key),
				Object.keys(menuItems[key]).map(function(lastKey) {
					return Number(lastKey);
				})
			];
		});
		menuItemsArray = menuItemsArray.sort().reverse();

		if (allversions) {
			menuItemsArray.forEach(function(el, index) {
				var majorVersion = document.createElement('p');
				majorVersion.classList.add('dropdown-item', 'major-version');
				var dividerDiv = document.createElement('div');
				dividerDiv.classList.add('dropdown-divider');
				majorVersion.innerHTML = el[0];
				allversions.appendChild(majorVersion);

				el[1].forEach(function(minorEl) {
					var minorVersion = document.createElement('a');
					minorVersion.classList.add('dropdown-item', 'minor-version');
					minorVersion.innerHTML = '5.' + el[0] + '.' + minorEl;
					minorVersion.setAttribute('href', '/5.' + el[0] + '.' + minorEl);
					allversions.appendChild(minorVersion);
					allversions.appendChild(dividerDiv);
				});
			});
		}
	}, 350);
});
window.addEventListener('resize', navHeight);
window.addEventListener('orientationchange', navHeight);
// userInput.addEventListener('input', searchItems);

document
	.querySelector('.search-wrapper')
	.addEventListener('submit', function(ev) {
		ev.preventDefault();
		searchItems();
	});
