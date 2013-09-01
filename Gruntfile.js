module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: ['grunt.js', 'tasks/*.js', '<config:nodeunit.tasks>'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      test: ['tmp']
    },

    // Configuration to be run (and then tested).
    emberTemplates: {
      'default': {
        files: {
          'tmp/default.js': ['test/fixtures/text.hbs',
                             'test/fixtures/simple.hbs',
                             'test/fixtures/grandparent/parent/child.hbs']
        }
      },
      amd: {
        options: {
          amd: true
        },
        files: {
          'tmp/amd.js': ['test/fixtures/text.hbs',
                         'test/fixtures/simple.hbs',
                         'test/fixtures/grandparent/parent/child.hbs']
        }
      },
      filePatternMatching: {
        files: {
          'tmp/file_pattern_matching.js': 'test/fixtures/**/*.hbs'
        }
      },
      customFileExtensions: {
        options: {
          templateFileExtensions: /\.hbars/
        },
        files: {
          'tmp/custom_file_extensions.js': ['test/fixtures/custom_file_extensions/text.hbars',
                                            'test/fixtures/custom_file_extensions/simple.hbars']
        }
      },
      truncateBasePath: {
        options: {
          templateBasePath: /test\/fixtures\//
        },
        files: {
          'tmp/truncate_base_path.js': ['test/fixtures/text.hbs',
                                        'test/fixtures/simple.hbs',
                                        'test/fixtures/grandparent/parent/child.hbs']
        }
      },
      customTemplateName: {
        options: {
          templateName: function(name) {
            // note: this demonstrates an alternative to specifying the
            //       `templateBasePath` option
            return name.replace(/test\/fixtures\//, '');
          }
        },
        files: {
          'tmp/custom_template_name.js': ['test/fixtures/text.hbs',
                                          'test/fixtures/simple.hbs',
                                          'test/fixtures/grandparent/parent/child.hbs']
        }
      },
      customTemplateNameFromFile: {
        options: {
          templateNameFromFile: function(file) {
            // note: this demonstrates an alternative to specifying the
            //       `templateBasePath` and `templateFileExtensions` options
            var name = file.replace(/\.hbs/, '');
            return name.replace(/test\/fixtures\//, '');
          }
        },
        files: {
          'tmp/custom_template_name_from_file.js': ['test/fixtures/text.hbs',
                                                    'test/fixtures/simple.hbs',
                                                    'test/fixtures/grandparent/parent/child.hbs']
        }
      },
      skipPrecompile: {
        options: {
          precompile: false
        },
        files: {
          'tmp/skip_precompile.js': ['test/fixtures/text.hbs',
                                     'test/fixtures/simple.hbs',
                                     'test/fixtures/grandparent/parent/child.hbs']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tasks: ['test/*_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // The clean plugin helps in testing.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'emberTemplates', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);
};
