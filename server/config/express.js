// we cut the code inside the module.exports out of
// server.js to clean up (refactor) our code

// we need to require the modules we use in this file
var express = require('express'),
    stylus = require('stylus'),  // require the stylus css compiler
    logger = require('morgan'),  // require the express morgan logger
    bodyParser = require('body-parser'); // for parsing request bodies


// since app is created in server.js we pass it in
// here so we can make use of the app object
module.exports = function (app, config) {
// configure stylus css compiler
    function compile(str, path) {
        return stylus(str).set('filename', path);
    }

    // settings congiguration

    //configure my view engine
    //where are the views located

    //NOTE: after the refactoring, inside this file
    // __dirname is not the valid directory. We could
    // fix it but we decided to use a config object
    // instead
    //app.set('views', __dirname + '/server/views');
    app.set('views', config.rootPath + '/server/views');

    // set the view engine in use
    app.set('view engine', 'jade');

    // use the express morgan logger pacakage to log output
    app.use(logger('dev'));

    // set express to use the body parser
    app.use(bodyParser());

    // setup the app to use the stylus middleware
    app.use(stylus.middleware(
        {
            //src: __dirname + '/public',  // sylus will comile css to public dir
            src: config.rootPath + '/public',  // sylus will comile css to public dir
            compile: compile
        }
    ));

    // setup express to serve static files
    // express will serve static files from public dir
    //app.use(express.static(__dirname + '/public'));
    app.use(express.static(config.rootPath + '/public'));
}