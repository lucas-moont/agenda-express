let Login = require("../modules/LoginModel");

exports.index = (req, res, next) => {
  res.render("login", {
    titulo: "Área de login",
  });
};

exports.register = async (req, res, next) => {
  const login = new Login(req.body);
  await login.register();

  if(login.errors.length > 0){
    req.flash('errors', login.errors)
    req.session.save(function () {
      res.redirect('back')
      return
    })
    return
  }

  res.send(login.errors)
};
