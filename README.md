# grunt-ember-templates [![Build Status](https://secure.travis-ci.org/dgeb/grunt-ember-templates.png?branch=master)](http://travis-ci.org/dgeb/grunt-ember-templates)

> Precompile Handlebars templates for [Ember.js](http://emberjs.com).

## Getting Started

This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-ember-templates --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-ember-templates');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4), but in case you can't please use [v0.3.2](https://github.com/dgeb/grunt-ember-templates/tree/grunt-0.3-stable).*

### Overview

Inside your `Gruntfile.js` file, add a section named `emberTemplates`. This section specifies the files to compile and the options used with [handlebars](http://handlebarsjs.com/).

##### files ```object```

This defines what files this task will process and should contain key:value pairs.

The key (destination) should be an unique filepath (supports [grunt.template](https://github.com/cowboy/grunt/blob/master/docs/api_template.md)) and the value (source) should be a filepath or an array of filepaths (supports [minimatch](https://github.com/isaacs/minimatch)).

Note: Values are precompiled to the `Ember.TEMPLATES` array in the order passed.

##### options ```object```

This controls how this task operates and should contain key:value pairs, see options below.

#### Options

##### templateName ```function```

This option accepts a function which takes one argument (the source template
filepath) and returns a string which will be used as the key for the precompiled
template object. The example below strips away the root path from templates so
their names will match Ember's conventions:

``` javascript
options: {
  templateName: function(sourceFile) {
    return sourceFile.replace(/path\/to\/templates\//, '');
  }
}
```

#### Config Example

``` javascript
emberTemplates: {
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
  emberTemplates: {
    files: 'app/scripts/**/*.handlebars',
    tasks: ['emberTemplates', 'livereload']
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

* 2013/06/25 - v0.4.10 - Upgraded Handlebars to 1.0.0.
* 2013/06/24 - v0.4.9 - Upgraded ember-template-compiler.js to 1.0.0-rc.6
* 2013/06/09 - v0.4.8 - Upgraded ember-template-compiler.js to 1.0.0-rc.5 - thanks @AdamFerguson!
* 2013/05/22 - v0.4.7 - Deprecate `ember_templates` task in favor of `emberTemplates`.
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
