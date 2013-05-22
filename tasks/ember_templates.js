/*
 * grunt-ember-templates
 *
 * Copyright (c) 2012 Dan Gebhardt, Tim Branyen, contributors
 * Licensed under the MIT license.
 * https://github.com/dgeb/grunt-ember-templates/blob/master/LICENSE
 */

module.exports = function(grunt) {
  'use strict';

  var fs                 = require('fs');
  var vm                 = require('vm');
  var path               = require('path');

  var libDir             = __dirname + '/../lib';
  var handlebarsJs       = fs.readFileSync(libDir + '/handlebars.js', 'utf8');
  var templateCompilerJs = fs.readFileSync(libDir + '/ember-template-compiler.js', 'utf8');

  // filename conversion for templates
  var defaultTemplateName = function(name) { return name; };

  var emberTemplatesTask = function() {
    var options = this.options({});

    grunt.verbose.writeflags(options, 'Options');

    var compiled, templateName;

    // Assign filename transformation functions
    var processTemplateName = options.templateName || defaultTemplateName;

    // Iterate files
    this.files.forEach(function(f) {
      var templates = [];
      var output = [];

      f.src.forEach(function(file) {
        try {
          // Create a context into which we will load both the ember template compiler
          // as well as the template to be compiled. The ember template compiler expects
          // `exports` to be defined, and uses it to export `precompile()`.
          var context = vm.createContext({
            exports: {},
            template: grunt.file.read(file)
          });

          // Load handlebars
          vm.runInContext(handlebarsJs, context, 'handlebars.js');

          // Load the ember template compiler
          vm.runInContext(templateCompilerJs, context, 'ember-template-compiler.js');

          // Compile the template
          vm.runInContext('compiledJS = exports.precompile(template);', context);
          compiled = context.compiledJS;

        } catch(e) {
          grunt.log.error(e);
          grunt.fail.warn('Ember Handlebars failed to compile ' + file + '.');
        }

        templateName = processTemplateName(file.replace(/\.hbs|\.handlebars/, ''));
        templates.push('Ember.TEMPLATES['+JSON.stringify(templateName)+'] = Ember.Handlebars.template('+compiled+');');
      });

      output = output.concat(templates);

      if (output.length > 0) {
        grunt.file.write(f.dest, output.join('\n\n'));
        grunt.log.writeln('File "' + f.dest + '" created.');
      }

    });
  };

  grunt.registerMultiTask('emberTemplates', 'Compile Handlebars templates for Ember.', emberTemplatesTask);

  // TODO: remove deprecated `ember_templates` task from v0.5
  grunt.registerMultiTask('ember_templates', 'Compile Handlebars templates for Ember. [DEPRECATED: please use `emberTemplates` instead]', function() {
    grunt.log.warn('`ember_templates` is deprecated and will be removed in v0.5. Please use `emberTemplates` instead.');
    emberTemplatesTask.apply(this, arguments);
  });
};
