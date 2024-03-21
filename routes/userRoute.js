const route = require("express").Router();
const UserController = require("../controllers/userController");

route.get("/", UserController.generateUser);
route.get("/edit/:id", UserController.generateEditUser);
route.post("/edit/:id", UserController.processEditUser);
route.get("/delete/:id", UserController.generateDeleteUser);

module.exports = route;