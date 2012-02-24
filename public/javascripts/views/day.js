define([ 'jquery', 'underscore', 'backbone', 'hbs!/templates/day', 'hbs!/templates/search_food_item', 'collections/food' ],
    function($, _, Backbone, dayTemplate, searchFoodItemTemplate, foodCollection) {

      var dayView = Backbone.View.extend({
        el: $('#container'),
        initialize: function() {
          this.collection = foodCollection;
          this.collection.bind('add', this.foodAdded);
          this.collection.bind('remove', this.foodRemoved);
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
          $('#container ul').append(searchFoodItemTemplate(food.toJSON()));
        },
        foodRemoved: function(food) {
          $('#container ul').find('li#' + food.get('ndbNo')).remove();
        },
        emptyFoods: function() {
          $('#container ul').empty();
        }
      })

      return new dayView;
    })
