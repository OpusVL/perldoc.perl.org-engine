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

// create filter function automatically by each letter
// if more then 2 char and only 1 result go the URL
// if 1 char and direct match and enter go to the page
// if more then 2 chat and multiple results, trigger dropdown and populate with li

var searchItems = function() {
	var userMatched = searchFiltered.filter(function(el) {
		if (el.name.toLowerCase() === userInput.value.toLowerCase().split('/')) {
			return (window.location.href = el.url);
		} else {
			var matchArr =
				el.name.toLowerCase().split('::') ||
				el.name.toLowerCase().split('_') ||
				el.name.toLowerCase().split(' ');
			var userInputVal = userInput.value.toLowerCase().split('/');
			var matchedWords = matchArr.filter(function(params) {
				if (params === userInputVal) {
					return el;
				}
			});
			console.log(userInputVal, matchArr, matchedWords);
			return matchedWords;
		}
	});
	return userMatched;
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
