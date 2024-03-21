const TagController = require("../controllers/tagController");
const middleware = require("../middlewares");
const route = require("express").Router();

route.get("/", TagController.generateTagList);

route.use(middleware.adminVerivier);

route.get("/add", TagController.generateAddTag);
route.post("/add", TagController.processAddTag);
route.get("/edit", TagController.generateEditTag);
route.post("/edit", TagController.processEditTag);
route.get("/delete", TagController.generateDeleteTag);


module.exports = route;