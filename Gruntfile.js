module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        indoormap: {
            // potential config here
        },
        autoprefixer: {
            dist: {
                files: {
                    'css/app.css': 'css/app.css'
                }
            },
        },
        sass: {
            dist: {
                options: {
                    outputStyle: 'compressed'
                },
                files: {
                    'css/app.css': 'scss/app.scss'
                }
            }
        },
        watch: {
            sass: {
                files: ['scss/*.scss'],
                tasks: ['sass', 'autoprefixer'],
            },
            livereload: {
                files: ['*.js', 'css/app.css'],
                options: {
                    livereload: true
                }
            }
        }
    });

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('build', ['sass']);
    grunt.registerTask('default', ['build','watch']);
};
