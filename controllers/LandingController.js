/**
 * Copyright RIKSOF (Private) Limited 2016.
 *
 * Controller to handle administration. Client needs to be logged in.
 */

var express = require('express');
// Reference to the module to be exported
landing = module.exports = {};

/**
 * Setup takes an express application server and configures
 * it to handle errors.
 */
landing.setup = function( app, gateways, clients ) {
  
  // Get the configurations
  var config = require(__dirname + '/../config');

  // Our logger for logging to file and console
  var logger = require(__dirname + '/../services/logger');
  

  app.use('/landing', express.static(__dirname + '/../landing/build'));
  
}
