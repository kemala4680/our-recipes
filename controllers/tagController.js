const { Tag, Post } = require("../models");
const { Op } = require("sequelize");

class TagController {

  static async generateTagList(req, res) {
    try {
      const {search} = req.query;
      const condition = (search)? {name:{[Op.iLike]:`%${search}%`}}: {};
      const tags = await Tag.findAll({
        where: condition
      });

      res.render("tag/tagList", {tags})
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async generateTagPost(req, res) {
    const {id} = req.params;
    try {
      const tag = await Tag.findOne({
        include: Post,
        where: {id}
      });

      res.render("tag/tagPost", {tag});
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async generateAddTag(req, res) {
    try {
      res.render("tag/tagAdd");
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async processAddTag(req, res) {
    const {name, description} = req.body;
    try {
      await Tag.create({name, description});
      res.redirect("/tags");
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async generateEditTag(req, res) {
    try {
      const {id} = req.params;
      const tag = await Tag.findOne({where: {id}});
      
      res.render("tag/tagEdit", {tag});
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async processEditTag(req, res) {
    const {name, description} = req.body;
    try {
      const {id} = req.params;
      await Tag.update({name, description}, {where: {id}});
      res.redirect("/tags");
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async generateDeleteTag(req, res) {
    try {
      const {id} = req.params;

      await Tag.destroy({where: {id}});
      res.redirect("/tags");
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }
}

module.exports = TagController;