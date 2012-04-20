/**
 * @name: David Byrd
 * @copyright: Byrdhou.se 2012
 */

//Module Dependencies
var express = require('express')
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
  var RedisStore = require('connect-redis')(express);
  app.use(express.cookieParser());
  app.use(express.session({secret: "Mackey has Game", store: new RedisStore }));
  
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
  , tempC         : {type:Number, index:true} // in Degrees Celcius
  , tempF         : {type:Number, index:true} // in Degress Farenheit 
  , percipitation : {type:Number, min:0, max:1} //expressed as a percent likelyhood
  , sunsetTime    : Date
  , sunriseTime   : Date 
});
var Weather = mongoose.model('Weather', WeatherSchema);

//Plan {id, places, descriptions (optional), rating, comment, date}
var PlanSchema = new Schema({
    id          : ObjectId
  , places      : [Schema.Types.Mixed]//A bunch of PlaceSchemas
  , description : String
  , rating      : { type: Number, default:0.5, index:true, min:0, max:1}
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

var RestaurantSchema = new Schema({
    id            : ObjectId
  , geodata       : String
  , name          : {type: String, index: true, required:true}
  , description   : String
  , website       : String
  , averageCost   : {type:Number, min:0}
  , romanticScore : Number
  , picturePath   : String
  ,  genre         : String
  , polarity      : Number
  ,  formalScore   : Number //1 is formal & 0 is casual
}); 
var Restaurant = mongoose.model("Restaurant", RestaurantSchema);

var DesertSchema = new Schema({
    id            : ObjectId
  , geodata       : String
  , name          : {type: String, index: true, required:true}
  , description   : String
  , website       : String
  , averageCost   : {type:Number, min:0}
  , romanticScore : Number
  , picturePath   : String
  ,  genre         : String
  , polarity      : Number
  ,  formalScore   : Number //1 is formal & 0 is casual
});
var Desert = mongoose.model("Desert", DesertSchema);

var ParkSchema = new Schema({
    id            : ObjectId
  , geodata       : String
  , name          : {type: String, index: true, required:true}
  , description   : String
  , website       : String
  , averageCost   : {type:Number, min:0}
  , romanticScore : Number
  , picturePath   : String
  , isOutdoors    : Boolean
  , intensity     : Number //between 0 and 1
  , weather       : [WeatherSchema]
});
var Park = mongoose.model("Park", ParkSchema);

var BeachSchema = new Schema({
    id            : ObjectId
  , geodata       : String
  , name          : {type: String, index: true, required:true}
  , description   : String
  , website       : String
  , averageCost   : {type:Number, min:0}
  , romanticScore : Number
  , picturePath   : String
  , isOutdoors    : Boolean
  , intensity     : Number //between 0 and 1
  , weather : [WeatherSchema]
});
var Beach = mongoose.model("Beach", BeachSchema);

var SportSchema = new Schema({
    id            : ObjectId
  , geodata       : String
  , name          : {type: String, index: true, required:true}
  , description   : String
  , website       : String
  , averageCost   : {type:Number, min:0}
  , romanticScore : Number
  , picturePath   : String
  , isOutdoors    : Boolean
  , intensity     : Number //between 0 and 1
  , teamName     : String
  , sportName    : String
  , weather      : [WeatherSchema]
}); 
var Sport = mongoose.model("Sport", SportSchema);

var ShoppingSchema = new Schema({
    id            : ObjectId
  , geodata       : String
  , name          : {type: String, index: true, required:true}
  , description   : String
  , website       : String
  , averageCost   : {type:Number, min:0}
  , romanticScore : Number
  , picturePath   : String
  , isOutdoors    : Boolean
  , intensity     : Number //between 0 and 1
});
var Shopping = mongoose.model("Shopping", ShoppingSchema);

var ConcertSchema = new Schema({
    id            : ObjectId
  , geodata       : String
  , name          : {type: String, index: true, required:true}
  , description   : String
  , website       : String
  , averageCost   : {type:Number, min:0}
  , romanticScore : Number
  , picturePath   : String
  , isOutdoors    : Boolean
  , intensity     : Number //between 0 and 1
  , ticketprice  : Number
});
var Concert = mongoose.model("Concert", ConcertSchema);

var MuseumSchema = new Schema({
    id            : ObjectId
  , geodata       : String
  , name          : {type: String, index: true, required:true}
  , description   : String
  , website       : String
  , averageCost   : {type:Number, min:0}
  , romanticScore : Number
  , picturePath   : String
  , isOutdoors    : Boolean
  , intensity     : Number //between 0 and 1
  , ticketprice  : Number
});
var Museum = mongoose.model("Museum", MuseumSchema);

var BarSchema = new Schema({
    id            : ObjectId
  , geodata       : String
  , name          : {type: String, index: true, required:true}
  , description   : String
  , website       : String
  , averageCost   : {type:Number, min:0}
  , romanticScore : Number
  , picturePath   : String
  , isOutdoors    : Boolean
  , intensity     : Number //between 0 and 1
  , formalScore   : Number //1 for formal 0 for casual
});
var Bar = mongoose.model("Bar", BarSchema);

var ClubSchema = new Schema({
    id            : ObjectId
  , geodata       : String
  , name          : {type: String, index: true, required:true}
  , description   : String
  , website       : String
  , averageCost   : {type:Number, min:0}
  , romanticScore : Number
  , picturePath   : String
  , isOutdoors    : Boolean
  , intensity     : Number //between 0 and 1
  , formalScore   : Number //1 for formal 0 for casual
});
var Club = mongoose.model("Club", ClubSchema);

var MovieSchema = new Schema({
    id            : ObjectId
  , geodata       : String
  , name          : {type: String, index: true, required:true}
  , description   : String
  , website       : String
  , averageCost   : {type:Number, min:0}
  , romanticScore : Number
  , picturePath   : String
  , isOutdoors    : Boolean
  , intensity     : Number //between 0 and 1
});
var Movie = mongoose.model("Movie", MovieSchema);

var UserSchema = new Schema({
    id            : ObjectId
  , name          : String
  , email         : String
  , pastPlans     : [Plan]
  , pastPlaces    : [Schema.Types.Mixed]//Different places
});
var User = mongoose.model("User", UserSchema);
 
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
