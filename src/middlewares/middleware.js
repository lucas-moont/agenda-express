exports.globalMiddleware = (req, res, next) => {
    console.log()
    console.log('Passei no middleware global')
    console.log()
    next()
}

exports.checksForError = (req, res, next) => {
    if(err){
        return res.render('404')
    }
}