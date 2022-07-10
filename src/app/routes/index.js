const route = require("express").Router();

route.use("/api/user", require("./user"));
route.use("/api/room", require("./room"));

module.exports = route;