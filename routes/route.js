const HomeController = require("../controllers/homeController");
const UserController = require("../controllers/userController");
const middleware = require("../middlewares");
const route = require("express").Router();
const routeUser = require("./userRoute");
const routePost = require("./postRoute");
const routeTag = require("./tagRoute");

route.get("/", HomeController.generateHome);
route.get("/register", UserController.generateRegister);
route.post("/register", UserController.processRegister);
route.get("/login", UserController.generateLogin);
route.post("/login", UserController.processLogin);

// route.use(middleware.loginVerivier);

route.get("/logout", UserController.processLogout);

route.use("/user", routeUser);
route.use("/posts", routePost);
route.use("/tags", routeTag);

module.exports = route;