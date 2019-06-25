module.exports = function() {
	var babel;

	babel = {
		options: {
			sourceMap: false,
			presets: ['@babel/preset-env']
		},
		dist: {
			files: {
				'public/js/main.min.js': [
					'assets/js/libs/jquery.3.4.1.js',
					'assets/js/libs/bootstrap.bundle.js',
					'assets/js/libs/highlight.pack.js',
					'assets/js/main.js'
				]
			}
		}
	};

	return babel;
};
