const middleware = {

  loginVerivier: (req,res,next) => {
    if (!req.session.userId) {
      const error = 'please login first!'
      return res.redirect(`/login?error=${error}`)
    }
    next()
  },

  adminVerivier: (req,res,next) => {
    if (req.session.userRole == 'admin') {
      return res.redirect(`/`)
    }
    next()
  },

}

module.exports = middleware;