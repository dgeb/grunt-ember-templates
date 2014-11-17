Ember.TEMPLATES["test/fixtures/preprocess"] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = '';
  data.buffer.push("<div> <div>Spaces</div> <div>Tabs</div> <div class=\"spaces in attrs\"></div> ");
  data.buffer.push(escapeExpression(((helpers.spaces || (depth0 && depth0.spaces) || helperMissing).call(depth0, "in", "handlebars", "tags", {"name":"spaces","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID","ID","ID"],"contexts":[depth0,depth0,depth0],"data":data}))));
  data.buffer.push(" </div>");
  return buffer;
},"useData":true});