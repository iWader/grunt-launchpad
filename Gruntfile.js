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
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9', 'android 2.3', 'android 4', 'opera 12']
            },
            dev: {
                options: {
                    map: {
                        prev: '<%= config.css %>'
                    }
                },
                src: '<%= config.css %>/styles.css'
            },
            build: {
                src: '<%= config.css %>/styles.min.css'
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.bower_path %>/bootstrap/less/',
                        src: ['**'],
                        dest: '<%= config.less %>/vendor/bootstrap/'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.bower_path %>/bootstrap/fonts/',
                        src: ['**'],
                        dest: '<%= config.fonts %>',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.bower_path %>/font-awesome/less/',
                        src: ['**'],
                        dest: '<%= config.less %>/vendor/font-awesome/'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.bower_path %>/font-awesome/fonts/',
                        src: ['**'],
                        dest: '<%= config.fonts %>',
                        filter: 'isFile'
                    },
                ]
            },
            dev: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.bower_path %>/jquery/dist/',
                        src: ['jquery.js', 'jquery.min.map'],
                        dest: '<%= config.js %>/vendor/'
                    }
                ]
            },
            build: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.bower_path %>/jquery/dist/',
                        src: ['jquery.min.js'],
                        dest: '<%= config.js %>/vendor/'
                    }
                ]
            }
        },
        watch: {
            less: {
                files: [
                    '<%= config.less %>/*.less',
                    '<%= config.less %>/**/*.less'
                ],
                tasks: ['less:dev', 'autoprefixer:dev']
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
        'copy:dev',
        'copy:main',
        'less:dev',
        'autoprefixer:dev',
        'concat',
        'watch'
    ]);

    grunt.registerTask('build', [
        'jshint',
        'copy:build',
        'copy:main',
        'less:build',
        'autoprefixer:build',
        'uglify'
    ]);

};