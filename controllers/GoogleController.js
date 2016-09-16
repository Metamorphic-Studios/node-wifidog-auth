/**
 * Copyright RIKSOF (Private) Limited 2016.
 *
 * Controller to handle login and session with Google.
 */

// Reference to the module to be exported
google = module.exports = {};

/**
 * Setup takes an express application server and configures
 * it to handle errors.
 */
google.setup = function( app, gateways, clients ) {
  
  // Get the configurations
  var config = require(__dirname + '/../config');

  // Our logger for logging to file and console
  var logger = require(__dirname + '/../services/logger');

  // Configure passport
  passport = require('passport');

  /**
   * If string ends with passed suffix.
   */
  String.prototype.endsWith = function( suffix ) {
      return this.indexOf(suffix, this.length - suffix.length) !== -1;
  };

  /**
   * Configure the Google Strategy.
   */
  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

  /**
   * Use the GoogleStrategy within Passport.
   * Strategies in Passport require a `verify` function, which accept
   * credentials (in this case, an accessToken, refreshToken, and Google
   * profile), and invoke a callback with a user object.
   */
  passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.secret,
    callbackURL: config.google.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      for ( var i = 0; i < profile.emails.length; i++ ) {
        var e = profile.emails[i];
        if ( e.value.endsWith( config.access.allowedDomain ) ) {
          return done( null, profile );
        }
      }
      
      return done( null, false );
    });
  }));
  
  /**
   * Use passport.authenticate() as route middleware to authenticate the
   * request.  The first step in Google authentication will involve
   * redirecting the user to google.com.  After authorization, Google
   * will redirect the user back to this application at /auth/google/callback
   */
  app.get('/auth/google/login',
    passport.authenticate('google', { scope: ['email'], session: false }),
      function(req, res) {
        // The request will be redirected to Google for authentication, so this
        // function will not be called.
  });
  
  // Configure passport to be used in the app.
  app.use( passport.initialize() );

  /**
   * Use passport.authenticate() as route middleware to authenticate the
   * request.  If authentication fails, the user will be redirected back to the
   * login page.  Otherwise, the primary route function function will be called,
   * which, in this example, will redirect the user to the page they were visiting
   * before being interrupted to login.
   */
  app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/gw_message.php?message=denied', session: false }),
  function(req, res) {
    
    // Get the client IP
    var ip = req.headers['x-forwarded-for'] || req.ip || req.connection.remoteAddress;
    
    // If we have the client, send its information. Otherwise send information
    // that is generated now.
    var c = clients.get( ip );
    
    // Get the moment now and set it for user's time in.
    var moment = require( 'moment' );
    var now = moment();
    
    if ( c ) {  
      // Make sure client was not authenticated before. If so, update their
      // logout and login time.
      if ( c.auth != clients.AUTH_TYPES.AUTH_ALLOWED ) {
        clients.setLoginTime( ip, Math.floor( now.format( 'x' ) ) );
      }
      
      clients.setAuthType( ip, clients.AUTH_TYPES.AUTH_ALLOWED );
      clients.setEmail( ip, req.user.emails[0].value, req.user.displayName );
      
      // Save changes
      clients.save();
    } else {
      
      // Generate a token for this client
      var crypt = require('crypto');
      token = crypt.randomBytes( 64 ).toString('hex');
    
      // Update the client information
      clients.set( ip, token, '', Math.floor( now.format( 'x' ) ) );
      clients.setAuthType( ip, clients.AUTH_TYPES.AUTH_ALLOWED );
      clients.setEmail( ip, req.user.emails[0].value, req.user.displayName );
      
      // Save changes
      clients.save();
    }
    
    res.redirect('https://riksof.slack.com');
  });
}