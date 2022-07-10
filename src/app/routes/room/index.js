const route         = require("express").Router();
const controller    = require("../../controllers/RoomController");

route.get("/", controller.index);

module.exports = route;