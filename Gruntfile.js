'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

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
        '<%= config.js %>/*.js',
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
        },
        watch: {
            less: {
                files: [
                    '<%= config.less %>/*.less',
                    '<%= config.less %>/**/*.less'
                ],
                tasks: ['less:dev']
            },
            js: {
                files: [
                    jsFileList,
                    '<%= jshint.all %>'
                ],
                tasks: ['jshint', 'concat']
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= config.css %>/styles.css',
                    '<%= config.js %>/scripts.js',
                    'app/*.php',
                    'app/**/*.php'
                ]
            }
        }
    });

    grunt.registerTask('default', [
        'dev'
    ]);

    grunt.registerTask('dev', [
        'jshint',
        'less:dev',
        'concat',
        'watch',
    ]);

    grunt.registerTask('build', [
        'jshint',
        'less:build',
        'uglify'
    ]);

};