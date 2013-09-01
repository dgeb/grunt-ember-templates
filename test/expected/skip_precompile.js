Ember.TEMPLATES["test/fixtures/text"] = Ember.Handlebars.compile("Basic template that does nothing.");

Ember.TEMPLATES["test/fixtures/simple"] = Ember.Handlebars.compile("<p>Hello, my name is {{name}}.</p>");

Ember.TEMPLATES["test/fixtures/grandparent/parent/child"] = Ember.Handlebars.compile("Should be nested.");