'use strict';

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-jshint');

    var config = {
        bower_path: 'bower_components',
        css: 'assets/css',
        js: 'assets/js',
        images: 'assets/img',
        fonts: 'assets/fonts'
    };

    grunt.initConfig({
        config: config,
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= config.js %>/*.js',
                '!<%= config.js %>/**/*.min.*'
            ]
        }
    });

    grunt.registerTask('default', [
        'dev'
    ]);

    grunt.registerTask('dev', [
        'jshint'
    ]);

};