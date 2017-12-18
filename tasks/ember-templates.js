/*
 * grunt-ember-templates
 *
 * Copyright (c) 2012 Dan Gebhardt, Tim Branyen, contributors
 * Licensed under the MIT license.
 * https://github.com/dgeb/grunt-ember-templates/blob/master/LICENSE
 */

function manualCompile(templateCompilerPath, template, grunt){
  'use strict';

  var fs = require('fs'),
      vm = require('vm'),
      templateCompilerJs;

  try {
    templateCompilerJs = fs.readFileSync(templateCompilerPath, 'utf8');
  } catch (e) {
    if (e.code !== 'ENOENT') {
      throw e;
    }
    grunt.fail.warn('ember-template-compiler.js is not found. You can install with `bower install ember --save`. If you would like to use a custom location you can setup `templateCompilerPath` option in Gruntfile.js. It has to point to ember-template-compiler.js which bundled with Ember.js. The default path: bower_components/ember/ember-template-compiler.js');
  }

  // Create a context into which we will load both the ember template compiler
  // as well as the template to be compiled. The ember template compiler expects
  // `exports` to be defined, and uses it to export `precompile()`. It also
  // expects `global` to be defined and to be an object.
  var context = vm.createContext({
    module: {},
    exports: {},
    global: {},
    template: template,
    mainContext: undefined,
    setTimeout: setTimeout
  });

  // Load the ember template compiler
  vm.runInContext(templateCompilerJs, context, 'ember-template-compiler.js');

  // Compile the template
  vm.runInContext('compiledJS = ((typeof Ember !== "undefined" && Ember.HTMLBars) || module.exports || exports).precompile(template);', context);

  return context.compiledJS;
}

module.exports = function(grunt) {
  'use strict';

  var path = require('path');

  var writeFile = function(contents, dest, options) {
    if (options.amd) {
      contents = contents.concat('});');
    }

    if (contents.length > 0) {
      grunt.file.write(dest, contents.join('\n\n'));
      grunt.log.writeln('File "' + dest + '" created.');
    }
  };

  var emberTemplatesTask = function() {
    var options = this.options({
      templateFileExtensions: /\.(hbs|hjs|handlebars)/,
      amd: false,
      concatenate: true,
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

        // Remove leading slash if necessary
        if (file.charAt(0) === '/') {
          file = file.slice(1);
        }

        return options.templateName(file);
      },
      templateRegistration: function(name, contents) {
        return 'Ember.TEMPLATES[' + JSON.stringify(name) + '] = ' + contents + ';';
      },
      // Default location of the compiler when ember installed with bower.
      templateCompilerPath: 'bower_components/ember/ember-template-compiler.js',
      templateNamespace: 'HTMLBars'
    });

    grunt.verbose.writeflags(options, 'Options');

    // Iterate files
    this.files.forEach(function(f) {
      var processedTemplates = [],
          output = [],
          name,
          customAmd,
          contents;

      if (options.amd) {
        customAmd = typeof options.amd === 'string' && options.amd !== 'true';
        customAmd = customAmd ? options.amd : 'ember';
        output = output.concat('define(["' + customAmd + '"], function(Ember){');
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

            compiledTemplate = manualCompile(options.templateCompilerPath, template, grunt);

            // Wrap compiled template
            contents = 'Ember.' + options.templateNamespace + '.template(' + compiledTemplate + ')';
          } else {
            // Wrap raw (uncompiled) template
            contents = 'Ember.' + options.templateNamespace + '.compile(' + JSON.stringify(grunt.file.read(file)) + ')';
          }

          processedTemplates.push({
            name: name,
            contents: options.templateRegistration(name, contents)
          });

        } catch(e) {
          grunt.log.error(e.message);
          grunt.log.error(e.stack);
          grunt.fail.warn('Ember Handlebars failed to compile ' + file + '.');
        }
      });

      if (options.concatenate) {
        // Map over the 'contents' property and concatenate
        output = output.concat(
          processedTemplates.map(function(template) {
            return template.contents;
          }));

        writeFile(output, f.dest, options);

      } else {
        // Write a file for each template
        processedTemplates.forEach(function(template) {
          writeFile(output.concat(template.contents),
                    path.join(f.dest, template.name + '.js'),
                    options);
        });
      }

    });
  };

  grunt.registerMultiTask('emberTemplates', 'Compile Handlebars templates for Ember.', emberTemplatesTask);
};
