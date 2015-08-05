'use strict';

module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        config: {
          dev: {
            options: {
              variables: {
                'outputFolder': 'dev/'
              }
            }
          },
          prod: {
            options: {
              variables: {
                'outputFolder': 'prod/'
              }
            }
          }
        },

        jshint: {
            files: [
                'Gruntfile.js',
                'app/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        watch: {
          devjs: {
            files: ['app/**/*.html', 'app/**/*.js', 'Gruntfile.js'],
            tasks: ['build:dev'],
            options: {
              livereload: true,
            }
          },
          devless: {
            files: ['app/**/*.less', 'Gruntfile.js'],
            tasks: ['config:dev', 'less:dev'],
            options: {
              livereload: 35728,
            }
          },
          prod: {
            files: ['app/**/*', 'Gruntfile.js'],
            tasks: ['build:prod'],
            options: {
              livereload: true,
            }
          }
        },

        'http-server': {
            dev: {
                root: '.',
                port: 8080,
                host: "0.0.0.0",
                showDir: true,
                autoIndex: true,
                ext: "html",
                runInBackground: true
            }
        },

        clean: {
          js: ["<%= grunt.config.get('outputFolder') %>"]
        },

        copy: {
          main: {
            files: [
              { expand: true, src: ['app/require-config.js', 'app/index.html'], dest: "<%= grunt.config.get('outputFolder') %>/", flatten: true, filter: 'isFile' },
              { expand: true, src: ['node_modules/bootstrap/fonts/**.*'], dest: "<%= grunt.config.get('outputFolder') %>/fonts/", flatten: true, filter: 'isFile' },
            ]
          },
          dev: {
            files: [
              { expand: true, src: ['**/*.js'], dest: "<%= grunt.config.get('outputFolder') %>/", cwd: 'app'},
              { expand: true, src: ['**/*.html'], dest: "<%= grunt.config.get('outputFolder') %>/", cwd: 'app'}
            ]
          }
        },

        requirejs: {
          dev: {
            options: {
              name: "app",
              baseUrl: "app/",
              mainConfigFile: "app/require-config.js",
              out: "<%= grunt.config.get('outputFolder') %>/<%= pkg.name %>.js",
              include: ['../node_modules/requirejs/require.js', '../node_modules/jquery/dist/jquery.js', '../node_modules/bootstrap/dist/js/bootstrap.js'],
              optimize: 'none',
              generateSourceMaps: true,
            }
          },
          prod: {
            options: {
              name: "app",
              baseUrl: "app/",
              mainConfigFile: "app/require-config.js",
              out: "<%= grunt.config.get('outputFolder') %>/<%= pkg.name %>.js",
              include: [
                '../node_modules/requirejs/require.js',
                '../node_modules/jquery/dist/jquery.js',
                '../node_modules/bootstrap/dist/js/bootstrap.js'],
              preserveLicenseComments: false,
              optimize: 'uglify'
            }
          }
        },

        less: {
          dev: {
            options: {
                strictImports: true,
                compress: false,
                yuicompress: false,
                optimization: 2,
                sourceMap: true,
                sourceMapFilename: "<%= grunt.config.get('outputFolder') %>/<%= pkg.name %>.css.map",
                sourceMapURL: "<%= pkg.name %>.css.map",
                sourceMapBasepath: "<%= grunt.config.get('outputFolder') %>/"
            },
            files: {
              "<%= grunt.config.get('outputFolder') %>/<%= pkg.name %>.css": "app/app.less"
            }
          },
          prod: {
            options: {
                strictImports: true,
                compress: true,
                optimization: 1,
                yuicompress: true
            },
            files: {
              "<%= grunt.config.get('outputFolder') %>/<%= pkg.name %>.css": "app/app.less"
            }
          }
        },

        htmlmin: {
            prod: {
              options: {
                removeComments: true,
                collapseWhitespace: true
              },
              files: {
                "<%= grunt.config.get('outputFolder') %>/index.html": "<%= grunt.config.get('outputFolder') %>/index.html"
              }
            }
        },

        htmlangular: {
          options: {
              customtags: [
                'pagination-bar',
                'content',
                'nav-bar',
                'loading-spinner',
                'holdings-summary',
                'tab-bar',
                'pagination'
              ],
              relaxerror: [
                'Start tag seen without seeing a doctype first. Expected e.g. “<!DOCTYPE html>”',
                'Element “head” is missing a required instance of child element “title”.',
                'Element “img” is missing required attribute “src”.'
              ],
              reportpath: null
          },
          files: {
            src: ['app/**/*.html'],
          },
        },

        concurrent : {
          options: {
            logConcurrentOutput: true
          },
          dev: {
            tasks: ["watch:devjs", "watch:devless"]
          }
        },

        protractor: {
          options: {
            configFile: "e2e-tests/protractor.conf.js",
            noColor:false,
            args: {},
          },
          e2e: {
            options: {
              keepAlive: false
            }
          }
        }

    });

    // Load all grunt tasks from package.json automatically.
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('default', 'serve:dev');

    var commonAssembleTasks =  ['jshint', 'htmlangular', 'clean', 'copy'];

    // Builds and validates the project.
    grunt.registerTask('build:dev', ['config:dev'].concat(commonAssembleTasks.concat(['copy:dev', 'less:dev'])));
    grunt.registerTask('build:prod', ['config:prod'].concat(commonAssembleTasks.concat(['requirejs:prod', 'less:prod', 'htmlmin:prod'])));

    grunt.registerTask('serve:dev', ['http-server', 'build:dev', 'concurrent:dev']);
    grunt.registerTask('serve:prod', ['http-server', 'build:prod', 'watch:prod']);

    grunt.registerTask('test', ['http-server', 'protractor']);
};
