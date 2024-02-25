const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
    titulo: {type: String, required: true}
})

const ContactModel = mongoose.model('Contact', ContactSchema)

class Contact {

}

module.exports = Contact;