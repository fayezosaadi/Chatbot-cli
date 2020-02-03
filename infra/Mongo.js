const mongoose = require('mongoose');
const MONGODB_URI = "mongodb://localhost/rival";

class Mongo {
  static connect() {
    mongoose.connect(
      MONGODB_URI,
      { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
    );
  }
}

module.exports = { Mongo };
