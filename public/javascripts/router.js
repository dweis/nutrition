define([ 'jquery', 'underscore', 'backbone', 'views/default', 'views/day' ],
      function($, _, Backbone, defaultView, dayView) {

    var Router = Backbone.Router.extend({
        routes: {
          'day/new': 'newDay',
          'day/:id': 'showDay',
          '*actions': 'defaultRoute'
        },
        newDay: function() {
          dayView.render();
        },
        showDay: function(id) {
          alert('not yet implemented');
        },
        defaultRoute: function(actions) {
          defaultView.render();
        }
    });

    return {
      initialize: function() {
        return new Router();
      }
    }
});
