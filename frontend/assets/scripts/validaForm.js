export default class ValidadorDeLogin {
  constructor(form){
    this.form = document.querySelector(form)
  }

  init(){
    this.events()
    console.log(this.form)
  }

  events(){
    if(!this.form) return
      this.form.addEventListener('submit', (e) => {
      e.preventDefault()
      let validou = this.validaInputs()
      if(validou === true){
        this.form.submit()
      }
    })
  }

  validaInputs(){
    console.log('Estou vaidando os formulários')
    let emailInput = this.form.querySelector('input[type="email"')
    let passwordInput = this.form.querySelector('input[type="password"')
    if(emailInput.value.length <= 0 || passwordInput.value.length <= 0){
      alert('Um ou mais campos estão vazios.')
      return false 
    }else{
      return true
    }
  }
}