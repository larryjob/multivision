var express = require('express'),
    stylus = require('stylus'),  // require the stylus css compiler
    logger = require('morgan'),  // require the express morgan logger
    bodyParser = require('body-parser'); // for parsing request bodies
mongoose = require('mongoose');

// set the enviromnet using Node's envireoment variable
// //or set to developemnt if it is not already set
var env = process.env.NODE_ENV || process.env.NODE_ENV || 'development';
console.warn('YO! process.env.NODE_ENV = ' + process.env.NODE_ENV);

// create the express application
var app = express();

// configure stylus css compiler
function compile(str, path) {
    return stylus(str).set('filename', path);
}

// settings congiguration

//configure my view engine
//where are the views located
app.set('views', __dirname + '/server/views');

// set the view engine in use
app.set('view engine', 'jade');

// use the express morgan logger pacakage to log output
app.use(logger('dev'));

// set express to use the body parser
app.use(bodyParser());

// setup the app to use the stylus middleware
app.use(stylus.middleware(
    {
        src: __dirname + '/public',  // sylus will comile css to public dir
        compile: compile
    }
));

// setup express to serve static files
// express will serve static files from public dir
app.use(express.static(__dirname + '/public'));

// connect to database on localhost, if multivision
// database doesn't exist, mongo will create it

if (env === 'development') {
    mongoose.connect('mongodb://localhost/multivision');
    console.error('Using local development db...');
}
else {
    mongoose.connect('mongodb://mgm:ecm8pod@ds033709.mongolab.com:33709/multivision');
    console.error('Using mongolab production db...');
}
// get the db from the cßonnection

var db = mongoose.connection;

// listen to any error events
db.on('error', console.error.bind(console, 'connection error ...'));//could have used a callback that calls console.error

// listen to open event one time
db.once('open', function callback() {
    console.log('multivision db opened');
});

/*// WE DID THIS JUST TO QUICKLY VERIFY A ROUND TRIP TO DATABASE
//create a mongoose schema object with field message of type string
var messageSchema = mongoose.Schema({message: String});

// create a mongoose model object on a collection called Message using the schema
// this implies a messages collection exists in the database
// lowercase and pluralized
// better to use the collection name exactly!!!
var MessageModel = mongoose.model('messages', messageSchema);

var mongoMessage;
// search mongodb for a message document

// connection actuall opens to fire the query
MessageModel.findOne().exec(function (err, messageDoc) {
    if (!err) {
        if (messageDoc) {
            mongoMessage = messageDoc.message;
            console.log('Got a message: ' + mongoMessage);
        }
        else {
            mongoMessage = "Didn't git NONE !!!"
            console.log('Did not get a message!!! ');
        }
    }
    else {
        console.log('Got an error: ' + err);
    }
});*/

// serve up the angularJS Partial JADE views
app.get('/partials/:partialPath', function (req, res) {
    res.render('partials/' + req.params.partialPath);
});


// set up server catch all route (WE WILL LET THE CLIENT DO THE ACTUAL VIEW ROUTING INSTEAD)
//app.get('*');   // (*) means all routes will hit this route
// images, html etc.  a default route.  server always serves the index page
// the client will show the correct view
app.get('*', function (req, res) {
    // WE USED THIS LINE TO VERIFY A ROUND TRIP TO DB
    //res.render('index', {mongoMessage: mongoMessage});
    res.render('index');
});

// NOTE: we created a Procfile in the root project dir
// to tell heroku what file to run our webserver
// i.e. we specified:   web: node server.js  inside of Procfile
// add engines to tell heroku what versions are needed
//for your app
//NOTE: we also created and engines property inside of package.json
// to tell heroku what versions of software we require for node and npm:
//"engines":
//{
//    "node":"0.10.x",
//    "npm":"1.4.x"
//},
var port = process.env.PORT || 3030;
app.listen(port);
console.log('Listening on port ' + port + ' ...');
