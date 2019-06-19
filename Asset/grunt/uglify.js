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
				// 'assets/js/libs/jquery.3.3.1.min.js',
				'../node_modules/jquery/dist/jquery.min.js',
				//latest Bootstrap JS file import updated
				'../node_modules/bootstrap/dist/js/bootstrap.bundle.js',
				// 'assets/js/libs/bootstrap.bundle.js',
				'assets/js/libs/highlight.pack.js',
				'assets/js/main.js'
			],
			dest: '../work/output/public/js/main.min.js'
		}
	};

	return uglify;
};
