var express = require('express'),
    mongoose = require('mongoose');

// set the enviromnet using Node's envireoment variable
// //or set to developemnt if it is not already set
var env = process.env.NODE_ENV || process.env.NODE_ENV || 'development';
console.warn('YO! process.env.NODE_ENV = ' + process.env.NODE_ENV);

// create the express application
var app = express();

// create a config object we can pass to our refactored
// express.js module we created...
var config = {
  rootPath : __dirname
};

//require the code we cut out and refactored into
// the config/express.js file
// then invoke the function and pass in what we
// made it need :) i.e. app and a config object
require('./server/config/express.js')(app, config );

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
// this does not work when you have subfolders under view/partials folder
// but if you had all partials in the partials folder it would be ok but
// that is unmanageable if you have many partial views
//app.get('/partials/:partialPath', function (req, res) {
//    //this route only matches files directly inside /partials
//    // files in subdirs will then fall thru to our '*' route and not be found
//    console.log("YO MAN!!! THIS IS THE req.params.partialPath PATH: partials/" + req.params.partialPath);
//    res.render('partials/' + req.params.partialPath);
//});

// this /partials/*  allows for subfolders under the partials folder!
app.get('/partials/*', function (req, res) {
    // use this instead
    console.log("YO MAN!!! THIS IS THE req.params[0] PATH: partials/" + req.params[0]);
    // param is an array ant the 0th element matches whatever comes after '/partials'
    // i.e. the oth element could be a bunch/of/subdirs/with/a/file at the end
    // making this a more flexible route
    res.render('partials/' + req.params[0]);
});



// Another improvement we can make is to put all the client views under the public
// folder beside thier angular controllers. so we will adjust the path the server
// will take to find the the files. NOTE: the 'multivision/public/app' folder is
// at the same level as what used to be partials folder. but under the client path
// instead of the server path.  So from the server's index page. we go up 2 then
// down into public/app to get at the partial views we moved to the client public folder.
app.get('/app/*', function (req, res) {
    // use this instead
    console.log("YO MAN!!! THIS IS THE req.params[0] PATH: ../../public/app/" + req.params[0]);
    // param is an array ant the 0th element matches whatever comes after '/partials'
    // i.e. the oth element could be a bunch/of/subdirs/with/a/file at the end
    // making this a more flexible route
    res.render('../../public/app/' + req.params[0]);
});


// set up server catch all route (WE WILL LET THE CLIENT DO THE ACTUAL VIEW ROUTING INSTEAD)
//app.get('*');   // (*) means all routes will hit this route
// images, html etc.  a default route.  server always serves the index page
// the client will show the correct view
app.get('*', function (req, res) {
    // '*' route is a catch all route-- will match path not caught by the partials
    // route above and then render the index page
    console.log("+++ WASSUP!!! RENDERING INDEX +++");
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
