const mongoose  = require("mongoose");
const url       = `${process.env.DB_TYPE}://${process.env.DB_HOST}/${process.env.DB_DATABASE}`;

mongoose.connect(url);

module.exports = mongoose;