/**
 * Copyright RIKSOF (Private) Limited 2016.
 *
 * Controller to handle administration. Client needs to be logged in.
 */

// Reference to the module to be exported
panel = module.exports = {};

/**
 * Setup takes an express application server and configures
 * it to handle errors.
 */
panel.setup = function( app, gateways, clients ) {
  
  // Get the configurations
  var config = require(__dirname + '/../config');

  // Our logger for logging to file and console
  var logger = require(__dirname + '/../services/logger');
  
	/**
	 * Receive request to get list of all clients.
	 */
	app.get( '/clients', function( req, res ) {
    
    // Get the client IP
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    console.log( 'Panel access by IP: ' + ip );
    
    // Does this client have authorization on the network?
    var c = clients.get( ip );
    
    if ( c && c.auth == clients.AUTH_TYPES.AUTH_ALLOWED ) {
      res.json( clients.getAll() );
    } else {
      res.json( { status: 'Access Denied' } );
    }
  });
  
	/**
	 * Receive request to set status of a single client.
	 */
	app.get( '/client/activate', function( req, res ) {
    
    // Get the client IP
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    console.log( 'Panel access by IP: ' + ip );
    
    // Does this client have authorization on the network?
    var c = clients.get( ip );
    
    if ( c && c.auth == clients.AUTH_TYPES.AUTH_ALLOWED ) {
      console.log( 'Activating IP: ' + req.query.ip );
      
      // Now get the client we want to set.
      var c = clients.get( req.query.ip );
      
      // If exists client
      if ( c ) {
        clients.setAuthType( req.query.ip, clients.AUTH_TYPES.AUTH_ALLOWED );
        res.json( { status: 'OK' } );
      } else {
        res.json( { status: 'Not Found' } );
      }
      
    } else {
      res.json( { status: 'Access Denied' } );
    }
  });
  
}