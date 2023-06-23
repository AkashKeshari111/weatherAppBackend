const { connect } = require("mongoose");
require("dotenv").config();

const MONGO_URL = process.env.MONGO_DATABASE;
const connection = connect(MONGO_URL);

module.exports = connection;
