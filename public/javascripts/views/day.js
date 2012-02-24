define([ 'jquery', 'underscore', 'backbone', 'hbs!/templates/day' ],
    function($, _, Backbone, dayTemplate) {

      var dayView = Backbone.View.extend({
        el: $('#container'),
        render: function() {
          this.el.html(dayTemplate())
        }
      })

      return new dayView;
    })
