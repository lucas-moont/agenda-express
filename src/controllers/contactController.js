const Contact = require('../modules/ContactModel')

exports.index = (req, res) => {
  res.render('contact', {
    titulo: 'Pages de contato'
  })
};

exports.register = async (req, res) => {
  try{
    let contact = new Contact(req.body, res.locals.user.email)
    await contact.register()  

    if(contact.errors.length > 0){
      req.flash('errors', contact.errors)
      req.session.save(() => {
        return res.redirect('/contato')
      })
      return 
    }else{
      req.flash('sucess', 'Contato criado com sucesso')
      req.session.save(() => {return res.redirect(`/contato/${contact.contact._id}`)})
      return
    }
  }catch(e){
    console.log(e)
    return res.render('404', {titulo: 'Erro 404'})
  }
}
