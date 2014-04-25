var grunt = require('grunt');

exports.handlebars = {
  default: function(test) {
    'use strict';
    test.expect(1);

    var actual = grunt.file.read('tmp/default.js');
    var expected = grunt.file.read('test/expected/default.js');
    test.equal(actual, expected, 'should compile handlebars templates using default settings');

    test.done();
  },
  amd: function(test) {
    'use strict';
    test.expect(1);

    var actual = grunt.file.read('tmp/amd.js');
    var expected = grunt.file.read('test/expected/amd.js');
    test.equal(actual, expected, 'should compile handlebars templates with AMD wrappers');

    test.done();
  },
  amd_string_true: function(test) {
    'use strict';
    test.expect(1);

    var actual = grunt.file.read('tmp/amd_string_true.js');
    var expected = grunt.file.read('test/expected/amd.js');
    test.equal(actual, expected, 'should compile handlebars templates with backwards compatible AMD wrappers');

    test.done();
  },
  amd_custom: function(test) {
    'use strict';
    test.expect(1);

    var actual = grunt.file.read('tmp/amd_custom.js');
    var expected = grunt.file.read('test/expected/amd_custom.js');
    test.equal(actual, expected, 'should compile handlebars templates with custom AMD wrappers');

    test.done();
  },
  file_pattern_matching: function(test) {
    'use strict';
    test.expect(1);

    var actual = grunt.file.read('tmp/file_pattern_matching.js');
    var expected = grunt.file.read('test/expected/file_pattern_matching.js');
    test.equal(actual, expected, 'should compile handlebars templates found by file pattern');

    test.done();
  },
  custom_file_extensions: function(test) {
    'use strict';
    test.expect(1);

    var actual = grunt.file.read('tmp/custom_file_extensions.js');
    var expected = grunt.file.read('test/expected/custom_file_extensions.js');
    test.equal(actual, expected, 'should allow for custom template file extensions');

    test.done();
  },
  truncate_base_path: function(test) {
    'use strict';
    test.expect(1);

    var actual = grunt.file.read('tmp/truncate_base_path.js');
    var expected = grunt.file.read('test/expected/truncate_base_path.js');
    test.equal(actual, expected, 'should truncate base path from template names');

    test.done();
  },
  remove_leading_slash: function(test) {
    'use strict';
    test.expect(1);

    var actual = grunt.file.read('tmp/remove_leading_slash.js');
    var expected = grunt.file.read('test/expected/truncate_base_path.js');
    test.equal(actual, expected, 'should remove leading slash from template names');

    test.done();
  },
  custom_template_name: function(test) {
    'use strict';
    test.expect(1);

    var actual = grunt.file.read('tmp/custom_template_name.js');
    var expected = grunt.file.read('test/expected/custom_template_name.js');
    test.equal(actual, expected, 'should allow for custom processing of template names');

    test.done();
  },
  custom_template_name_from_file: function(test) {
    'use strict';
    test.expect(1);

    var actual = grunt.file.read('tmp/custom_template_name_from_file.js');
    var expected = grunt.file.read('test/expected/custom_template_name_from_file.js');
    test.equal(actual, expected, 'should allow for completely custom processing of template file names');

    test.done();
  },
  minify: function(test) {
    'use strict';
    test.expect(1);

    var actual = grunt.file.read('tmp/preprocess.js');
    var expected = grunt.file.read('test/expected/preprocess.js');
    test.equal(actual, expected, 'should be able to run a preprocess function');

    test.done();
  },
  skip_precompile: function(test) {
    'use strict';
    test.expect(1);

    var actual = grunt.file.read('tmp/skip_precompile.js');
    var expected = grunt.file.read('test/expected/skip_precompile.js');
    test.equal(actual, expected, 'should wrap templates with `Ember.Handlebars.compile` when precompile is disabled');

    test.done();
  },
  custom_registration: function(test) {
    'use strict';
    test.expect(1);

    var actual = grunt.file.read('tmp/custom_registration.js');
    var expected = grunt.file.read('test/expected/custom_registration.js');
    test.equal(actual, expected, 'should allow for custom generation of registration code');

    test.done();
  },
  custom_template_compiler: function(test){
    'use strict';
    test.expect(1);

    var actual = grunt.file.read('tmp/custom_handlebars_path.js');

    test.ok(/WOOT/.test(actual), 'should use the provided handlebarsPath');

    test.done();
  },
  concatenate_disabled: function(test){
    'use strict';
    test.expect(3);

    var desc = 'should write individual files if concatenation is disabled';

    var actual = grunt.file.read('tmp/dest/test/fixtures/text.js');
    var expected = grunt.file.read('test/expected/text.js');
    test.equal(actual, expected, desc);

    actual = grunt.file.read('tmp/dest/test/fixtures/simple.js');
    expected = grunt.file.read('test/expected/simple.js');
    test.equal(actual, expected, desc);

    actual = grunt.file.read('tmp/dest/slash/test/fixtures/simple.js');
    expected = grunt.file.read('test/expected/simple.js');
    test.equal(actual, expected, desc);

    test.done();
  }
};
