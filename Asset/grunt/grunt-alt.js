module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		image: {
			dynamic: {
				options: {
					optipng: false,
					pngquant: false,
					zopflipng: false,
					jpegRecompress: false,
					mozjpeg: true,
					guetzli: false,
					gifsicle: true,
					svgo: true
				},
				files: [
					{
						expand: true,
						cwd: 'assets/img/',
						src: ['**/*.{png,ico,jpg,svg,gif}'],
						dest: '../work/output/public/img/'
					}
				]
			}
		},
		sass: {
			dist: {
				files: {
					'../work/output/public/css/main.min.css': 'assets/scss/main.scss'
				}
			},
			options: {
				compass: true,
				style: 'compressed',
				sourceMap: true
			}
		},
		autoprefixer: {
			dist: {
				files: {
					'../work/output/public/css/main.min.css':
						'../work/output/public/css/main.css'
				}
			},
			options: {
				map: true
			}
		},
		uglify: {
			options: {
				banner: '<%= banner %>',
				codegen: {
					ascii_only: true
				},
				report: 'min',
				sourceMap: false,
				preserveComments: false
			},
			dist: {
				files: [
					{
						expand: true,
						src: [
							'../node_modules/jquery/dist/jquery.min.js',
							'../node_modules/bootstrap/dist/js/bootstrap.bundle.js',
							'assets/js/libs/highlight.pack.js',
							'assets/js/main.js'
						],
						dest: '../work/output/public/js/',
						cwd: 'js',
						rename: function(dest, src) {
							return dest + '/' + src.replace('.js', '.min.js');
						}
					}
				]
			}
		},
		watch: {
			css: {
				files: ['css/*.scss', 'js/*.js'],
				tasks: ['sass', 'autoprefixer', 'uglify']
			}
		}
	});
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-image');
	grunt.registerTask('default', [
		'sass',
		'autoprefixer',
		'image',
		'uglify',
		'watch'
	]);
};
