let Login = require("../modules/LoginModel");

exports.index = (req, res, next) => {
  if (req.session.user){
    res.render('index', {
      titulo: "Agenda"
    })
  }else{
    res.render("login", {
      titulo: "Área de login",
    });
  }
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


exports.login = async (req, res, next) => {
  try{
    const login = new Login(req.body);
    await login.login();
  
    if(login.errors.length > 0){
      req.flash('errors', login.errors)
      req.session.save(function () {
        return res.redirect('/login')
      })
      return
    }

    req.flash('sucess', 'logou com sucesso')
    req.session.user = login.user
    req.session.save(function () {
      return res.redirect('/login')
    })
  }catch(e){
    console.log(e)
  }
};

exports.logout = (req, res) => {
  req.session.destroy()
  res.redirect('/login')
}