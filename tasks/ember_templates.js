/*
 * grunt-ember-templates
 *
 * Copyright (c) 2012 Dan Gebhardt, Tim Branyen, contributors
 * Licensed under the MIT license.
 * https://github.com/dgeb/grunt-ember-templates/blob/master/LICENSE
 */

module.exports = function(grunt) {
  'use strict';

  // TODO: ditch this when grunt v0.4 is released
  grunt.util = grunt.util || grunt.utils;

  var _ = grunt.util._;
  var helpers = require('grunt-contrib-lib').init(grunt);

  var fs            = require('fs');
  var vm            = require('vm');
  var path          = require('path');

  var libDir        = __dirname + '/../lib';
  var templateCompilerJs = fs.readFileSync(libDir + '/ember-template-compiler.js', 'utf8');

  // filename conversion for templates
  var defaultTemplateName = function(name) { return name; };

  grunt.registerMultiTask('ember_templates', 'Compile Handlebars templates for Ember.', function() {

    var helpers = require('grunt-contrib-lib').init(grunt);
    var options = helpers.options(this, {});

    grunt.verbose.writeflags(options, 'Options');

    // TODO: ditch this when grunt v0.4 is released
    this.files = this.files || helpers.normalizeMultiTaskFiles(this.data, this.target);

    var compiled, srcFiles, templateName;
    var templates = [];
    var output = [];

    // assign filename transformation functions
    var processTemplateName = options.templateName || defaultTemplateName;

    // iterate files
    this.files.forEach(function(files) {
      srcFiles = grunt.file.expandFiles(files.src);
      srcFiles.forEach(function(file) {
        // compile templates in a context with headless ember
        try {
          // Create a context into which we will load both the ember template compiler
          // as well as the template to be compiled. The ember template compiler expects
          // `exports` to be defined, and uses it to export `precompile()`.
          var context = vm.createContext({
            exports: {},
            template: grunt.file.read(file)
          });

          // Load the ember template compiler.
          vm.runInContext(templateCompilerJs, context, 'ember-template-compiler.js');

          // Compile the template.
          vm.runInContext('compiledJS = exports.precompile(template);', context);

          compiled = context.compiledJS;
        } catch (e) {
          grunt.log.error(e);
          grunt.fail.warn('Ember Handlebars failed to compile ' + file + '.');
        }

        templateName = processTemplateName(file.replace(/\.hbs|\.handlebars/, ''));
        templates.push('Ember.TEMPLATES['+JSON.stringify(templateName)+'] = Ember.Handlebars.template('+compiled+');');
      });
      output = output.concat(templates);

      if (output.length > 0) {
        grunt.file.write(files.dest, output.join('\n\n'));
        grunt.log.writeln('File "' + files.dest + '" created.');
      }
    });
  });

};
