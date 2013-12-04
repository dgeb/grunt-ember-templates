/*
 * grunt-ember-templates
 *
 * Copyright (c) 2012 Dan Gebhardt, Tim Branyen, contributors
 * Licensed under the MIT license.
 * https://github.com/dgeb/grunt-ember-templates/blob/master/LICENSE
 */

function manualCompile(handlebarsPath, templateCompilerPath, template){
  'use strict';

  var fs                 = require('fs'),
      vm                 = require('vm'),
      handlebarsJs       = fs.readFileSync(handlebarsPath, 'utf8'),
      templateCompilerJs = fs.readFileSync(templateCompilerPath, 'utf8');

  // Create a context into which we will load both the ember template compiler
  // as well as the template to be compiled. The ember template compiler expects
  // `exports` to be defined, and uses it to export `precompile()`.
  var context = vm.createContext({
    exports: {},
    template: template
  });

  // Load handlebars
  vm.runInContext(handlebarsJs, context, 'handlebars.js');

  // Load the ember template compiler
  vm.runInContext(templateCompilerJs, context, 'ember-template-compiler.js');

  // Compile the template
  vm.runInContext('compiledJS = exports.precompile(template);', context);

  return context.compiledJS;
};

module.exports = function(grunt) {
  'use strict';

  var compiler = require('ember-template-compiler');

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
      templateRegistration: function(name, contents) {
        return 'Ember.TEMPLATES[' + JSON.stringify(name) + '] = ' + contents + ';'
      },
      handlebarsPath: null,
      templateCompilerPath: null
    });

    grunt.verbose.writeflags(options, 'Options');

    // Iterate files
    this.files.forEach(function(f) {
      var processedTemplates = [],
          output = [],
          name,
          contents;

      if (options.amd) {
        output = output.concat('define(["ember"], function(Ember){');
      }

      f.src.forEach(function(file) {
        try {

          name = options.templateNameFromFile(file);

          if (options.precompile) {

            var template = grunt.file.read(file);
            var compiledTemplate;

            // Run the `preprocess` function if specified in the options.
            if (typeof options.preprocess === 'function') {
              template = options.preprocess(template);
            }

            if (options.handlebarsPath && options.templateCompilerPath) {
              compiledTemplate = manualCompile(options.handlebarsPath, options.templateCompilerPath, template);
            } else {
              compiledTemplate = compiler.precompile(template).toString();
            }

            // Wrap compiled template
            contents = 'Ember.Handlebars.template(' + compiledTemplate + ')';
          } else {
            // Wrap raw (uncompiled) template
            contents = 'Ember.Handlebars.compile(' + JSON.stringify(grunt.file.read(file)) + ')';
          }

          processedTemplates.push(options.templateRegistration(name, contents));

        } catch(e) {
          grunt.log.error(e);
          grunt.fail.warn('Ember Handlebars failed to compile ' + file + '.');
        }
      });

      output = output.concat(processedTemplates);

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
