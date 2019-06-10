module.exports = function() {
	var less;

	less = {
		options: {
			// compress : true,
			sourceMap: false
		},
		style: {
			files: {
				'public/css/main.min.css': 'assets/less/main.less'
			}
		}
	};

	return less;
};
