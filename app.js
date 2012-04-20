/**
 * @name: David Byrd
 * @copyright: Byrdhou.se 2012
 */

//Module Dependencies
var express = require('express')
  , routes = require('./routes')
  , mongoose = require('mongoose');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  
  /**
   * This gives us access to user session cookies that are stored in a redis db
   * req.session.VALUE
   */
 // var RedisStore = require('connect-redis')(express);
 // app.use(express.cookieParser());
 // app.use(express.session({secret: "Mackey has Game", store: new RedisStore }));
  
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

// Model
mongoose.connect('mongodb://localhost/');
var



// Routes

app.get('/', routes.index);
app.get('/hello',function(req, res){
  res.send("Hello World");
});

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
