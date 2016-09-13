Ember.TEMPLATES["test/fixtures/text"] = Ember.HTMLBars.compile("Basic template that does nothing.");

Ember.TEMPLATES["test/fixtures/simple"] = Ember.HTMLBars.compile("<p>Hello, my name is {{name}}.</p>");

Ember.TEMPLATES["test/fixtures/grandparent/parent/child"] = Ember.HTMLBars.compile("Should be nested.");