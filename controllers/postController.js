const { Post, Tag } = require("../models");

class PostController {

  static async generatePostList(req, res) {
    try {
      const {search} = req.query;
      const condition = (search)? {title:{[Op.iLike]:`%${search}%`}}: {};
      const posts = await Post.findAll({
        where: condition
      });

      res.render("post/postList", {posts})
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async generateAddPost(req, res) {
    try {
      res.render("post/postAdd")
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async processAddPost(req, res) {
    const {title, imgURL, content} = req.body;
    const UserId = req.session.userId;
    try {
      await Post.create({title, imgURL, content, UserId});
      res.redirect(`/user/detail/${UserId}`);
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async generateDetail(req, res) {
    try {
      const {id} = req.params;

      const post = await Post.findOne({
        include: Tag,
        where: {id}
      });

      res.render("post/postDetail", {post});
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }
}

module.exports = PostController;