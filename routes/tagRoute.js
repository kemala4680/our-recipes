const TagController = require("../controllers/tagController");
const middleware = require("../middlewares");
const route = require("express").Router();

route.get("/", TagController.generateTagList);
route.get("/related/:id", TagController.generateTagPost);

// route.use(middleware.adminVerivier);

route.get("/add", TagController.generateAddTag);
route.post("/add", TagController.processAddTag);
route.get("/edit/:id", TagController.generateEditTag);
route.post("/edit/:id", TagController.processEditTag);
route.get("/delete/:id", TagController.generateDeleteTag);


module.exports = route;