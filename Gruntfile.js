'use strict';

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    var config = {
        bower_path: 'bower_components',
        css: 'assets/css',
        js: 'assets/js',
        images: 'assets/img',
        fonts: 'assets/fonts',
        less: 'assets/less'
    };

    var jsFileList = [
        '<%= config.bower_path %>/bootstrap/js/transition.js',
        '<%= config.bower_path %>/bootstrap/js/alert.js',
        '<%= config.bower_path %>/bootstrap/js/button.js',
        //'<%= config.bower_path %>/bootstrap/js/carousel.js',
        //'<%= config.bower_path %>/bootstrap/js/collapse.js',
        '<%= config.bower_path %>/bootstrap/js/dropdown.js',
        //'<%= config.bower_path %>/bootstrap/js/modal.js',
        //'<%= config.bower_path %>/bootstrap/js/tooltip.js',
        //'<%= config.bower_path %>/bootstrap/js/popover.js',
        //'<%= config.bower_path %>/bootstrap/js/scrollspy.js',
        //'<%= config.bower_path %>/bootstrap/js/tab.js',
        '<%= config.bower_path %>/bootstrap/js/affix.js',
        '<%= config.js %>/**/*.js',
        '!<%= config.js %>/scripts.js'
    ];

    grunt.initConfig({
        config: config,
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= config.js %>/*.js',
                '!<%= config.js %>/scripts.js',
                '!<%= config.js %>/**/*.min.*'
            ]
        },
        uglify: {
            dist: {
                files: {
                    '<%= config.js %>/scripts.min.js': [jsFileList]
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [jsFileList],
                dest: '<%= config.js %>/scripts.js'
            }
        },
        less: {
            dev: {
                files: {
                    '<%= config.css %>/styles.css': [
                        '<%= config.less %>/app.less'
                    ]
                },
                options: {
                    compress: false,
                    sourceMap: true
                }
            },
            build: {
                files: {
                    '<%= config.css %>/styles.min.css': [
                        '<%= config.less %>/app.less'
                    ]
                },
                options: {
                    compress: true
                }
            }
        }
    });

    grunt.registerTask('default', [
        'dev'
    ]);

    grunt.registerTask('dev', [
        'jshint',
        'less:dev',
        'concat'
    ]);

    grunt.registerTask('build', [
        'jshint',
        'less:build',
        'uglify'
    ]);

};