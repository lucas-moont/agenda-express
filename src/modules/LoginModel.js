const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const LoginSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { strict: true }
);

const LoginModel = mongoose.model("Login", LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async login() {
    this.valida();
    if (this.errors.length > 0) return;

    this.user = await LoginModel.findOne({ email: this.body.email });
    if (!this.user) {
      this.errors.push("Usuário não existe");
    } else {
      if (bcrypt.compareSync(this.body.password, this.user.password)) {

      } else {
        this.errors.push("Senha incorreta.");
        this.user = null;
      }
    }
  }

  async register() {
    this.valida();
    if (this.errors.length > 0) return;

    await this.userExists();

    if (this.errors.length > 0) return;

    const salt = bcrypt.genSaltSync();
    this.body.password = bcrypt.hashSync(this.body.password, salt);

    this.user = await LoginModel.create(this.body);
  }

  valida() {
    this.cleanUp();
    //valida e-mail
    if (!validator.isEmail(this.body.email)) {
      this.errors.push("E-mail inválido");
    }

    //valida senha
    if (this.body.password.length < 3 || this.body.password.length > 20) {
      this.errors.push("Senha inválida.");
    }

    if (!this.body.email || !this.body.password) {
      this.errors.push("Email e senha são necessários.");
    }
  }

  async userExists() {
    let user = await LoginModel.findOne({ email: this.body.email });
    if (user) this.errors.push("Usuário já existe.");
  }

  cleanUp() {
    for (let key in this.body) {
      if (typeof this.body[key] !== "string") {
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