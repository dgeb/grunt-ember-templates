/*
 * grunt-contrib-ember
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Dan Gebhardt, Tim Branyen, contributors
 * Licensed under the MIT license.
 * https://github.com/dgeb/grunt-contrib-ember/blob/master/LICENSE
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
  var headlessEmber = fs.readFileSync(libDir + '/headless-ember.js', 'utf8');
  var emberJs       = fs.readFileSync(libDir + '/ember.js', 'utf8');

  // filename conversion for templates
  var defaultTemplateName = function(name) { return name; };

  grunt.registerMultiTask('ember_handlebars', 'Compile handlebars templates and partials.', function() {

    var helpers = require('grunt-contrib-lib').init(grunt);
    var options = helpers.options(this, {namespace: 'JST'});

    grunt.verbose.writeflags(options, 'Options');

    // TODO: ditch this when grunt v0.4 is released
    this.files = this.files || helpers.normalizeMultiTaskFiles(this.data, this.target);

    var compiled, srcFiles, src, templateName;
    var templates = [];
    var output = [];

    // assign filename transformation functions
    var processTemplateName = options.templateName || defaultTemplateName;

    // iterate files
    this.files.forEach(function(files) {
      srcFiles = grunt.file.expandFiles(files.src);
      srcFiles.forEach(function(file) {
        src = grunt.file.read(file);

        // compile templates in a context with headless ember
        try {
          // create a context
          var context = vm.createContext({
            template: grunt.file.read(file)
          });

          // load headless ember
          vm.runInContext(headlessEmber, context, 'headless-ember.js');
          vm.runInContext(emberJs, context, 'ember.js');

          // compile template with ember
          vm.runInContext('compiledJS = precompileEmberHandlebars(template);', context);

          compiled = context.compiledJS;
        } catch (e) {
          grunt.log.error(e);
          grunt.fail.warn('Ember Handlebars failed to compile '+file+'.');
        }

        templateName = processTemplateName(file.replace(/\.hbs|\.handlebars/, ''))
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
