const route         = require("express").Router();
const controller    = require("../../controllers/UserController");

route.get("/", controller.index);
route.get("/:id", controller.show);
route.post("/", controller.create);
route.post("/:id", controller.update);
route.delete("/:id", controller.delete);

module.exports = route;