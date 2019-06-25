module.exports = function() {
	var autoprefixer;

	autoprefixer = {
		options: {
			map: false,
			browsers: ['last 4 version']
		},
		single_file: {
			src: 'public/css/main.min.css',
			dest: 'public/css/main.min.css'
		}
	};

	return autoprefixer;
};
