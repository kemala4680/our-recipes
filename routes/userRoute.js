const route = require("express").Router();
const UserController = require("../controllers/userController");

route.get("/", UserController.generateUser);
route.get("/edit", UserController.generateEditUser);
route.post("/edit", UserController.processEditUser);

module.exports = route;