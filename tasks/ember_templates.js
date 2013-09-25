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

  var defaultRegistrationJs = function(processedTemplateList) {
    return processedTemplateList.map(function(processedTemplate){
      return 'Ember.TEMPLATES[' + JSON.stringify(processedTemplate.name) + '] = ' + processedTemplate.js + ';';
    }).join("\n\n");
  };

  var emberTemplatesTask = function() {
    var options = this.options({
      templateFileExtensions: /\.(hbs|hjs|handlebars)/,
      amd: false,
      precompile: true,
      templateName: function(name) { return name; },
      templateNameFromFile: function(file) {
        // `templateBaseDir` is an alias for `templateBasePath`
        var templateBasePath = options.templateBasePath || options.templateBaseDir;
        [templateBasePath, options.templateFileExtensions].forEach(function(match) {
          if (match) {
            file = file.replace(match, '');
          }
        });
        return options.templateName(file);
      },
      generateRegistrationJs: defaultRegistrationJs,
    });

    grunt.verbose.writeflags(options, 'Options');

    // Iterate files
    this.files.forEach(function(f) {
      var processedTemplates = [],
          output = [];

      if (options.amd) {
        output = output.concat('define(["ember"], function(Ember){');
      }

      f.src.forEach(function(file) {
        try {

          if (options.precompile) {

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

            processedTemplates.push({
              name: options.templateNameFromFile(file),
              js: 'Ember.Handlebars.template(' + context.compiledJS + ')'
            });

          } else {
            processedTemplates.push({
              name: options.templateNameFromFile(file),
              js: 'Ember.Handlebars.compile(' + JSON.stringify(grunt.file.read(file)) + ')'
            });
          }
        } catch(e) {
          grunt.log.error(e);
          grunt.fail.warn('Ember Handlebars failed to compile ' + file + '.');
        }
      });

      var registrationJs = options.generateRegistrationJs(processedTemplates);
    
      output = output.concat(registrationJs);

      if (options.amd) {
        output = output.concat('});');
      }

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
