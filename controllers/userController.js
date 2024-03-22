const { User, UserDetail, Post, Tag, PostTag } = require("../models");
const bcrypt = require('bcryptjs');

class UserController {
  static async generateRegister(req, res) {
    const {error} = req.query;
    try {
      res.render("home/register", {error})
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async processRegister(req, res) {
    const {email, password, role} = req.body;
    try {
      await User.create({email, password, role});
      res.redirect("/login");
    } catch (error) {
      if (error.name == 'SequelizeValidationError') {
        res.redirect(`/register?error=${error.errors.map((el) => el.message).join(', ')}`)
      } else {
        console.log(error);
        res.send(error.message);
      } 
    }
  }

  static async generateLogin(req, res) {
    const {error} = req.query;
    try {
      res.render("home/login", {error})
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async processLogin(req, res) {
    const {email, password} = req.body;
    try {
      const user = await User.findOne({where: {email}});
      if (!user) {
        const error = 'No user found with matching email'
        return res.redirect(`/login?error=${error}`)
      }
      const isValidPassword = bcrypt.compareSync(password, user.password);
      if (!isValidPassword) {
        const error = 'incorrect password'
        return res.redirect(`/login?error=${error}`)
      }
      req.session.userId = user.id;
      req.session.userRole = user.role;

      res.redirect("/posts");
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async processLogout(req, res) {
    req.session.destroy((err) => {
      if (err){
        console.log(err);
        res.send(err.message);
      } else {
        res.redirect("/")
      }
    })
  }

  static async generateUser(req, res) {
    try {
      const id = req.session.userId;
      const user = await User.findOne({
        include: UserDetail,
        where: {id}
      });

      res.render("user/userDetail", {user});
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async generateEditUser(req, res) {
    try {
      const {id} = req.params;
      const user = await UserDetail.findByPk(+id);

      res.render("user/userEdit", {user});
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async processEditUser(req, res) {
    const {username, profilePicture, dateOfBirth, description} = req.body;
    try {
      const {id} = req.params;

      await UserDetail.update({username, profilePicture, dateOfBirth, description},{
        where: {id}
      });
      res.redirect("/user");
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async generateDeleteUser(req, res) {
    try {
      const {id} = req.params;
      const user = await UserDetail.findOne({
        include: User,
        where: {id}
      });

      const message = `${user.username} with email ${user.User.email} has been deleted`

      await User.destroy({
        where: {
          id: user.UserId
        }
      });
      res.redirect(`/?message=${message}`);
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async generateDetail(req, res) {
    try {
      const {id} = req.params;
      const user = await User.findOne({
        include: Post,
        where: {id}
      });

      res.render("user/userPost", {user})
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async generateTag(req, res) {
    try {
      const {postid} = req.params;

      const tags = await Tag.findAll();

      res.render("user/userPostTag", {tags, postid})
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async processTag(req, res) {
    try {
      const {postid, tagid} = req.params;

      await PostTag.create({PostId: postid, TagId: tagid});

      res.redirect(`/user/tagging/${postid}`);
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }
}

module.exports = UserController;