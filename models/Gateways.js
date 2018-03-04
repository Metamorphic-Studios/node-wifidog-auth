/**
 * Copyright RIKSOF (Private) Limited 2016.
 *
 * List of registered gateways.
 */

// Reference to the module to be exported
var MongoClient = require('mongodb').MongoClient;

class Gateway {
   constructor(opts){
      MongoClient.connect(opts.url, (err, db) => {
         this.db = db.db(opts.db);
      });
   }

   get(id, cb){
      this.db.collection('gateways').findOne({id: id}, cb);
   }

   set(id, ip, ping, cb){
      var gateway = {
         id: id,
         ip: ip,
         lastPing: ping
      }
      this.db.collection('gateways').update({id: id}, {$set: gateway}, {upsert: true}, cb)
   }
} 

module.exports = Gateway;

