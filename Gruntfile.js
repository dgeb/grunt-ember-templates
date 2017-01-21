var execSync = require('child_process').execSync;

module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js', 'tasks/*.js', 'test/grunt-ember-templates-test.js'],
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
            'test/fixtures/grandparent/parent/child.hbs'
          ]
        }
      },
      amd: {
        options: {
          amd: true
        },
        files: {
          'tmp/amd.js': [
            'test/fixtures/text.hbs',
            'test/fixtures/simple.hbs',
            'test/fixtures/grandparent/parent/child.hbs'
          ]
        }
      },
      amdStringTrue: {
        options: {
          amd: 'true'
        },
        files: {
          'tmp/amd_string_true.js': [
            'test/fixtures/text.hbs',
            'test/fixtures/simple.hbs',
            'test/fixtures/grandparent/parent/child.hbs'
          ]
        }
      },
      amdCustom: {
        options: {
          amd: 'custom'
        },
        files: {
          'tmp/amd_custom.js': [
            'test/fixtures/text.hbs',
            'test/fixtures/simple.hbs',
            'test/fixtures/grandparent/parent/child.hbs'
          ]
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
          'tmp/custom_file_extensions.js': [
            'test/fixtures/custom_file_extensions/text.hbars',
            'test/fixtures/custom_file_extensions/simple.hbars'
          ]
        }
      },
      truncateBasePath: {
        options: {
          templateBasePath: /test\/fixtures\//
        },
        files: {
          'tmp/truncate_base_path.js': [
            'test/fixtures/text.hbs',
            'test/fixtures/simple.hbs',
            'test/fixtures/grandparent/parent/child.hbs'
          ]
        }
      },
      removeLeadingSlash: {
        options: {
          templateBasePath: /test\/fixtures/
        },
        files: {
          'tmp/remove_leading_slash.js': [
            'test/fixtures/text.hbs',
            'test/fixtures/simple.hbs',
            'test/fixtures/grandparent/parent/child.hbs'
          ]
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
          'tmp/custom_template_name.js': [
            'test/fixtures/text.hbs',
            'test/fixtures/simple.hbs',
            'test/fixtures/grandparent/parent/child.hbs'
          ]
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
          'tmp/custom_template_name_from_file.js': [
            'test/fixtures/text.hbs',
            'test/fixtures/simple.hbs',
            'test/fixtures/grandparent/parent/child.hbs'
          ]
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
          'tmp/skip_precompile.js': [
            'test/fixtures/text.hbs',
            'test/fixtures/simple.hbs',
            'test/fixtures/grandparent/parent/child.hbs'
          ]
        }
      },
      customRegistration: {
        options: {
          templateRegistration: function(name, content) {
            return "define('templates/" + name + "', ['ember'], function(Ember) { return " + content + "; });";
          }
        },
        files: {
          'tmp/custom_registration.js': [
            'test/fixtures/text.hbs',
            'test/fixtures/simple.hbs'
          ]
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
          'tmp/dest': [
            'test/fixtures/text.hbs',
            'test/fixtures/simple.hbs'
          ],
          'tmp/dest/slash/': ['test/fixtures/simple.hbs']
        }
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // The clean plugin helps in testing.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  var EMBER_VERSIONS = [
    '1.12.2',
    '2.7.3',
    '2.10.2',
    '2.11.0-beta.4'
  ];

  var BOWER_TASK_PREFIX = 'bower-install-';
  var NODEUNIT_TASK_PREFIX = 'nodeunit-';

  /**
   * Install the determined version of Ember package with bower.
   *
   * @param {String} version
   */
  var runBower = function(version) {
    var command = 'node_modules/.bin/bower uninstall ember && node_modules/.bin/bower install ember#' + version;

    grunt.log.writeln('Running bower install', command);

    try {
      var resultBower = execSync(command);
      grunt.log.writeln(resultBower);
    } catch (e) {
      grunt.fail.warn(e);
    }
  };

  /**
   * Dynamically generates grunt task for running bower install
   *
   * @param {String} bowerTaskName
   * @param {String} version
   */
  var generateBowerTask = function(bowerTaskName, version) {
    grunt.registerTask(bowerTaskName, 'Run bower', function() {
      runBower(version);
    });
  };

  /**
   * Dynamically generates new nodeunit runner, otherwise nodeunit wouldn't reinitialize the changed filesystem.
   * Bower install new ember version, template compiler generates new files, so nodeunit has to read these new files.
   * Using always the same nodeunit taskname wouldn't sync the test source, so only the first test iteration would work.
   *
   * @param {String} nodeUnitTaskName
   */
  var generateNodeunitTask = function(nodeUnitTaskName) {
    grunt.registerTask(nodeUnitTaskName, 'Nodeunit sync runner', function() {
      try {
        var result = execSync('node_modules/.bin/nodeunit --reporter="minimal"', { encoding: 'utf8' });
        grunt.log.writeln(result);
      } catch (e) {
        grunt.fail.warn(e);
      }
    });
  };

  /**
   * Dynamically generates tests based on the above determined EMBER_VERSIONS array constant.
   */
  grunt.registerTask('test', 'Run tests with different Ember.js version', function() {
    EMBER_VERSIONS.forEach(function(version) {

      var bowerTaskName = BOWER_TASK_PREFIX + version;
      var nodeUnitTaskName = NODEUNIT_TASK_PREFIX + version;

      generateBowerTask(bowerTaskName, version);
      generateNodeunitTask(nodeUnitTaskName);

      grunt.task.run([bowerTaskName, 'clean:test', 'emberTemplates', nodeUnitTaskName]);
    });
  });

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);
};
