var mongoose = require('mongoose');

module.exports = function ( config ){

    // connect to database on localhost, if multivision
    // database doesn't exist, mongo will create it

    //if (env === 'development') {
    //    mongoose.connect(config.db);
    //    console.error('Using local development db...');
    //}
    //else {
    //    mongoose.connect(config.db);
    //    console.error('Using mongolab production db...');
    //}

    mongoose.connect(config.db);
    // we don't have env now that we moved this code into
    // 'server/config/mongoose.js' so...
    //console.error('Using ' + env + ' db...');
    console.error('Using ' + config.env + ' db...');

    // get the db from the connection
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

 // connection actually opens to fire the query
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

};