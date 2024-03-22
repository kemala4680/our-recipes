const multer  = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

class HomeController {

  static async generateHome(req, res) {
    try {
      const {message} = req.query;
      res.render("home/home", {message})
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async generateHelp(req, res) {
    try {
      res.render("home/helper")
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async processHelp(req, res) {
    try {
      res.render("home/helper")
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }
}

module.exports = HomeController;