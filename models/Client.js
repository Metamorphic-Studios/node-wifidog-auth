var MongoClient = require('mongodb').MongoClient;

class Clients {
   constructor(opts){
   
   this.AUTH_TYPES = {
   AUTH_DENIED: 0,
   AUTH_VALIDATION_FAILED: 6,
   AUTH_ALLOWED: 1,
   AUTH_VALIDATION: 5,
   AUTH_ERROR: -1
}

      MongoClient.connect(opts.url, (err, db) => {
         if(err) console.log(err);
         this.db = db.db(opts.db);
      });
   }

   get(ip, cb){
      this.db.collection('clients').findOne({ipAddress: ip}, (err, data) => {
         cb(err, data);
      });
   }

   setByToken(token, socialBlob, cb){
      this.db.collection('clients').update({token: token}, {$set: { socialData: socialBlob, authType: this.AUTH_TYPES.AUTH_ALLOWED} }, {upsert: true}, cb);
   }

   set(ip, token, gw_id, last_ping, cb){
      this.db.collection('clients').update({ipAddress: ip}, {$set: { token: token, gateway: gw_id, lastSeen: last_ping }}, {upsert: true}, (err, data) => {
         cb(err, data);
      });
   }

   setAuthType(ip, auth, cb){
      this.db.collection('clients').update({ipAddress: ip}, {$set: {authType: auth}}, {upsert: true}, cb);
   }
}

module.exports = Clients;
