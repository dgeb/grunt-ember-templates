# grunt-ember-templates [![Build Status](https://secure.travis-ci.org/dgeb/grunt-ember-templates.png?branch=master)](http://travis-ci.org/dgeb/grunt-ember-templates)

> Precompile Handlebars templates for [Ember.js](http://emberjs.com).

## Getting Started

Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-ember-templates`

Then add this line to your project's `Gruntfile.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-ember-templates');
```

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

### Overview

Inside your `Gruntfile.js` file, add a section named `ember_templates`. This section specifies the files to compile and the options used with [handlebars](http://handlebarsjs.com/).

##### files ```object```

This defines what files this task will process and should contain key:value pairs.

The key (destination) should be an unique filepath (supports [grunt.template](https://github.com/cowboy/grunt/blob/master/docs/api_template.md)) and the value (source) should be a filepath or an array of filepaths (supports [minimatch](https://github.com/isaacs/minimatch)).

Note: Values are precompiled to the `Ember.TEMPLATES` array in the order passed.

##### options ```object```

This controls how this task operates and should contain key:value pairs, see options below.

#### Options

##### templateName ```function```

This option accepts a function which takes one argument (the source template filepath) and returns a string which will be used as the key for the precompiled template object.  The example below stores all templates on the default JST namespace in capital letters.

``` javascript
options: {
  templateName: function(sourceFile) {
    return sourceFile.replace(/path\/to\/templates\//, '');
  }
}
```

#### Config Example

``` javascript
ember_templates: {
  compile: {
    options: {
      templateName: function(sourceFile) {
        return sourceFile.replace(/path\/to\//, '');
      }
    },
    files: {
      "path/to/result.js": "path/to/source.handlebars",
      "path/to/another.js": ["path/to/sources/*.handlebars", "path/to/more/*.handlebars"]
    }
  }
}
```

Here's an example task that watches for changes to your templates and automatically recompiles them:

``` javascript
watch: {
  ember_templates: {
    files: 'app/scripts/**/*.handlebars',
    tasks: ['ember_templates', 'livereload']
  },
}
```

## Credit

Many thanks to the following projects upon which this was based:

* [grunt-contrib-handlebars](https://github.com/gruntjs/grunt-contrib-handlebars) by [Tim Branyen](https://github.com/tbranyen)
* [grunt-ember-handlebars](https://github.com/yaymukund/grunt-ember-handlebars) by [Mukund Lakshman](https://github.com/yaymukund)

I created this project as an alternative to grunt-ember-handlebars for the following reasons:
* to provide maximum compatibility with the grunt-contrib project, using features such as destination:source file arguments
* to allow for customizable template names based upon source file paths

## Release History

* 2013/05/16 - v0.4.6 - Upgraded Handlebars to 1.0.0-rc4.
* 2013/05/03 - v0.4.5 - Fixed multi-file output - thanks @seankeating!
* 2013/04/05 - v0.4.4 - Ember v1.0.0-rc.2 compatible.
* 2013/02/18 - v0.4.3 - Upgraded to grunt 0.4.0 final.
* 2013/02/17 - v0.4.3rc8 - Now uses ember-template-compiler. Upgraded to grunt 0.4.0.rc8.
* 2013/02/06 - v0.4.3rc7 - Updated to latest handlebars for compatibility with latest ember - thanks @codeofficer!
* 2013/01/24 - v0.4.2rc7 - Upgraded for grunt 0.4.0rc7 and handlebars 1.0.rc.2 - thanks @GManzato!
* 2013/01/10 - v0.4.2rc5 - Upgraded for grunt 0.4.0rc5 - thanks @trev!
* 2013/01/01 - v0.4.1 - Fixed file pattern matching
* 2012/12/26 - v0.4.0 - Upgraded for grunt 0.4.0 compatibility - thanks @trek!
* 2013/03/07 - v0.3.2 - Backported ember-template-compiler for Grunt 0.3 compatibility - thanks @rafshar
* 2013/01/24 - v0.3.1 - Fixed grunt-contrib-lib dependency
* 2013/01/24 - v0.3.0 - Grunt 0.3.0 and Handlebars 1.0.rc.2 compatible - thanks @GManzato!
* 2012/10/11 - v0.2.0 - Renamed grunt-ember-templates from grunt-contrib-ember.
* 2012/09/28 - v0.1.0 - Initial release.
