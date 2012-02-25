define([ 'jquery', 'underscore', 'backbone', 'hbs!/templates/day', 
         'hbs!/templates/search_food_item', 'collections/food', 'jquery-ui' ],
    function($, _, Backbone, dayTemplate, searchFoodItemTemplate, foodCollection) {

      var dayView = Backbone.View.extend({
        el: $('#container'),

        // INIT
        initialize: function() {
          this.collection = foodCollection;
          this.collection.bind('add', this.foodAdded);
          this.collection.bind('reset', this.emptyFoods);
        },

        // EVENTS
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
        dropped: function(ev, ui) {
          alert('dropped')
        },
        foodAdded: function(food) {
          var html = searchFoodItemTemplate(food.toJSON());
          $('ul#foods').append(html);
          $('ul#foods li').last().draggable({ revert: true });
        },
        emptyFoods: function() {
          $('ul#foods').empty();
        },

        // RENDER
        render: function() {
          this.el.html(dayTemplate())
          $('.day-slot').droppable({ drop: this.dropped });
        }
      })

      return new dayView;
    })
