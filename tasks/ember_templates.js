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

  var emberTemplatesTask = function() {
    var options = this.options({
      precompile: true
    });

    grunt.verbose.writeflags(options, 'Options');

    var templateFileExtensions = options.templateFileExtensions;
    if (templateFileExtensions === undefined) {
      templateFileExtensions = /\.(hbs|hjs|handlebars)/;
    }

    // `templateBaseDir` is an alias for `templateBasePath`
    var templateBasePath = options.templateBasePath || options.templateBaseDir;

    var templateName = options.templateName;
    if (templateName === undefined) {
      templateName = function(name) {
        return name;
      };
    }

    var templateNameFromFile = options.templateNameFromFile;
    if (templateNameFromFile === undefined) {
      templateNameFromFile = function(file) {
        [templateBasePath, templateFileExtensions].forEach(function(match) {
          if(match) {
            file = file.replace(match, '');
          } 
        });
        return templateName(file);
      };
    }

    // Iterate files
    this.files.forEach(function(f) {
      var templates = [],
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
  
            templates.push('Ember.TEMPLATES[' + JSON.stringify(templateNameFromFile(file)) + '] = ' +
                           'Ember.Handlebars.template(' + context.compiledJS + ');');

          } else {

            templates.push('Ember.TEMPLATES[' + JSON.stringify(templateNameFromFile(file)) + '] = ' +
                           'Ember.Handlebars.compile(' + JSON.stringify(grunt.file.read(file)) + ');');
          }
        } catch(e) {
          grunt.log.error(e);
          grunt.fail.warn('Ember Handlebars failed to compile ' + file + '.');
        }
      });

      output = output.concat(templates);

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
