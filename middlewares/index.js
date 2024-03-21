const middleware = {

  loginVerivier: (req,res,next) => {
    if (!req.session.user.id) {
      const error = 'please login first!'
      return res.redirect(`/login?error=${error}`)
    }
    next()
  },

}

module.exports = middleware;