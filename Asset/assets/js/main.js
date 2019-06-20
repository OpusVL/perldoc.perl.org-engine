'use strict';

function navHeight() {
	document.querySelector('.wrapper').style.paddingTop =
		document.querySelector('nav').offsetHeight + 'px';
}

var searchFiltered;
var userInput = document.getElementById('searchinput');

function searchItems() {
	fetch('/search.json')
		.then(function(res) {
			return res.json();
		})
		.then(function(data) {
			searchFiltered = data.filter(function(el) {
				return el.name.contains(userInput.value);
			});
		});
	console.log(searchFiltered);
}
window.addEventListener('DOMContentLoaded', function() {
	navHeight();
	var menuItems;
	var latestVersions;
	var checkMenuItems = function() {
		fetch('/versions.json')
			.then(function(res) {
				return res.json();
			})
			.then(function(data) {
				menuItems = Object.assign({}, data.versions);
				latestVersions = Object.assign({}, data.latest);
			});
	};
	checkMenuItems();

	setTimeout(function() {
		var allversions = document.getElementById('dropdown-menu-links');

		// create array of major versions
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
userInput.addEventListener('input', searchItems);

// create filter function automatically by each letter
// if more then 2 char and only 1 result go the URL
// if 1 char and direct match and enter go to the page
// if more then 2 chat and multiple results, trigger dropdown and populate with li
