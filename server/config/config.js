
// we bring in the path module to normalize paths
var path = require('path');

//__dirname is the current directory i.e. '/server/config'
// we go up 3 dirs to get to the root which is multivision
//Users/larrynickerson/nodejs-sites/pluralsight/multivision/server/config is the __dirname !!!!
console.log(__dirname + " is the __dirname !!!!");
var rootPath = path.normalize(__dirname + '../../..');
console.log("The normalized rootPath is: " + rootPath );
// from this module, were exporting an object from which
// we can grab keys from e.g. developement or production
// when we require this in server.js

module.exports = {

    development: {
        rootPath: rootPath,
        db: "mongodb://localhost/multivision",
        port: process.env.PORT || 3030,  // default 3030 in dev
        env: "development"
    },
    production: {
        rootPath: rootPath,
        db: "mongodb://mgm:ecm8pod@ds033709.mongolab.com:33709/multivision",
        port: process.env.PORT || 80,    // default 80 in production
        env: "production"
    }
};
