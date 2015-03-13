
// now that we've cut this code from server.js in our refactoring of
// the routes to a separate file, we need to pass in the app object
module.exports = function(app){

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

    // We replaced this code with Another improvement below i.e. '/app/*':
    // this /partials/*  allows for subfolders under the partials folder!
    //app.get('/partials/*', function (req, res) {
    //    // use this instead
    //    console.log("YO MAN!!! THIS IS THE req.params[0] PATH: partials/" + req.params[0]);
    //    // param is an array ant the 0th element matches whatever comes after '/partials'
    //    // i.e. the oth element could be a bunch/of/subdirs/with/a/file at the end
    //    // making this a more flexible route
    //    res.render('partials/' + req.params[0]);
    //});



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
        console.log("+++ WASSUP!!! RENDERING INDEX +++ and we're in: " + __dirname);
        // WE USED THIS LINE TO VERIFY A ROUND TRIP TO DB
        //res.render('index', {mongoMessage: mongoMessage});
        res.render('index');
    });
};