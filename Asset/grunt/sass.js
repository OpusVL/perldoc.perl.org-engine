module.exports = function() {
	var sass;

	sass = {
		options: {
			style: 'compressed',
			sourceMap: false
		},
		style: {
			files: {
				'../work/output/public/css/main.min.css': 'assets/scss/main.scss'
			}
		}
	};

	return sass;
};
