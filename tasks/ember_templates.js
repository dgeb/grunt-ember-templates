/*
 * grunt-ember-templates
 *
 * Copyright (c) 2012 Dan Gebhardt, Tim Branyen, contributors
 * Licensed under the MIT license.
 * https://github.com/dgeb/grunt-ember-templates/blob/master/LICENSE
 */

module.exports = function(grunt) {
  'use strict';

  var fs            = require('fs');
  var vm            = require('vm');
  var path          = require('path');

  var libDir        = __dirname + '/../lib';
  var headlessEmber = fs.readFileSync(libDir + '/headless-ember.js', 'utf8');
  var handlebarsJs  = fs.readFileSync(libDir + '/handlebars.js', 'utf8');
  var emberJs       = fs.readFileSync(libDir + '/ember.js', 'utf8');

  // filename conversion for templates
  var defaultTemplateName = function(name) { return name; };

  grunt.registerMultiTask('ember_templates', 'Compile Handlebars templates for Ember.', function() {
    var options = this.options({});

    grunt.verbose.writeflags(options, 'Options');

    var compiled, srcFiles, templateName;
    var templates = [];
    var output = [];

    // assign filename transformation functions
    var processTemplateName = options.templateName || defaultTemplateName;

    // iterate files
    this.file.src.forEach(function(file) {
      try {
        var context = vm.createContext({
          template: grunt.file.read(file)
        });

        // load headless ember
        vm.runInContext(headlessEmber, context, 'headless-ember.js');
        vm.runInContext(handlebarsJs, context, 'handlebars.js');
        vm.runInContext(emberJs, context, 'ember.js');

        // compile template with ember
        vm.runInContext('compiledJS = precompileEmberHandlebars(template);', context);
        compiled = context.compiledJS;

      } catch(e) {
        grunt.log.error(e);
        grunt.fail.warn('Ember Handlebars failed to compile '+file+'.');
      
      }

      templateName = processTemplateName(file.replace(/\.hbs|\.handlebars/, ''));
      templates.push('Ember.TEMPLATES['+JSON.stringify(templateName)+'] = Ember.Handlebars.template('+compiled+');');
    
    });

    output = output.concat(templates);

    if (output.length > 0) {
      grunt.file.write(this.file.dest, output.join('\n\n'));
      grunt.log.writeln('File "' + this.file.dest + '" created.');
    }
  });

};
