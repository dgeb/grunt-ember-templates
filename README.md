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

### Overview

Inside your `Gruntfile.js` file, add a section named `emberTemplates`. This section specifies the files to compile and the options used with [handlebars](http://handlebarsjs.com/).

##### files

Type: `object`

This defines what files this task will process and should contain key:value pairs.

The key (destination) should be an unique filepath (supports [grunt.template](http://gruntjs.com/api/grunt.template)) and the value (source) should be a filepath or an array of filepaths (supports [minimatch](https://github.com/isaacs/minimatch)).

Note: Values are precompiled to the `Ember.TEMPLATES` array in the order passed.

##### options

Type: `object`

This controls how this task operates and should contain key:value pairs. See specific options below.

#### Options

##### amd

Type: `boolean | string`
Default: `false`

Include this option to ensure that the compiled output will be defined as a
single AMD module with a single dependency (`ember`). If you'd like to output
individual templates as modules, skip this option and use the
`templateRegistration` option described below.

If you'd like to customize the module name for Ember, pass this option a string.
(For backwards compatibility, the string `"true"` acts like the boolean `true`,
and will result in `ember` being used as the module name. )

``` javascript
options: {
  amd: "vendor/ember"
}
```

##### concatenate

Type: `boolean`
Default: `true`

Disable this option to compile the templates to multiple individual files,
rather than concatenating them into a single file. When concatenation is
disabled, the destination property specifies the folder where compiled templates
will be placed. The directory and file structure will mirror the source.

This option is useful for situations where you'd like to let a build optimizer
concatenate files in particular ways.

``` javascript
options: {
  concatenate: false
},
files: {
  "path/to/destination/folder": ["path/to/sources/*.handlebars", "path/to/more/*.handlebars"]
}
```

##### precompile

Type: `boolean`
Default: `true`

Disable this option to skip template precompilation with handlebars.js and instead
wrap the template content with `Ember.Handlebars.compile`. This will reduce template
compilation time during development. **Don't disable this option for production build**.

##### preprocess

Type: `function`
Arguments: `source`

This option accepts a function which can be used to preprocess the raw contents
of the source read from the template file.

You may want to use this function to strip comments or minify whitespace:

``` javascript
options: {
  preprocess: function(source) {
    return source.replace(/\s+/g, ' ');
  }
}
```

##### templateBasePath

Type: `regex | string`

A regex or string to match the base path to your template directory. If defined,
this path will be stripped out of template names by the default implementation
of `templateNameFromFile()`.

``` javascript
options: {
  templateBasePath: /path\/to\/templates\//
}
```

##### templateFileExtensions

Type: `regex | string`
Default: `/\.(hbs|hjs|handlebars)/`

A regex or string to match the file extensions for your templates. Extensions
will be stripped out of template names by the default implementation of
`templateNameFromFile()`.

For example, if you're using a non-standard extension for your template files,
you can strip it out like so:

``` javascript
options: {
  templateFileExtensions: /\.hbars/
}
```

##### templateName

Type: `function`
Arguments: `fileName`

This option accepts a function which takes one argument (the source template
filepath, which has already been stripped of its file extensions and base directory)
and returns a string which will be used as the key for the precompiled template.

For example, let's say that all of your templates are suffixed with `_template`,
which you don't want included in the actual template name. You could strip off
this suffix as follows:

``` javascript
options: {
  templateName: function(name) {
    return name.replace('_template', '');
  }
}
```

##### templateNameFromFile

Type: `function`
Arguments: `filePath`

This option accepts a function which takes one argument (the full source template
filepath) and returns a string which will be used as the key for the precompiled
template object.

By default, this function strips away `templateBasePath` and `templateFileExtensions`
from a filepath, and then returns the result of `templateName()`.

This function should only be overridden if you need complete control over the
returned template name that can not be achieved via the other options.

##### templateRegistration

Type: `function`
Arguments: `name`, `contents`

This option allows for custom registration of templates. It accepts a function
which takes as arguments the `name` of a template (see`templateNameFromFile`)
and its `contents` (which may be compiled or not - see `precompile`). This
function should return a string of JS code to be added to the generated file.

By default, this function assigns templates to `Ember.TEMPLATES` with their
`name` as the key and `contents` as the value.

This function should be overridden if you need to register templates in an
alternative fashion. For example, it could be used to define custom modules for
each of your templates:

``` javascript
options: {
  templateRegistration: function(name, contents) {
    return "define('templates/" + name + "', ['ember'], function(Ember) { return " + contents + "; });";
  }
}
```

##### templateCompilerPath and handlebarsPath

Type: `string`
Default: Not specified

By default, the template compiler and Handlebars included with the
`ember-template-compiler` dependency will be used to compile templates.

This option allows these defaults to be overridden in order to specify
different versions of the template compiler and Handlebars.

For example, if there are upstream changes in Ember's compiler that haven't yet
been published with `ember-template-compiler`, you could specify paths to local
versions of the template compiler and Handlebars as follows:

```javascript
options: {
  templateCompilerPath: 'vendor/ember/ember-template-compiler.js',
  handlebarsPath: 'vendor/handlebars/handlebars.js'
}
```

IMPORTANT: These options must both be specified, or neither will take effect.

#### Config Example

A common configuration might be to combine the `amd` and `templateBasePath` options
as follows:

``` javascript
emberTemplates: {
  compile: {
    options: {
      amd: true,
      templateBasePath: /path\/to\//
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

### Usage Tips

* This plugin was designed to work with Grunt 0.4.x. If you're still using grunt
  v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4),
  but in case you can't please use [v0.3.2](https://github.com/dgeb/grunt-ember-templates/tree/grunt-0.3-stable).

* Check the *Release History* below for version compatibility with Ember and
  Handlebars. The latest version of this plugin tends to track ember-latest, so
  you may need an older version to work with the latest *official release* of Ember.

* Remember to name partial templates with a leading underscore. This underscore
  will be preserved in the compiled template name. For instance,
  `post/_edit.hbs` will be registered as `Ember.TEMPLATES["post/_edit"]`.

## Credit

Many thanks to the following projects upon which this was based:

* [grunt-contrib-handlebars](https://github.com/gruntjs/grunt-contrib-handlebars) by [Tim Branyen](https://github.com/tbranyen)
* [grunt-ember-handlebars](https://github.com/yaymukund/grunt-ember-handlebars) by [Mukund Lakshman](https://github.com/yaymukund)

I created this project as an alternative to grunt-ember-handlebars for the following reasons:
* to provide maximum compatibility with the grunt-contrib project, using features such as destination:source file arguments
* to allow for customizable template names based upon source file paths

## Release History

* 2014/10/29 - v0.4.23 - Fixed peer dependencies issue for `ember-template-compiler` 1.8.x
* 2014/10/23 - v0.4.22 - Updated `ember-template-compiler` peer dependencies for Handlebars 1.x compatibility. Thanks @cyril-sf!
* 2014/04/02 - v0.4.21 - Introduced `concatenate` option. Thanks @joshvfleming!
* 2014/03/11 - v0.4.20 - `amd` option can now accept a string to define Ember's module name. Thanks @Kerrick!
* 2014/03/02 - v0.4.19 - Require node to be >= 0.8.19 to avoid peerDependencies issue. Thanks @rjackson!
* 2013/12/04 - v0.4.18 - Introduced `ember-template-compiler` dependency. Thanks @rjackson!
* 2013/11/20 - v0.4.17 - Added `templateCompilerPath` and `handlebarsPath` option. Thanks @rjackson!
* 2013/11/04 - v0.4.16 - Added `preprocess` option. Thanks @timrwood!
* 2013/09/25 - v0.4.15 - Added `templateRegistration` option. Thanks @lukemelia!
* 2013/09/05 - v0.4.14 - Now using lowercase module name `ember` with `amd` option. Thanks @rpflorence!
* 2013/09/01 - v0.4.13 - Upgraded ember-template-compiler.js to 1.0.0 (woot!). Added `precompile` option - thanks @manoharank!
* 2013/08/19 - v0.4.12 - Added `templateBasePath` alias to `templateBaseDir`. Default `templateFileExtensions` now also include `.hjs`.
* 2013/08/18 - v0.4.11 - Upgraded ember-template-compiler.js to 1.0.0-rc.7. Plus new `amd`, `templateBaseDir`, `templateFileExtensions`, and `templateNameFromFile` options.
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
