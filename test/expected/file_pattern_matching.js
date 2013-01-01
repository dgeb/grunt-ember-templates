Ember.TEMPLATES["test/fixtures/grandparent/parent/child"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  


  data.buffer.push("Should be nested.");
});

Ember.TEMPLATES["test/fixtures/simple"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression;


  data.buffer.push("<p>Hello, my name is ");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},contexts:[depth0],data:data});
  data.buffer.push(escapeExpression(stack1) + ".</p>");
  return buffer;
});

Ember.TEMPLATES["test/fixtures/text"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  


  data.buffer.push("Basic template that does nothing.");
});