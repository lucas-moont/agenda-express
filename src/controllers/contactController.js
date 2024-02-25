const Contact = require('../modules/ContactModel')

exports.index = (req, res) => {
  res.render('contact', {
    titulo: 'Pages de contato'
  })
};

exports.register = async (req, res) => {
  try{
    let contact = new Contact(req.body)
    await contact.register()  

    if(contact.errors.length > 0){
      req.flash('errors', contact.errors)
      req.session.save(() => {
        return res.redirect('/contato')
      })
      return 
    }
  }catch(e){

  }
}
