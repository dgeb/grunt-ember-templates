define(["custom"], function(Ember){

Ember.TEMPLATES["test/fixtures/text"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[\"text\",\"Basic template that does nothing.\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}","meta":{}});

Ember.TEMPLATES["test/fixtures/simple"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"Hello, my name is \"],[\"append\",[\"unknown\",[\"name\"]],false],[\"text\",\".\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}","meta":{}});

Ember.TEMPLATES["test/fixtures/grandparent/parent/child"] = Ember.HTMLBars.template({"id":null,"block":"{\"statements\":[[\"text\",\"Should be nested.\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}","meta":{}});

});