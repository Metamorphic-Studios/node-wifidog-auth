/**
 * Copyright RIKSOF (Private) Limited 2016.
 *
 * Main Server.
 */

// Get the configurations
var config = require( __dirname + '/config' );

// Our logger for logging to file and console
var logger = require( __dirname + '/services/logger' );

// Instance for express server
var express = require( 'express' );
var app = express();

//SSL

if(config.http.enableSSL){
   var fs = require('fs');
   var https = require('https');
   var privateKey = fs.readFileSync(config.http.key);
   var certificate = fs.readFileSync(config.http.cert);

   var httpsServer = https.createServer({
      key: privateKey,
      cert: certificate
   }, app);
}

var bodyParser = require('body-parser');

app.use(bodyParser.json());

// Initialize the models.
var gatewayStore = require( __dirname + '/models/Gateways.js' );
var clientStore = require( __dirname + '/models/Client.js' );

var gateways = new gatewayStore({url: 'mongodb://localhost', db: 'wifi'});
var clients = new clientStore({url: 'mongodb://localhost', db: 'wifi'});

// Load the clients from last time.

// Configure all controllers for this application
var protocol = require( __dirname + '/api/WifiDogProtocol.js' );
protocol.setup( app, gateways, clients );

var portal = require( __dirname + '/controllers/WifiDogController.js' );
portal.setup( app, gateways, clients );

var panel = require( __dirname + '/controllers/PanelController.js' );
panel.setup( app, gateways, clients );

var landing = require(__dirname + '/controllers/LandingController.js');
landing.setup(app, gateways, clients);


var content = require( __dirname + '/controllers/StaticContentServer.js' );
content.setup( app, express );

// Start the http server
var httpServer;

var http = require('http');
httpServer = http.createServer(app);

// Make the server listen
httpsServer.listen(config.http.httpsPort);
httpServer.listen( config.http.port );
logger.info( 'Listening on port ' + config.http.port + ' with SSL ' + config.http.enableSSL );
