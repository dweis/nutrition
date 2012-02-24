define([ 'jquery', 'underscore', 'backbone', 'hbs!/templates/day', 
         'hbs!/templates/search_food_item', 'collections/food', 'jquery-ui' ],
    function($, _, Backbone, dayTemplate, searchFoodItemTemplate, foodCollection) {

      var dayView = Backbone.View.extend({
        el: $('#container'),
        initialize: function() {
          this.collection = foodCollection;
          this.collection.bind('add', this.foodAdded);
          this.collection.bind('reset', this.emptyFoods);
        },
        render: function() {
          this.el.html(dayTemplate())
        },
        events: {
          'change input#search': 'search'
        },
        search: function(ev) {
          var q = $('input#search').val();
          var collection = this.collection;

          $.get('/food/search', { query: q }, function(foods) {
            collection.reset();
            collection.add(foods);
          })
        },
        foodAdded: function(food) {
          var id = '#ndb_' + food.get('ndbNo');

          $('#container ul').append(searchFoodItemTemplate(food.toJSON()));
          $(id).draggable();
        },
        emptyFoods: function() {
          $('#container ul').empty();
        }
      })

      return new dayView;
    })
