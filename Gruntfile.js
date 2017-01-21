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
        node: true
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
      amdStringTrue: {
        options: {
          amd: 'true'
        },
        files: {
          'tmp/amd_string_true.js': ['test/fixtures/text.hbs',
                                     'test/fixtures/simple.hbs',
                                     'test/fixtures/grandparent/parent/child.hbs']
        }
      },
      amdCustom: {
        options: {
          amd: 'custom'
        },
        files: {
          'tmp/amd_custom.js': ['test/fixtures/text.hbs',
                                'test/fixtures/simple.hbs',
                                'test/fixtures/grandparent/parent/child.hbs']
        }
      },
      filePatternMatching: {
        files: {
          'tmp/file_pattern_matching.js': 'test/fixtures/{simple,text}.hbs'
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
      removeLeadingSlash: {
        options: {
          templateBasePath: /test\/fixtures/
        },
        files: {
          'tmp/remove_leading_slash.js': ['test/fixtures/text.hbs',
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
      minify: {
        options: {
          preprocess: function(source) {
            return source.replace(/\s+/g, ' ');
          }
        },
        files: {
          'tmp/preprocess.js': ['test/fixtures/preprocess.hbs']
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
      },
      customRegistration: {
        options: {
          templateRegistration: function(name, content) {
            return "define('templates/" + name + "', ['ember'], function(Ember) { return " + content + "; });";
          }
        },
        files: {
          'tmp/custom_registration.js': ['test/fixtures/text.hbs',
                                         'test/fixtures/simple.hbs']
        }
      },
      customTemplateCompiler: {
        options: {
          templateCompilerPath: 'test/fixtures/dummy-template-compiler.js'
        },
        files: {
          'tmp/custom_handlebars_path.js': ['test/fixtures/text.hbs']
        }
      },
      customTemplateNamespace: {
        options: {
          templateNamespace: 'Handlebars'
        },
        files: {
          'tmp/custom_template_namespace.js': ['test/fixtures/text.hbs']
        }
      },
      concatenateDisabled: {
        options: {
          concatenate: false
        },
        files: {
          'tmp/dest': ['test/fixtures/text.hbs',
                       'test/fixtures/simple.hbs'],
          'tmp/dest/slash/': ['test/fixtures/simple.hbs']
        }
      }
    },

    shell: {
      bowerEmber112: {
        command: 'node_modules/.bin/bower uninstall ember && node_modules/.bin/bower install ember#1.12'
      },
      bowerEmber273: {
        command: 'node_modules/.bin/bower uninstall ember && node_modules/.bin/bower install ember#2.7.3'
      },
      bowerEmber2102: {
        command: 'node_modules/.bin/bower uninstall ember && node_modules/.bin/bower install ember#2.10.2'
      },
      bowerEmber2110: {
        command: 'node_modules/.bin/bower uninstall ember && node_modules/.bin/bower install ember#2.11.0-beta.4'
      }
    },

    // Unit tests.
    nodeunit: {
      ember112: ['test/ember_1_12_2_handlebars_test.js'],
      ember273: ['test/ember_2_7_3_handlebars_test.js'],
      ember2102: ['test/ember_2_10_2_handlebars_test.js'],
      ember2110: ['test/ember_2_11_0_handlebars_test.js'],
      options: {
        reporter: 'minimal'
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // The clean plugin helps in testing.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Using grunt-shell to install different Ember bower package.
  grunt.loadNpmTasks('grunt-shell');

  // Install different Ember versions and run template compiler test.
  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('testEmber112', ['shell:bowerEmber112', 'clean', 'emberTemplates', 'nodeunit:ember112']);
  grunt.registerTask('testEmber273', ['shell:bowerEmber273', 'clean', 'emberTemplates', 'nodeunit:ember273']);
  grunt.registerTask('testEmber2102', ['shell:bowerEmber2102', 'clean', 'emberTemplates', 'nodeunit:ember2102']);
  grunt.registerTask('testEmber2110', ['shell:bowerEmber2110', 'clean', 'emberTemplates', 'nodeunit:ember2110']);

  grunt.registerTask('test', ['testEmber112', 'testEmber273', 'testEmber2102', 'testEmber2110']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);
};
