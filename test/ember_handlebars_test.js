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
  file_pattern_matching: function(test) {
    'use strict';
    test.expect(1);

    var actual = grunt.file.read('tmp/file_pattern_matching.js');
    var expected = grunt.file.read('test/expected/file_pattern_matching.js');
    test.equal(actual, expected, 'should compile handlebars templates found by file pattern');

    test.done();
  },
  truncated_template_names: function(test) {
    'use strict';
    test.expect(1);

    var actual = grunt.file.read('tmp/truncated_template_names.js');
    var expected = grunt.file.read('test/expected/truncated_template_names.js');
    test.equal(actual, expected, 'should compile handlebars templates using truncated template names');

    test.done();
  }
};
