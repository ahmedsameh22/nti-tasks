const mongodb = require("mongodb").MongoClient;
require("dotenv").config();
const myCon = (cb) => {
  mongodb.connect(process.env.dbUrl, {}, (err, client) => {
    if (err) cb(err, false);
    let db = client.db(process.env.dbName);
    cb(false,db)
  });
};
module.exports = myCon;
