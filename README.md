# grunt-contrib-ember [![Build Status](https://secure.travis-ci.org/dgeb/grunt-contrib-ember.png?branch=master)](http://travis-ci.org/dgeb/grunt-contrib-ember)
> Precompile Handlebars templates for [Ember.js](http://emberjs.com).  Submitted by [Dan Gebhardt](https://github.com/dgeb).

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-contrib-ember`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-contrib-ember');
```

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

### Overview

Inside your `grunt.js` file, add a section named `ember_handlebars`. This section specifies the files to compile and the options used with [handlebars](http://handlebarsjs.com/).

##### files ```object```

This defines what files this task will process and should contain key:value pairs.

The key (destination) should be an unique filepath (supports [grunt.template](https://github.com/cowboy/grunt/blob/master/docs/api_template.md)) and the value (source) should be a filepath or an array of filepaths (supports [minimatch](https://github.com/isaacs/minimatch)).

Note: Values are precompiled to the `Ember.TEMPLATES` array in the order passed.

##### options ```object```

This controls how this task operates and should contain key:value pairs, see options below.

#### Options

##### templateName ```function```

This option accepts a function which takes one argument (the template filepath) and returns a string which will be used as the key for the precompiled template object.  The example below stores all templates on the default JST namespace in capital letters.

``` javascript
options: {
  templateName: function(filename) {
    return filename.toUpperCase();
  }
}
```

#### Config Example

``` javascript
ember_handlebars: {
  compile: {
    options: {
      templateName: function(filename) {
        return filename.toUpperCase();
      }
    },
    files: {
      "path/to/result.js": "path/to/source.hbs",
      "path/to/another.js": ["path/to/sources/*.hbs", "path/to/more/*.hbs"]
    }
  }
}
```

## Credit

Many thanks to the following projects upon which this was based:

* [grunt-contrib-handlebars](https://github.com/gruntjs/grunt-contrib-handlebars) by [Tim Branyen](https://github.com/tbranyen)
* [grunt-ember-handlebars](https://github.com/yaymukund/grunt-ember-handlebars) by [Mukund Lakshman](https://github.com/yaymukund)

## Release History

* 2012/09/28 - v0.1.0 - Initial release.