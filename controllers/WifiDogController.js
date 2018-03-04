/**
 * Copyright RIKSOF (Private) Limited 2016.
 *
 * Wifi Dog Controller to handle login / portal requests.
 */

// Reference to the module to be exported
wifidog = module.exports = {};

/**
 * Setup takes an express application server and configures
 * it to handle errors.
 */
wifidog.setup = function( app, gateways, clients ) {
  // Get the configurations
  var config = require(__dirname + '/../config');

  // Our logger for logging to file and console
  var logger = require(__dirname + '/../services/logger');
	
	/**
	 * Receive request to login
	 */
	app.get( '/login', function( req, res ) {
    // Get the moment now
    var moment = require( 'moment' );
    var now = moment();
    
    // Get the client IP
    var ip = req.query.ip;
    
    var token = '';
    // If we have the client, send its information. Otherwise send information
    // that is generated now.
      gateways.set(req.query.gw_id, req.query.gw_address + ":" + req.query.gw_port, 0, 0, 0, 0, Date.now());
      clients.get(ip, (err, client) => {
         if(err) return console.log(err);

         if(!client){
            var crypt = require('crypto');
            token = crypt.randomBytes(64).toString('hex');

            clients.set(req.query.ip, token, req.query.gw_id, Math.floor(now.format('x')), (err, data) => {
               console.log(err);
               res.redirect('/landing?token=' + token);
               /*clients.setAuthType(req.query.ip, clients.AUTH_TYPES.AUTH_VALIDATION, (err, data) => { 
                  console.log("Redirect");
                  res.redirect('http://' + req.query.gw_address + ':' + req.query.gw_port + '/wifidog/auth?token=' + token);  


               });
            });*/
/*            clients.setAuthType(req.query.ip, clients.AUTH_TYPES.AUTH_VALIDATION, (err, data) => {
            
            });*/
            });
         }else{
            if(client.token && client.authType){
               res.redirect('http://' + req.query.gw_address + ':' + req.query.gw_port + '/wifidog/auth?token=' + client.token);
            }else{
               res.redirect('/landing?token=' + token);
            }
         }

      });
  });
  
  /**
   * Gateway redirects to this action when there is an authentication error.
   */
	app.get( '/gw_message.php', function( req, res ) {
    // Get the client IP
    // If we have the client, send its information. Otherwise send information
    // that is generated now
      clients.getByToken(req.query.token , (err, data) => {
      var moment = require('moment');
       var now = moment();
       if(data){
          console.log(data);
         switch(req.query.message){
            case 'denied':
            case 'failed_validation':
               clients.set(data.ipAddress, data.token, data.gateway, Math.floor(now.format('x')), (err, data) => {
               
               });
               break;
            case 'activate':
               res.redirect('/landing?token=' + data.token);
               break;
            default:
               console.log(req.query.message);
               break;
         }
       }else{
         res.send('Access Denied!');
       }
    });
  });
   
}
