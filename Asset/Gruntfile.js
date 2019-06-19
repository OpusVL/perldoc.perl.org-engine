/*global module:true*/
'use strict';

module.exports = function(grunt) {
	var uglify = require('./grunt/uglify')(),
		sass = require('./grunt/sass')(),
		watch = require('./grunt/watch')(),
		image = require('./grunt/image')(),
		autoprefixer = require('./grunt/autoprefixer')();

	grunt.initConfig({
		banner: '/* Perldoc - http://perdoc.perl.org */\n',
		uglify: uglify,
		sass: sass,
		autoprefixer: autoprefixer,
		image: image,
		watch: watch
	});

	[
		'grunt-contrib-uglify',
		'grunt-autoprefixer',
		'grunt-contrib-sass',
		'grunt-image',
		'grunt-contrib-watch'
	].forEach(grunt.loadNpmTasks);

	// Tasks
	grunt.registerTask('default', ['image', 'uglify', 'sass', 'autoprefixer']);
};
