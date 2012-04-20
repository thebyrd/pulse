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
  //app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Model
mongoose.connect('mongodb://localhost/27017');

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var WeatherSchema = new Schema({
    id            : ObjectId
  , tempC         : Double // in Degrees Celcius
  , tempF         : Double // in Degress Farenheit 
  , percipitation : Double //expressed as a percent likelyhood
  , sunsetTime    : Date
  , sunriseTime   : Date 
});
var Weather = mongoose.model('Weather', WeatherSchema);

//Plan {id, places, descriptions (optional), rating, comment, date}
var PlanSchema = new Schema({
    id          : ObjectId
  , places      : [Place]
  , description : String
  , rating      : { type: Double, default:0.5, index:true}
  , comment     : String
  , date        : { type: Date, default: Date.now, index: true}
});
var Plan = mongoose.model('Plan', PlanSchema);

//Syntax Reminder
//var instance = new Plan();
//instance.save(function(err){});
//Plan.find({}, function(err, docs){
// docs.forEach
//});  

//Place {id, geodata, name, description, website, cost, romance, pictures}
var PlaceSchema = new Schema({
    id            : ObjectId
  , geodata       : String
  , name          : {type: String, index: true}
  , description   : String
  , website       : String
  , averageCost   : Double
  , romanticScore : Double
  , picturePath   : String
});
var Place = mongoose.model('Place', PlaceSchema);

//Food{genre, polarity}
var FoodSchema = new PlaceSchema({
    genre    : String
  , polarity : Double
});
var Food = mongoose.model('Food', FoodSchema);

var RestaurantSchema = new FoodSchema({
    formalScore : Double //1 is formal & 0 is casual
}); 
var Restaurant = mongoose.model("Restaurant", RestaurantSchema);

var DesertSchema = new FoodSchema({
    formalScore : Double //1 is formal & 0 is casual
});
var Desert = mongoose.model("Desert", DesertSchema);

var EntertainmentSchema = new PlaceSchema({
    isOutdoors  : Boolean
  , intensity : Double //between 0 and 1
});
var Entertainment = mongoose.model("Entertainment", EntertainmentSchema);

var ParkSchema = new EntertainmentSchema({
  weather : [Weather]
});
var Park = mongoose.model("Park", ParkSchema);

var BeachSchema = new EntertainmentSchema({
  weather : [Weather]
});
var Beach = mongoose.model("Beach", BeachSchema);

var SportsSchema = new EntertainmentSchema({
    teamName : String
  , sportName    : String
}); 
var Sports = mongoose.model("Sports", SportsSchema);

var ShoppingSchema = new EntertainmentSchema({
  
});
// Routes
app.get('/', function(req, res){
  res.send("Hello World");
});
app.get('/hello',function(req, res){
  res.send("Hello World");
});

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
