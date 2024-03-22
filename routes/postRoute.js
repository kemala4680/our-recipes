const PostController = require("../controllers/postController");
const route = require("express").Router();

route.get("/", PostController.generatePostList);
route.get("/add", PostController.generateAddPost);
route.post("/add", PostController.processAddPost);
route.get("/detail/:id", PostController.generateDetail);
module.exports = route;