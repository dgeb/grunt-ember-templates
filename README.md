# grunt-ember-templates [![Build Status](https://secure.travis-ci.org/dgeb/grunt-ember-templates.png?branch=master)](http://travis-ci.org/dgeb/grunt-ember-templates)

> Precompile Handlebars templates for [Ember.js](http://emberjs.com).

## Getting Started

*Important: the latest version of this plugin is only compatible with grunt.js 0.4.0rc5. For compatibility with grunt.js 0.3, please use v0.2.0 of this plugin.*

Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-ember-templates`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-ember-templates');
```

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

### Overview

Inside your `grunt.js` file, add a section named `ember_templates`. This section specifies the files to compile and the options used with [handlebars](http://handlebarsjs.com/).

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
    tasks: 'ember_templates reload'
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

* 2013/01/01 - v0.4.1 - Fixed file pattern matching
* 2012/12/26 - v0.4.0 - Upgraded for grunt 0.4.0 compatibility - thanks @trek!
* 2012/10/11 - v0.2.0 - Renamed grunt-ember-templates from grunt-contrib-ember.
* 2012/09/28 - v0.1.0 - Initial release.
