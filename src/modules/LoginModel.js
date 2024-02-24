const mongoose = require("mongoose");
const validator = require("validator");

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, require: true }
});

const LoginModel = mongoose.model("Login", LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async register() {
    this.valida();
    if (this.errors.length > 0) return 
    
    try{
      this.user = await LoginModel.create(this.body)
      console.log('Usuário criado com sucesso:', this.user);
    }catch(e){
      console.log(e)
    }
   }

  valida() {
    this.cleanUp();
    //valida e-mail
    if (!validator.isEmail(this.body.email)) {
      this.errors.push("E-mail inválido");
    }

    //valida senha
    if(this.body.password.length < 3 || this.body.password.length > 20){
      this.errors.push('Senha inválida.')
    }
    
  if(!this.body.email || !this.body.password){
      this.errors.push('Email e senha são necessários.')
    }
  }

  cleanUp() {
    for (let key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = "";
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password,
    };
  }
}

module.exports = Login;
