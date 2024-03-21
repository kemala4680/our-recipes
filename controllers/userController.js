const { User, UserDetail } = require("../models");
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
        where: id
      });

      res.send(user)
      // res.render("user/userDetail", {user});
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async generateEditUser(req, res) {
    try {
      
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async processEditUser(req, res) {
    try {
      
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }
}

module.exports = UserController;