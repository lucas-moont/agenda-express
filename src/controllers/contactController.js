exports.index = (req, res) => {
  if (res.locals.user) {
    res.render("contact", {
      titulo: 'Página de contatos'
    });
  }else{
    res.redirect('/login')
  }
};
