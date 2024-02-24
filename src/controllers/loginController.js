let Login = require("../modules/LoginModel");

exports.index = (req, res, next) => {
  res.render("login", {
    titulo: "Área de login",
  });
};

exports.register = async (req, res, next) => {
  const login = new Login(req.body);
  await login.register();
  res.send(login.errors);
};
