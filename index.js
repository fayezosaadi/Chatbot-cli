const { Mongo } = require("./infra/Mongo");
const app = require('./app');

// Initialize mongo db
Mongo.connect();

// Start the app
const start = () => app();

module.exports = async () => start();
