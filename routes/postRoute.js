const PostController = require("../controllers/postController");
const route = require("express").Router();

route.get("/", PostController.generatePostList);
route.get("/add", PostController.generateAddPost);
route.post("/add", PostController.processAddPost);



route.get("/edit", PostController.generateEditPost);
route.post("/edit", PostController.processEditPost);
route.get("/delete", PostController.generateDeletePost);

module.exports = route;