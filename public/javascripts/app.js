define(['jquery', 'underscore', 'backbone', 'router', 'jquery-ui' ],
      function($, _, Backbone, router) {
    return {
        initialize: function() {
            router.initialize()
            Backbone.history.start();
        }
    };
});
