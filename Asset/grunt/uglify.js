module.exports = function() {
	var uglify;

	uglify = {
		options: {
			banner: '<%= banner %>',
			codegen: {
				ascii_only: true
			},
			report: 'min',
			sourceMap: false,
			preserveComments: false
			//sourceMapIncludeSources: true,
		},
		main: {
			src: [
				'assets/js/libs/jquery.3.3.1.min.js',
				//latest Bootstrap JS file import updated
				'../node_modules/bootstrap/dist/js/bootstrap.bundle.js',
				'assets/js/libs/highlight.pack.js',
				'assets/js/main.js'
			],
			dest: 'public/js/main.min.js'
		}
	};

	return uglify;
};
