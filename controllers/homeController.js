
class HomeController {

  static async generateHome(req, res) {
    try {
      res.render("home/home")
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }
}

module.exports = HomeController;