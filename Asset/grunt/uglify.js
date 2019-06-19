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
		},
		main: {
			src: [
				'assets/js/libs/jquery.3.4.1.js',
				'assets/js/libs/bootstrap.bundle.js',
				'assets/js/libs/highlight.pack.js',
				'assets/js/main.js'
			],
			dest: '../work/output/public/js/main.min.js'
		}
	};

	return uglify;
};
