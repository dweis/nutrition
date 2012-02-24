//require.paths.unshift('public/javascripts/vendor')
/**
 * Module dependencies.
 */

var express = require('express')
  , mongoose = require('mongoose')

app = module.exports = express.createServer();

app.db = mongoose.connect('mongodb://localhost/nutrition')

// Models
require('./models/food')(app.db)

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

require('./routes')

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
