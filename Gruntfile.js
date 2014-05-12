module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Notify changes via Growl
        notify: {
            js: {
                options: {
                   message: 'JS complete'
                }
            },
            compass: {
                options: {
                   message: 'SASS complete'
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
                    'assets/compile/js/third-party/jquery-1.10.2.min.js',
                    'assets/compile/js/third-party/*.js',
                    'assets/compile/js/global.js'
                ],
                dest: 'assets/build/js/production.js',
            }
        },

        // Minifies javascript files
        uglify: {
            build: {
                src: 'assets/build/js/production.js',
                dest: 'assets/build/js/production.min.js'
            }
        },

        // Compiles Sass
        compass: {
            dist: {
                options: {
                    config: 'assets/compile/sass/config.rb'
                }
            }
        },

        // Auto-prefixes css
        autoprefixer: {
            single_file: {
              options: {
                browsers: ['> 1%']
              },
              src: 'assets/build/css/style.css',
              dest: 'assets/build/css/prefixed-style.css'
            },
        },

        // Watches for changes then executes tasks
        watch: {
            scripts: {
                files: ['assets/compile/js/**/*.js'],
                tasks: ['concat', 'uglify', 'notify:js'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['assets/compile/sass/**/*.scss'],
                tasks: ['compass', 'autoprefixer', 'notify:compass'],
                options: {
                    spawn: false,
                }
            }
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-notify');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify', 'compass', 'autoprefixer', 'watch']);

};