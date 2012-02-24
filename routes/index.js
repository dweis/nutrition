var food = require('./food')

/*
 * GET home page.
 */
app.get('/',  function(req, res) {
  res.render('index', { title: 'Nutrition Planner' })
})

/*
 * API requests
 */
app.get('/food/search', food.search)
app.get('/food/:ndbNo', food.get)
