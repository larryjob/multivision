var express = require('express');

// set the enviromnet using Node's envireoment variable
// //or set to developemnt if it is not already set
var env = process.env.NODE_ENV || process.env.NODE_ENV || 'development';
console.warn('YO! process.env.NODE_ENV = ' + process.env.NODE_ENV);

// create the express application
var app = express();

// create a config object we can pass to our refactored
// express.js module we created...
//var config = {
//  rootPath : __dirname
//};
// LET'S REQUIRE OUR NEW CONFIG FILE INSTEAD OF CREATING BY HAND
// so, let's require the file and get the key from the exported object
// which matches our env variable defined above.
var config = require('./server/config/config.js')[env];

//require the code we cut out and refactored into
// the config/express.js file
// then invoke the function and pass in what we
// made it need :) i.e. app and a config object
require('./server/config/express.js')(app, config);

// we'll pass in our config object so we can use the
// db connection string in our new mongoose module
require('./server/config/mongoose.js')(config);

// need to pass in our app for the routes config
require('./server/config/routes.js')(app);

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

// use the new config object instead
//var port = process.env.PORT || 3030;
app.listen(config.port);
console.log('Listening on port ' + config.port + ' ...');
