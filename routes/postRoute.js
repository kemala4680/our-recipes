const PostController = require("../controllers/postController");
const route = require("express").Router();

route.get("/", PostController.generatePostList);
route.get("/add", PostController.generateAddPost);
route.post("/add", PostController.processAddPost);



route.get("/edit/:id", PostController.generateEditPost);
route.post("/edit/:id", PostController.processEditPost);
route.get("/delete/:id", PostController.generateDeletePost);

module.exports = route;