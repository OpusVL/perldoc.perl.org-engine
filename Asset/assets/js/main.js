(function() {
	'use strict';

	function navHeight() {
		document.querySelector('.wrapper').style.paddingTop =
			document.querySelector('nav').offsetHeight + 'px';
	}

	// global vars
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

	// static search functionality to search current version for functions, methods, etc ...
	var searchItems = function() {
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
		if (userInput.value.length > 0) {
			if (userMatched.length === 0) {
				searchResults.innerHTML =
					'<p class="dropdown-item major-version">No results</p>';
				searchResults.classList.add('show');
				searchResults.parentNode.classList.add('show');
			} else if (userMatched.length === 1) {
				searchResults.innerHTML = '';
				searchResults.classList.remove('show');
				searchResults.parentNode.classList.remove('show');
				window.location.href = userMatched[0].url;
			} else {
				searchResults.innerHTML = '';
				userMatched.forEach(function(element) {
					var matcheAnswerElement = document.createElement('a');
					matcheAnswerElement.className = 'dropdown-item';
					matcheAnswerElement.href = element.url;
					matcheAnswerElement.innerHTML = element.name.replace(/::/gi, ' ');
					searchResults.appendChild(matcheAnswerElement);
				});
				searchResults.childNodes[0].focus();
			}
		} else {
			searchResults.innerHTML =
				'<p class="dropdown-item major-version">No results</p>';
		}
	};

	// populate versions for the Perl Versions menu dropdown
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
				console.log(currentURL, pathname.split('/')[1]);
				if (pathname.split('/')[1].length === 0) {
					currentURL = '/search.json';
				} else {
					currentURL = '/' + pathname.split('/')[1] + '/search.json';
				}
				fetch(currentURL)
					.then(function(resp) {
						return resp.json();
					})
					.then(function(jsonD) {
						searchFiltered = jsonD;
					});
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
			});
	};

	window.addEventListener('DOMContentLoaded', function() {
		navHeight();
		checkMenuItems();
	});

	// check nav height and add body padding (due to position fixed)
	window.addEventListener('resize', navHeight);
	window.addEventListener('orientationchange', navHeight);

	// fix menu closin when selecting a letter from Functions menu
	var letters = Array.from(document.querySelectorAll('.letters'));
	letters.forEach(function(element) {
		element.addEventListener('click', function(item) {
			document.querySelector('.dropdown-menu.show').classList.remove('show');
			document.querySelector('.dropdown.show').classList.remove('.show');
			document.querySelector('.navbar-collapse.show').classList.remove('show');
			document
				.querySelector('.navbar-toggler')
				.setAttribute('aria-expanded', 'false');
		});
	});

	// scroll offset padding to see header
	window.addEventListener('hashchange', function() {
		window.scrollTo(window.scrollX, window.scrollY - 80);
	});

	// open dropdown when searching and multiple results
	document
		.querySelector('.search-wrapper')
		.addEventListener('submit', function(ev) {
			ev.preventDefault();
			searchItems();
			if (
				searchResults.firstChild ===
					'<p class="dropdown-item major-version">No results</p>' &&
				searchResults.childNodes.length === 1
			) {
				searchResults.classList.add('show');
				searchResults.parentNode.classList.add('show');
			} else if (searchResults.childNodes.length > 1) {
				searchResults.classList.add('show');
				searchResults.parentNode.classList.add('show');
				searchResults.childNodes[0].focus();
			}
		});

	// fix dropdown open / close when using search and click
	document
		.getElementById('navbarDropdown5')
		.addEventListener('click', function() {
			searchItems();
			if (searchResults.classList.contains('show')) {
				searchResults.classList.add('show');
				searchResults.parentNode.classList.add('show');
			} else {
				searchResults.classList.remove('show');
				searchResults.parentNode.classList.remove('show');
				if (searchResults.childElementCount > 1) {
					searchResults.childNodes[0].focus();
				}
			}
		});
})();
