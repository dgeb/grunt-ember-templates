Ember.TEMPLATES["text"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  


  data.buffer.push("Basic template that does nothing.");
});

Ember.TEMPLATES["simple"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<p>Hello, my name is ");
  stack1 = {};
  hashTypes = {};
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:stack1,contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  data.buffer.push(escapeExpression(stack1) + ".</p>");
  return buffer;
});

Ember.TEMPLATES["grandparent/parent/child"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  


  data.buffer.push("Should be nested.");
});