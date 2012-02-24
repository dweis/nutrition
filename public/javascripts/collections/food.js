define([ 'underscore', 'backbone', 'models/food' ], function(_, Backbone, foodModel) {
  var foodCollection = Backbone.Collection.extend({
    model: foodModel,
    initialize: function() {

    }
  })

  return new foodCollection
})
