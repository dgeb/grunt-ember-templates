Ember.TEMPLATES["test/fixtures/preprocess"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div> <div>Spaces</div> <div>Tabs</div> <div class=\"spaces in attrs\"></div> ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.spaces || depth0.spaces),stack1 ? stack1.call(depth0, "in", "handlebars", "tags", options) : helperMissing.call(depth0, "spaces", "in", "handlebars", "tags", options))));
  data.buffer.push(" </div>");
  return buffer;
  
});