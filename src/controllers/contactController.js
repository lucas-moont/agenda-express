const Contact = require('../modules/ContactModel')

exports.index = (req, res) => {
  res.render('contact', {
    titulo: 'Pages de contato'
  })
};

exports.register = (req, res) => {

}
