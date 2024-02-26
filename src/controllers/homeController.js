const Contato = require('../modules/ContactModel')

exports.index = async (req, res) => {
    const contatos = await Contato.buscaContatos()
    res.render('index', {
        titulo: 'Agenda',
        contatos
    })
}

