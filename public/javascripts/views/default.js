define([ 'jquery', 'underscore', 'backbone', 'hbs!/templates/default' ],
    function($, _, Backbone, defaultTemplate) {
      var defaultView = Backbone.View.extend({
        el: $('#container'),
        render: function() {
          this.el.html(defaultTemplate())
        }
      })

      return new defaultView;
    })
