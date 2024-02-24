let Login = require("../modules/LoginModel");

exports.index = (req, res, next) => {
  res.render("login", {
    titulo: "Área de login",
  });
};

exports.register = async (req, res, next) => {
  try{
    const login = new Login(req.body);
    await login.register();
  
    if(login.errors.length > 0){
      req.flash('errors', login.errors)
      req.session.save(function () {
        return res.redirect('/login')
      })
      return
    }

    req.flash('sucess', 'Seu usuário foi criado com sucesso')
    req.session.save(function () {
      return res.redirect('/login')
    })
  }catch(e){
    console.log(e)
  }
};
