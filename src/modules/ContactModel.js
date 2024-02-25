const mongoose = require("mongoose");
const validator = require("validator");

const ContactSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: false, default: "" },
  tel: { type: String, required: false, default: "" },
  criadoPor: {type: String, required: true},
  criadoEm: { type: Date, default: Date.now },
});

const ContactModel = mongoose.model("Contact", ContactSchema);

class Contact {
  constructor(body, user) {
    this.body = body;
    this.errors = [];
    this.contact = null;
    this.user = user
  }

  async register() {
    this.valida();

    if(this.errors.length > 0) return 
    this.contact = await ContactModel.create(this.body)
  }

  valida() {
    this.cleanUp();
    //valida e-mail
    if (this.body.email && !validator.isEmail(this.body.email)) {
      this.errors.push("E-mail inválido");
    }

    //valida nome
    if (this.body.nome.length < 3) {
      this.errors.push("Nome é um campo obrigatório.");
    }

    //precisa ter tel ou email
    if (!this.body.email && !this.body.tel) {
      this.errors.push("Pelo menos um contato precisa ser enviado");
    }
  }

  cleanUp() {
    for (let key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }

    this.body = {
      nome: this.body.nome,
      email: this.body.email,
      tel: this.body.tel,
      criadoPor: this.user
    };
  }
}

module.exports = Contact;
