module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Notify changes via Growl
        notify: {
            js: {
                options: {
                   message: 'JS minified'
                }
            },
            compass: {
                options: {
                   message: 'SASS compiled'
                }
            },
            images: {
                options: {
                    message: 'Images minified'
                }
            },
            watch: {
                options: {
                    message: 'Watch is running'
                }
            }
        },

        // Concats javascript files
        concat: { 
            dist: {
                src: [
                    'assets/js/third_party/jquery-1.11.1.min.js',
                    'assets/js/third_party/*.js',
                    'assets/js/*.js',
                    '!assets/js/all_scripts.js',
                    '!assets/js/all_scripts.min.js'
                ],
                dest: 'assets/js/all_scripts.js',
            }
        },

        // Minifies javascript files
        uglify: {
            build: {
                src: 'assets/js/all_scripts.js',
                dest: 'assets/js/all_scripts.min.js'
            }
        },

        // Compiles Sass
        compass: {
            dist: {
                options: {
                    config: 'assets/sass/config.rb'
                }
            }
        },

        // Auto-prefixes css
        autoprefixer: {
            single_file: {
              options: {
                browsers: ['> 1%']
              },
              src: 'assets/css/style.css',
              dest: 'assets/css/style.css'
            },
        },

        // Minifies css
        cssmin: {
          minify: {
            expand: true,
            src: ['assets/css/style.css'],
            dest: '',
            ext: '.min.css'
          }
        },

        // Image minification
        imagemin: {
            dynamic: {
              options: {
                optimizationLevel: 7
              },
              files: [{
                expand: true,
                src: ['assets/images/**/*.{png,jpg,gif}'],
                dest: ''
              }]
            }
        },

        // Watches for changes then executes tasks
        watch: {
            scripts: {
                files: ['assets/js/**/*.js'],
                tasks: ['concat', 'uglify', 'notify:js'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['assets/sass/**/*.scss'],
                tasks: ['compass', 'autoprefixer', 'cssmin', 'notify:compass'],
                options: {
                    spawn: false,
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-notify');

    grunt.registerTask('default', ['concat', 'uglify', 'compass', 'autoprefixer', 'cssmin', 'imagemin', 'watch']);
};