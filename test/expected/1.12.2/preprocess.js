Ember.TEMPLATES["test/fixtures/preprocess"] = Ember.HTMLBars.template((function() {
  return {
    isHTMLBars: true,
    revision: "Ember@1.12.2",
    blockParams: 0,
    cachedFragment: null,
    hasRendered: false,
    build: function build(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createElement("div");
      var el2 = dom.createTextNode(" ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("div");
      var el3 = dom.createTextNode("Spaces");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode(" ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("div");
      var el3 = dom.createTextNode("Tabs");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode(" ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("div");
      dom.setAttribute(el2,"class","spaces in attrs");
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode(" ");
      dom.appendChild(el1, el2);
      var el2 = dom.createComment("");
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode(" ");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      return el0;
    },
    render: function render(context, env, contextualElement) {
      var dom = env.dom;
      var hooks = env.hooks, get = hooks.get, inline = hooks.inline;
      dom.detectNamespace(contextualElement);
      var fragment;
      if (env.useFragmentCache && dom.canClone) {
        if (this.cachedFragment === null) {
          fragment = this.build(dom);
          if (this.hasRendered) {
            this.cachedFragment = fragment;
          } else {
            this.hasRendered = true;
          }
        }
        if (this.cachedFragment) {
          fragment = dom.cloneNode(this.cachedFragment, true);
        }
      } else {
        fragment = this.build(dom);
      }
      var morph0 = dom.createMorphAt(dom.childAt(fragment, [0]),7,7);
      inline(env, morph0, context, "spaces", [get(env, context, "in"), get(env, context, "handlebars"), get(env, context, "tags")], {});
      return fragment;
    }
  };
}()));