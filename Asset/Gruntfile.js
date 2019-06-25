/*global module:true*/
'use strict';

module.exports = function(grunt) {
	var sass = require('./grunt/sass')(),
		watch = require('./grunt/watch')(),
		image = require('./grunt/image')(),
		autoprefixer = require('./grunt/autoprefixer')(),
		uglify = require('./grunt/uglify')();

	grunt.initConfig({
		banner: '/* Perldoc - http://perdoc.perl.org */\n',
		sass: sass,
		uglify: uglify,
		autoprefixer: autoprefixer,
		image: image,
		watch: watch
	});

	[
		'grunt-autoprefixer',
		'grunt-contrib-uglify',
		'grunt-contrib-sass',
		'grunt-image',
		'grunt-contrib-watch'
	].forEach(grunt.loadNpmTasks);

	// Tasks
	grunt.registerTask('default', ['image', 'uglify', 'sass', 'autoprefixer']);
};
