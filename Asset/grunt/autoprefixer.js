module.exports = function() {
	var autoprefixer;

	autoprefixer = {
		options: {
			map: false,
			browsers: ['last 4 version']
		},
		single_file: {
			src: '../work/output/public/css/main.min.css',
			dest: '../work/output/public/css/main.min.css'
		}
	};

	return autoprefixer;
};
