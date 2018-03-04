/**
 * Copyright RIKSOF (Private) Limited 2016.
 *
 * Wifi Dog Protocol.
 */

// Reference to the module to be exported
protocol = module.exports = {};

/**
 * Setup takes an express application server and configures
 * it to handle errors.
 */
protocol.setup = function( app, gateways, clients ) {
  // Get the configurations
  var config = require(__dirname + '/../config');

  // Our logger for logging to file and console
  var logger = require(__dirname + '/../services/logger');
	
	/**
	 * Receive ping from the gateway. Respond with a pong.
	 */
	app.get( '/ping', function( req, res ) {
    
    // Get the moment now
    var moment = require( 'moment' );
    var now = moment();
    
    // Get the ip of gateway
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    // Update the server information
      //
    gateways.set( req.query.gw_id, '192.168.182.1:2060', Math.floor( now.format( 'x' ) ), (err, data) => {
    res.send( 'Pong' );
    });
    
    
  });
  
	/**
	 * Used to verify to a gateway that the given client is authenitcated.
	 */
	app.get( '/auth', function( req, res ) {
    
    // By default we deny authentication.
    var auth = clients.AUTH_TYPES.AUTH_DENIED;
    
    // Get the moment now
    var moment = require( 'moment' );
    var now = moment();
    var nowInSeconds = Math.floor( now.format( 'x' ) );
    
    // Which client?
    clients.get(req.query.ip, (err, data) => {
         if(data){
            auth = data.authType;
           console.log("Authing", data); 
            switch(data.authType){
               case clients.AUTH_TYPES.AUTH_VALIDATION:
    /*              if(nowInSeconds > data.lastSeen + config.timeouts.validation) {
                     clients.setAuthType(req.query.ip, clients.AUTH_TYPES.AUTH_VALIDATION_FAILED);
                     auth = clients.AUTH_TYPES.AUTH_VALIDATION_FAILED;
                  }*/
                  break;
               case clients.AUTH_TYPES.AUTH_ALLOWED:
/*                  if(nowInSeconds > data.lastSeen + config.timeouts.expiration){
                     //Set last ping
                     clients.setAuthType(req.query.ip, clients.AUTH_TYPES.AUTH_VALIDATION);
                     auth = clients.AUTH_TYPES.AUTH_VALIDATION;
                  }*/
                  break;
            }
            
         }

       console.log( 'IP: ' + req.query.ip + ', Auth: ' + auth );
       
       res.send( 'Auth: ' + auth );
    });
     
  });
}
